import type { ChatData, ChatConversation, ChatUser } from "@/types/chat";

// Current user (JOYBOY based on the screenshot)
const currentUser: ChatUser = {
  id: "joyboy",
  name: "JOYBOY",
  username: "@JOYBOY",
  avatar: "/avatars/user_joyboy.png",
  isOnline: true,
};

// Other users
const users: Record<string, ChatUser> = {
  prof: {
      id: "prof",
      name: "profesor",
      username: "@Pop",
      avatar: "/avatars/user_pek.png",
      isOnline: false,
  },
};

// Mock conversations
const conversations: ChatConversation[] = [
    {
        id: "conv-prof",
        participants: [currentUser, users.prof],
        unreadCount: 0,
        lastMessage: {
            id: "msg-krimson-1",
            content: "10010010010101001010101",
            timestamp: "2024-07-10T16:00:00Z",
            senderId: "prof",
            isFromCurrentUser: true,
        },
        messages: [
            {
                id: "msg-krimson-1",
                content: "10010010010101001010101",
                timestamp: "2024-07-10T16:00:00Z",
                senderId: "krimson",
                isFromCurrentUser: true,
            },
        ],
    },
];

export const mockChatData: ChatData = {
  currentUser,
  conversations,
};
