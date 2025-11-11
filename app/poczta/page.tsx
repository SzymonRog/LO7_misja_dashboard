"use client"
import { useState, useEffect } from "react"
import DashboardPageLayout from "@/components/dashboard/layout"
import DashboardCard from "@/components/dashboard/card"
import SectionLogin from "@/components/auth/SectionLoginProps"
import mockDataJson from "@/mock.json"
import type { EmailItem, MockData } from "@/types/dashboard"
import { InboxIcon, ShieldCheckIcon, InfoIcon, LockIcon, ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"
import EmailIcon from "@/components/icons/email"
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

const mockData = mockDataJson as MockData

export default function EmailPage() {
    const [unlocked, setUnlocked] = useState(false)
    const [emails, setEmails] = useState<EmailItem[]>([])
    const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null)
    const [showTutorial, setShowTutorial] = useState(false)

    useEffect(() => {
        setEmails(mockData.emails)
    }, [])

    if (!unlocked) {
        return (
            <DashboardPageLayout header={{ title: "Login", icon: EmailIcon }}>
                <div className="flex justify-center bg-background/50 backdrop-blur-xl">
                    <SectionLogin
                        sectionId="email"
                        label="Emails"
                        description="Login to your email account by providing your email"
                        placeholder="Enter your email"
                        onUnlock={() => setUnlocked(true)}
                        haveRules={false}
                    />
                </div>
            </DashboardPageLayout>
        )
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Email list view
    if (!selectedEmail) {
        return (
            <DashboardPageLayout header={{ title: "Email", icon: EmailIcon }}>
                <DashboardCard
                    title="INBOX"
                    intent="success"
                    addon={
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant="outline"
                                            className="text-xs border-amber-500/50 text-amber-400/80 font-medium tracking-wide cursor-help hover:border-amber-500 hover:text-amber-400 transition-colors"
                                        >
                                            <LockIcon className="w-3 h-3 mr-1" />
                                            CC v2.0
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="max-w-xs">
                                        <p className="text-xs">
                                            <strong>Constitutio Cipher v2.0</strong><br/>
                                            All emails encrypted using Constitution-based algorithm.
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
                            <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400/80 font-medium tracking-wide">
                                ID: EMAILS
                            </Badge>
                        </div>
                    }
                >
                    <div className="space-y-3">
                        {emails.map((email) => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className="group flex flex-col gap-2 p-3 rounded-lg bg-accent border border-border/30 hover:border-primary/50 transition-all shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden"
                            >
                                {/* Subtle encrypted pattern overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_20px)]" />

                                {/* Nagłówek */}
                                <div className="flex items-center gap-2 justify-between">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <InboxIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm font-semibold text-foreground truncate">
                                            {email.subject}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 group-hover:bg-amber-500 transition-colors" />
                                        <span className="text-[10px] text-amber-500/60 group-hover:text-amber-500 font-mono transition-colors">
                                            ENC
                                        </span>
                                    </div>
                                </div>

                                {/* Treść (encrypted preview) */}
                                <div className="relative">
                                    <p className="text-xs text-muted-foreground/70 line-clamp-2 font-mono leading-relaxed">
                                        {email.preview}
                                    </p>
                                </div>

                                {/* Nadawca i data */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span className="font-medium text-foreground/80">
                                        {email.source}
                                    </span>
                                    <span className="italic text-[11px]">{formatDate(email.date)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardCard>

                {/* Tutorial Modal */}
                <CipherTutorialModal
                    open={showTutorial}
                    onOpenChange={setShowTutorial}
                />
            </DashboardPageLayout>
        )
    }

    // Email detail view
    return (
        <DashboardPageLayout header={{ title: "Email", icon: EmailIcon }}>
            <DashboardCard
                title="EMAIL CONTENT"
                intent="success"
                addon={
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedEmail(null)}
                            className="h-7 px-2"
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-1" />
                            Back to Inbox
                        </Button>
                        <Badge
                            variant="outline"
                            className="text-xs border-amber-500/50 text-amber-400/80 font-medium cursor-pointer hover:border-amber-500 hover:text-amber-400 transition-colors"
                            onClick={() => setShowTutorial(true)}
                        >
                            <LockIcon className="w-3 h-3 mr-1" />
                            Encrypted
                        </Badge>
                    </div>
                }
            >
                <div className="space-y-4">
                    {/* Email Header */}
                    <div className="space-y-3 pb-4 border-b border-border/50">
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-lg font-semibold text-foreground">
                                {selectedEmail.subject}
                            </h2>
                            <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/30 flex-shrink-0">
                                CONSTITUTIO CIPHER
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-1.5 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground w-16">From:</span>
                                <span className="font-mono text-foreground/90">{selectedEmail.source}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground w-16">To:</span>
                                <span className="font-mono text-foreground/90">{selectedEmail.to}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground w-16">Date:</span>
                                <span className="text-foreground/90">{formatDate(selectedEmail.date)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Email Body - Encrypted */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Encrypted Content
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowTutorial(true)}
                                className="h-7 text-xs"
                            >
                                <InfoIcon className="w-3 h-3 mr-1" />
                                How to decrypt?
                            </Button>
                        </div>

                        <div className="bg-accent/50 rounded-lg p-4 border border-amber-500/20 relative overflow-hidden">
                            {/* Subtle lock pattern in background */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,currentColor_20px,currentColor_40px)]" />
                            </div>

                            <div className="relative space-y-3">
                                {/* Article hint */}
                                <div className="text-xs text-amber-500/70 font-mono mb-2">
                                    // Reference: {selectedEmail.subject.match(/Art\.\s*\d+/)?.[0] || "Article number in subject"}
                                </div>

                                {/* Encrypted content */}
                                <pre className="font-mono text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                                    {selectedEmail.content}
                                </pre>

                                {/* Cipher indicator */}
                                <div className="flex items-center justify-end gap-2 text-[10px] text-amber-500/50 font-mono pt-2">
                                    <LockIcon className="w-3 h-3" />
                                    <span>CONSTITUTIO CIPHER v2.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Decryption hint */}
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-muted-foreground">
                                    <strong className="text-blue-400">Need to decrypt this?</strong><br/>
                                    Use the <code className="text-foreground/80 bg-accent px-1 rounded">get_emails(id)</code> and <code className="text-foreground/80 bg-accent px-1 rounded">get_paragraph(num)</code> functions in your code challenge.
                                    Each number represents <code className="text-foreground/80 bg-accent px-1 rounded">sentence.word</code> position in the referenced Constitution article.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardCard>

            {/* Tutorial Modal */}
            <CipherTutorialModal
                open={showTutorial}
                onOpenChange={setShowTutorial}
            />
        </DashboardPageLayout>
    )
}

// Tutorial Modal Component
function CipherTutorialModal({
                                 open,
                                 onOpenChange
                             }: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-accent/10"
                           style={{
                               scrollbarWidth: "none", // Firefox
                               msOverflowStyle: "none" // IE 10+
                           }}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ShieldCheckIcon className="w-6 h-6 text-amber-500" />
                        Constitutio Cipher v2.0
                    </DialogTitle>
                    <DialogDescription>
                        Book cipher using the Polish Constitution as encryption key
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 text-sm">
                    {/* How it works */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-base text-foreground">🔐 How It Works</h3>

                        <div className="bg-accent rounded-lg p-4 space-y-3 border border-border/50">
                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">SUBJECT:</div>
                                <code className="text-sm text-foreground bg-background px-2 py-1 rounded">
                                    "Meeting - Art. 54"
                                </code>
                            </div>

                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">ENCRYPTED BODY:</div>
                                <code className="text-sm text-foreground bg-background px-2 py-1 rounded font-mono">
                                    "2.1 2.4 2.7 1.3"
                                </code>
                            </div>
                        </div>

                        <div className="space-y-3 pl-2">
                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">1</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Extract Article Number</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Subject contains <code className="text-xs bg-accent px-1 rounded">"Art. 54"</code> → Use Article 54 of the Polish Constitution as decryption key
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">2</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Decode Format: sentence.word</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Each number pair represents: <code className="text-xs bg-accent px-1 rounded">sentence_number.word_position</code>
                                        <br/>Example: <code className="text-xs bg-accent px-1 rounded">"2.1"</code> = Sentence 2, Word 1
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">3</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Extract Words from Constitution</strong>
                                    <div className="mt-2 space-y-1 text-xs font-mono bg-background p-2 rounded">
                                        <div>2.1 → "Każdemu"</div>
                                        <div>2.4 → "zapewnia"</div>
                                        <div>2.7 → "wolność"</div>
                                        <div>1.3 → "wyrażania"</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">4</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Reconstruct Message</strong>
                                    <p className="text-foreground font-semibold mt-2 bg-green-500/10 border border-green-500/20 p-2 rounded">
                                        ✓ "Każdemu zapewnia wolność wyrażania"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Implementation hint */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base text-foreground">💻 Implementation</h3>
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-xs space-y-2">
                            <p className="text-muted-foreground">
                                <strong className="text-blue-400">Available functions:</strong>
                            </p>
                            <div className="space-y-1 font-mono text-foreground/80 bg-background p-2 rounded">
                                <div><span className="text-blue-400">get_emails</span>(id) → returns list of encrypted emails</div>
                                <div><span className="text-blue-400">get_paragraph</span>(article_num) → returns Constitution article text</div>
                            </div>
                            <p className="text-muted-foreground pt-2">
                                Your task: Parse article text, split into sentences and words, then map each <code className="bg-accent px-1 rounded">sentence.word</code> code to actual words.
                            </p>
                        </div>
                    </div>

                    {/* Video tutorial placeholder */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base text-foreground">🎥 Video Tutorial</h3>
                        <div className="bg-accent rounded-lg p-6 border border-border/50 flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <ExternalLinkIcon className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-center text-muted-foreground text-sm">
                                Visual explanation with animation coming soon!
                            </p>
                            <Button variant="outline" size="sm" disabled className="text-xs">
                                Watch Tutorial on YouTube
                            </Button>
                        </div>
                    </div>

                    {/* Fun fact */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <div className="text-xs text-muted-foreground">
                                <strong className="text-amber-400">Did you know?</strong><br/>
                                This is a variation of the <em>book cipher</em> - one of the oldest encryption methods.
                                Using the Constitution as the key adds a layer of symbolic meaning:
                                democracy's foundation becomes the tool to expose its corruption.
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                        Got it! Let me decrypt
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}