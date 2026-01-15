# Talk Gardening - 카카오톡 관계 큐레이션 서비스

카카오톡 대화 데이터를 기반으로 인간관계를 분석하고 시각화하는 프로토타입 앱입니다. OpenAI API를 활용하여 친밀도를 분석하고, 관계를 정원에 비유하여 시각적으로 표현합니다.

## 주요 기능

### 1. 스플래시 화면
- Talk Gardening 로고 표시 (1초 후 자동 전환)

### 2. 메인 페이지
- 사용자 인사 메시지와 마스코트 캐릭터 표시
- "시작하기" 버튼 클릭 시 분석 시작

### 3. 로딩 화면
- OpenAI API 호출 중 로딩 애니메이션 표시
- 돋보기 든 태양이 마스코트와 진행 상태 텍스트

### 4. Recap 슬라이드 (Chapter 1)

| 슬라이드 | 제목 | 설명 |
|---------|------|------|
| **슬라이드 1** | 씨앗 (새 인연) | 2025년에 새로 추가된 친구 7명 표시 (friends.json 기반) |
| **슬라이드 2** | 연락 순위 | frequency_score 기준 상위 5명 (1-3위 카드, 4-5위 리스트) |
| **슬라이드 3** | 대화 키워드 | OpenAI가 분석한 자주 사용하는 표현 10개 |

### 5. 가지치기 (Chapter 2)

| 화면 | 제목 | 설명 |
|-----|------|------|
| **Chapter 2-1** | 소홀해진 관계 | score가 낮은 3명 카드 형태로 표시 |
| **Chapter 2-2** | 가지치기 | 정리할 관계 5명 표시, 가위 클릭 시 회색 처리 애니메이션 |

### 6. 카테고리 정원 (마지막 화면)
- **나무 (가족)**: 가족 카테고리
- **열매 (친구)**: 친구/동창/직장 카테고리  
- **꽃 (비즈니스 관계)**: 비즈니스/거래처/자기계발/취미 카테고리
- **뿌리 (지인)**: 생활/서비스/기타 카테고리
- 공유하기 / 나가기 버튼

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **스타일링**: Tailwind CSS v4
- **폰트**: KakaoBigSans (Regular, Bold, ExtraBold)
- **AI**: Vercel AI SDK + OpenAI API (gpt-4o-mini)
- **언어**: TypeScript

## 프로젝트 구조

```
├── app/
│   ├── page.tsx                    # 메인 페이지 (슬라이드 컨트롤러)
│   ├── layout.tsx                  # 레이아웃 설정 (KakaoBigSans 폰트)
│   ├── globals.css                 # 전역 스타일 및 애니메이션
│   └── api/
│       └── analyze-relationships/
│           └── route.ts            # OpenAI API 라우트
├── components/
│   ├── splash-screen.tsx           # 스플래시 화면
│   ├── main-page.tsx               # 시작 화면 컴포넌트
│   ├── loading-screen.tsx          # 로딩 화면
│   └── recap/
│       ├── slide-1.tsx             # 씨앗 슬라이드 (새 인연)
│       ├── slide-2.tsx             # 연락 순위 슬라이드
│       ├── slide-3.tsx             # 대화 키워드 슬라이드
│       ├── chapter2-contact.tsx    # 소홀해진 관계 화면
│       ├── chapter2-prune.tsx      # 가지치기 화면
│       └── category-garden.tsx     # 카테고리 정원 화면
├── data/
│   ├── me.json                     # 사용자 프로필 정보
│   ├── friends.json                # 친구 목록 (friendshipDate 포함)
│   ├── messages.json               # 대화 내용
│   └── intimacy_scores.json        # 관계 분석 데이터
└── public/
    ├── fonts/                      # KakaoBigSans 폰트 파일
    └── images/                     # 마스코트 및 카테고리 이미지
```

## 데이터 구조

### intimacy_scores.json

```json
{
  "results": [
    {
      "name": "이름",
      "relationship_category": "가족/친구/직장 등",
      "weighted_metrics": {
        "recency_score": 100,
        "frequency_score": 60,
        "responsiveness": "VERY_HIGH",
        "gift_score": 80,
        "context_score": 95,
        "interaction_trend": "STABLE"
      },
      "raw_stats_summary": {
        "last_contact_days_ago": 0,
        "messages_this_week": 8,
        "total_message_count": 8,
        "total_gift_expenditure": 100000,
        "missed_calls": 0
      },
      "final_intimacy_score": 85.8
    }
  ]
}
```

### friends.json

```json
{
  "friends": [
    {
      "id": "friend_001",
      "name": "이름 (설명)",
      "profileImage": "이미지URL",
      "friendshipDate": "2025-01-05"
    }
  ]
}
```

### me.json

```json
{
  "name": "김광일",
  "profileImage": "이미지URL"
}
```

## 환경 변수

```
OPENAI_API_KEY=your_openai_api_key
```

## 화면 흐름

```
스플래시 (1초)
    ↓
메인 페이지 (시작하기 버튼)
    ↓
로딩 화면 (API 호출)
    ↓
슬라이드 1: 씨앗 (새 인연)
    ↓
슬라이드 2: 연락 순위 TOP 5
    ↓
슬라이드 3: 대화 키워드
    ↓
Chapter 2-1: 소홀해진 관계
    ↓
Chapter 2-2: 가지치기
    ↓
카테고리 정원 (공유/나가기)
```

## 마스코트 캐릭터

| 화면 | 마스코트 |
|-----|---------|
| 메인 페이지 | 열쇠 든 태양이 |
| 로딩 화면 | 돋보기 든 태양이 |
| 슬라이드 1 | 물주는 태양이 |
| 슬라이드 2 | 신난 태양이 |
| 슬라이드 3 | 이너피스 태양이 |
| Chapter 2-1 | 열쇠 든 태양이 |
| Chapter 2-2 | 꽃 든 태양이 |
| 카테고리 정원 | 정원사 태양이 |

## 실행 방법

1. 환경 변수 설정 (OPENAI_API_KEY)
2. 앱 실행
3. 스플래시 후 메인 화면에서 "시작하기" 클릭
4. 화면 탭으로 슬라이드 이동
5. 마지막 화면에서 공유 또는 나가기
