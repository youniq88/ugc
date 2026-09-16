/* ============================================================
   프리셋(단계별 요소) 정의 — 머지 게임(index.html)과 프레스 모드(press.html)가 함께 씁니다.
   여기만 고치면 두 게임에 같이 반영됩니다. 파일을 옮기거나 이름을 바꾸면 두 쪽 다 못 씁니다.
   ============================================================ */
/* ============================================================
   ▼▼▼ 여기만 수정하면 됩니다: 단계별 요소 설정 ▼▼▼
   - 각 프리셋은 낮은 단계 → 높은 단계 순서의 배열입니다. 같은 단계 두 개가 닿으면 다음 단계가 됩니다.
   - 한 프리셋의 그래픽은 한 디자인 키트에서만 가져와 스타일을 통일합니다.
     kit: "fluent" = Microsoft Fluent Emoji 3D (MIT 라이선스, github.com/microsoft/fluentui-emoji)
          img 값은 assets/ 아래 경로 ("폴더/3D/파일명_3d.png")
   - 프리셋 속성 sound: 효과음 테마 ("space" 신비로운 / "juicy" 쥬시한 / "crystal" 유리·보석 / "candy" 귀엽고 달콤한 젤리 / "epic" 웅장한 전설 / "evolve" 레벨업 게임음 / "nova" 깊고 웅장한 우주 / "cash" 동전 짤랑·금전등록기 / "quake" 땅이 울리는 발소리 / "ruin" 도기·대리석 / "sonar" 물속 소나 / "lyre" 리라 현을 튕기는 소리 / "plush" 폭신한 인형 소리)
   - 프리셋 속성 physics: { restitution: 반발계수, wobble: 1 } 로 프리셋별 물리 덮어쓰기 (젤리는 0.88 + 찌그러짐)
   - 항목 속성:
       r      : 반지름(px, 1080x1920 캔버스 기준) - 단계가 올라갈수록 크게
       img    : 키트 안의 이미지 경로 (kit 와 함께 사용)
       image  : 직접 지정하는 이미지 URL (img 대신)
       scale  : 이미지를 반지름 대비 얼마나 크게 그릴지 (기본 1.12, PNG 여백 보정)
       glow   : 주변에 퍼지는 빛 색상
       shape / colors : 코드로 그리는 도형 (이미지 없이 쓸 때. pearl teardrop emerald cushion brilliant star moon mars earth saturn jupiter sun blackhole galaxy sphere)
       emoji  : 이모지로 그릴 때
       noSpin : true 면 물리 회전을 그리지 않음 (블랙홀처럼 기울면 어색한 것)
   ============================================================ */
const KITS = {
  // 같은 파일을 두 곳에서 순서대로 시도 (앞이 실패하면 뒤)
  fluent: [
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/",
    "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/",
  ],
  // 젤리 프리셋 전용: 단색 구미 젤리 9종 (AI 렌더링 후 배경 제거, 512px 투명 PNG, CORS 허용 CDN)
  gummy: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 왁뿌볼 프리셋 전용: 안에 든 과일 젤리 7종 (AI 렌더링, 512px 투명 PNG, 같은 CDN)
  wakppu: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 무기 프리셋 전용: 박물관 전시품 같은 실사 3D 무기 9종 (AI 렌더링, 512px 투명 PNG, 같은 CDN)
  weapons: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 신화 프리셋 전용: 광택 3D 이모지풍 신화 생물 9종 (AI 렌더링, 512px 투명 PNG, 같은 CDN)
  myth: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 진화 프리셋 전용: 같은 방식으로 만든 9종
  evolution: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 별의 일생 프리셋 전용: 같은 방식으로 만든 9종
  starlife: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 돈 프리셋 전용: 같은 방식으로 만든 9종
  money: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 오디세이아 프리셋 전용: 굵은 먹선의 회화풍 코믹 일러스트 9종 (AI 렌더링, 512px 투명 PNG, 같은 CDN)
  odyssey: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 강아지 프리셋 전용: 봉제 인형 스타일 9종 (AI 렌더링, 512px 투명 PNG, 같은 CDN)
  dogs: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 우주 실물 크기 프리셋 전용: 사진풍 천체 8종 (AI 렌더링, 512px 투명 PNG, 같은 CDN. 블랙홀은 코드로 그림)
  cosmos: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
  // 우주 거대구조 프리셋 전용: 사진풍 구조 8종 + 건틀릿 (지구·태양은 cosmos 것을 그대로 씀)
  universe: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqJlrQps4r0GBhzHSZNDkCfWAY/",
  ],
};
const PRESETS = {
  planets: {   // 9단계: 초승달 → 그믐달 → 보름달 → 지구 → 토성 → 태양 → 혜성 → 빛나는 별 → 블랙홀
    kit: "fluent", sound: "space",
    items: [
      { r:36,  img:"Crescent moon/3D/crescent_moon_3d.png",                           glow:"#ffd98a" },
      { r:46,  img:"New moon/3D/new_moon_3d.png",                                     glow:"#b9a6ff" },
      { r:58,  img:"Full moon/3D/full_moon_3d.png",                                   glow:"#ffe3a0" },
      { r:72,  img:"Globe showing europe-africa/3D/globe_showing_europe-africa_3d.png", glow:"#5ab4ff" },
      { r:90,  img:"Ringed planet/3D/ringed_planet_3d.png",                           glow:"#ffb64d" },
      { r:110, img:"Sun/3D/sun_3d.png",                                               glow:"#ffb300" },
      { r:134, img:"Comet/3D/comet_3d.png",                                           glow:"#8fd3ff" },
      { r:160, img:"Glowing star/3D/glowing_star_3d.png",                             glow:"#fff3a0" },
      { r:190, shape:"blackhole", glow:"#ff9a3d", noSpin:true },                      // 인터스텔라 스타일 블랙홀 (코드 드로잉)
    ],
  },
  gems: {      // 9단계: 진주 → 에메랄드 → 사파이어 → 자수정 → 루비 → 주황 다이아 → 파랑 다이아 → 젬스톤 → 왕관
    kit: "fluent", sound: "crystal",
    items: [
      { r:36,  img:"White circle/3D/white_circle_3d.png",                 glow:"#ffffff", scale:1.02 },
      { r:46,  img:"Green circle/3D/green_circle_3d.png",                 glow:"#2eff7a", scale:1.02 },
      { r:58,  img:"Blue circle/3D/blue_circle_3d.png",                   glow:"#3d7bff", scale:1.02 },
      { r:72,  img:"Purple circle/3D/purple_circle_3d.png",               glow:"#c04dff", scale:1.02 },
      { r:90,  img:"Red circle/3D/red_circle_3d.png",                     glow:"#ff2a4a", scale:1.02 },
      { r:110, img:"Large orange diamond/3D/large_orange_diamond_3d.png", glow:"#ff9d2e" },
      { r:134, img:"Large blue diamond/3D/large_blue_diamond_3d.png",     glow:"#4da3ff" },
      { r:160, img:"Gem stone/3D/gem_stone_3d.png",                       glow:"#9be7ff" },
      { r:190, img:"Crown/3D/crown_3d.png",                               glow:"#ffd54f" },
    ],
  },
  jelly: {     // 9단계 단색 구미 젤리: 콩 → 물방울 → 하트 → 별 → 링 → 큐브 → 꽃 → 물고기 → 곰. 탄력 3배 체감(반발 0.88 + 찌그러짐)
    kit: "gummy", sound: "candy",
    physics: { restitution: 0.88, wobble: 1 },
    items: [
      { r:36,  img:"af9ad4ee-077f-4af2-80ae-bdc09776af0d.png", glow:"#ff3b3b", scale:1.08 },   // 빨강 콩
      { r:46,  img:"38f0d532-76d7-417b-8f33-40cb892ca7ba.png", glow:"#ff8a1f", scale:1.08 },   // 주황 물방울
      { r:58,  img:"463dc062-15f2-42cf-88b7-6c5aa18b2bec.png", glow:"#ffd21f", scale:1.08 },   // 노랑 하트
      { r:72,  img:"4c035574-5c83-4a72-a921-73ccd3e68f9d.png", glow:"#5ee05a", scale:1.08 },   // 초록 별
      { r:90,  img:"c2236dae-5d1a-4d07-bc51-3df65afb2bda.png", glow:"#2fd6c8", scale:1.08 },   // 민트 링
      { r:110, img:"99193df4-7464-4d54-8bb5-eeefd61a992c.png", glow:"#3b8bff", scale:1.08 },   // 파랑 큐브
      { r:134, img:"0f3ae334-93f7-474b-a5c6-baac63dc9923.png", glow:"#9b5bff", scale:1.08 },   // 보라 꽃
      { r:160, img:"19c1aa3d-ca53-4a66-af46-048aea168193.png", glow:"#ff5fb8", scale:1.08 },   // 분홍 물고기
      { r:190, img:"3b1fb27b-c1f5-42c9-a594-c24ccc2df71d.png", glow:"#ffffff", scale:1.08 },   // 하양 곰
    ],
  },
  myth: {      // 9단계 신화 생물: 알 → 아기 용 → 늑대 → 유니콘 → 그리핀 → 피닉스 → 드래곤 → 크라켄 → 제우스
    kit: "myth", sound: "epic", finale: "lightning",   // 제우스가 나오면 번개로 나머지를 모두 태움
    items: [
      { r:36,  img:"ce9adfe7-3275-4318-a803-99fb7ce98dc0.png", glow:"#ffd24a", scale:1.08 },   // 황금 알
      { r:46,  img:"d90743f5-df72-4711-a11c-11ce6891ec1a.png", glow:"#6de3a0", scale:1.08 },   // 아기 용
      { r:58,  img:"99767105-e15d-41a7-b262-c28430dc2779.png", glow:"#9ab4ff", scale:1.08 },   // 늑대
      { r:72,  img:"75d8b66d-308b-4550-9018-3b6cd51d3827.png", glow:"#ff9ad6", scale:1.08 },   // 유니콘
      { r:90,  img:"db80a339-fb02-4b9f-ac17-b25fe85af643.png", glow:"#ffc46b", scale:1.08 },   // 그리핀
      { r:110, img:"a4cbb09c-9329-405b-bf26-7f31dd4495b5.png", glow:"#ff6a1f", scale:1.08 },   // 피닉스
      { r:134, img:"885688fa-426a-402d-b6bf-6218a04c0123.png", glow:"#ff3b3b", scale:1.08 },   // 드래곤
      { r:160, img:"7e2e604c-f9fb-480a-ab4e-709a8aac78f5.png", glow:"#a55bff", scale:1.08 },   // 크라켄
      { r:190, img:"42a7ea94-76b5-4a78-a657-b120da41d3a5.png", glow:"#ffe066", scale:1.08 },   // 신
    ],
  },
  odyssey: {   // 9단계 오디세이아: 트로이 목마 → 로토스 → 키클롭스 → 아가멤논 → 키르케 → 세이렌 → 스킬라 → 카리브디스 → 오디세우스
    kit: "odyssey", sound: "lyre", finale: "arrow",   // 오디세우스가 나오면 화살 한 발이 나머지를 모두 꿰뚫음
    items: [
      { r:36,  img:"e66910bf-72db-4301-9d54-ca6ba69dd1f2.png", glow:"#d9a24a", scale:1.08 },   // 트로이 목마
      { r:46,  img:"c5cb0f1e-8a29-4762-a80b-e690f42acf88.png", glow:"#ff8fd0", scale:1.08 },   // 로토스 꽃
      { r:58,  img:"7de35882-97d8-47a6-9eb6-83617e4f9604.png", glow:"#c08a5a", scale:1.08 },   // 키클롭스
      { r:72,  img:"046f6895-9693-4390-a172-8f9de897f24b.png", glow:"#ff4a3a", scale:1.08 },   // 아가멤논
      { r:90,  img:"7eb570c9-9e76-4925-9219-6b783bbad41b.png", glow:"#c05cff", scale:1.08 },   // 키르케
      { r:110, img:"daac4248-f4d3-47bf-ab3f-55b4262b1fec.png", glow:"#7fd3ff", scale:1.08 },   // 세이렌
      { r:134, img:"45b48d72-5386-49ac-add8-acb42f8226af.png", glow:"#3ac9a0", scale:1.08 },   // 스킬라
      { r:160, img:"987ba580-6e3a-4a22-8983-285bc39fd425.png", glow:"#4aa0ff", scale:1.08 },   // 카리브디스
      { r:190, img:"b1d69774-344b-4d68-8c3b-79ac09c676df.png", glow:"#ffd24a", scale:1.08 },   // 오디세우스
    ],
  },
  dogs: {      // 9단계 강아지 서열: 치와와 → 포메라니안 → 웰시코기 → 비글 → 시바견 → 리트리버 → 허스키 → 그레이트데인 → 늑대
    kit: "dogs", sound: "plush", finale: "moon",   // 늑대가 나오면 보름달이 뜨고 모두 달빛 속으로 사라짐
    items: [
      { r:36,  img:"703da880-ef7e-4986-8789-7999d07c3541.png", glow:"#ffd9a8", scale:1.08 },   // 치와와
      { r:46,  img:"ebbe0b25-ffac-4f2b-b298-5285d64c0b2b.png", glow:"#ffb266", scale:1.08 },   // 포메라니안
      { r:58,  img:"f96eb645-5098-4445-aaae-e5ec053c2e9e.png", glow:"#ff9d4d", scale:1.08 },   // 웰시코기
      { r:72,  img:"4af5e904-c8bd-46ee-a21c-db6453ae9d2c.png", glow:"#e8c49a", scale:1.08 },   // 비글
      { r:90,  img:"c641cefa-e6d7-407e-8256-3036d7d554bb.png", glow:"#ff8a3a", scale:1.08 },   // 시바견
      { r:110, img:"60cf28d2-e71f-48f2-aab2-88366ca5a590.png", glow:"#ffcf6b", scale:1.08 },   // 골든 리트리버
      { r:134, img:"f5a74201-4ece-4d00-9423-fbc5141a490e.png", glow:"#9fd8ff", scale:1.08 },   // 허스키
      { r:160, img:"8189093b-b6b8-4a43-8f5c-51a87ffd7024.png", glow:"#ffe0b0", scale:1.08 },   // 그레이트 데인
      { r:190, img:"80bfad68-765e-4a34-b38b-8a9001d8ee33.png", glow:"#cfe4ff", scale:1.08 },   // 늑대
    ],
  },
  cosmos: {    // 9단계 우주 실물 크기: 달 → 화성 → 지구 → 해왕성 → 목성 → 태양 → 아크투르스 → 베텔게우스 → 블랙홀
    // 반지름은 실제 지름의 로그값을 36~190px 에 그대로 대응시킨 것입니다. 실제 지름이 7자리수(3천 km ~ 380억 km)나
    // 벌어져서 선형으로는 달이 0.00002px 이 되므로, 로그 간격으로 두어 "실제 배율 차이가 클수록 시각적 단차도 크게" 맞췄습니다.
    kit: "cosmos", sound: "nova", finale: "vortex",   // 블랙홀이 나오면 남은 천체를 전부 빨아들이고 화면이 닫힘
    items: [
      { r:36,  img:"39cc1723-dfbe-4b2c-8271-f5d6a1ed8049.png", glow:"#d8d8d8", scale:1.04 },   // 달 3,474 km
      { r:42,  img:"1416d634-6a0a-49d8-b04a-70ffccb69b75.png", glow:"#ff7a45", scale:1.04 },   // 화성 6,779 km
      { r:48,  img:"3ab5cb9b-35b9-4e72-b162-db4aa42842da.png", glow:"#4da3ff", scale:1.04 },   // 지구 12,742 km
      { r:61,  img:"3262ae96-34ee-4461-9b97-de065db8cfbd.png", glow:"#2f6bff", scale:1.04 },   // 해왕성 49,244 km
      { r:71,  img:"c09e9e9c-fa5a-4d72-8f19-f5c880436297.png", glow:"#e8c9a0", scale:1.04 },   // 목성 139,820 km
      { r:93,  img:"5f6cb703-7cfe-417f-a9e7-ce2e2074b596.png", glow:"#ffb300", scale:1.04 },   // 태양 1,391,400 km
      { r:124, img:"607e5968-971b-4398-9413-986b1172ec0d.png", glow:"#ff8a2e", scale:1.04 },   // 아크투르스 (적색거성) 3,560만 km
      { r:157, img:"5cb31019-7d72-43b9-99b4-3a3dd20082af.png", glow:"#ff4a1f", scale:1.04 },   // 베텔게우스 (적색초거성) 12억 3,400만 km
      { r:190, shape:"blackhole", glow:"#ff9a3d", noSpin:true },                               // 블랙홀 M87* 사건의 지평선 384억 km
    ],
  },
  universe: {  // 9단계 우주 거대구조: 지구 → 태양 → 태양계 → 성운 → 우리은하 → 국부은하군 → 초은하단 → 관측 가능한 우주 → 건틀릿
    // 실제 크기는 지구 1만 km 에서 관측 가능한 우주 930억 광년까지 20자리수가 벌어지고 마지막 건틀릿은 천체가 아니라
    // 크기 자체가 없으므로, 여기서는 실제 비율 대신 다른 프리셋과 같은 단계 간격을 씁니다 (실제 크기는 아래 주석 참고).
    kit: "universe", sound: "nova", finale: "snap",   // 건틀릿이 나오면 손가락을 튕겨 절반이 사라짐
    items: [
      { r:36,  img:"3ab5cb9b-35b9-4e72-b162-db4aa42842da.png", glow:"#4da3ff", scale:1.04 },   // 지구 12,742 km
      { r:46,  img:"5f6cb703-7cfe-417f-a9e7-ce2e2074b596.png", glow:"#ffb300", scale:1.04 },   // 태양 139만 km
      { r:58,  img:"1005b5ca-c027-4c75-80ae-502eeaff5fd3.png", glow:"#ffd27a", scale:1.06 },   // 태양계 (해왕성 궤도 지름 90억 km)
      { r:72,  img:"3fd5ae8f-8b3d-4869-86ea-21d2b91b8309.png", glow:"#ff7ad6", scale:1.06 },   // 오리온 성운 24광년
      { r:90,  img:"af9d6cbf-70de-4814-9789-238ae944bf9f.png", glow:"#9ec6ff", scale:1.06 },   // 우리은하 10만 광년
      { r:110, img:"64366796-e792-489f-834a-cc38d3a2a40f.png", glow:"#cbd8ff", scale:1.06 },   // 국부은하군 1,000만 광년
      { r:134, img:"145680e8-7138-47f8-8d64-272df2b00f43.png", glow:"#ffd9a0", scale:1.06 },   // 라니아케아 초은하단 5억 2,000만 광년
      { r:160, img:"290c964d-994c-414c-a629-90a3165a651d.png", glow:"#8f9dff", scale:1.06 },   // 관측 가능한 우주 930억 광년
      { r:190, drawR:380, img:"7e7ed043-8e64-4e45-9ae2-32d40ddba0b9.png", frames:["7e7ed043-8e64-4e45-9ae2-32d40ddba0b9.png","2449d29f-9729-4f4c-a63a-66b70fd73c74.png","f4ccabb7-dc28-4263-9387-ab31528d8d4f.png"], glow:"#ffcf3d", scale:1.10, noSpin:true },   // 여섯 보석이 박힌 황금 건틀릿 (충돌은 190, 그림은 두 배 크게. frames = 손가락을 튕기는 장면)
    ],
  },
  wakppu: {   // 왁뿌볼 9단계: 흰 왁스막을 씌운 과일 젤리. 네 번 부딪혀야 합쳐지고, 마지막은 거대 두리안
    kit: "wakppu", sound: "wax", shell: true, finale: "durian",
    physics: { restitution: 0.3 },   // 왁스를 씌운 공이라 통통 튀지 않고 툭 떨어진다. 덜 튀어야 그릇이 넘치지 않는다
    dropTiers: 5, rate: 150,   // 네 번씩 부딪혀야 합쳐지므로 아래 다섯 단계를 섞어 떨어뜨린다. 한 종류만 떨어뜨리면 그릇이 넘치기 전에 두리안까지 못 간다
    items: [
      { r:32,  img:"1f9f6273-a1a6-4404-8267-935d3acbb141.png", glow:"#c874ff", scale:1.10 },   // 포도
      { r:41,  img:"b4a7e9a7-d4e5-4a94-a750-f7db69629ed4.png", glow:"#ff5a5a", scale:1.10 },   // 딸기
      { r:52,  img:"413a0c13-3c58-4403-815c-b4d4183e64a9.png", glow:"#ff9c2e", scale:1.10 },   // 귤
      { r:64,  img:"6fcc581a-2bc1-43e8-bf73-e9c0f0a42e51.png", glow:"#7fe04a", scale:1.10 },   // 사과
      { r:76,  img:"36a4fac9-1300-4a03-8f41-8ea3b7507d8c.png", glow:"#ff8fb0", scale:1.10 },   // 복숭아 (여기까지 관을 통과한다)
      { r:94,  img:"0545f5e4-8368-424a-b226-dc4ab1edff84.png", glow:"#ffd23d", scale:1.10 },   // 파인애플
      { r:116, img:"45f1b740-9496-4de6-8ff3-ff546a4d6e68.png", glow:"#b8f07a", scale:1.10 },   // 멜론
      { r:145, img:"6483e9cf-6c69-47b1-95c1-c54636f8904d.png", glow:"#ff4d6a", scale:1.10 },   // 수박
      { r:260, img:"e7aa5fd2-f5f6-4d3a-bb0b-9a82d62c6ca0.png", glow:"#ffc24d", scale:1.10 },   // 거대 두리안 (수박 두 개가 합쳐지면 확 커진다)
    ],
  },
  weapons: {  // 9단계 무기의 역사: 구석기 돌망치 → 반물질 폭탄 (16비트 픽셀아트 게임 아이템 스타일)
    kit: "weapons", sound: "evolve", finale: "annihilate",   // 반물질 폭탄이 나오면 전부 소멸
    items: [
      { r:36,  img:"0d3d984d-6396-4c2d-80b2-223c484f4548.png", glow:"#d8b48a", scale:1.14 },   // 구석기 돌망치
      { r:46,  img:"2b69e1dc-19de-48e8-becd-9479d89c925e.png", glow:"#ffc766", scale:1.30 },   // 청동 단검 (칼날이 가늘어 크게 그림)
      { r:58,  img:"5a68faf4-bb13-4f67-aec0-43e6983b7ffe.png", glow:"#cfe0ff", scale:1.34 },   // 강철 장검 (칼날이 가늘어 크게 그림)
      { r:72,  img:"b249de57-abd2-4c32-ba5b-103f413155d2.png", glow:"#d7a86a", scale:1.08 },   // 석궁
      { r:90,  img:"1262184d-ae59-406f-88db-ba5d7e6e6e88.png", glow:"#e0a55a", scale:1.10 },   // 화승총(머스킷)
      { r:110, img:"6ccb9881-cc61-4206-a456-ee1804a0dd13.png", glow:"#a8c86a", scale:1.08 },   // 기관총
      { r:134, img:"1f9b1502-037a-487f-8f85-45f47fe53e5b.png", glow:"#ff7a7a", scale:1.20 },   // 로켓
      { r:160, img:"d8242361-6bca-4512-b9af-4094fcc0623e.png", glow:"#ffd24d", scale:1.08 },   // 핵폭탄
      { r:190, img:"35cc361d-8f0c-4377-bb46-e3ba82b8d926.png", glow:"#c07dff", scale:1.10, noSpin:true },   // 반물질 폭탄
    ],
  },
  evolution: { // 9단계 진화: 세포 → 물고기 → 도마뱀 → 공룡 → 원숭이 → 사람(스마트폰 보는 비즈니스맨) → 로봇 → AI → 은하
    kit: "evolution", sound: "evolve",
    items: [
      { r:36,  img:"8422344a-f642-4a63-b5e7-acfde7884413.png", glow:"#7dff6a", scale:1.08 },   // 세포
      { r:46,  img:"87baaa9c-028b-49ef-b76e-502b00ea72dc.png", glow:"#ffa63d", scale:1.08 },   // 물고기
      { r:58,  img:"885970d9-00cb-4c16-b1b2-633ce076eb9c.png", glow:"#8ce04a", scale:1.08 },   // 도마뱀
      { r:72,  img:"dcbec9e3-c709-433d-bb43-8607c36e3ce3.png", glow:"#5ccf3a", scale:1.08 },   // 공룡
      { r:90,  img:"6f58c636-3e92-4774-919f-8006d8ab6871.png", glow:"#d9924a", scale:1.08 },   // 원숭이
      { r:110, img:"f30c0e93-385f-4d7f-aac6-d85531e570b2.png", glow:"#5a8dff", scale:1.02 },   // 사람 (세로로 긴 전신이라 살짝 작게)
      { r:134, img:"8cb8fa9e-7bbb-4d06-ad8e-223389738809.png", glow:"#4dd8ff", scale:1.06 },   // 로봇
      { r:160, img:"d0b600e4-af42-4183-904b-febec07f6d94.png", glow:"#8a5bff", scale:1.08 },   // AI
      { r:190, img:"0f619c82-97a5-44e4-acda-d4779bd28f0e.png", glow:"#b48cff", scale:1.10 },   // 은하
    ],
  },
  starlife: {  // 9단계 별의 일생: 우주 먼지 → 운석 → 소행성 → 행성 → 적색거성 → 초신성 → 중성자별 → 블랙홀 → 은하
    kit: "starlife", sound: "nova",
    items: [
      { r:36,  img:"130ad2b9-b004-42aa-8e15-5d8c7a637098.png", glow:"#c98bff", scale:1.08 },   // 우주 먼지
      { r:46,  img:"36f8eb67-28d5-4067-b066-7ced13a126b2.png", glow:"#ff9a3d", scale:1.08 },   // 운석
      { r:58,  img:"4c822eda-8fa1-429a-b1a4-222751b49f23.png", glow:"#c9a888", scale:1.08 },   // 소행성
      { r:72,  img:"eb84ecb7-f3e8-48fc-b438-bdde5e575e36.png", glow:"#4db8ff", scale:1.08 },   // 행성
      { r:90,  img:"83949397-34cd-48f1-937d-36d1064d3ea3.png", glow:"#ff5a1f", scale:1.08 },   // 적색거성
      { r:110, img:"4430da7b-b1f8-46f0-ba72-74da7b0d27df.png", glow:"#ff5ad6", scale:1.10 },   // 초신성
      { r:134, img:"6a1866fd-4de0-422b-922d-815b1a2a41ac.png", glow:"#8ad8ff", scale:1.08 },   // 중성자별
      { r:160, img:"90009165-dcb2-495c-affb-e66bd4d9bb24.png", glow:"#ffb347", scale:1.10, noSpin:true },   // 블랙홀 (기울면 어색해서 회전 없음)
      { r:190, img:"939d945f-db34-4beb-8ffe-372fe21a1da3.png", glow:"#b48cff", scale:1.10 },   // 은하
    ],
  },
  money: {     // 9단계 부의 단계: 동전 → 지폐 → 금괴 → 다이아 → 금고 → 슈퍼카 → 저택 → 요트 → 로켓
    kit: "money", sound: "cash",
    items: [
      { r:36,  img:"0adf935c-d318-4d32-bc96-a7e438e88504.png", glow:"#ffd23f", scale:1.08 },   // 동전
      { r:46,  img:"c22568c6-08c3-4038-8450-c7c87fe0bfb2.png", glow:"#4dd66a", scale:1.08 },   // 지폐 다발
      { r:58,  img:"9114e239-88cc-4601-bb6e-1a13bf7412ec.png", glow:"#ffc233", scale:1.10 },   // 금괴
      { r:72,  img:"9853b140-6668-40ac-baf9-97af47ff5def.png", glow:"#7fd3ff", scale:1.08 },   // 다이아몬드
      { r:90,  img:"cdca163e-db13-4ee1-96bb-792783831d0a.png", glow:"#b8c4d6", scale:1.08 },   // 금고
      { r:110, img:"426899af-f918-4882-b691-8fc54436b6d5.png", glow:"#ff3b3b", scale:1.14 },   // 슈퍼카 (납작해서 조금 크게)
      { r:134, img:"82d1b639-c07f-407a-9daa-48f888b573bd.png", glow:"#ffe9b8", scale:1.10 },   // 저택
      { r:160, img:"1301f214-c384-4146-ae3e-c8fda89e3428.png", glow:"#4da3ff", scale:1.10 },   // 요트
      { r:190, img:"f2b037ff-8b59-457b-a310-0ee772c56344.png", glow:"#ff8a3d", scale:1.06 },   // 로켓
    ],
  },
  fruits: {    // 9단계: 체리 → 딸기 → 포도 → 귤 → 사과 → 복숭아 → 파인애플 → 멜론 → 수박
    kit: "fluent", sound: "juicy",
    items: [
      { r:36,  img:"Cherries/3D/cherries_3d.png",     glow:"#ff5a7a" },
      { r:46,  img:"Strawberry/3D/strawberry_3d.png", glow:"#ff4d6d" },
      { r:58,  img:"Grapes/3D/grapes_3d.png",         glow:"#b04dff" },
      { r:72,  img:"Tangerine/3D/tangerine_3d.png",   glow:"#ff9d2e" },
      { r:90,  img:"Red apple/3D/red_apple_3d.png",   glow:"#ff3b3b" },
      { r:110, img:"Peach/3D/peach_3d.png",           glow:"#ffb08a" },
      { r:134, img:"Pineapple/3D/pineapple_3d.png",   glow:"#ffd54f" },
      { r:160, img:"Melon/3D/melon_3d.png",           glow:"#b8ff7a" },
      { r:190, img:"Watermelon/3D/watermelon_3d.png", glow:"#ff5a5a" },
    ],
  },
};
