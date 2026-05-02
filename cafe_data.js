// 카공지도 카페 데이터 - Master_v2.0 기반
// 좌표는 네이버/카카오 지도 주소 기반 수동 매핑

const CAFES = [
  {
    id: 1,
    name: "슬랩커먼즈",
    address: "서울 강남구 도곡로8길 8 2층",
    nearStation: "양재역",
    naverLink: "https://map.naver.com/p/entry/place/2085373871",
    rating: 4.9,
    lat: 37.4792, lng: 127.0450,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["예쁨", "감성"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "작업의, 작업에 의한, 작업을 위한 카페! 종일권도 있음!! 설경뷰 미쳤음❄️",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함", "카공러 다수", "조용함"],
        extra: 0,
        text: "작업의, 작업에 의한, 작업을 위한 카페! 종일권도 있음!! 설경뷰 미쳤음❄️",
        likes: 24,
        isOwner: true
      }
    ]
  },
  {
    id: 2,
    name: "이디야커피랩",
    address: "서울 강남구 논현로 636 이디야빌딩",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/12107143",
    rating: 4.9,
    lat: 37.5172, lng: 127.0286,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["특이", "충고 높음"],
      테이블: [],
      메뉴: ["식사 대용 끼니"]
    },
    ownerComment: "넓고 따뜻하고 좌석 다양하고 먹을 것도 다양하고. 데이트로도 작업하러도 갈 수 있는 만능 카페",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함", "카공러 다수", "조용함"],
        extra: 0,
        text: "넓고 따듯하고 좌석 다양하고 먹을 것도 다양하고 아직까진 아쉬운 점을 찾지 못함. 데이트로도 작업하러도 갈 수 있는 만능 카페",
        likes: 31,
        isOwner: true
      }
    ]
  },
  {
    id: 3,
    name: "안다즈 서울 강남 아츠",
    address: "서울 강남구 논현로 854 안다즈 서울 강남 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1520477340",
    rating: 4.3,
    lat: 37.5219, lng: 127.0411,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 적지만",
      소음: "조용함",
      공간: ["감성", "특이"],
      테이블: [],
      메뉴: ["식사 대용 끼니"]
    },
    ownerComment: "왁자지껄하지 않고 나도 꼭 취뽀해서 flex하고 싶다는 자극을 주는 분위기. 가격대가 있으니 참고!",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 적지만","조용함"],
        extra: 0,
        text: "왁자지껄하지 않고 나도 꼭 취뽀해서 flex하고 싶다는 자극을 주는 분위기. 취준생 입장에서 사알짝 가격대가 있으니 참고하시길! (사준 언니 고마워🫶❤️)",
        likes: 18,
        isOwner: true
      }
    ]
  },
  {
    id: 4,
    name: "포어플랜",
    address: "서울 성동구 왕십리로14길 30-11 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1193971273",
    rating: 4.4,
    lat: 37.5614, lng: 127.0369,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["특이", "충고 높음"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "주변에서 독서, 공부해서 나도 모르게 집중하게 됨. 건축·설계 컨셉 만족도 200%",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","조용함"],
        extra: 0,
        text: "주변에서 독서, 공부해서 나도 모르게 집중하게됨 (하지만 스카 분위기 x). 건축, 설계 컨셉 만족도 200%",
        likes: 22,
        isOwner: true
      }
    ]
  },
  {
    id: 5,
    name: "버라이어티",
    address: "서울 성북구 고려대로8길 69 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1975454543",
    rating: 4.2,
    lat: 37.5872, lng: 127.0285,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["감성"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "아직 이 곳은 크리스마스다. 따뜻함 (겨울에 매우 중요 요소!)",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수"],
        extra: 0,
        text: "아직 이 곳은 크리스마스다. 따듯함 (겨울에 매우 중요 요소!)",
        likes: 15,
        isOwner: true
      }
    ]
  },
  {
    id: 6,
    name: "레망도레 광화문점",
    address: "서울 중구 무교로 17 1층, 2층, 3층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/2023348447",
    rating: 4.23,
    lat: 37.5700, lng: 126.9765,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["예쁨"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "가구랑 디저트 두 개면 갈 이유는 충분하다 생각. 따뜻함 (겨울에 매우 중요 요소!)",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수"],
        extra: 0,
        text: "가구랑 디저트 두 개면 갈 이유는 충분하다 생각. 따듯함 (겨울에 매우 중요 요소라 생각)",
        likes: 19,
        isOwner: true
      }
    ]
  },
  {
    id: 7,
    name: "카페 오비스포",
    address: "서울 성북구 안암로3길 41 윤호빌딩 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1632955574",
    rating: 4.3,
    lat: 37.5858, lng: 127.0318,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["감성", "아늑"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "바로 앞이 성북천이다. 사장님께서 아기자기 엽서들로 너무 잘 꾸며놓으셨다",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "바로 앞이 성북천이다. 사장님께서 아기자기 엽서들로 너무 잘 꾸며놓으셨다",
        likes: 17,
        isOwner: true
      }
    ]
  },
  {
    id: 8,
    name: "브루브루",
    address: "서울 송파구 오금로 174 지하1, 1, 2층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/2080328345",
    rating: 4.4,
    lat: 37.5019, lng: 127.1227,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["감성", "예쁨"],
      테이블: [],
      메뉴: ["식사 대용 끼니"]
    },
    ownerComment: "24시간!!!!!!! 소파가 정말 많다… (그만큼 사람도 많음..)",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "24시간!!!!!!!!!! 소파가 정말 많다…(그만큼 사람도 많음..)",
        likes: 28,
        isOwner: true
      }
    ]
  },
  {
    id: 9,
    name: "테라로사 포스코센터점",
    address: "서울 강남구 테헤란로 440 포스코센터 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1542149931",
    rating: 4.4,
    lat: 37.5093, lng: 127.0632,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["예쁨", "특이", "충고 높음", "통창"],
      테이블: [],
      메뉴: ["맛있는 음료", "식사 대용 끼니"]
    },
    ownerComment: "도심 속에서 초록빛 녹음이 그리울 때 추천. 높은 층고에 수많은 도서들",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","충고 높음"],
        extra: 0,
        text: "도심 속에서 초록빛 녹음이 그리울 때 추천. 높은 층고에 수많은 도서들",
        likes: 25,
        isOwner: true
      }
    ]
  },
  {
    id: 10,
    name: "카페 타셴",
    address: "서울 서초구 효령로 317 건축사협회 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1242999609",
    rating: 4.4,
    lat: 37.4896, lng: 127.0106,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["예쁨", "통창"],
      테이블: [],
      메뉴: ["맛있는 디저트", "식사 대용 끼니"]
    },
    ownerComment: "다양한 건축책 열람 가능. 상하목장 아이스크림 및 수제 샌드위치",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "다양한 건축책 열람 가능. 상하목장 아이스크림 및 수제 샌드위치",
        likes: 21,
        isOwner: true
      }
    ]
  },
  {
    id: 11,
    name: "텅",
    address: "서울 종로구 율곡로 82 701호",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1224384502",
    rating: 4.4,
    lat: 37.5797, lng: 126.9914,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 위주",
      공간: ["뷰 맛집", "통창"],
      테이블: [],
      메뉴: ["맛있는 디저트"]
    },
    ownerComment: "뷰에 모든 가중치를 건다면 꼭 와야하는 곳. 옆 가게에서는 주류도 팝니다.",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","뷰 맛집"],
        extra: 0,
        text: "뷰에 모든 가중치를 건다면 꼭 와야하는 곳. 옆 가게에서는 주류도 팝니다.",
        likes: 20,
        isOwner: true
      }
    ]
  },
  {
    id: 12,
    name: "별마당 도서관",
    address: "서울 강남구 영동대로 513 스타필드 코엑스몰 B1",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/214665616",
    rating: 4.35,
    lat: 37.5128, lng: 127.0592,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 위주",
      공간: ["예쁨"],
      테이블: [],
      메뉴: ["식사 대용 끼니"]
    },
    ownerComment: "말해뭐해 유명 핫플. 긴 시간보다는 잠깐 작업하기 좋음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수"],
        extra: 0,
        text: "말해뭐해 유명 핫플. 긴 시간보다는 잠깐 작업하기 좋음",
        likes: 35,
        isOwner: true
      }
    ]
  },
  {
    id: 13,
    name: "카페 공명 신사 가로수길점",
    address: "서울 강남구 도산대로15길 32-4 지하1층~3층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1020170491",
    rating: 4.3,
    lat: 37.5202, lng: 127.0226,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["예쁨", "특이"],
      테이블: [],
      메뉴: ["맛있는 디저트"]
    },
    ownerComment: "말차라떼랑 케이크 맛있음. CD 플레이어 있음. 다락방 느낌의 공간 많음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","조용함"],
        extra: 0,
        text: "말차라떼랑 케이크 맛있음. CD 플레이어 있음. 다락방 느낌의 공간 많음",
        likes: 16,
        isOwner: true
      }
    ]
  },
  {
    id: 14,
    name: "콘하스 연남점",
    address: "서울 마포구 연희로 1-1 1,2층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/97642371",
    rating: 4.25,
    lat: 37.5636, lng: 126.9238,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["특이"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "작업용 책상과 의자. 감성 있는 인테리어",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","조용함"],
        extra: 0,
        text: "작업용 책상과 의자. 감성 있는 인테리어. 2층은 그냥 유사 사무실이다",
        likes: 14,
        isOwner: true
      }
    ]
  },
  {
    id: 15,
    name: "현대카드 디자인 라이브러리",
    address: "서울 종로구 북촌로 31-18",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/31676193",
    rating: 4.3,
    lat: 37.5821, lng: 126.9836,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["감성", "특이"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "진짜 건물 자체가 미학적으로 예쁨. 희귀한 잡지/사진책 많음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "진짜 건물 자체가 미학적으로 예쁨. 희귀한 잡지/사진책 많음. 노트북이나 태블릿으로 간단한 작업이 더 어울림",
        likes: 20,
        isOwner: true
      }
    ]
  },
  {
    id: 16,
    name: "셀렉티드닉스",
    address: "서울 강남구 테헤란로4길 37 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1776798877",
    rating: 4.3,
    lat: 37.4990, lng: 127.0285,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["특이"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "미술관+루프탑. 티라미수 맛있음 (오리지널이 피스타치오보다 맛있었음)",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","특이"],
        extra: 0,
        text: "미술관+루프탑. 티라미수 맛있음(오리지널이 피스타치오보다 맛있었음). 8층은 진짜 스터디카페마냥 조용합니다",
        likes: 18,
        isOwner: true
      }
    ]
  },
  {
    id: 17,
    name: "국회도서관",
    address: "서울 영등포구 의사당대로 1 국회도서관",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/11591187",
    rating: 4.3,
    lat: 37.5326, lng: 126.9145,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["특이", "충고 높음", "통창"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "한강뷰, 숲뷰로 공부할 수 있어서 좋음. 2층 열람실 1인용 책상이 정말 커서 편함",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "한강뷰, 숲뷰로 공부할 수 있어서 좋음. 2층 열람실 1인용 책상이 정말 커서 편함",
        likes: 22,
        isOwner: true
      }
    ]
  },
  {
    id: 18,
    name: "맥심플랜트",
    address: "서울 용산구 이태원로 250",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1057800745",
    rating: 4.4,
    lat: 37.5349, lng: 126.9944,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["예쁨", "특이", "감성", "충고 높음", "통창"],
      테이블: [],
      메뉴: ["맛있는 음료", "식사 대용 끼니"]
    },
    ownerComment: "카공하는 사람 많아서 눈치 안 보임. 지하2층~지상3층. 데코가 계속 바뀌는데 보는 맛 있음. 커피 맛있음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","충고 높음"],
        extra: 0,
        text: "카공하는 사람 많아서 눈치 안보임. 지하2층부터 지상3층까지 넓음. 데코가 계속 바뀌는데 보는 맛이 있음. 커피 맛있음",
        likes: 30,
        isOwner: true
      }
    ]
  },
  {
    id: 19,
    name: "크레마노 경복궁점",
    address: "서울 종로구 자하문로10길 30 대우재단빌딩 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1958425249",
    rating: 4.3,
    lat: 37.5793, lng: 126.9700,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["감성", "충고 높음", "통창"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "카공하는 사람 많아서 눈치 안 보임. 넓은데 또 아늑함. 통창으로 햇살이 따갑지 않은 선에서 들어옴",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "카공하는 사람 많아서 눈치 안보임. 넓은데 또 아늑함. 통창으로 햇살이 따갑지 않은 선에서 들어옴. 접시 예뻐서 보는 맛 있음",
        likes: 23,
        isOwner: true
      }
    ]
  },
  {
    id: 20,
    name: "알베르",
    address: "서울 강남구 강남대로102길 34",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/34016603",
    rating: 4.0,
    lat: 37.5044, lng: 127.0252,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["예쁨", "감성", "특이", "충고 높음", "통창"],
      테이블: [],
      메뉴: ["맛있는 디저트"]
    },
    ownerComment: "이런 통창 채광 맛집 귀하다. 디저트 맛있음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","통창"],
        extra: 0,
        text: "이런 통창 채광 맛집 귀하다 ☀️. 디저트 맛있음 🍰. 봄 여름엔 살짝 시끄러울 수 있음",
        likes: 19,
        isOwner: true
      }
    ]
  },
  {
    id: 21,
    name: "파머스카페",
    address: "서울 성동구 왕십리로6길 11 1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/37471718",
    rating: 4.0,
    lat: 37.5610, lng: 127.0318,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["아늑"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "진짜 카공하는 사람 많아서 눈치 안 보임. 고양이가 있다고 함!",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","아늑"],
        extra: 0,
        text: "진짜 카공하는 사람 많아서 눈치 안보임. 🐱내가 간 날은 못 봤지만 고양이가 있다고 함!",
        likes: 16,
        isOwner: true
      }
    ]
  },
  {
    id: 22,
    name: "WM Cafe",
    address: "서울 성동구 뚝섬로1길 14 1F",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1351314899",
    rating: 4.0,
    lat: 37.5449, lng: 127.0437,
    tags: {
      콘센트: "거의 없음",
      분위기: "카공러 적지만",
      소음: "조용함",
      공간: ["예쁨", "감성", "특이", "충고 높음"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "원단 회사에서 운영하는 카페. 건축의 ㄱ 자도 모르지만 디자인 잘 했다는 걸 알 수 있는 공간",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["거의 없음","조용함","특이"],
        extra: 0,
        text: "원단 회사에서 운영하는 카페. 2층에는 옷들을 본격적으로 볼 수 있음. 건축의 ㄱ 자도 모르지만 디자인 잘 했다는 걸 알 수 있는 공간",
        likes: 14,
        isOwner: true
      }
    ]
  },
  {
    id: 23,
    name: "본지르르 연희",
    address: "서울 서대문구 연희로 189-16 단독주택",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1161125870",
    rating: 4.0,
    lat: 37.5693, lng: 126.9300,
    tags: {
      콘센트: "살짝 부족",
      분위기: "카공러 적지만",
      소음: "조용함",
      공간: ["예쁨", "감성", "특이", "아늑"],
      테이블: [],
      메뉴: ["맛있는 디저트"]
    },
    ownerComment: "스피커 좋음. 주택 개조라 아늑함",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","조용함","아늑"],
        extra: 0,
        text: "스피커 좋음. 주택개조라 아늑함. 대화 나눌 수 있는데 시끌벅적 x",
        likes: 13,
        isOwner: true
      }
    ]
  },
  {
    id: 24,
    name: "에어드랍 커피 성수",
    address: "서울 성동구 연무장7길 13 지하1층",
    nearStation: "",
    naverLink: "https://map.naver.com/p/entry/place/1553249208",
    rating: 4.5,
    lat: 37.5440, lng: 127.0562,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["감성", "특이", "충고 높음"],
      테이블: [],
      메뉴: []
    },
    ownerComment: "소파나 작업용 자리는 30분에 1,000원. 소파도 넉넉히 있어서 쉬기 좋고 자리세 내고 충분히 갈만한 곳!",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "소파나 작업용 자리는 30분에 1,000원. 소파도 넉넉히 있어서 쉬기 좋고 사람이 너무 많지 않으며 자리세 내고 충분히 갈만한 곳입니다.",
        likes: 27,
        isOwner: true
      }
    ]
  },
  {
    id: 25,
    name: "november lounge KG타워점",
    address: "서울 강남구 테헤란로5길 7 1층",
    nearStation: "",
    naverLink: "",
    rating: 0,
    lat: 37.4984, lng: 127.0277,
    tags: {
      콘센트: "넉넉함",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: [],
      테이블: [],
      메뉴: ["식사 대용 끼니"]
    },
    ownerComment: "강남역 24시간 카페. 데이트할 때 와도 좋을 것 같은 분위기. 어느 자리에 앉아도 콘센트 하나는 쓸 수 있음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","식사 대용 끼니"],
        extra: 0,
        text: "강남역 24시간 밤샘 공부의 성지! 데이트할 때 와도 좋을 것 같은 분위기. 어느 자리에 앉아도 콘센트 하나는 쓸 수 있게 하려고 사장님께서 고민하신 흔적. 총합 12번은 간 곳.",
        likes: 33,
        isOwner: true
      }
    ]
  },
  {
    id: 26,
    name: "카공족 이대점",
    address: "서울 서대문구 이화여대길 26 3층",
    nearStation: "이대역",
    naverLink: "https://map.naver.com/p/entry/place/2019925754",
    rating: 4.7,
    lat: 37.5596, lng: 126.9457,
    tags: {
      콘센트: "거의 전좌석",
      분위기: "카공러 다수",
      소음: "조용함",
      공간: ["아늑"],
      테이블: ["네모"],
      메뉴: []
    },
    ownerComment: "24시간 5,900원. 외부 음식 가능. 2시간 자리 비우기 가능. 전국에 지점 많음",
    reviews: []
  },
  {
    id: 27,
    name: "산노루 삼성점",
    address: "서울 강남구 삼성로122길 35 프레인빌라 1층",
    nearStation: "청담역",
    naverLink: "https://map.naver.com/p/entry/place/1903421730",
    rating: 4.9,
    lat: 37.5184, lng: 127.0546,
    tags: {
      콘센트: "거의 전좌석",
      분위기: "카공러 다수",
      소음: "대화 반 작업 반",
      공간: ["감성", "특이"],
      테이블: ["네모"],
      메뉴: ["맛있는 음료"]
    },
    ownerComment: "사장님 본업이 무엇인지 궁금한 미적 감각이 담긴 공간. 작업하는 사람들을 위한 세심한 배려",
    reviews: []
  }
];

// 태그 정규화 (필터용)
const FILTER_CATEGORIES = {
  콘센트: ["거의 전좌석", "넉넉함", "살짝 부족", "거의 없음"],
  분위기: ["카공러 다수", "카공러 적지만"],
  소음: ["조용함", "대화 반 작업 반", "대화 위주"],
  공간: ["감성", "특이", "예쁨", "아늑", "충고 높음", "통창", "뷰 맛집"],
  테이블: ["테이블 넓음", "네모", "동그라미"],
  메뉴: ["식사 대용 끼니", "맛있는 음료", "맛있는 디저트"]
};
