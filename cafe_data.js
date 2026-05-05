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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/1.PNG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/8.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/9.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/10.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/11.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/1/12.JPG"
    ],
    ownerComment: "작업의, 작업에 의한, 작업을 위한 카페! 종일권도 있음!! 설경뷰 미쳤음❄️",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함", "카공러 다수", "조용함"],
        extra: 0,
        text: "여긴 제발 가줘…아니 가지마… 새로 오픈한 작업하기 좋은 신상 카페인데 사람 많아지면 안됨…!! 작업에 적합한 카페 참 많이 찾아다녔지만 손에 꼽을 정도로 마음에 드는 곳이다!!!!!\n일단 직원 분들이 카페 한구석에서 각 잡고 듀얼 모니터로 일하고 계셔서 딱 작업 분위기이고, 음악도 작업할 때 듣는 잔잔한 플리다.. 좌석도 편하고 자리마다 1~3개의 콘센트가 준비되어있다.\n특히 지금 와야하는 이유는, 바로 앞이 산이라 설경뷰가 정말 맛도리다.. 더 잘 표현하고 싶은데 이렇게밖에 표현 못하는 나의 어휘력에 안타까움을 표하며…",
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
      공간: ["특이", "층고 높음"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/8.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/9.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/10.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/2/11.JPG"
    ],
    ownerComment: "데이트로도 작업하러도 갈 수 있는 만능 카페",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함", "카공러 다수", "조용함"],
        extra: 0,
        text: "올해 시작하고 가장 많은 외제차를 본 곳. 카페 입구에서 포르쉐들 보고 감탄하면서 들어가면 직원분이 친절하게 문을 열어주신다. 작업하기에는 2층이 좋다. 이미 많은 사람들이 자리를 잡고 노트북을 펼치고 있다. 특히 1인용 소파 자리가 킥이다. 쿠션, 짐 놓는 자리, 테이블, 콘센트까지 카공하기 편한 자리는 무엇일까 고민한 흔적이 보이는 자리다. 서울 언주역 근처 대형카페, 여기가 프랜차이즈라면 믿겠는가?",
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
      분위기: "카공러 적지만 추천하고 싶음",
      소음: "조용함",
      공간: ["감성", "특이"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/3/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/3/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/3/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/3/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/3/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/3/6.JPG"
    ],
    ownerComment: "왁자지껄하지 않고 나도 꼭 취뽀해서 flex하고 싶다는 자극을 주는 분위기",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 적지만 추천하고 싶음","조용함"],
        extra: 0,
        text: "직장인 언니 손에 이끌려 가게 된 카페. 호텔 1층 카페는 카공할 분위기 아닌거 아니야?라는 생각이 들었지만, 생각보다 많은 분들이 노트북으로 업무를 보고 계셨다. 특히 콘센트가 있는 2인 소파석이 킥이다. 집에서 편하게 노트북으로 문서 작업 하고 싶지만 자꾸 누워서 자게 되는 나 같은 사람들이 좋아할 곳!",
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
      공간: ["특이", "층고 높음"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/4/8.JPG"
    ],
    ownerComment: "건축, 설계 컨셉 만족도 200%",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","조용함"],
        extra: 0,
        text: "작업하기 좋은 카페의 표본. 작업하기 좋은 카페의 정수. 감성 카페에 콘센트 몇 개 가져다 둔 것이 아니라, 처음부터 건축 설계 컨셉의 카페를 만들어서 각자 자신의 할일을 하는 사람들을 통해 카페 분위기가 완성된다. 한 명 한 명 모두에게 보장되는 넓은 좌석과 탁 트인 높은 천장. 건축의 ㄱ도 모르지만 누군가의 작업실에 놀러가 함께 작업을 하고 있는 느낌이다. 오후에 비치는 햇살까지 완벽했다.",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/5/8.JPG"
    ],
    ownerComment: "따스하고 아늑한 동네 카페를 찾는다면",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수"],
        extra: 0,
        text: "한겨울 아늑하고 따듯한 카페에서\n작업하고 싶은 사람이 있다면\n여기가 바로 너가 찾던 완벽한 장소야\n(내 친구 두 명이나 나한테 이 카페 추천해줌)",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/6/8.JPG"
    ],
    ownerComment: "감각적인 가구랑 디저트 두 개면 갈 이유는 충분하다 생각",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수"],
        extra: 0,
        text: "가구 알못이지만 여기는 왠지 달랐다. 화려한 테이블 의자는 아닌데 개성있으면서 정갈한 느낌..? 서래마을에서부터 구움과자가 유명했다고 해 여러 개 먹어보고 싶었으나 마들렌밖에 남지 않아 아쉬웠다. 마들렌은 맛있었다! 보통 구움과자 맛있는 곳은 밀크티도 맛있어서 (아직 충분한 데이터가 모이지 않았지만 경험상 그럼) 같이 마셨는데 추천한다. 2층은 카공존이고, 3층은 프리츠한센과 콜라보한 라운지라고 한다 (가구 잘 모르는데 유명한 것 같음 예뻤음) 재방문 의사 있음!!",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/7/7.JPG"
    ],
    ownerComment: "성북천의 한가로움을 느끼면서 작업하고 싶다면",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "사실 조용한 느좋 카페는 보문동에 모여있다. 산책 같은 카페다. 언제든지 마음만 먹으면 근사한 산책을 할 수 있을 것 같지만, 사실 정말 좋았다!라고 기억에 남는 산책은 일 년에 몇 없는 것처럼. 반에 한 명 즈음 있을 것 같은데 절대 없는 그런 첫사랑 재질의 카페다. 주말이 오면 이 곳의 우드톤과 화분에 둘러싸여 밀린 블로그와 자소서를 써보자. 바로 밖은 성북천이다. 여기 디저트도 맛있다. 친구랑 하나 시키고 맛있어서 하나 더 시켰다. 추워지기 전에 어서 가자.",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/8/7.JPG"
    ],
    ownerComment: "24시간!!!!!!!",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "오픈한지 얼마 안됐는데 너무 소문이 빨리 퍼져서 겨우 한 자리 앉고 사진도 자정 넘어서 찍었다. 심지어, 24시간이다. 나는 추석기간에 들렸는데 수능 전 스퍼트를 내는 고등학생분들이 많아 나도 옛날 그 열심이 생각나서 열심히 할 일을 끝낼 수 있었던 곳. 조용한 노뱀버 라운지를 원하신다면 여길 추천한다. 1-2층은 또 아예 다른 분위기다. 사진은 메인인 지하 1층 위주인데 2층에서 좋았던 점은 댓글에",
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
      공간: ["예쁨", "특이", "층고 높음", "통창"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 음료", "식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/9/7.JPG"
    ],
    ownerComment: "도심 속에서 초록빛 녹음이 그리울 때 추천.",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","층고 높음"],
        extra: 0,
        text: "새내기 때 갔을 때보다 더 카공적합화 되었다. 내 기억으로는 콘센트가 부족해서 팀원들과 회의를 하면서 죽어가는 노트북이 신경쓰였는데, 지금은 마음 편안하게 충전하면서 작업했다. 커피는 맛 없는거 아니냐고? 대한민국 스페셜티 커피에서 여기 언급 없으면 섭하다.\n스쳐지나갈 늦여름 가을초를 잡으러 가자",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 디저트", "식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/10/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/10/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/10/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/10/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/10/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/10/6.JPG"
    ],
    ownerComment: "미대생 언니 손에 이끌려 가게된 곳",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "역시 기업체에서 사이드로 하는 카페는 늘 실패하지 않는다. 특히 그게 3대 아트북 출판사라면? 건축책을 마음껏 열람하고 구매도 할 수 있는 곳이다. 책보는 사람도 과제하는 사람도 작업하는 사람도 조용한 분위기가 너무 마음에 들었다. 다들 상하목장 아이스크림이 맛있다는데 나는 샌드위치 먹었다. 합격이었다. 다양한 건축책 열람 가능하고, 상하목장 아이스크림 및 수제 샌드위치가 있다.",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 디저트"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/11/8.JPG"
    ],
    ownerComment: "뷰에 모든 가중치를 건다면 꼭 와야하는 곳",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","뷰 맛집"],
        extra: 0,
        text: "야경보면서 카공 어떤데..✨ 이곳의 낮과 밤을 모두 사랑하지만, 특히 야경이 너무 예쁜 곳이다. 낮에는 궁궐을, 밤에는 불빛을 볼 수 있는 곳. 이미 너무 유명해서 더 유명해지면 내가 앉을 자리가 없지만, 역설적으로 참 많이 애정해서 꼭 소개하고 싶었다. 석사 준비를 하는 와중에 한국에 방문한 친구도 데려갔었다. 그만큼 자신있게 소개할 수 있기에 침묵할 수 없었다. 카공도 데이트가 되어버리는 이곳. 사랑하지 않을 수 없다.",
        likes: 20,
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 디저트"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/8.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/9.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/10.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/13/11.JPG"
    ],
    ownerComment: "다락방 느낌의 공간에 CD 플레이어까지",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","조용함"],
        extra: 0,
        text: "이건 첫번째 레슨 : 1년에 크림 3톤 넘게 쓰는 카페가기\n이건 두번째 레슨 : 감성 넘치는 1인석 공부좌석 쓰기\n이건 세번째 레슨 : 각종 CD랑 CD 플레이어 듣기\n가로수길에는 의자보다 낮은 테이블만 있는 줄 알았는데 이렇게 대놓고 책 읽고 공부하라고 판 깔아주는 카페가 있는지 몰랐다. 지하1층 2인석 공부 좌석에서 친구랑 같이 공부하면 마치 다락방에서 공부하는 아늑함을 느낄 수 있다.",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/8.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/14/9.JPG"
    ],
    ownerComment: "작업용 책상과 의자에 감성 있는 인테리어",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","조용함"],
        extra: 0,
        text: "날 잡고 갈 필요까지는 없지만 (반어법 아님)\n저장해두고 친구 보러 홍대 갈 때\n중간에 시간 떠서 여기 혼자 작업하면\n썩 근사한 하루가 되는 느좋 카공 플레이스",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/8.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/9.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/10.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/15/11.JPG"
    ],
    ownerComment: "건물 자체가 미학적으로 예쁜 공간. 희귀한 잡지와 사진책 많음",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "시끄러운 카페에서 집중이 안되지만 칙칙한 열람실은 싫다면 이 게시물 잘 찾아오셨다. 진짜 현대카드 있는데 여기 안 가면 연회비 낭비다. 무료 공간인데 사람도 적고 고요하다. 자료 열람부터 개인 작업까지 각자의 침묵 속에서 자신의 일을 하는 모습이 도심 속 평화로운 쉼터 같기도 하다. 건축 알못이지만 여긴 예쁘게 지었다는 걸 알 수 있다. 일반 카페와 비교할 수 없음. 다음에는 노트북 없이 쉬러 가야겠다.",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/16/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/16/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/16/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/16/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/16/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/16/6.JPG"
    ],
    ownerComment: "미술관+루프탑+티라미수",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","특이"],
        extra: 0,
        text: "층별로 공간의 분위기가 달라진다. 1층은 디저트 카페, 2층은 미술관, 3층은 작업 카페, 8층은 스터디카페, 9층은 루프탑이다. 티라미수도 그냥 티라미수가 아니라 주문하면 직접 토핑을 와르르장창 부어 주신다. 오히려 너무 힙해서 처음에는 왠지 정이 안갔지만 어느새 다시 이곳을 향하는 나의 발걸음을 발견…🫶 강남역에서 카공할 곳이 하나 더 생겼다.",
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
      공간: ["특이", "층고 높음", "통창"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/17/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/17/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/17/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/17/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/17/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/17/6.JPG"
    ],
    ownerComment: "세금 내는데 여기 안 가면 손해 아닐까",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "친구가 공부맛집이라고 해서 찾아갔는데, 여의도에서 작업 할 수 있는 곳 중 가장 큰 통창을 가진 곳이 아닐까 싶다. 요즘 너무 좋은 날씨를 실내에서도 작업하면서 경험할 수 있는 곳. 국회의사당뷰, 여의도 공원뷰, 한강뷰… 다 있다. 이 쯤 되면 다들 어딘지 아실 듯하다. 힌트 : 오늘은 카페가 아니다. 심지어 무료다. 한강뷰, 숲뷰로 공부할 수 있어서 좋고, 특히 2층 열람실 1인용 책상이 정말 커서 편함",
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
      공간: ["예쁨", "특이", "감성", "층고 높음", "통창"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 음료", "식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/18/8.JPG"
    ],
    ownerComment: "작업하기 좋은 분좋카의 고전명작",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","층고 높음"],
        extra: 0,
        text: "행동 반경이 한남동이라면 한 번 즈음 들렸을만한 곳. 지하 2층부터 지상 3층까지 \"이 중에 너가 마음에 들만한 자리 하나는 있겠지\"가 거의 카페계의 SM엔터다. 통창 자리, 햇빛 안 들어오는 자리, 작업 전용 자리, 편하게 수다 떨 수 있는 자리 다 있다. 판매하는 커피는 물론이고 여러 랩 종류도 맛있다. 주말에 가면 사람이 많다고 하니 작업을 하기 위한 방문은 평일을 추천드린다. 근처 맛집 가서 저녁 먹으면 기분 전환하고 싶지만 할 일은 많은 날 둘 다 챙길 수 있는 하루가 된다. 지하2층부터 지상3층까지 넓음",
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
      공간: ["감성", "층고 높음", "통창"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/8.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/9.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/19/10.JPG"
    ],
    ownerComment: "들린다. 안녕하세요 여기서 작업하세요!!!!!\"라고 소리치는 공간의 외침이.",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "테이블 중앙에 있는 콘센트에서부터 \"오늘 카페찾기 성공했다\"라는 생각이 들었다. 가구도, 접시도, 음료도, 채광도, 바깥 풍경도 모든 것이 완벽했던 공간. 복층인데 심지어 따듯하다. 소파좌석도 있다. 토요일 기준 6시에 닫는 것이 유일한 흠. 이 곳이라면 아침형 인간이 되어볼 수 있을 것 같다.",
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
      공간: ["예쁨", "감성", "특이", "층고 높음", "통창"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 디저트"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/20/8.JPG"
    ],
    ownerComment: "☀️이런 통창 채광 맛집 귀하다",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","카공러 다수","통창"],
        extra: 0,
        text: "이미 아는 사람들은 다 아는 강남역 채광 맛집. 주말에 다들 노는데 나 혼자 일하고 공부할 때 억울하지 않은가.. 그런 나의 기분을 말려주는 햇살 잘 들어오는 맛집이다. 남향인지는 모르겠다 밝은건 확실함. 소개팅 때 가도 괜찮고 카공할 때 가도 괜찮고 선배님 만날 때 가도 괜찮고 친구들이랑 가도 괜찮은데 카공하러 가도 괜찮은 마법의 공간이다. 겨울에는 사람 많이 없었는데 날씨 좋아지니 사람이 너무 많아졌다. 평일 방문을 추천..",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/21/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/21/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/21/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/21/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/21/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/21/6.JPG"
    ],
    ownerComment: "스근하게 편한 복장으로 카공하기 좋은 카페. 내가 간 날은 못 봤지만 고양이가 있다고 함!",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","아늑"],
        extra: 0,
        text: "이미 성수에 알 사람들은 다 안다는 이 카페. 네이버에 성수 작업 카페 치면 가장 많이 뜨는 곳. 과거 서울숲 사는 지인 따라 갔다가 이번에 같은 곳인지 모르고 갔다. 과거 소개한 카페들이 멋지고 소위 말하는 \"터지는\" 게시글에 적합한 카페들이라면, 여기는 그냥 추리닝입고 쓱쓱 가기 좋은 곳. 사실 풀메하고 카공하는 경우는 많이 없지 않은가. 그런 아늑하고 편안한 맛에 자주 방문하게 될 것 같은 곳이다. 절대 안 예쁘다는건 아님. 고양이가 있다는데 이 날은 못보고 왔다. 다음에는 꼭 보길 🐱",
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
      분위기: "카공러 적지만 추천하고 싶음",
      소음: "조용함",
      공간: ["예쁨", "감성", "특이", "층고 높음"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/22/7.JPG"
    ],
    ownerComment: "건축의 ㄱ 자도 모르지먼 디자인 잘 했다는 걸 알 수 있는 공간..",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["거의 없음","조용함","특이"],
        extra: 0,
        text: "이 곳은 소개할지 말지 고민이 많이 되었습니다. 제가 기존에 세웠던 카공적합카페 필수조건에 위배되는 곳이기 때문입니다. 그러나 아무리 이상형이 고양이상이더라도 차은우가 오면 넘어가는 것처럼🤣 이 카페를 소개하게 되었습니다. 제가 사진을 그리 잘 찍는 편이 아니라는걸 스친들은 알 것입니다. 근데 이 정도로 나온다는 건… 장소가 다 했다는 말이겠죠? 원단 회사에서 운영하는 카페라  2층에는 옷들을 본격적으로 볼 수 있습니다.",
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
      분위기: "카공러 적지만 추천하고 싶음",
      소음: "조용함",
      공간: ["예쁨", "감성", "특이", "아늑"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["맛있는 디저트"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/23/8.JPG"
    ],
    ownerComment: "스피커+주택개조=아늑함",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["살짝 부족","조용함","아늑"],
        extra: 0,
        text: "오늘부터 나는 주택 개조 카페 마니아가 될 것을 선언합니다. 특히 스피커, 오디오 품질이 좋은 카페를 좋아하는데, 아무리 비싼 스피커를 가져다두어도 소리가 울리면 그 진가를 발휘하지 못해 아쉬운데, 이 곳은 소리가 울리지 않아 잘 듣고 갑니다 (작업하러 간 것 맞음). 어디서 오는지 모르는 아늑한 느낌이 참 마음에 들었다. 방이 여러 개여서 방 안에서 작업을 하는 분들도 많이 계셨다. 단 주말, 공휴일은 사람이 많아 2시간 제한이 있으니 평일 방문을 추천합니다.",
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
      공간: ["감성", "특이", "층고 높음"],
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/24/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/24/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/24/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/24/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/24/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/24/6.JPG"
    ],
    ownerComment: "소파도 넉넉히 있어서 쉬기 좋고\n사람이 너무 많지 않으며\n자리세 내고 충분히 갈만한 곳입니다.",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","조용함"],
        extra: 0,
        text: "스친의 추천으로 감. 결론? 제발 가주세요. 작업을 위해 완벽한 공간입니다. 층고 높은데 하나도 안 추워요. 소파 짱 많음 (작업하러 가는 거 맞음). 스친이를 작업적합카페잘알로 임명함.",
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
      테이블: ["높이 적당", "넓이 적당"],
      메뉴: ["식사 대용 끼니"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/25/1.PNG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/25/2.PNG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/25/3.PNG"
    ],
    ownerComment: "총합 12번은 간 곳.",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["넉넉함","카공러 다수","식사 대용 끼니"],
        extra: 0,
        text: "24시간인 것만으로도 감사한데 데이트할 때 와도 좋을 것 같은 분위기와 어느 자리에 앉아도 콘센트 하나는 쓸 수 있게 하려고 사장님께서 고민하신 흔적이 보이는 공간입니다. 제 추천으로 제 친구 두 명 여기 자주 출몰하기 시작해 자부심을 갖고 있으며, 주인장도 한 때는 한 주에 두 번 갔습니다.",
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
      테이블: ["높이 적당", "넓이 적당", "네모"],
      메뉴: []
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/26/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/26/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/26/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/26/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/26/5.JPG"
    ],
    ownerComment: "24시간 5,900원. 외부 음식 가능. 2시간 자리 비우기 가능.",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["거의 전좌석","카공러 다수","조용함"],
        extra: 0,
        text: "요즘 스레드에서 핫한 카공 공간!! 주로 2호선 라인에 있어서 못 가다가 신촌 갈 일이 있어서 들려봤다. 일단 주변에 공부하는 사람밖에 없기 때문에 발등에 불떨어져서 튀김이 된, 정말 집중이 필요하지만 스터디카페 가면 졸음이 밀려오는 사람들에게 강력 추천한다. 하루종일 있어도 (낮과 밤을 모두 찍은 것에서 나타나지 않는가?!), 개인 음식 챙겨와도, 밖에 저녁 먹고 와도 전혀 상관이 없다는 설명에서 사장님.. 카공 좀 해보셨구나 싶었다. 1인석도 잘 되어있어서 너무 좋음!!",
        likes: 0,
        isOwner: true
      }
    ]
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
      테이블: ["높이 적당", "넓이 적당", "네모"],
      메뉴: ["맛있는 음료"]
    },
    images: [
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/1.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/2.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/3.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/4.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/5.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/6.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/7.JPG",
      "https://ikkunlgnblozuhhrhhqr.supabase.co/storage/v1/object/public/cafe-images/27/8.JPG"
    ],
    ownerComment: "사장님 본업이 무엇인지 궁금한 미적 감각이 담긴 공간",
    reviews: [
      {
        user: "주인장",
        date: "2026.02.03",
        tags: ["거의 전좌석","카공러 다수","대화 반 작업 반"],
        extra: 0,
        text: "감성 있는데 의자나 책상이 웬만한 도서관만큼 편하고, 심지어 음료도 특색 있다. 책상마다 넉넉한 양의 콘센트가 숨어있는건 말할 필요도 없다. 천장이 높은데 소리는 안 울려서 자기 작업 하시는 분도, 대화 나누시는 분도, 그림을 그리시는 분도 있었다. 친구는 옆에서 논문 읽고 나는 피피티 찍었다. 햇살까지 잘 들어와서 주말에 놀진 못했지만 기분이 나쁘진 않았던… \"작업 이왕 하는 거 예쁜 곳에서 하자!\"라는 나의 모토에 딱 맞았던 곳",
        likes: 0,
        isOwner: true
      }
    ]
  }
];

// 태그 정규화 (필터용)
const FILTER_CATEGORIES = {
  콘센트: ["거의 전좌석", "넉넉함", "살짝 부족", "거의 없음"],
  분위기: ["카공러 다수", "카공러 적지만 추천하고 싶음"],
  소음: ["조용함", "대화 반 작업 반", "대화 위주"],
  공간: ["감성", "특이", "예쁨", "아늑", "층고 높음", "통창", "뷰 맛집"],
  테이블: ["높이 적당", "넓이 적당", "네모", "동그라미"],
  메뉴: ["식사 대용 끼니", "맛있는 음료", "맛있는 디저트"]
};
