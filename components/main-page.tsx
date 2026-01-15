"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MainPageProps {
  onStart: () => void
  userName?: string
}

export function MainPage({ onStart, userName = "김광일" }: MainPageProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 bg-[#F5F7F9]">
      <div className="text-left w-full mb-8">
        <p className="text-xl text-[#222222] font-medium">{userName}님,</p>
        <p className="text-xl text-[#222222] font-extrabold">올해의 인연을 만나보세요!</p>
      </div>

      {/* Mascot Character with soft bounce animation */}
      <div className="relative w-64 h-64 mb-8 animate-bounce-soft">
        <Image
          src="/images/e1-84-90-e1-85-a2-e1-84-8b-e1-85-a3-e1-86-bc-e1-84-8b-e1-85-b5-e1-84-8b-e1-85-a7-e1-86-af-e1-84-89-e1-85-ac.png"
          alt="Talk Gardening 마스코트"
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      <Button
        onClick={onStart}
        className="w-full bg-[#FFD54F] hover:bg-[#FFCA28] text-[#222222] font-bold py-6 rounded-full text-lg btn-spring shadow-soft-lg"
      >
        시작하기
      </Button>
    </div>
  )
}
