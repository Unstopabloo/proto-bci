"use client";

import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "ai/react";

export function UIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ScrollArea className="h-[80dvh] w-full max-w-2xl p-4 [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-10">
        {messages.map(m => (
          <div key={m.id}>
            {m.role === 'user' ? <UserMessage content={m.content} /> : <AIMessage content={m.content} />}
          </div>
        ))}
      </ScrollArea>
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-8 border border-gray-300 rounded-2xl shadow-xl"
          value={input}
          placeholder="Escribe tu mensaje..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

function UserMessage({ content }: { content: string }) {
  return <div className="p-4 max-w-[80%] bg-gray-50 rounded-2xl shadow-md">{content}</div>
}

function AIMessage({ content }: { content: string }) {
  return <div className="max-w-[80%] text-end text-pretty">{content}</div>
}