# Auto Merge Game (릴스용 자동 진행 머지 게임)

같은 단계 두 개가 닿으면 다음 단계로 합쳐지는 게임. 플레이어 조작 없이 요소들이 위쪽 관을 따라 줄지어 계속 내려오고, 넘치면 자동으로 재시작됩니다. 1080×1920(9:16) 캔버스라 인스타 릴스에 그대로 올릴 수 있습니다.

## 배포 주소

- https://merge-game-reels-buskers88-6629s-projects.vercel.app (Vercel, 프로젝트 `merge-game-reels`)
- 예: `?preset=fruits&ui=0` 을 붙이면 과일 프리셋을 UI 없이 바로 실행

## 실행

`merge-game/index.html` 을 브라우저(크롬 권장)로 열면 바로 시작됩니다. 서버 필요 없음.

- `?preset=planets` / `gems` / `fruits` : 프리셋 선택 (URL 파라미터)
- `?ui=0` : 버튼 UI 숨긴 채 시작
- 단축키 `스페이스`/`P` 일시정지·재개, `H` UI 숨기기/보이기, `R` 녹화 시작/중지(시작하면 UI 자동 숨김, 끝나면 다시 표시), `Enter` 다시 시작

## 릴스용 영상 뽑기

1. 브라우저 창을 세로로 길게 만들고 `?ui=0` 으로 엽니다.
2. `R` 을 누르면 캔버스만 녹화되고, 다시 `R` 을 누르면 `.webm` 파일이 다운로드됩니다.
3. 필요하면 `ffmpeg -i merge-xxx.webm -c:v libx264 -pix_fmt yuv420p out.mp4` 로 변환해서 업로드합니다.
   (아이폰 화면 녹화로 찍어도 됩니다. 캔버스 자체가 9:16 입니다.)

## 디자인 키트

요소 그래픽은 외부 무료 디자인 키트를 씁니다. 한 프리셋은 반드시 한 키트에서만 가져와 스타일을 통일합니다.

- 현재 세 프리셋 모두 **Microsoft Fluent Emoji 3D** (MIT 라이선스) 사용
  - 저장소: https://github.com/microsoft/fluentui-emoji (`assets/<이름>/3D/<파일>_3d.png`)
  - 이미지는 GitHub raw 주소에서 불러오고, 실패하면 jsDelivr CDN 주소로 재시도합니다. 처음 열 때 인터넷이 필요합니다.
- 검토했지만 쓰지 않은 키트: Kenney Planets / Puzzle Pack (CC0, https://github.com/shorepine/kenney 미러). 보석이 96px라 큰 단계에서 흐려져 제외.

프리셋 구성 (모두 9단계):

- planets: 초승달 → 그믐달 → 보름달 → 지구 → 토성 → 태양 → 별 → 빛나는 별 → 블랙홀(검은 구슬)
- gems: 진주 → 에메랄드 → 사파이어 → 자수정 → 루비 → 주황 다이아 → 파랑 다이아 → 젬스톤 → 왕관
- fruits: 체리 → 딸기 → 포도 → 귤 → 사과 → 복숭아 → 파인애플 → 멜론 → 수박

## 단계 요소 바꾸기

`index.html` 상단 `PRESETS` 에서 배열 순서 = 단계 순서입니다. 항목을 추가/삭제/교체하면 됩니다.

```js
{ r:36, img:"Cherries/3D/cherries_3d.png", glow:"#ff5a7a" },   // 키트(kit) 안의 경로
{ r:72, image:"https://.../my.png", glow:"#fff", scale:1.1 },   // 직접 URL
{ r:58, shape:"teardrop", colors:["#ffe08a","#b86a05"], glow:"#ffb02e" }, // 코드로 그리는 도형
```

- 새 키트를 쓰려면 `KITS` 에 기본 URL을 추가하고 프리셋의 `kit` 값을 바꿉니다.
- `r` 은 반지름(px). 단계가 올라갈수록 크게. 낙하 대상 단계는 관 폭(반폭 85px)보다 작아야 합니다.
- `scale` 은 PNG 여백 보정(기본 1.12). 그림이 충돌 원보다 작거나 크게 보이면 조절합니다.
- 화면에 이름 텍스트는 표시하지 않습니다. 하단 진행표는 아이콘만 나옵니다.
- `SETTINGS` 에서 관 안 낙하 속도(`tubeSpeed`)와 요소 간격(`tubeGap`), 처음 몇 단계까지 떨어뜨릴지, 중력, 탄력(`restitution`), 점수/하단 진행표 표시 여부, 테두리 색을 바꿀 수 있습니다.
- 새 프리셋을 추가하면 우측 상단 드롭다운과 `?preset=` 에 자동으로 나타납니다.

## 효과음

외부 파일 없이 Web Audio 로 직접 합성합니다. 프리셋의 `sound` 값으로 테마를 고릅니다.

- `space` : 신비로운 종·패드 소리 (우주)
- `juicy` : 통통하고 촉촉한 플롭 소리 (과일)
- `crystal` : 유리 부딪히는 맑은 핑 (보석)

부딪히는 세기와 단계(크기)에 따라 음량·음높이가 달라지고, 합쳐질 때는 더 큰 소리가 납니다. `SETTINGS.soundVolume` 으로 크기를 조절하고 0이면 무음입니다.
브라우저 정책상 화면을 한 번 탭해야 소리가 켜지며, `R` 녹화에는 소리도 함께 담깁니다. 새 테마를 만들려면 `THEMES` 에 `hit(tier, k)` / `merge(tier)` 함수를 추가하면 됩니다.
