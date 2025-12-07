"use client"
import { useState, useEffect } from "react"
import { InboxIcon, BookOpenIcon, InfoIcon, LockIcon, ArrowLeftIcon, DownloadIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import mockDataJson from "@/mock.json";
import DashboardPageLayout from "@/components/dashboard/layout";
import {MailIcon} from "lucide-react";

interface EmailItem {
    id: string
    subject: string
    to: string
    body: string
    from: string
    date: string
    title: string
    encrypted: boolean
}

const mockEmails = mockDataJson.emails as EmailItem[]

export default function EmailPage() {
    const [emails, setEmails] = useState<EmailItem[]>([])
    const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null)
    const [showTutorial, setShowTutorial] = useState(false)

    useEffect(() => {
        setEmails(mockEmails)
    }, [])

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }

    // Email list view
    if (!selectedEmail) {
        return (
            <DashboardPageLayout header={{title: "Email Inbox", icon: MailIcon}}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant="outline"
                                            className="text-xs border-amber-500/50 text-amber-400/80 font-medium tracking-wide cursor-help hover:border-amber-500 hover:text-amber-400 transition-colors"
                                        >
                                            <BookOpenIcon className="w-3 h-3 mr-1"/>
                                            BOOK CIPHER
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="max-w-xs">
                                        <p className="text-xs">
                                            <strong>Book Cipher v2.0</strong><br/>
                                            Messages encoded using Agenda Miasta Demoskratos
                                            <button
                                                onClick={() => setShowTutorial(true)}
                                                className="text-primary hover:underline mt-1 block"
                                            >
                                                Learn how it works →
                                            </button>
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                            {emails.length} messages
                        </Badge>
                    </div>

                    {/* Email List */}
                    <div className="space-y-3">
                        {emails.map((email) => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className="group flex flex-col gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md cursor-pointer"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between gap-2">

                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        {/* 🔳 Kwadracik z ID */}
                                        <div className="
                        w-6 h-6 rounded-sm
                        bg-primary border border-primary/80
                        text-[10px] font-mono text-white
                        flex items-center justify-center
                        group-hover:bg-primary/50 group-hover:border-primary
                        transition-all
                        flex-shrink-0
                    ">
                                            {email.id}
                                        </div>

                                        <span className="text-sm font-semibold text-foreground truncate">
                        {email.subject}
                    </span>
                                    </div>

                                    {email.encrypted && (
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <LockIcon
                                                className="w-3.5 h-3.5 text-amber-500/60 group-hover:text-amber-500 transition-colors"/>
                                            <span
                                                className="text-[10px] text-amber-500/60 group-hover:text-amber-500 font-mono transition-colors">
                            ENCRYPTED
                        </span>
                                        </div>
                                    )}
                                </div>

                                {/* Preview */}
                                <p className="text-xs text-muted-foreground/70 line-clamp-2 font-mono">
                                    {email.encrypted
                                        ? email.body.substring(0, 50) + "..."
                                        : email.body.substring(0, 100) + "..."
                                    }
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80 truncate flex-1 mr-2">
                    {email.from}
                </span>
                                    <span className="italic text-[11px] flex-shrink-0">
                    {formatDate(email.date)}
                </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <BookCipherTutorial open={showTutorial} onOpenChange={setShowTutorial}/>
            </DashboardPageLayout>
        )
    }

    // Email detail view
    return (
        <DashboardPageLayout header={{title: "Email", icon: MailIcon}}>
            <div className="space-y-4">
                {/* Back button */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEmail(null)}
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2"/>
                        Back to Inbox
                    </Button>

                    {selectedEmail.encrypted && (
                        <Badge
                            variant="outline"
                            className="text-xs border-amber-500/50 text-amber-400/80 cursor-pointer hover:border-amber-500"
                            onClick={() => setShowTutorial(true)}
                        >
                            <BookOpenIcon className="w-3 h-3 mr-1"/>
                            Encoded Message
                        </Badge>
                    )}
                </div>

                {/* Email content */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    {/* Email metadata */}
                    <div className="flex flex-row justify-between">
                        <div className="space-y-3 pb-4 border-b border-border">
                            <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>

                            <div className="space-y-1 text-sm">
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground w-16">From:</span>
                                    <span className="font-mono">{selectedEmail.from}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground w-16">To:</span>
                                    <span className="font-mono">{selectedEmail.to}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground w-16">Date:</span>
                                    <span>{formatDate(selectedEmail.date)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-1 min-w-0 justify-end">
                            <div
                                className="w-15 h-6 rounded-sm bg-primary border border-primary/80 text-[12px] font-mono text-white flex items-center justify-center group-hover:bg-primary/50 group-hover:border-primary transition-all flex-shrink-0">
                                ID: {selectedEmail.id}
                            </div>
                        </div>
                    </div>

                    {/* Email body */}
                    <div className="space-y-3">
                        {selectedEmail.encrypted && (
                            <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">
                                🔒 Encoded with Book Cipher
                            </span>
                                <Button variant="ghost" size="sm" onClick={() => setShowTutorial(true)}>
                                    <InfoIcon className="w-3 h-3 mr-1"/>
                                    How to decode?
                                </Button>
                            </div>
                        )}

                        <div
                            className={selectedEmail.encrypted ? "bg-accent/50 rounded-lg p-4 border border-amber-500/20" : ""}>
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                            {selectedEmail.body}
                        </pre>
                        </div>

                        {selectedEmail.encrypted && (
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"/>
                                    <div className="text-xs text-muted-foreground">
                                        <strong className="text-blue-400">To decode this message:</strong><br/>
                                        Download the Agenda Miasta Demoskratos and use the format SECTION-SENTENCE
                                        (e.g., "1-1" = Section 1, Sentence 1)
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <BookCipherTutorial open={showTutorial} onOpenChange={setShowTutorial}/>
        </DashboardPageLayout>
    );
}


function BookCipherTutorial({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <BookOpenIcon className="w-6 h-6 text-amber-500" />
                        Book Cipher - Agenda Dobrego Obywatela
                    </DialogTitle>
                    <DialogDescription>
                        System szyfrowania oparty na Agendzie Miasta Demoskratos
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 text-sm">
                    {/* How it works */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-base">🔐 Jak działa system szyfrowania?</h3>
                        <div className="space-y-3 pl-2">
                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5">1</Badge>
                                <div>
                                    <strong>Dokument referencyjny</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Wszyscy używają tego samego dokumentu: <strong>Agenda Dobrego Obywatela DemosKratos</strong>.
                                        Dokument składa się z artykułów, które zawierają punkty (zdania).
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5">2</Badge>
                                <div>
                                    <strong>Format tokenu: ARTYKUŁ.PUNKT.SŁOWO</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Każdy token składa się z trzech liczb oddzielonych kropkami:
                                    </p>
                                    <ul className="mt-2 space-y-1 text-xs bg-accent/50 p-2 rounded">
                                        <li><strong>ARTYKUŁ</strong> – numer artykułu w agendzie</li>
                                        <li><strong>PUNKT</strong> – numer punktu (zdania) w artykule</li>
                                        <li><strong>SŁOWO</strong> – numer słowa w tym punkcie</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-2 text-xs">
                                        ⚠️ Uwaga: Punkty i słowa są numerowane od 1, nie od 0!
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5">3</Badge>
                                <div>
                                    <strong>Odczytywanie wiadomości</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Dla każdego tokenu odnajdź odpowiednie słowo w agendzie i połącz wszystkie słowa w wiadomość.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Example */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base">📝 Przykład dekodowania</h3>
                        <div className="bg-accent rounded-lg p-4 border space-y-3">
                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">ZASZYFROWANA WIADOMOŚĆ:</div>
                                <code className="text-sm bg-background px-2 py-1 rounded font-mono block">
                                    1.1.2 1.2.2 18.1.1
                                </code>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs text-muted-foreground font-medium">PROCES DEKODOWANIA:</div>
                                <div className="text-xs space-y-1.5 font-mono bg-background p-3 rounded">
                                    <div className="flex items-start gap-2">
                                        <span className="text-amber-500 flex-shrink-0">1.1.2 →</span>
                                        <div>
                                            <div>Artykuł 1, Punkt 1, Słowo 2</div>
                                            <div className="text-muted-foreground italic mt-0.5">
                                                "Każde <strong className="text-foreground">zadanie</strong> powierzone obywatelowi..."
                                            </div>
                                            <div className="text-green-500 mt-0.5">✓ Słowo: <strong>zadanie</strong></div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <span className="text-amber-500 flex-shrink-0">1.2.2 →</span>
                                        <div>
                                            <div>Artykuł 1, Punkt 2, Słowo 2</div>
                                            <div className="text-muted-foreground italic mt-0.5">
                                                "Działania <strong className="text-foreground">priorytetowe</strong> w administracji..."
                                            </div>
                                            <div className="text-green-500 mt-0.5">✓ Słowo: <strong>priorytetowe</strong></div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <span className="text-amber-500 flex-shrink-0">18.1.1 →</span>
                                        <div>
                                            <div>Artykuł 18, Punkt 1, Słowo 1</div>
                                            <div className="text-muted-foreground italic mt-0.5">
                                                "<strong className="text-foreground">Zmodyfikować</strong> system głosowania..."
                                            </div>
                                            <div className="text-green-500 mt-0.5">✓ Słowo: <strong>zmodyfikować</strong></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">ODSZYFROWANA WIADOMOŚĆ:</div>
                                <code className="text-sm bg-background px-2 py-1 rounded font-mono block text-green-500">
                                    "zadanie priorytetowe zmodyfikować"
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* Download Agenda */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base">📥 Pobierz Agendę</h3>
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Agenda Dobrego Obywatela DemosKratos</div>
                                    <div className="text-xs text-muted-foreground">
                                        Oficjalny dokument miasta (22 artykuły)
                                    </div>
                                </div>
                                <Button variant="default" size="sm">
                                    <a href="/agenda" target="_blank" rel="noreferrer">Przeczytaj Agendę</a>
                                </Button>
                            </div>
                        </div>
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-xs">
                            <div className="flex items-start gap-2">
                                <FileTextIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-blue-400">W kodzie:</strong> Użyj funkcji <code className="bg-accent px-1 rounded">get_emails(['id1', 'id2'])</code> aby pobrać zaszyfrowane emaile,
                                    następnie odczytaj tokeny z pola <code className="bg-accent px-1 rounded">body</code> i odnajdź odpowiadające im słowa w agendzie.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical structure */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base">⚙️ Struktura techniczna</h3>
                        <div className="bg-accent/50 rounded-lg p-3 border text-xs font-mono">
                            <div className="space-y-2">
                                <div className="text-muted-foreground">// Przykładowa struktura emaila:</div>
                                <div className="bg-background p-2 rounded">
                                    {`{
  "id": "67",
  "subject": "[AUTO] Task #8471-VOTE",
  "from": "automated_task_queue_v3@corptech.internal",
  "to": "system_executor@corptech.demo",
  "body": "1.1.2 1.2.2 18.1.1 1.9.15 ..."
}`}
                                </div>
                                <div className="text-amber-500 mt-2">↓ Każdy token w body to ARTYKUŁ.PUNKT.SŁOWO</div>
                            </div>
                        </div>
                    </div>

                    {/* Fun fact */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <div className="text-xs text-muted-foreground">
                                <strong className="text-amber-400">Ciekawostka historyczna:</strong><br/>
                                Book Cipher był używany przez szpiegów podczas rewolucji amerykańskiej (XVIII w.)!
                                Bez dostępu do dokumentu referencyjnego, złamanie szyfru jest praktycznie niemożliwe.
                                W Demoskratos dokumentem jest oficjalna Agenda Miasta - ukryta na oczach wszystkich!
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>
                        Rozumiem! Zacznę dekodować
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
