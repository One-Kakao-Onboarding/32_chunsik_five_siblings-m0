"use client"

import type React from "react"
import Image from "next/image"

interface NewConnection {
  name: string
  category: string
  profileImg?: string
  friendshipDate?: string
}

interface RecapSlide1Props {
  onNext: () => void
  newConnections?: NewConnection[]
  userName?: string
}

export function RecapSlide1({ onNext, newConnections, userName = "김광일" }: RecapSlide1Props) {
  const connections = newConnections || []

  const seedPositions = [
    // 첫번째 줄 - 1명 (중앙에서 약간 왼쪽)
    { top: "2%", left: "40%", scale: 1.15, opacity: 1, delay: 0, zIndex: 10 },
    // 두번째 줄 - 2명
    { top: "16%", left: "15%", scale: 1.0, opacity: 0.95, delay: 0.1, zIndex: 9 },
    { top: "16%", left: "65%", scale: 1.0, opacity: 0.95, delay: 0.15, zIndex: 9 },
    // 세번째 줄 - 2명
    { top: "32%", left: "25%", scale: 0.85, opacity: 0.85, delay: 0.25, zIndex: 7 },
    { top: "32%", left: "55%", scale: 0.85, opacity: 0.85, delay: 0.3, zIndex: 7 },
    // 네번째 줄 - 2명 (가장 뒤, 작고 흐림)
    { top: "48%", left: "12%", scale: 0.7, opacity: 0.6, delay: 0.4, zIndex: 5 },
    { top: "48%", left: "68%", scale: 0.7, opacity: 0.6, delay: 0.45, zIndex: 5 },
  ]

  const floatDurations = [3, 3.5, 4, 3.2, 3.8, 4.2, 3.6]

  return (
    <div className="h-full flex flex-col px-6 py-4 relative bg-[#F5F7F9]" onClick={onNext}>
      {/* Header */}
      <div className="mb-4 animate-fade-in-up">
        <p className="text-lg text-[#666666]">올해 자라난</p>
        <p className="text-xl">
          <span className="font-extrabold text-[#222222]">{userName}님</span>의{" "}
          <span className="font-extrabold text-[#81C784]">소중한 씨앗</span>입니다
        </p>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {connections.slice(0, 7).map((connection, index) => {
          const pos = seedPositions[index]
          if (!pos) return null
          const floatDuration = floatDurations[index]
          const baseSize = 64 * pos.scale
          const profileSize = 44 * pos.scale

          return (
            <div
              key={connection.name}
              className="absolute flex flex-col items-center"
              style={
                {
                  top: pos.top,
                  left: pos.left,
                  transform: "translateX(-50%)",
                  opacity: 0,
                  zIndex: pos.zIndex,
                  animation: `fade-in-up 0.6s ease-out ${pos.delay}s forwards, float ${floatDuration}s ease-in-out ${pos.delay}s infinite`,
                } as React.CSSProperties
              }
            >
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: `${baseSize}px`,
                  height: `${baseSize}px`,
                  background: `linear-gradient(180deg, #A8D5A2 0%, #81C784 50%, #66BB6A 100%)`,
                  boxShadow: `0 ${4 * pos.scale}px ${16 * pos.scale}px rgba(102, 187, 106, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)`,
                }}
              >
                {/* 하이라이트 */}
                <div
                  className="absolute"
                  style={{
                    top: "10%",
                    left: "15%",
                    width: "35%",
                    height: "25%",
                    background: "rgba(255, 255, 255, 0.35)",
                    borderRadius: "50%",
                    filter: "blur(3px)",
                  }}
                />
                {/* 프로필 이미지 */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-white border-2 border-white"
                  style={{
                    width: `${profileSize}px`,
                    height: `${profileSize}px`,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
                  }}
                >
                  {connection.profileImg ? (
                    <Image
                      src={connection.profileImg || "/placeholder.svg"}
                      alt={connection.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E8F5E9] flex items-center justify-center">
                      <div
                        className="rounded-full bg-[#81C784]"
                        style={{
                          width: `${profileSize * 0.5}px`,
                          height: `${profileSize * 0.5}px`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* 이름 */}
              <span
                className="mt-2 text-[#2E7D32] font-bold whitespace-nowrap text-center"
                style={{
                  fontSize: `${Math.max(10, 12 * pos.scale)}px`,
                  textShadow: "0 1px 2px rgba(255,255,255,0.9)",
                }}
              >
                {connection.name.replace(/\s*$$.*$$/, "")}
              </span>
            </div>
          )
        })}

        {/* Mascot at bottom */}
        <div className="absolute bottom-0 left-0 w-48 h-48 animate-bounce-soft z-20">
          <Image
            src="/images/e1-84-90-e1-85-a2-e1-84-8b-e1-85-a3-e1-86-bc-e1-84-8b-e1-85-b5-e1-84-8b-e1-85-b5-e1-86-ab-e1-84-80-e1-85-a1-e1-86-ab-e1-84-89-e1-85-b5-e1-86-a8-e1-84-86-e1-85-ae-e1-86-af-e1-84-86-e1-85-ae-e1-86-af-e1-84-8c-e1-85-ae-e1-84-80-e1-85-b5.png"
            alt="씨앗을 키우는 마스코트"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
