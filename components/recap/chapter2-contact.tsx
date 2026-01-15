"use client"

import Image from "next/image"
import { MessageSquare } from "lucide-react"

interface Person {
  name: string
  category: string
  profileImg?: string
  last_contact_days_ago?: number | null
  last_message?: string
  intimacy_score?: number
}

interface Chapter2ContactProps {
  neglectedRelationships: Person[]
  onNext: () => void
}

function formatLastContact(days: number | null | undefined): string {
  if (days === null || days === undefined) return "연락한적 없음"
  if (days === 0) return "오늘"
  if (days === 1) return "어제"
  if (days < 30) return `${Math.round(days)}일 전`
  if (days < 365) return `${Math.round(days / 30)}개월 전`
  return `${Math.round(days / 365)}년 전`
}

export function Chapter2Contact({ neglectedRelationships, onNext }: Chapter2ContactProps) {
  const displayList = neglectedRelationships.slice(0, 3)

  return (
    <div className="h-full flex flex-col px-6 py-4 bg-[#F5F7F9]" onClick={onNext}>
      <div className="space-y-3 mt-6">
        {displayList.map((person, index) => (
          <div
            key={person.name}
            className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {person.profileImg ? (
                <Image
                  src={person.profileImg || "/placeholder.svg"}
                  alt={person.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#81C784]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#222222]">{person.name}</p>
              <p className="text-xs text-[#666666]">마지막 연락: {formatLastContact(person.last_contact_days_ago)}</p>
              <p className="text-sm text-[#666666] mt-1 truncate">"{person.last_message || "나중에 연락드릴게요."}"</p>
            </div>
            <MessageSquare className="w-5 h-5 text-[#81C784] flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Text - moved above mascot */}
      <div className="text-center mt-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <p className="text-xl text-[#222222]">우리 사이는 살짝 건조하네요</p>
        <p className="text-xl text-[#222222] mt-1">
          지금 <span className="font-extrabold text-[#FF8A65]">연락</span> 한 번 해볼까요?
        </p>
      </div>

      <div className="flex justify-center mt-auto mb-4">
        <Image
          src="/images/mascot-key.png"
          alt="열쇠 든 태양이"
          width={140}
          height={140}
          className="object-contain drop-shadow-lg animate-bounce-soft"
        />
      </div>
    </div>
  )
}
