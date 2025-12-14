"use client"
import { useState, useEffect, useCallback } from "react"
import { ShieldIcon, CheckCircle2Icon, XCircleIcon, LockIcon, UnlockIcon, AlertTriangleIcon, SparklesIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import DashboardPageLayout from "@/components/dashboard/layout"
import SectionLogin from "@/components/auth/SectionLogin"

const SECTION_ID = "security"

// Łamigłówka: Logiczne równania binarne
const PUZZLE_EQUATIONS = [
    { equation: "1 AND 1", answer: "1" },
    { equation: "1 OR 0", answer: "1" },
    { equation: "0 XOR 0", answer: "0" },
    { equation: "NOT 1", answer: "0" },
    { equation: "1 AND (0 OR 1)", answer: "1" },
]

export default function SecurityPage() {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [puzzleSolved, setPuzzleSolved] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(PUZZLE_EQUATIONS.length).fill(""))
    const [showHint, setShowHint] = useState(false)
    const [attempts, setAttempts] = useState(0)

    useEffect(() => {
        const savedPassword = localStorage.getItem(`section_password_${SECTION_ID}`)
        const savedPuzzle = localStorage.getItem(`section_puzzle_${SECTION_ID}`)
        if (savedPassword) {
            setIsUnlocked(true)
        }
        if (savedPuzzle === "solved") {
            setPuzzleSolved(true)
        }
    }, [])

    const handleUnlock = useCallback(() => {
        setIsUnlocked(true)
    }, [])

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...userAnswers]
        newAnswers[index] = value
        setUserAnswers(newAnswers)
    }

    const checkAnswer = (index: number) => {
        const correct = userAnswers[index] === PUZZLE_EQUATIONS[index].answer
        if (correct && index === currentStep) {
            setCurrentStep(prev => prev + 1)
            if (index === PUZZLE_EQUATIONS.length - 1) {
                setPuzzleSolved(true)
                localStorage.setItem(`section_puzzle_${SECTION_ID}`, "solved")
            }
        } else if (!correct) {
            setAttempts(prev => prev + 1)
        }
        return correct
    }

    const checkAllAnswers = () => {
        let allCorrect = true
        for (let i = 0; i < PUZZLE_EQUATIONS.length; i++) {
            if (userAnswers[i] !== PUZZLE_EQUATIONS[i].answer) {
                allCorrect = false
                break
            }
        }
        if (allCorrect) {
            setPuzzleSolved(true)
            localStorage.setItem(`section_puzzle_${SECTION_ID}`, "solved")
        } else {
            setAttempts(prev => prev + 1)
        }
    }

    // Login screen
    if (!isUnlocked) {
        return (
            <DashboardPageLayout header={{ title: "Centrum Bezpieczeństwa", icon: ShieldIcon }}>
                <div className="flex items-center justify-center min-h-[400px]">
                    <SectionLogin
                        sectionId={SECTION_ID}
                        label="Sekcja Zabezpieczeń"
                        onUnlock={handleUnlock}
                        description="Ta sekcja wymaga uwierzytelnienia. Dostęp tylko dla autoryzowanego personelu."
                        placeholder="Hmmm jaka liczba przychodzi ci do głowy??"
                        haveRules={false}
                    />
                </div>
            </DashboardPageLayout>
        )
    }

    // Puzzle screen
    if (!puzzleSolved) {
        return (
            <DashboardPageLayout header={{ title: "Centrum Bezpieczeństwa", icon: ShieldIcon }}>
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-red-500/20 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <AlertTriangleIcon className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-red-400">⚠️ TEST BEZPIECZEŃSTWA WYMAGANY</h2>
                                <p className="text-sm text-muted-foreground">
                                    Aby uzyskać dostęp do wrażliwych danych systemowych, musisz przejść test logiki binarnej.
                                    System wymaga weryfikacji Twoich umiejętności analitycznych.
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                    <Badge variant="outline" className="text-amber-500 border-amber-500/50">
                                        Ukończono: {currentStep}/{PUZZLE_EQUATIONS.length}
                                    </Badge>
                                    <Badge variant="outline" className="text-red-500 border-red-500/50">
                                        Błędne próby: {attempts}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Puzzle questions */}
                    <div className="space-y-4">
                        {PUZZLE_EQUATIONS.map((item, index) => {
                            const isCompleted = index < currentStep
                            const isCurrent = index === currentStep
                            const isLocked = index > currentStep

                            return (
                                <div
                                    key={index}
                                    className={`
                                        border rounded-lg p-5 transition-all
                                        ${isCompleted ? 'bg-green-500/5 border-green-500/30' : ''}
                                        ${isCurrent ? 'bg-blue-500/5 border-blue-500/50 shadow-lg' : ''}
                                        ${isLocked ? 'bg-muted/30 border-border/50 opacity-50' : ''}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Status icon */}
                                        <div className="flex-shrink-0">
                                            {isCompleted && <CheckCircle2Icon className="w-6 h-6 text-green-500" />}
                                            {isCurrent && <LockIcon className="w-6 h-6 text-blue-500" />}
                                            {isLocked && <LockIcon className="w-6 h-6 text-muted-foreground" />}
                                        </div>

                                        {/* Question */}
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="font-mono text-xs">
                                                    Q{index + 1}
                                                </Badge>
                                                <code className="text-sm font-bold font-mono">
                                                    {item.equation} = ?
                                                </code>
                                            </div>

                                            {/* Input */}
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={userAnswers[index]}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    disabled={isCompleted || isLocked}
                                                    placeholder="0 lub 1"
                                                    maxLength={1}
                                                    className={`
                                                        w-20 font-mono text-center
                                                        ${isCompleted ? 'bg-green-500/10 border-green-500/50' : ''}
                                                    `}
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => checkAnswer(index)}
                                                    disabled={isCompleted || isLocked || !userAnswers[index]}
                                                    variant={isCompleted ? "outline" : "default"}
                                                >
                                                    {isCompleted ? "✓ Poprawne" : "Sprawdź"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Hint button */}
                    <div className="flex justify-between items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHint(true)}
                            className="text-muted-foreground"
                        >
                            💡 Potrzebujesz pomocy?
                        </Button>

                        <Button
                            onClick={checkAllAnswers}
                            disabled={userAnswers.some(a => !a)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            Sprawdź wszystkie odpowiedzi
                        </Button>
                    </div>
                </div>

                {/* Hint dialog */}
                <Dialog open={showHint} onOpenChange={setShowHint}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>💡 Wskazówka - Operacje Logiczne</DialogTitle>
                            <DialogDescription>Podstawowe operacje binarne</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 text-sm">
                            <div className="bg-accent/50 p-3 rounded font-mono text-xs space-y-1">
                                <div><strong>AND:</strong> 1 AND 1 = 1, wszystkie inne = 0</div>
                                <div><strong>OR:</strong> 0 OR 0 = 0, wszystkie inne = 1</div>
                                <div><strong>XOR:</strong> różne wartości = 1, te same = 0</div>
                                <div><strong>NOT:</strong> NOT 1 = 0, NOT 0 = 1</div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Pamiętaj: najpierw oblicz operacje w nawiasach!
                            </p>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setShowHint(false)}>Rozumiem</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DashboardPageLayout>
        )
    }

    // Success screen with kitty reward
    return (
        <DashboardPageLayout header={{ title: "Centrum Bezpieczeństwa", icon: ShieldIcon }}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Success banner */}
                <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <UnlockIcon className="w-16 h-16 text-green-500" />
                            <SparklesIcon className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-green-400">
                                🎉 Gratulacje! Test zaliczony!
                            </h2>
                            <p className="text-muted-foreground">
                                Pomyślnie przeszedłeś test bezpieczeństwa. Poniżej znajdziesz swoją nagrodę...
                            </p>
                        </div>
                    </div>
                </div>

                {/* Kitty reward */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold flex items-center justify-center gap-2">

                            <span>Twoja nagroda</span>

                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Za pomyślne ukończenie testu otrzymujesz dostęp do najbardziej strzeżonego zasobu w systemie...
                        </p>
                    </div>

                    {/* Kitty image */}
                    <div className="relative rounded-lg overflow-hidden border-4 border-primary/20 max-w-md mx-auto">
                        <img
                            src="/kot.png"
                            alt="Nagrodowy kotek"
                            className="w-full h-auto"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <p className="text-white text-sm font-medium text-center">
                                🎁 Oficjalny Kotek Bezpieczeństwa Systemowego
                            </p>
                        </div>
                    </div>

                    {/* Fun facts */}
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium text-purple-400">💜 Ciekawostki o kotach:</p>
                        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                            <li>Koty śpią średnio 13-16 godzin dziennie (może dlatego serwery też potrzebują restartu?)</li>
                            <li>Kot potrafi skoczyć do 6 razy wyżej niż jego wzrost (jak dobry exploit!)</li>
                            <li>W starożytnym Egipcie koty były uważane za święte zwierzęta (jak root access)</li>
                        </ul>
                    </div>
                </div>

                {/* Additional info */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <ShieldIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-muted-foreground space-y-1">
                            <p className="font-medium text-blue-400">Informacja systemowa:</p>
                            <p>
                                Dostęp do Centrum Bezpieczeństwa został przyznany. Twoje uprawnienia zostały zaktualizowane.
                                Pamiętaj, że z wielką mocą przychodzi wielka odpowiedzialność... i koty.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardPageLayout>
    )
}