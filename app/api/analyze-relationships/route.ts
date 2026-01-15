import { generateText } from "ai"
import friendsData from "@/data/friends.json"
import messagesData from "@/data/messages.json"
import intimacyData from "@/data/intimacy_scores.json"

const roomToFriendMap: Record<string, number> = {
  room_1: 101, // 이지혜(아내)
  room_5: 102, // 김민준(아들)
  room_9: 103, // 어머니
  room_21: 104, // 장모님
  room_22: 105, // 김영희(여동생)
  room_23: 106, // 박서방(매제)
  room_25: 110, // 조카 지민이
  room_26: 112, // 사촌동생(민수)
  room_2: 201, // 박상무
  room_10: 203, // 정대리
  room_13: 204, // 한과장
  room_8: 205, // 송유나
  room_40: 206, // 강대표
  room_17: 208, // 박신입
  room_20: 209, // 김경리
  room_32: 218, // IT지원팀 강대리
  room_30: 222, // 김공장장
  room_31: 227, // 비서실 최비서
  room_41: 232, // 박차장
  room_43: 237, // 박사장(인쇄소)
  room_42: 240, // 퀵서비스 김기사
  room_45: 242, // 윤과장
  room_44: 262, // 중국 공장 왕사장
  room_4: 301, // 이진호
  room_101: 302, // 박철호(골프모임)
  room_12: 303, // 최미나
  room_200: 304, // 김사장(동네단골)
  room_102: 306, // 등산모임 총무
  room_207: 307, // 박지민(보험설계사)
  room_206: 308, // 카센터 사장님
  room_52: 311, // 김영수
  room_51: 312, // 장동건
  room_54: 314, // 송지현
  room_50: 316, // 황진상
  room_100: 331, // 김프로(레슨)
  room_103: 332, // 조기축구 회장
  room_104: 333, // 낚시광 이씨
  room_105: 334, // 헬스장 트레이너
  room_106: 335, // 스크린골프 사장
  room_53: 340, // 김철민
  room_60: 345, // 강호동
  room_61: 347, // 조세호
  room_62: 348, // 서장훈
  room_66: 349, // 김희철
  room_63: 351, // 중학교 담임쌤
  room_64: 354, // ROTC 동기회장
  room_65: 357, // 낚시용품 사장
  room_203: 402, // 대리운전
  room_210: 405, // 정수기 코디네이터
  room_204: 406, // 단골 미용실 원장
  room_209: 407, // 현대차 딜러
  room_211: 409, // 택배기사
  room_205: 412, // 반찬가게 이모
  room_202: 413, // 학원 원장님
  room_201: 419, // 층간소음(아랫집)
  room_208: 425, // 정육점 김씨
  room_219: 426, // 인테리어 사장
  room_217: 427, // 보일러 수리
  room_214: 431, // 영어학원
  room_221: 433, // 피아노 선생님
  room_222: 438, // 에어컨 청소
  room_215: 439, // 가사 도우미
  room_218: 441, // 동물병원 원장
  room_212: 442, // 꽃집 아가씨
  room_225: 445, // 안경점
  room_223: 446, // 서점 주인
  room_226: 447, // 편의점 알바
  room_224: 448, // PC방 사장
  room_216: 449, // 당구장 주인
  room_220: 450, // 노래방 사장
  room_300: 601, // 김영호
  room_301: 605, // 강부장
  room_302: 608, // 장교수
  room_305: 612, // 서기자
  room_303: 614, // 권검사
  room_307: 615, // 신판사
  room_306: 616, // 구의원
  room_308: 618, // 예비군 중대장
  room_309: 620, // 헌혈의 집
}

function analyzeMessages() {
  const messages = messagesData.messages as Record<
    string,
    Array<{ id: number; sender: string; text: string; time: string; type: string }>
  >
  const friends = friendsData.friends

  const analysisResults = []

  for (const [roomId, roomMessages] of Object.entries(messages)) {
    const friendId = roomToFriendMap[roomId]
    const friend = friends.find((f) => f.id === friendId)

    if (!friend || !roomMessages || roomMessages.length === 0) continue

    const totalMessages = roomMessages.length
    const myMessages = roomMessages.filter((m) => m.sender === "me").length
    const theirMessages = totalMessages - myMessages

    // 시간 파싱해서 최근성 점수 계산
    const lastMessage = roomMessages[roomMessages.length - 1]
    let recencyScore = 50
    let lastContactDaysAgo = 7

    if (lastMessage.time.includes("오전") || lastMessage.time.includes("오후")) {
      recencyScore = 100
      lastContactDaysAgo = 0
    } else if (lastMessage.time === "어제") {
      recencyScore = 90
      lastContactDaysAgo = 1
    } else if (lastMessage.time.includes("일 전")) {
      const days = Number.parseInt(lastMessage.time)
      lastContactDaysAgo = days || 7
      recencyScore = Math.max(0, 100 - days * 10)
    } else if (lastMessage.time.includes("주일 전")) {
      lastContactDaysAgo = 7
      recencyScore = 30
    } else if (lastMessage.time.includes("지난달")) {
      lastContactDaysAgo = 30
      recencyScore = 10
    }

    // 빈도 점수
    const frequencyScore = Math.min(100, totalMessages * 10)

    // 응답성 (상대방 메시지 비율)
    const responsiveness = theirMessages / totalMessages > 0.4 ? "HIGH" : "MEDIUM"

    // 컨텍스트 점수 (카테고리 기반)
    let contextScore = 50
    if (friend.category === "가족") contextScore = 95
    else if (friend.category === "친구") contextScore = 80
    else if (friend.category === "VVIP") contextScore = 85
    else if (friend.category === "팀원") contextScore = 70

    // 최종 친밀도 계산
    const intimacyScore = Math.round(
      recencyScore * 0.25 +
        frequencyScore * 0.2 +
        (responsiveness === "HIGH" ? 80 : 60) * 0.15 +
        50 * 0.15 + // gift score default
        contextScore * 0.25,
    )

    // 트렌드 결정
    let trend = "STABLE"
    if (lastContactDaysAgo > 14) trend = "DECLINING"

    analysisResults.push({
      name: friend.name,
      category: friend.category,
      profileImg: friend.profileImg,
      intimacyScore,
      lastContactDaysAgo,
      totalMessages,
      lastMessage: lastMessage.text,
      trend,
    })
  }

  return analysisResults
}

function getNewConnectionsIn2025() {
  const friends = friendsData.friends as Array<{
    id: number
    name: string
    profileImg: string
    category: string
    friendshipDate?: string
  }>

  return friends
    .filter((f) => f.friendshipDate && f.friendshipDate.startsWith("2025"))
    .sort((a, b) => {
      // 날짜순 정렬 (최근 추가된 순)
      const dateA = new Date(a.friendshipDate || "")
      const dateB = new Date(b.friendshipDate || "")
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 7) // 최대 7명
    .map((f) => ({
      name: f.name,
      category: f.category,
      profileImg: f.profileImg,
      friendshipDate: f.friendshipDate,
    }))
}

function getTopContactsByFrequency() {
  const results = intimacyData.results as Array<{
    target_person: string
    relationship_category: string
    final_intimacy_score: number
    weighted_metrics: {
      frequency_score: number
    }
    raw_stats_summary: {
      total_message_count: number
      messages_this_week: number
    }
  }>

  return results
    .sort((a, b) => b.final_intimacy_score - a.final_intimacy_score)
    .slice(0, 5)
    .map((r) => {
      const friend = friendsData.friends.find((f) => f.name === r.target_person)
      return {
        name: r.target_person,
        category: r.relationship_category,
        profileImg: friend?.profileImg || `https://i.pravatar.cc/150?u=${r.target_person}`,
        frequency_score: Math.round(r.final_intimacy_score),
      }
    })
}

function getCategorizedRelationships() {
  const results = intimacyData.results as Array<{
    target_person: string
    relationship_category: string
    final_intimacy_score: number
  }>

  const categories: {
    가족: Array<{ name: string; category: string; profileImg: string; score: number }>
    "친구/동창": Array<{ name: string; category: string; profileImg: string; score: number }>
    기타: Array<{ name: string; category: string; profileImg: string; score: number }>
    지인: Array<{ name: string; category: string; profileImg: string; score: number }>
  } = {
    가족: [],
    "친구/동창": [],
    기타: [],
    지인: [],
  }

  for (const r of results) {
    const friend = friendsData.friends.find((f) => f.name === r.target_person)
    const person = {
      name: r.target_person,
      category: r.relationship_category,
      profileImg: friend?.profileImg || `https://i.pravatar.cc/150?u=${r.target_person}`,
      score: r.final_intimacy_score,
    }

    if (r.relationship_category === "가족") {
      categories["가족"].push(person)
    } else if (r.relationship_category.includes("친구") || r.relationship_category.includes("동창")) {
      categories["친구/동창"].push(person)
    } else if (
      r.relationship_category.includes("생활") ||
      r.relationship_category.includes("서비스") ||
      r.relationship_category.includes("기타") ||
      r.relationship_category.includes("지인")
    ) {
      categories["지인"].push(person)
    } else {
      categories["기타"].push(person)
    }
  }

  // 각 카테고리 내에서 점수 순으로 정렬
  categories["가족"].sort((a, b) => b.score - a.score)
  categories["친구/동창"].sort((a, b) => b.score - a.score)
  categories["기타"].sort((a, b) => b.score - a.score)
  categories["지인"].sort((a, b) => b.score - a.score)

  return categories
}

export async function POST() {
  const analysisResults = analyzeMessages()
  const newConnectionsIn2025 = getNewConnectionsIn2025()
  const topContactsByFrequency = getTopContactsByFrequency()
  const categorizedRelationships = getCategorizedRelationships()

  // 정렬
  const sorted = [...analysisResults].sort((a, b) => b.intimacyScore - a.intimacyScore)

  const topContactNames = topContactsByFrequency.map((p) => p.name)

  const neglected = analysisResults
    .filter((p) => (p.trend === "DECLINING" || p.lastContactDaysAgo > 7) && !topContactNames.includes(p.name))
    .sort((a, b) => a.intimacyScore - b.intimacyScore)

  const simplifiedData = analysisResults.map((p) => ({
    name: p.name,
    category: p.category,
    totalMessages: p.totalMessages,
    lastContactDaysAgo: p.lastContactDaysAgo,
    trend: p.trend,
  }))

  const messages = messagesData.messages as Record<
    string,
    Array<{ id: number; sender: string; text: string; time: string; type: string }>
  >

  const allMyMessages: string[] = []
  for (const roomMessages of Object.values(messages)) {
    for (const msg of roomMessages) {
      if (msg.sender === "me" && msg.text) {
        allMyMessages.push(msg.text)
      }
    }
  }

  const messageAnalysisPrompt = `
당신은 대화 패턴 분석 전문가입니다. 아래는 한 사용자가 보낸 메시지 목록입니다.

## 보낸 메시지 목록
${allMyMessages.slice(0, 100).join("\n")}

## 요청사항
이 메시지들을 분석하여 사용자가 자주 사용하는 대화 패턴이나 유사한 표현을 10개 추출해주세요.
- 인사말, 안부, 질문, 감정표현, 요청 등 다양한 카테고리에서 추출
- 실제 메시지에서 나온 표현이나 유사한 패턴으로 정리
- type은 "sent"로 고정

## 응답 형식 (JSON만 반환)
{
  "frequent_keywords": [
    {"text": "밥 먹었어?", "type": "sent"},
    {"text": "회식이야 ㅠㅠ", "type": "sent"},
    ...
  ]
}
`

  const prompt = `
당신은 인간관계 분석 전문가입니다. 아래 메시지 데이터를 분석하여 친밀도를 평가해주세요.

## 데이터
${JSON.stringify(simplifiedData, null, 2)}

## 요청사항
1. close_relationships: 가장 친밀한 상위 5명 선정
2. neglected_relationships: 소홀해진 관계 5명 선정 (lastContactDaysAgo가 크거나 trend가 DECLINING인 사람)
3. new_connections: 올해 새로 추가된 인연으로 보이는 3명 (임의로 선정)

## 응답 형식 (JSON만 반환)
{
  "close_relationships": [{"name": "이름", "category": "카테고리", "intimacy_score": 점수, "reason": "이유"}],
  "neglected_relationships": [{"name": "이름", "category": "카테고리", "last_contact_days_ago": 일수, "last_message": "마지막 메시지"}],
  "new_connections": [{"name": "이름", "category": "카테고리"}]
}
`

  try {
    const [relationshipResult, messageResult] = await Promise.all([
      generateText({
        model: "openai/gpt-4o-mini",
        prompt,
        temperature: 0,
      }),
      generateText({
        model: "openai/gpt-4o-mini",
        prompt: messageAnalysisPrompt,
        temperature: 0,
      }),
    ])

    const jsonMatch = relationshipResult.text.match(/\{[\s\S]*\}/)
    const messageJsonMatch = messageResult.text.match(/\{[\s\S]*\}/)

    let frequentKeywords = [
      { text: "밥 먹었어?", type: "sent" },
      { text: "회식 ㅠㅠ", type: "sent" },
      { text: "주말에 뭐해?", type: "sent" },
      { text: "ㅋㅋㅋ", type: "sent" },
      { text: "고마워", type: "sent" },
      { text: "미안해", type: "sent" },
      { text: "수고했어", type: "sent" },
      { text: "확인했어", type: "sent" },
      { text: "알겠습니다", type: "sent" },
      { text: "네 상무님", type: "sent" },
    ]

    if (messageJsonMatch) {
      try {
        const messageData = JSON.parse(messageJsonMatch[0])
        if (messageData.frequent_keywords && messageData.frequent_keywords.length > 0) {
          frequentKeywords = messageData.frequent_keywords.slice(0, 10)
        }
      } catch (e) {
        console.error("[v0] Message analysis parse error:", e)
      }
    }

    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])

      const addProfileImg = (list: Array<{ name: string }>) =>
        list.map((p) => {
          const friend = friendsData.friends.find((f) => f.name === p.name)
          return { ...p, profileImg: friend?.profileImg || `https://i.pravatar.cc/150?u=${p.name}` }
        })

      return Response.json({
        ...result,
        close_relationships: addProfileImg(result.close_relationships),
        neglected_relationships: addProfileImg(result.neglected_relationships),
        new_connections: newConnectionsIn2025,
        top_contacts_by_frequency: topContactsByFrequency,
        frequent_keywords: frequentKeywords,
        categorized_relationships: categorizedRelationships,
        source: "openai",
      })
    }
    throw new Error("Invalid JSON")
  } catch (error) {
    console.error("[v0] Analysis error:", error)

    return Response.json({
      close_relationships: sorted.slice(0, 5).map((p) => ({
        name: p.name,
        category: p.category,
        profileImg: p.profileImg,
        intimacy_score: p.intimacyScore,
        reason: "자주 연락하는 관계입니다",
      })),
      neglected_relationships: neglected.slice(0, 5).map((p) => ({
        name: p.name,
        category: p.category,
        profileImg: p.profileImg,
        last_contact_days_ago: p.lastContactDaysAgo,
        last_message: p.lastMessage,
      })),
      new_connections: newConnectionsIn2025,
      top_contacts_by_frequency: topContactsByFrequency,
      frequent_keywords: [
        { text: "밥 먹었어?", type: "sent" },
        { text: "회식 ㅠㅠ", type: "sent" },
        { text: "주말에 뭐해?", type: "sent" },
        { text: "ㅋㅋㅋ", type: "sent" },
        { text: "고마워", type: "sent" },
        { text: "미안해", type: "sent" },
        { text: "수고했어", type: "sent" },
        { text: "확인했어", type: "sent" },
        { text: "알겠습니다", type: "sent" },
        { text: "네 상무님", type: "sent" },
      ],
      categorized_relationships: categorizedRelationships,
      source: "fallback",
    })
  }
}
