"use client"

import { useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000) // 1초에서 3초로 변경

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="h-full flex items-center justify-center bg-[#F5F7F9]">
      <div className="relative w-[512px] h-[384px] animate-fade-in-up">
        <Image
          src="/images/talk-gardening-logo.png"
          alt="Talk Gardening 로고"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
