"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { MainPage } from "@/components/main-page"
import { RecapSlide1 } from "@/components/recap/slide-1"
import { RecapSlide2 } from "@/components/recap/slide-2"
import { RecapSlide3 } from "@/components/recap/slide-3"
import { Chapter2Contact } from "@/components/recap/chapter2-contact"
import { Chapter2Prune } from "@/components/recap/chapter2-prune"
import { CategoryGarden } from "@/components/recap/category-garden"
import { LoadingScreen } from "@/components/loading-screen"
import meData from "@/data/me.json"

interface Person {
  name: string
  category: string
  profileImg?: string
  intimacy_score?: number
  frequency_score?: number
  last_contact_days_ago?: number | null
  last_message?: string
  reason?: string
}

interface Keyword {
  text: string
  type: "sent" | "received"
}

interface CategoryPerson {
  name: string
  category: string
  profileImg?: string
  score?: number
}

interface AnalysisData {
  close_relationships: Person[]
  neglected_relationships: Person[]
  new_connections: Person[]
  top_contacts_by_frequency: Person[]
  frequent_keywords: Keyword[]
  categorized_relationships?: {
    가족: CategoryPerson[]
    "친구/동창": CategoryPerson[]
    기타: CategoryPerson[]
  }
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isApiLoaded, setIsApiLoaded] = useState(false)

  const userName = meData.me.name

  const handleGoHome = () => {
    setAnalysisData(null)
    setIsApiLoaded(false)
    setCurrentSlide(1)
  }

  const handleSplashComplete = () => {
    setCurrentSlide(1)
  }

  const handleStart = async () => {
    setAnalysisData(null)
    setIsApiLoaded(false)
    setCurrentSlide(2)

    try {
      const response = await fetch("/api/analyze-relationships", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      const data = await response.json()
      setAnalysisData(data)
      setIsApiLoaded(true)
    } catch (error) {
      console.error("Failed to fetch analysis:", error)
      setIsApiLoaded(true)
    }
  }

  const handleLoadingComplete = () => {
    setCurrentSlide(3)
  }

  const slides = [
    <SplashScreen key="splash" onComplete={handleSplashComplete} />,
    <MainPage key="main" onStart={handleStart} userName={userName} />,
    <LoadingScreen key="loading" isLoaded={isApiLoaded} onComplete={handleLoadingComplete} />,
    <RecapSlide1
      key="recap1"
      onNext={() => setCurrentSlide(4)}
      newConnections={analysisData?.new_connections}
      userName={userName}
    />,
    <RecapSlide2
      key="recap2"
      onNext={() => setCurrentSlide(5)}
      topContacts={analysisData?.top_contacts_by_frequency}
      userName={userName}
    />,
    <RecapSlide3 key="recap3" onNext={() => setCurrentSlide(6)} keywords={analysisData?.frequent_keywords} />,
    analysisData ? (
      <Chapter2Contact
        key="chapter2-contact"
        neglectedRelationships={analysisData.neglected_relationships}
        onNext={() => setCurrentSlide(7)}
      />
    ) : (
      <LoadingScreen key="loading-chapter2" />
    ),
    analysisData ? (
      <Chapter2Prune
        key="chapter2-prune"
        pruneRelationships={analysisData.neglected_relationships}
        onNext={() => setCurrentSlide(8)}
      />
    ) : (
      <LoadingScreen key="loading-prune" />
    ),
    analysisData?.categorized_relationships ? (
      <CategoryGarden key="category-garden" categories={analysisData.categorized_relationships} onNext={handleGoHome} />
    ) : (
      <LoadingScreen key="loading-category" />
    ),
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[390px] h-[844px] bg-white relative overflow-hidden shadow-2xl rounded-[40px] border-8 border-gray-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-50" />
        <div className="h-full pt-10 pb-8 overflow-hidden">{slides[currentSlide]}</div>
      </div>
    </div>
  )
}
