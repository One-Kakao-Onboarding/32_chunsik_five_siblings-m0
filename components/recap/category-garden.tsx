"use client"

import type React from "react"

import Image from "next/image"
import { Share2, X } from "lucide-react"

interface CategoryPerson {
  name: string
  category: string
  profileImg?: string
  score?: number
}

interface CategoryGardenProps {
  categories: {
    가족: CategoryPerson[]
    "친구/동창": CategoryPerson[]
    기타: CategoryPerson[]
    지인: CategoryPerson[]
  }
  onNext: () => void
  onExit?: () => void
}

export function CategoryGarden({ categories, onNext, onExit }: CategoryGardenProps) {
  const categoryConfig = {
    가족: {
      icon: "/images/image-photoroom.png",
      label: "나무",
      sublabel: "가족",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    "친구/동창": {
      icon: "/images/image-photoroom-20-281-29.png",
      label: "열매",
      sublabel: "친구/동창",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    기타: {
      icon: "/images/image-photoroom-20-282-29.png",
      label: "꽃",
      sublabel: "비즈니스 관계",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
    지인: {
      icon: "/images/roots.png",
      label: "뿌리",
      sublabel: "지인",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Talk Gardening - 나의 인연 정원",
          text: "나의 카카오톡 관계를 정원으로 표현해봤어요!",
          url: window.location.href,
        })
      } catch (error) {
        console.log("공유 취소됨")
      }
    } else {
      // Web Share API를 지원하지 않는 경우 클립보드에 복사
      await navigator.clipboard.writeText(window.location.href)
      alert("링크가 클립보드에 복사되었습니다!")
    }
  }

  const handleExit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onExit) {
      onExit()
    } else {
      onNext()
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#F5F7F9] to-[#E8F5E9] px-5 py-4">
      {/* 헤더 */}
      <div className="text-center mb-4 animate-fade-in-up">
        <h2 className="text-lg font-bold text-[#222222] mb-1">나의 인연 정원</h2>
      </div>

      {/* 카테고리 카드들 */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {/* 나무 - 가족 (항상 첫번째) */}
        <div
          className={`${categoryConfig["가족"].bgColor} ${categoryConfig["가족"].borderColor} border-2 rounded-2xl p-3 animate-fade-in-up`}
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={categoryConfig["가족"].icon || "/placeholder.svg"}
              alt="나무"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold text-[#222222] text-sm">{categoryConfig["가족"].label}</h3>
              <p className="text-xs text-gray-500">{categoryConfig["가족"].sublabel}</p>
            </div>
            <span className="ml-auto text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
              {categories["가족"]?.length || 0}명
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories["가족"]?.slice(0, 6).map((person, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 bg-white/70 rounded-full px-2 py-1 text-xs"
                style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={person.profileImg || `https://i.pravatar.cc/150?u=${person.name}`}
                    alt={person.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[#222222] truncate max-w-[60px]">{person.name.replace(/$$.*$$/, "").trim()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 열매 - 친구/동창 */}
        <div
          className={`${categoryConfig["친구/동창"].bgColor} ${categoryConfig["친구/동창"].borderColor} border-2 rounded-2xl p-3 animate-fade-in-up`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={categoryConfig["친구/동창"].icon || "/placeholder.svg"}
              alt="과일"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold text-[#222222] text-sm">{categoryConfig["친구/동창"].label}</h3>
              <p className="text-xs text-gray-500">{categoryConfig["친구/동창"].sublabel}</p>
            </div>
            <span className="ml-auto text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              {categories["친구/동창"]?.length || 0}명
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories["친구/동창"]?.slice(0, 6).map((person, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 bg-white/70 rounded-full px-2 py-1 text-xs"
                style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={person.profileImg || `https://i.pravatar.cc/150?u=${person.name}`}
                    alt={person.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[#222222] truncate max-w-[60px]">{person.name.replace(/$$.*$$/, "").trim()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 꽃 - 기타 */}
        <div
          className={`${categoryConfig["기타"].bgColor} ${categoryConfig["기타"].borderColor} border-2 rounded-2xl p-3 animate-fade-in-up`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={categoryConfig["기타"].icon || "/placeholder.svg"}
              alt="꽃"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold text-[#222222] text-sm">{categoryConfig["기타"].label}</h3>
              <p className="text-xs text-gray-500">{categoryConfig["기타"].sublabel}</p>
            </div>
            <span className="ml-auto text-xs font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
              {categories["기타"]?.length || 0}명
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories["기타"]?.slice(0, 6).map((person, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 bg-white/70 rounded-full px-2 py-1 text-xs"
                style={{ animationDelay: `${0.4 + idx * 0.05}s` }}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={person.profileImg || `https://i.pravatar.cc/150?u=${person.name}`}
                    alt={person.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[#222222] truncate max-w-[60px]">{person.name.replace(/$$.*$$/, "").trim()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 뿌리 - 지인 */}
        <div
          className={`${categoryConfig["지인"].bgColor} ${categoryConfig["지인"].borderColor} border-2 rounded-2xl p-3 animate-fade-in-up`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={categoryConfig["지인"].icon || "/placeholder.svg"}
              alt="뿌리"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold text-[#222222] text-sm">{categoryConfig["지인"].label}</h3>
              <p className="text-xs text-gray-500">{categoryConfig["지인"].sublabel}</p>
            </div>
            <span className="ml-auto text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
              {categories["지인"]?.length || 0}명
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories["지인"]?.slice(0, 6).map((person, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 bg-white/70 rounded-full px-2 py-1 text-xs"
                style={{ animationDelay: `${0.5 + idx * 0.05}s` }}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={person.profileImg || `https://i.pravatar.cc/150?u=${person.name}`}
                    alt={person.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[#222222] truncate max-w-[60px]">{person.name.replace(/$$.*$$/, "").trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center my-3 animate-bounce-soft">
        <Image
          src="/images/gardener-mascot.png"
          alt="정원사 태양이"
          width={120}
          height={120}
          className="object-contain drop-shadow-lg"
        />
      </div>

      <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-[#81C784] hover:bg-[#66BB6A] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
        >
          <Share2 size={18} />
          <span>공유하기</span>
        </button>
        <button
          onClick={handleExit}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-[#222222] font-bold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
        >
          <X size={18} />
          <span>나가기</span>
        </button>
      </div>
    </div>
  )
}
