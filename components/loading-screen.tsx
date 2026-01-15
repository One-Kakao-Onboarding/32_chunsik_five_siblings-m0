"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  isLoaded?: boolean
  onComplete?: () => void
}

export function LoadingScreen({ isLoaded = false, onComplete }: LoadingScreenProps) {
  const [text, setText] = useState("분석 중이에요")
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const textInterval = setInterval(() => {
      setText((prev) => {
        if (prev.includes("불러오는")) return "친밀도를 분석하는 중"
        if (prev.includes("분석하는")) return "결과를 정리하는 중"
        return "관계 데이터를 불러오는 중"
      })
    }, 2000)

    return () => clearInterval(textInterval)
  }, [])

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4)
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      setText("거의 다 완료됐어요")
      const timer = setTimeout(() => {
        onComplete?.()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, onComplete])

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 bg-[#F5F7F9]">
      {/* Circular spinner with mascot */}
      <div className="relative w-52 h-52 mb-8">
        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          {/* 배경 원 */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E8E8E8" strokeWidth="6" />
          {/* 회전하는 부분 채워진 원 (약 25% 채워짐) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#81C784"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="70 213"
          />
        </svg>

        {/* Mascot image in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-36 h-36 relative">
            <Image
              src="/images/e1-84-90-e1-85-a2-e1-84-8b-e1-85-a3-e1-86-bc-e1-84-8b-e1-85-b5-e1-84-83-e1-85-a9-e1-86-ae-e1-84-87-e1-85-a9-e1-84-80-e1-85-b5-e1-84-87-e1-85-ae-e1-86-ab-e1-84-89-e1-85-a5-e1-86-a8.png"
              alt="분석 중인 태양이"
              fill
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Loading text with animated dots */}
      <p className="text-lg text-[#222222] font-medium">
        {text}
        {".".repeat(dotCount)}
      </p>
    </div>
  )
}
