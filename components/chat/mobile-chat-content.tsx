"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useChatState } from "./use-chat-state";
import { ChatHeader } from "./chat-header";
import ChatPreview from "./chat-preview";
import ChatConversation from "./chat-conversation";
import PlusIcon from "../icons/plus";

export function MobileChatContent() {
  const {
    chatState,
    conversations,
    newMessage,
    setNewMessage,
    activeConversation,
    handleSendMessage,
    openConversation,
    goBack,
  } = useChatState();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <ChatHeader
        variant="mobile"
        showBackButton={chatState.state === "conversation"}
        onBackClick={goBack}
        className="rounded-none border-b border-border"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <AnimatePresence mode="wait">
          {chatState.state === "conversation" && activeConversation ? (
            <ChatConversation
              key="conversation"
              activeConversation={activeConversation!}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              {/* Conversations List */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                {conversations.map((conversation) => (
                  <ChatPreview
                    key={conversation.id}
                    conversation={conversation}
                    onOpenConversation={openConversation}
                  />
                ))}

                {/* Footer */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
