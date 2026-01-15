# Talk Gardening - 관계 리포트 프로토타입

카카오톡 대화 데이터를 기반으로 인간관계를 분석하고 시각화하는 프로토타입 앱입니다.

## 주요 기능

### 1. 메인 페이지
- "TALK GARDENING" 브랜딩과 마스코트 캐릭터 표시
- 시작 버튼을 통해 관계 리포트 시작

### 2. Recap 슬라이드
- **슬라이드 1 (씨앗)**: 올해 새로 추가된 인연 표시 - 공채 동기, 동료, 학번 친구 등
- **슬라이드 2 (뿌리)**: 가장 많이 연락한 TOP 3 순위 표시
- **슬라이드 3 (대화 키워드)**: 자주 나눈 대화 키워드를 말풍선 형태로 표시

### 3. AI 관계 분석
- OpenAI API를 활용하여 관계 데이터 분석
- `weighted_metrics`와 `raw_stats_summary` 데이터를 기반으로 친밀도 점수 계산
- 친한 관계 TOP 5와 소홀해진 관계 5명 도출

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **스타일링**: Tailwind CSS v4
- **AI**: Vercel AI SDK + OpenAI API (gpt-4o-mini)
- **언어**: TypeScript

## 프로젝트 구조

```
├── app/
│   ├── page.tsx                    # 메인 페이지 (슬라이드 컨트롤러)
│   ├── layout.tsx                  # 레이아웃 설정
│   ├── globals.css                 # 전역 스타일
│   └── api/
│       └── analyze-relationships/
│           └── route.ts            # OpenAI API 라우트
├── components/
│   ├── main-page.tsx               # 시작 화면 컴포넌트
│   └── recap/
│       ├── slide-1.tsx             # 씨앗 슬라이드
│       ├── slide-2.tsx             # 뿌리 슬라이드
│       ├── slide-3.tsx             # 대화 키워드 슬라이드
│       └── analysis-result.tsx     # AI 분석 결과 컴포넌트
├── data/
│   └── intimacy_scores.json        # 관계 데이터 (샘플)
└── public/
    └── images/                     # 마스코트 이미지
```

## 데이터 구조

### intimacy_scores.json

```json
{
  "results": [
    {
      "name": "이름",
      "category": "가족/친구/직장 등",
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
      }
    }
  ]
}
```

## 환경 변수

```
OPENAI_API_KEY=your_openai_api_key
```

## 실행 방법

1. 환경 변수 설정
2. 앱 실행 후 "시작하기" 버튼 클릭
3. 화면 탭으로 슬라이드 이동
4. 마지막 슬라이드 후 AI 분석 결과 확인

## 마스코트 캐릭터

- 열쇠 든 태양이: 메인 페이지
- 물주는 태양이: 새 인연 슬라이드
- 신난 태양이: 연락 순위 슬라이드
- 통계분석 태양이: 분석 결과 페이지
# 32_chunsik_five_siblings-m0
