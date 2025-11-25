"use client"
import { useState, useEffect } from "react"
import DashboardPageLayout from "@/components/dashboard/layout"
import DashboardCard from "@/components/dashboard/card"
import SectionLogin from "@/components/auth/SectionLogin"
import mockDataJson from "@/mock.json"
import type { EmailItem, MockData } from "@/types/dashboard"
import { InboxIcon, ShieldCheckIcon, InfoIcon, LockIcon, ArrowLeftIcon, ExternalLinkIcon, ImageIcon } from "lucide-react"
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
                <div className="flex justify-center items-center bg-background/50 backdrop-blur-xl">
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
                                            <ImageIcon className="w-3 h-3 mr-1" />
                                            LSB v1.0
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="max-w-xs">
                                        <p className="text-xs">
                                            <strong>LSB Steganography v1.0</strong><br/>
                                            Messages hidden in image pixels using Least Significant Bit technique.
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
                                {/* Subtle pixel pattern overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none bg-[repeating-conic-gradient(#000_0%_25%,transparent_0%_50%)]" style={{backgroundSize: '4px 4px'}} />

                                {/* Nagłówek */}
                                <div className="flex items-center gap-2 justify-between">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <InboxIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm font-semibold text-foreground truncate">
                                            {email.subject}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <ImageIcon className="w-3.5 h-3.5 text-amber-500/60 group-hover:text-amber-500 transition-colors" />
                                        <span className="text-[10px] text-amber-500/60 group-hover:text-amber-500 font-mono transition-colors">
                                            STEG
                                        </span>
                                    </div>
                                </div>

                                {/* Treść (image reference) */}
                                <div className="relative">
                                    <p className="text-xs text-muted-foreground/70 line-clamp-2 leading-relaxed">
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
                <LSBTutorialModal
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
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Hidden Message
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
                                LSB STEGANOGRAPHY
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

                    {/* Email Body - Image with hidden message */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Image with Hidden Message
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowTutorial(true)}
                                className="h-7 text-xs"
                            >
                                <InfoIcon className="w-3 h-3 mr-1" />
                                How to extract?
                            </Button>
                        </div>

                        <div className="bg-accent/50 rounded-lg p-4 border border-amber-500/20 relative overflow-hidden">
                            {/* Subtle pixel pattern in background */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                                <div className="absolute inset-0 bg-[repeating-conic-gradient(#000_0%_25%,transparent_0%_50%)]" style={{backgroundSize: '8px 8px'}} />
                            </div>

                            <div className="relative space-y-3">
                                {/* Image reference */}
                                <div className="text-xs text-amber-500/70 font-mono mb-2">
                                    // Image file: {selectedEmail.content}
                                </div>

                                {/* Image placeholder */}
                                <div className="bg-background rounded border border-border/50 p-8 flex flex-col items-center justify-center gap-3 min-h-[200px]">
                                    <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                                    <div className="text-center">
                                        <p className="font-mono text-sm text-foreground/80">
                                            {selectedEmail.content}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Download and analyze to extract hidden message
                                        </p>
                                    </div>
                                </div>

                                {/* Steganography indicator */}
                                <div className="flex items-center justify-end gap-2 text-[10px] text-amber-500/50 font-mono pt-2">
                                    <ImageIcon className="w-3 h-3" />
                                    <span>LSB STEGANOGRAPHY v1.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Extraction hint */}
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-muted-foreground">
                                    <strong className="text-blue-400">Need to extract the hidden message?</strong><br/>
                                    Use the <code className="text-foreground/80 bg-accent px-1 rounded">get_emails(id)</code> function to get image data,
                                    then extract the Least Significant Bits from pixel values to reveal the hidden text.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardCard>

            {/* Tutorial Modal */}
            <LSBTutorialModal
                open={showTutorial}
                onOpenChange={setShowTutorial}
            />
        </DashboardPageLayout>
    )
}

// LSB Tutorial Modal Component
function LSBTutorialModal({
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
                               scrollbarWidth: "none",
                               msOverflowStyle: "none"
                           }}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ShieldCheckIcon className="w-6 h-6 text-amber-500" />
                        LSB Steganography v1.0
                    </DialogTitle>
                    <DialogDescription>
                        Hiding messages in images using Least Significant Bit technique
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 text-sm">
                    {/* How it works */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-base text-foreground">🔐 How It Works</h3>

                        <div className="bg-accent rounded-lg p-4 space-y-3 border border-border/50">
                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">PIXEL COLOR VALUE:</div>
                                <code className="text-sm text-foreground bg-background px-2 py-1 rounded font-mono">
                                    RGB: (11010110, 11001100, 10110101)
                                </code>
                            </div>

                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">HIDDEN MESSAGE BIT:</div>
                                <code className="text-sm text-foreground bg-background px-2 py-1 rounded font-mono">
                                    1
                                </code>
                            </div>

                            <div>
                                <div className="text-xs text-muted-foreground font-medium mb-1">MODIFIED PIXEL:</div>
                                <code className="text-sm text-foreground bg-background px-2 py-1 rounded font-mono">
                                    RGB: (1101011<span className="text-amber-500">1</span>, 11001100, 10110101)
                                </code>
                            </div>
                        </div>

                        <div className="space-y-3 pl-2">
                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">1</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Convert Message to Binary</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Each character is converted to its binary representation (8 bits)
                                        <br/>Example: <code className="text-xs bg-accent px-1 rounded">'A'</code> = <code className="text-xs bg-accent px-1 rounded">01000001</code>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">2</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Modify Least Significant Bits</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Replace the last bit of each pixel's RGB values with message bits
                                        <br/>This creates imperceptible changes to human eyes (±1 in color value)
                                    </p>
                                    <div className="mt-2 space-y-1 text-xs font-mono bg-background p-2 rounded">
                                        <div>Original: 11010110 → Modified: 1101011<span className="text-amber-500">1</span></div>
                                        <div>Change: 214 → 215 (invisible to human eye)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="default" className="mt-0.5 flex-shrink-0">3</Badge>
                                <div className="flex-1">
                                    <strong className="text-foreground">Extract Hidden Message</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Read LSB from each pixel, reconstruct binary data, convert back to text
                                    </p>
                                    <div className="mt-2 space-y-1 text-xs font-mono bg-background p-2 rounded">
                                        <div>LSBs collected: 01000001 → 'A'</div>
                                        <div>Continue for all message bits...</div>
                                    </div>
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
                                <div><span className="text-blue-400">get_emails</span>(id) → returns image data with hidden message</div>
                                <div><span className="text-blue-400">extract_lsb</span>(image_data) → helper to extract LSBs</div>
                            </div>
                            <p className="text-muted-foreground pt-2">
                                Your task: Extract the least significant bit from each pixel's color channels,
                                reconstruct the binary message, and convert it back to readable text.
                            </p>
                        </div>
                    </div>

                    {/* Visual example */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base text-foreground">👁️ Visual Example</h3>
                        <div className="bg-accent rounded-lg p-4 border border-border/50">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-xs font-medium text-muted-foreground">ORIGINAL IMAGE</div>
                                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 h-24 rounded" />
                                    <div className="text-[10px] text-muted-foreground font-mono">
                                        No visible difference
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs font-medium text-muted-foreground">WITH HIDDEN MESSAGE</div>
                                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 h-24 rounded" />
                                    <div className="text-[10px] text-amber-500 font-mono">
                                        ↑ Message hidden in LSBs
                                    </div>
                                </div>
                            </div>
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
                                LSB steganography is virtually undetectable to the human eye because changing the least significant bit
                                only modifies color values by ±1. A pixel with RGB(200, 150, 100) becomes RGB(201, 151, 101) -
                                completely invisible to us, but it can store entire messages!
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                        Got it! Let me extract
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}