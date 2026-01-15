"use client"

interface Keyword {
  text: string
  type: "sent" | "received"
}

interface RecapSlide3Props {
  onNext: () => void
  keywords?: Keyword[]
}

export function RecapSlide3({ onNext, keywords }: RecapSlide3Props) {
  const chatBubbles = keywords?.slice(0, 10) || [
    { text: "밥 먹었어?", type: "sent" },
    { text: "회식 ㅠㅠ", type: "sent" },
    { text: "주말에 뭐해?", type: "sent" },
    { text: "ㅋㅋㅋ", type: "sent" },
    { text: "고마워", type: "sent" },
    { text: "미안해", type: "sent" },
    { text: "수고했어", type: "sent" },
    { text: "확인했어", type: "sent" },
    { text: "알겠습니다", type: "sent" },
    { text: "네~", type: "sent" },
  ]

  const bubbleStyles = [
    { top: "8%", left: "10%", scale: 1.1, opacity: 1, delay: 0, zIndex: 10 },
    { top: "5%", right: "8%", scale: 0.95, opacity: 0.9, delay: 0.2, zIndex: 9 },
    { top: "18%", left: "25%", scale: 1.05, opacity: 1, delay: 0.4, zIndex: 10 },
    { top: "22%", right: "15%", scale: 0.85, opacity: 0.75, delay: 0.6, zIndex: 7 },
    { top: "35%", left: "5%", scale: 0.9, opacity: 0.85, delay: 0.8, zIndex: 8 },
    { top: "38%", right: "5%", scale: 1, opacity: 0.95, delay: 1.0, zIndex: 9 },
    { top: "50%", left: "20%", scale: 0.8, opacity: 0.7, delay: 1.2, zIndex: 6 },
    { top: "55%", right: "20%", scale: 0.75, opacity: 0.6, delay: 1.4, zIndex: 5 },
    { top: "65%", left: "8%", scale: 0.7, opacity: 0.55, delay: 1.6, zIndex: 4 },
    { top: "68%", right: "10%", scale: 0.65, opacity: 0.5, delay: 1.8, zIndex: 3 },
  ]

  return (
    <div className="h-full flex flex-col px-6 py-4 relative cursor-pointer bg-[#F5F7F9]" onClick={onNext}>
      {/* Header */}
      <div className="mb-4 animate-fade-in-up">
        <p className="text-xl font-extrabold text-[#222222]">주로 이런 대화를</p>
        <p className="text-xl font-extrabold text-[#222222]">나누셨네요!</p>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {chatBubbles.map((bubble, index) => {
          const style = bubbleStyles[index] || bubbleStyles[bubbleStyles.length - 1]
          const isLeft = style.left !== undefined

          return (
            <div
              key={index}
              className="absolute max-w-[180px] px-4 py-3 rounded-2xl animate-float shadow-soft bg-[#FFD54F] text-[#222222]"
              style={{
                top: style.top,
                left: style.left,
                right: style.right,
                transform: `scale(${style.scale})`,
                opacity: style.opacity,
                animationDelay: `${style.delay}s`,
                zIndex: style.zIndex,
                transformOrigin: isLeft ? "left center" : "right center",
              }}
            >
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis block">
                {bubble.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
