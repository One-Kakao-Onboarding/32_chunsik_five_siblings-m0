"use client"

import Image from "next/image"

interface TopContact {
  name: string
  category: string
  profileImg?: string
  frequency_score: number
}

interface RecapSlide2Props {
  onNext: () => void
  topContacts?: TopContact[]
  userName?: string
}

export function RecapSlide2({ onNext, topContacts, userName = "김광일" }: RecapSlide2Props) {
  const contacts = (topContacts || []).slice(0, 5)
  const top3 = contacts.slice(0, 3)
  const rest = contacts.slice(3, 5)

  // Reorder top3 for display: [2nd, 1st, 3rd]
  const displayOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3

  const cardStyles = [
    // 2nd place (left) - gray
    {
      bg: "bg-gradient-to-b from-gray-100 to-gray-200",
      border: "border-gray-300",
      crown: "text-gray-400",
      size: "w-24 h-32",
    },
    // 1st place (center) - gold/yellow
    {
      bg: "bg-gradient-to-b from-yellow-100 to-yellow-200",
      border: "border-yellow-400",
      crown: "text-yellow-500",
      size: "w-28 h-36",
    },
    // 3rd place (right) - pink
    {
      bg: "bg-gradient-to-b from-pink-100 to-pink-200",
      border: "border-pink-300",
      crown: "text-amber-700",
      size: "w-24 h-32",
    },
  ]

  const getRankLabel = (displayIdx: number) => {
    if (displayIdx === 0) return "2"
    if (displayIdx === 1) return "1"
    if (displayIdx === 2) return "3"
    return ""
  }

  return (
    <div className="h-full flex flex-col px-4 py-6 relative bg-[#F5F7F9]" onClick={onNext}>
      {/* Title */}
      <div className="text-center mb-6 animate-fade-in-up">
        <p className="text-lg">
          <span className="font-extrabold text-[#81C784]">가장 많이 연락</span>한
        </p>
        <p className="text-lg">
          {userName}님의 <span className="font-extrabold text-[#222222]">든든한 뿌리</span>예요!
        </p>
      </div>

      {/* Top 3 Cards */}
      <div className="flex justify-center items-end gap-2 mb-6">
        {displayOrder.map((contact, displayIdx) => {
          if (!contact) return null
          const style = cardStyles[displayIdx]
          const rank = getRankLabel(displayIdx)

          return (
            <div
              key={contact.name}
              className={`relative ${style.size} rounded-2xl ${style.bg} border-2 ${style.border} shadow-lg flex flex-col items-center justify-center animate-fade-in-up`}
              style={{ animationDelay: `${displayIdx * 0.1}s` }}
            >
              {/* Crown */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${style.crown}`}>
                {rank === "1" && (
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="currentColor">
                    <path d="M14 0L17.5 8L26 6L22 14H6L2 6L10.5 8L14 0Z" />
                    <rect x="6" y="14" width="16" height="8" rx="2" />
                  </svg>
                )}
                {rank === "2" && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">
                    {rank}
                  </div>
                )}
                {rank === "3" && (
                  <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm">
                    {rank}
                  </div>
                )}
              </div>

              {/* Profile Image */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md mb-2">
                <Image
                  src={contact.profileImg || `https://i.pravatar.cc/150?u=${contact.name}`}
                  alt={contact.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Name */}
              <p className="text-xs font-bold text-[#222222] text-center px-1 truncate w-full">
                {contact.name.replace(/\s*$$.*?$$\s*/g, "")}
              </p>

              {/* Frequency Score Badge */}
              <div className="mt-1 px-2 py-0.5 bg-white/80 rounded-full">
                <span className="text-xs font-semibold text-[#81C784]">{contact.frequency_score}점</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 4th and 5th place list */}
      <div className="space-y-3 px-2">
        {rest.map((contact, idx) => (
          <div
            key={contact.name}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
          >
            <span className="text-lg font-bold text-gray-400 w-6">{idx + 4}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={contact.profileImg || `https://i.pravatar.cc/150?u=${contact.name}`}
                alt={contact.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="flex-1 font-semibold text-[#222222]">{contact.name.replace(/\s*$$.*?$$\s*/g, "")}</span>
            <span className="text-sm font-semibold text-[#81C784]">{contact.frequency_score}점</span>
          </div>
        ))}
      </div>

      {/* Mascot */}
      <div className="flex-1 flex justify-center items-center mt-4">
        <div className="relative w-36 h-36 animate-bounce-soft">
          <Image
            src="/images/e1-84-90-e1-85-a2-e1-84-8b-e1-85-a3-e1-86-bc-e1-84-8b-e1-85-b5-e1-84-89-e1-85-b5-e1-86-ab-e1-84-82-e1-85-a1-e1-86-b7.png"
            alt="축하하는 마스코트"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
