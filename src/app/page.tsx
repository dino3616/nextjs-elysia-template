"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Info, XCircle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { cultureData, type CultureData, type CulturalWarning, type TouristSpot } from "@/lib/culture-data"

type ViewState = "input" | "plan" | "spotDetail"

export default function Component() {
  const [destinationInput, setDestinationInput] = useState("")
  const [selectedCulture, setSelectedCulture] = useState<CultureData | null>(null)
  const [viewState, setViewState] = useState<ViewState>("input")
  const [selectedTouristSpot, setSelectedTouristSpot] = useState<TouristSpot | null>(null)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [currentWarning, setCurrentWarning] = useState<CulturalWarning | null>(null)
  const [showMoreInfoDialog, setShowMoreInfoDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredDestinations = useMemo(() => {
    if (!destinationInput) return []
    return cultureData.filter((c) => c.destination.toLowerCase().includes(destinationInput.toLowerCase()))
  }, [destinationInput])

  const handleSelectDestination = (selectedId: string) => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      const foundCulture = cultureData.find((c) => c.id === selectedId)
      setSelectedCulture(foundCulture || null)
      setDestinationInput(foundCulture?.destination || "")
      setLoading(false)
      if (foundCulture) {
        setViewState("plan")
      } else {
        setError("この地域の文化情報は現在準備中です。")
        setViewState("input")
      }
    }, 500)
  }

  const handleActivitySelect = (activity: string) => {
    if (selectedCulture) {
      const warning = selectedCulture.warnings.find((w) => w.activity === activity)
      if (warning) {
        setCurrentWarning(warning)
        setShowWarningDialog(true)
      } else {
        setCurrentWarning(null)
        setShowWarningDialog(false)
      }
    }
  }

  const handleTouristSpotClick = (spot: TouristSpot) => {
    setSelectedTouristSpot(spot)
    setViewState("spotDetail")
  }

  const isDataStale = (lastUpdated: string) => {
    const updateDate = new Date(lastUpdated)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - updateDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 7
  }

  const openGoogleTranslate = (text: string, targetLang = "ja") => {
    const url = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodeURIComponent(text)}&op=translate`
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-xl font-bold">CultureSync</h1>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">ホーム</Button>
            <Button variant="ghost">プラン作成</Button>
            <Button variant="ghost">お問い合わせ</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8 px-4 md:px-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        {viewState === "input" && (
          <section className="col-span-full flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
            <Card className="w-full max-w-md p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">旅行プランを作成</CardTitle>
                <CardDescription className="mt-2">
                  現地文化・習慣を踏まえた、あなただけの旅行プランを生成します。
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Label htmlFor="destination-input" className="sr-only">
                  目的地を入力
                </Label>
                <Input
                  id="destination-input"
                  placeholder="目的地（国名または都市名）を入力してください (例: 日本, タイ)"
                  value={destinationInput}
                  onChange={(e) => {
                    setDestinationInput(e.target.value)
                    setSelectedCulture(null)
                    setError(null)
                  }}
                  className="w-full"
                />
                {filteredDestinations.length > 0 && destinationInput && !selectedCulture && (
                  <Card className="w-full">
                    <CardContent className="p-2">
                      {filteredDestinations.map((c) => (
                        <Button
                          key={c.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleSelectDestination(c.id)}
                        >
                          {c.destination}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                )}
                {loading && (
                  <div className="flex items-center gap-2 text-muted-foreground justify-center">
                    <Info className="h-4 w-4 animate-spin" />
                    <span>プランを生成中...</span>
                  </div>
                )}
                {error && (
                  <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>エラー</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {viewState === "plan" && selectedCulture && (
          <>
            <div className="grid gap-8">
              <Button variant="outline" onClick={() => setViewState("input")} className="w-fit">
                <ArrowLeft className="mr-2 h-4 w-4" /> 目的地を変更
              </Button>
              <section>
                <h2 className="text-3xl font-bold mb-4">あなたの旅行プラン: {selectedCulture.destination}</h2>
                <p className="text-muted-foreground mb-6">
                  以下の観光スポットをクリックすると、その場所の文化的背景や役立つフレーズを確認できます。
                </p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {selectedCulture.touristSpots.map((spot, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleTouristSpotClick(spot)}
                    >
                      <CardHeader>
                        <CardTitle>{spot.name}</CardTitle>
                        <CardDescription>{spot.nameLocal}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{spot.culturalSignificance}</p>
                        <Button variant="link" className="p-0 h-auto text-sm mt-2">
                          詳細を見る
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">旅行中の注意事項</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>活動を選択して注意事項を確認</CardTitle>
                    <CardDescription>特定の活動に関連する文化的注意事項をリアルタイムで表示します。</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select onValueChange={handleActivitySelect}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="活動を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCulture.warnings.map((warning, index) => (
                          <SelectItem key={index} value={warning.activity}>
                            {warning.activity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </section>

              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>全体的な文化インサイト: {selectedCulture.destination}</CardTitle>
                    <CardDescription>
                      学術的知見に基づく文化情報
                      {isDataStale(selectedCulture.lastUpdated) && (
                        <span className="ml-2 text-orange-500 flex items-center gap-1">
                          <Info className="h-4 w-4" /> 情報の確認中
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <h3 className="font-semibold">宗教的背景と慣習</h3>
                      <p className="text-sm text-muted-foreground">{selectedCulture.insights.religiousBackground}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">社会的マナーとタブー</h3>
                      <p className="text-sm text-muted-foreground">{selectedCulture.insights.socialManners}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">伝統的な挨拶方法</h3>
                      <p className="text-sm text-muted-foreground">{selectedCulture.insights.traditionalGreetings}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">食事のエチケット</h3>
                      <p className="text-sm text-muted-foreground">{selectedCulture.insights.diningEtiquette}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">服装に関する文化的配慮事項</h3>
                      <p className="text-sm text-muted-foreground">{selectedCulture.insights.dressCode}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <p>
                        出典: {selectedCulture.source} (信頼性: {selectedCulture.reliability})
                      </p>
                      <p>最終更新日時: {new Date(selectedCulture.lastUpdated).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
            <aside className="lg:sticky lg:top-20 h-fit grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>関連文化的コンテキスト</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{selectedCulture.sidebarInfo}</p>
                </CardContent>
              </Card>
            </aside>
          </>
        )}

        {viewState === "spotDetail" && selectedTouristSpot && (
          <section className="col-span-full">
            <Button variant="outline" onClick={() => setViewState("plan")} className="mb-6 w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" /> プランに戻る
            </Button>
            <Card>
              <CardHeader>
                <CardTitle>{selectedTouristSpot.name}</CardTitle>
                <CardDescription>{selectedTouristSpot.nameLocal}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {selectedTouristSpot.culturalSignificance && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">文化的意義</h3>
                    <p className="text-muted-foreground">{selectedTouristSpot.culturalSignificance}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm mt-2"
                      onClick={() => openGoogleTranslate(selectedTouristSpot.culturalSignificance)}
                    >
                      詳細翻訳 (Google翻訳)
                    </Button>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-2">基本情報</h3>
                  <div className="grid gap-2">
                    <div>
                      <Label className="font-medium">住所:</Label>
                      <p className="text-sm text-muted-foreground">{selectedTouristSpot.address}</p>
                      <p className="text-sm text-muted-foreground">{selectedTouristSpot.addressLocal}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        onClick={() => openGoogleTranslate(selectedTouristSpot.addressLocal)}
                      >
                        現地語表記 (Google翻訳)
                      </Button>
                    </div>
                    <div>
                      <Label className="font-medium">営業時間:</Label>
                      <p className="text-sm text-muted-foreground">{selectedTouristSpot.openingHours}</p>
                      <p className="text-sm text-muted-foreground">{selectedTouristSpot.openingHoursLocal}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        onClick={() => openGoogleTranslate(selectedTouristSpot.openingHoursLocal)}
                      >
                        現地語表記 (Google翻訳)
                      </Button>
                    </div>
                  </div>
                </div>
                {selectedTouristSpot.phrases && selectedTouristSpot.phrases.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">現地での会話フレーズ</h3>
                    <div className="grid gap-3">
                      {selectedTouristSpot.phrases.map((phrase, index) => (
                        <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                          <p className="text-sm">
                            <span className="font-medium">日本語:</span> {phrase.jp}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">現地語:</span> {phrase.local}
                          </p>
                          <p className="text-xs text-muted-foreground">発音: {phrase.pronunciation}</p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm mt-1"
                            onClick={() => openGoogleTranslate(phrase.local)}
                          >
                            発音を聞く (Google翻訳)
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">利用可能言語: 日本語, 現地語 (Google翻訳経由)</p>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      {/* Cultural Warning Dialog */}
      {currentWarning && (
        <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
          <DialogContent
            className={cn(currentWarning.type === "taboo" ? "border-red-500" : "border-yellow-500", "max-w-md")}
          >
            <DialogHeader>
              <DialogTitle
                className={cn(
                  currentWarning.type === "taboo" ? "text-red-600" : "text-yellow-600",
                  "flex items-center gap-2",
                )}
              >
                {currentWarning.type === "taboo" ? <XCircle className="h-6 w-6" /> : <Info className="h-6 w-6" />}
                {currentWarning.type === "taboo" ? "警告: 文化的タブー" : "注意: 文化的配慮事項"}
              </DialogTitle>
              <DialogDescription>{currentWarning.title}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label className="font-semibold">具体的な内容:</Label>
                <p className="text-sm text-muted-foreground">{currentWarning.description}</p>
              </div>
              {currentWarning.type === "taboo" && (
                <div>
                  <Label className="font-semibold">潜在的結果:</Label>
                  <p className="text-sm text-muted-foreground">{currentWarning.consequences}</p>
                </div>
              )}
              <div>
                <Label className="font-semibold">適切な代替行動:</Label>
                <p className="text-sm text-muted-foreground">{currentWarning.alternative}</p>
              </div>
              {currentWarning.legalRisk && currentWarning.legalRisk !== "無" && (
                <div>
                  <Label className="font-semibold">法的リスクレベル:</Label>
                  <p className="text-sm text-muted-foreground">{currentWarning.legalRisk}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowMoreInfoDialog(true)
                  setShowWarningDialog(false) // Close current dialog
                }}
              >
                詳細情報
              </Button>
              <Button onClick={() => setShowWarningDialog(false)}>理解しました</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* More Info Dialog for Cultural Warning */}
      {currentWarning && (
        <Dialog open={showMoreInfoDialog} onOpenChange={setShowMoreInfoDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>詳細情報: {currentWarning.title}</DialogTitle>
              <DialogDescription>
                {currentWarning.type === "taboo"
                  ? "この文化的タブーに関する詳細な背景と具体例です。"
                  : "この文化的配慮事項に関する詳細な背景と具体例です。"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                {currentWarning.description} {currentWarning.consequences} {currentWarning.alternative}
                <br />
                <br />
                この情報は、現地の文化を深く理解し、敬意を払うために重要です。 例えば、{selectedCulture?.destination}
                では、この行動は特定の歴史的または宗教的背景から避けられています。
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowMoreInfoDialog(false)}>閉じる</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
