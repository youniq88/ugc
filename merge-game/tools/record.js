// 머지 게임 자동 녹화 스크립트 (Playwright + 헤드리스 크롬)
// 사용법: node record.js <preset> <출력 mp4> [최대 시도 횟수] [최대 게임 시간(초)]
//   - index.html 을 같은 폴더의 로컬 웹 서버(기본 http://localhost:8765)에서 띄운 뒤 실행합니다.
//   - 게임이 클리어(마지막 요소 등장)될 때까지 녹화합니다. 게임 시간이 제한(기본 60초)을 넘기거나 게임오버가 나면 버리고 다시 촬영합니다.
//   - 게임 자체의 녹화 기능(캔버스 + 효과음 MediaRecorder)을 그대로 써서 소리까지 함께 담습니다.
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');

const preset = process.argv[2] || 'planets';
const outMp4 = process.argv[3] || `merge-${preset}.mp4`;
const maxTries = parseInt(process.argv[4] || '4', 10);
const maxGameSec = parseFloat(process.argv[5] || '60');
const base = process.env.GAME_URL || 'http://localhost:8765/index.html';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  let done = false;
  for (let attempt = 1; attempt <= maxTries && !done; attempt++) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    page.on('pageerror', e => console.log('pageerror', e.message));
    await page.goto(`${base}?preset=${preset}&ui=0`);
    await page.waitForFunction(() => !paused, null, { timeout: 30000 });        // 키트 이미지 로딩 완료
    const imgs = await page.evaluate(() => TIERS.filter(t => !t._imgKey || imgCache[t._imgKey]).length + '/' + TIERS.length);
    await page.evaluate(() => { initAudio(); toggleRec(); });                      // 녹화 시작 = 게임 처음부터
    const t0 = Date.now(); let status = 'timeout';
    while (Date.now() - t0 < (maxGameSec + 30) * 1000) {
      const s = await page.evaluate(() => ({ ended, over: !!overSince, gt }));
      if (s.ended) { status = 'cleared'; break; }
      if (s.over) { status = 'gameover'; break; }
      if (s.gt > maxGameSec * 1000) { status = 'toolong'; break; }
      await page.waitForTimeout(250);
    }
    const gameSec = await page.evaluate(() => Math.round(gt / 100) / 10);
    console.log(`attempt ${attempt}: images ${imgs}, ${status}, game ${gameSec}s, wall ${Math.round((Date.now() - t0) / 100) / 10}s`);
    if (status === 'cleared') {
      await page.waitForTimeout(5500);                                             // 축하 연출(번개·화살 피날레 포함)까지 담기
      const out = await page.evaluate(async () => {
        const stopped = new Promise(res => { const r = recorder, o = r.onstop; r.onstop = () => { o(); res(); }; });
        toggleRec(); await stopped;
        const buf = await lastBlob.arrayBuffer(); const u = new Uint8Array(buf); let s = '';
        for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
        return { b64: btoa(s), type: lastBlob.type };
      });
      fs.writeFileSync('rec-raw.webm', Buffer.from(out.b64, 'base64'));
      // 인스타그램·유튜브 호환: 영상은 그대로, 소리(opus)만 AAC 로 바꿔 mp4 로 담음
      execSync(`ffmpeg -y -v error -i rec-raw.webm -c:v copy -c:a aac -b:a 160k -movflags +faststart "${outMp4}"`);
      console.log('saved', outMp4, fs.statSync(outMp4).size, 'bytes, mime', out.type);
      done = true;
    }
    await page.close();
  }
  await browser.close();
  if (!done) { console.log('FAILED: no clear within limit'); process.exit(2); }
})().catch(e => { console.log('ERR', e); process.exit(1); });
