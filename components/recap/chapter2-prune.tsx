"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Leaf, Scissors } from "lucide-react"

interface Person {
  name: string
  category: string
  profileImg?: string
}

interface Chapter2PruneProps {
  pruneRelationships: Person[]
  onNext: () => void
}

export function Chapter2Prune({ pruneRelationships, onNext }: Chapter2PruneProps) {
  const displayList = pruneRelationships.slice(0, 5)

  const [prunedItems, setPrunedItems] = useState<Set<string>>(new Set())

  const handlePrune = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPrunedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }
      return newSet
    })
  }

  const positions = [
    { top: "5%", right: "5%", left: "auto" },
    { top: "18%", right: "auto", left: "5%" },
    { top: "32%", right: "8%", left: "auto" },
    { top: "42%", right: "auto", left: "2%" },
    { top: "55%", right: "12%", left: "auto" },
  ]

  return (
    <div className="h-full flex flex-col px-6 py-4 bg-[#F5F7F9]" onClick={onNext}>
      {/* Header */}
      <div className="mt-8 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-[#81C784]" />
          <h2 className="text-xl font-extrabold text-[#222222]">시든 잎을 정리할 시간</h2>
        </div>
        <p className="text-lg text-[#666666] mt-2">정리를 통해</p>
        <p className="text-lg font-extrabold text-[#222222]">나무를 아름답게 가꾸어요</p>
      </div>

      {/* Tree with relationships */}
      <div className="flex-1 relative my-4">
        {displayList.map((person, index) => {
          const isPruned = prunedItems.has(person.name)
          return (
            <div
              key={person.name}
              className={`absolute flex items-center gap-2 rounded-full px-3 py-1.5 shadow-soft animate-fade-in-up transition-all duration-500 ${
                isPruned ? "bg-gray-200 border border-gray-300" : "bg-[#FFF8E1] border border-[#FFD54F]"
              }`}
              style={{
                ...positions[index],
                animationDelay: `${index * 0.15}s`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ${
                  isPruned ? "bg-gray-300" : "bg-[#E3F2FD]"
                }`}
              >
                {person.profileImg ? (
                  <Image
                    src={person.profileImg || "/placeholder.svg"}
                    alt={person.name}
                    width={32}
                    height={32}
                    className={`object-cover transition-all duration-500 ${isPruned ? "grayscale" : ""}`}
                  />
                ) : (
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-500 ${
                      isPruned ? "bg-gray-400" : "bg-[#81C784]"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-all duration-500 ${
                  isPruned ? "text-gray-400 line-through" : "text-[#222222]"
                }`}
              >
                {person.name}
              </span>
              <button
                onClick={(e) => handlePrune(person.name, e)}
                className={`p-1 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isPruned ? "bg-gray-300 text-gray-500" : "bg-[#FFECB3] text-[#FF8A65] hover:bg-[#FFD54F]"
                }`}
              >
                <Scissors className="w-4 h-4" />
              </button>
            </div>
          )
        })}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <Image
            src="/images/mascot-flower.png"
            alt="정원사 태양이"
            width={160}
            height={160}
            className="object-contain drop-shadow-lg animate-bounce-soft"
          />
        </div>

        {/* Falling leaves animation hint */}
        <div className="absolute top-20 left-4 w-4 h-4 bg-[#FFD54F] rounded-full opacity-60 animate-bounce" />
        <div className="absolute top-28 left-8 w-3 h-3 bg-[#FF8A65] rounded-full opacity-50 animate-bounce delay-100" />
      </div>

      {/* Tip box */}
      <div
        className="bg-[#E8F5E9] border border-[#81C784] rounded-2xl p-4 mb-4 shadow-soft animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">🌱</span>
          <div>
            <p className="font-bold text-[#2E7D32] text-sm">가지치기 팁</p>
            <p className="text-xs text-[#666666] mt-1 leading-relaxed">
              지금 정리하는 인연은 친구 목록에서 삭제됩니다.
              <br />
              나중에 인연이 닿으면
              <br />
              AI가 과거의 맥락을 복원해드릴게요!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
