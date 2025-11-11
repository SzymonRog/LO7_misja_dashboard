import Image from "next/image";
import type {ChatConversation, ChatUser} from "@/types/chat";
import { formatDate } from "./utils";
import { mockChatData } from "@/data/chat-mock";
import { cn } from "@/lib/utils";

interface ChatPreviewProps {
  conversation: ChatConversation;
  onOpenConversation: (conversationId: string) => void;
}

export default function ChatPreview({
  conversation,
  onOpenConversation,
}: ChatPreviewProps) {
  const user = conversation.participants.filter(
    (p) => p.id !== mockChatData.currentUser.id
  );

  if (!user) return null;

  return (
    <div
      className="group flex items-center gap-1 p-3 cursor-pointer"
      onClick={() => onOpenConversation(conversation.id)}
    >
      <div className="relative">
        <Image
          src={user[0].avatar}
          alt={user.map((u : ChatUser)=> u.name).join(", ")}
          width={96}
          height={96}
          className="rounded-lg size-14"
        />
        {conversation.unreadCount > 0 && (
          <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs size-5 rounded flex items-center justify-center font-semibold border-2 border-background">
            {conversation.unreadCount}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 group-hover:bg-accent px-2 py-1 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h3 className="font-display text-lg">{user.map((u : ChatUser)=> u.name).join(", ")}</h3>
            <p className="text-xs text-foreground/50">{user.length > 1 ? "" :  user[0].username }</p>
          </div>
          <span className="text-xs text-foreground/40">
            {conversation.lastMessage?.timestamp
                ? formatDate(conversation.lastMessage.timestamp)
                : "Brak wiadomości"}
          </span>
        </div>
        <p
          className={cn(
            "text-sm text-foreground/70 truncate mt-1",
            conversation.unreadCount > 0 && "font-bold text-foreground"
          )}
        >
            {conversation.lastMessage?.timestamp
                ? formatDate(conversation.lastMessage.timestamp)
                : "Brak wiadomości"}
        </p>
      </div>
    </div>
  );
}
