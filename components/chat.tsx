"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function UIChat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();
  const [isConversationStarted, setIsConversationStarted] = useState(false);

  const startConversation = () => {
    setIsConversationStarted(true);
    setMessages([
      {
        id: "initial-message",
        role: "assistant",
        content: "¡Hola! Soy tu mentor en esta plataforma de entrenamiento y assessment digital. Estoy aquí para ayudarte a desarrollar tus competencias a través de simulaciones basadas en casos de negocio. Para comenzar, me gustaría conocerte un poco mejor. ¿Podrías contarme cuál es tu cargo actual y cuál es el objetivo principal de tu rol?",
      },
    ]);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!isConversationStarted && messages.length === 0 ? (
        <Button
          onClick={startConversation}
          className="relative mt-8 px-6 py-3 h-32 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Iniciar interacción con tu Mentor
          <div className="absolute bottom-4 opacity-50 right-4">
            <svg id="Capa_1" className="fill-[#f9f9f9] stroke-none" viewBox="0 0 168.56 168.56">
              <path className="cls-1" d="m25.58,146.43c-4.64,6.92,1.58,14.58,8.41,14.58h-14.93c-7.09,0-11.78-8.71-8.93-16.51L55.89,56.43c3.98-7.62,12.96-8.45,17.87-1.62l13.62,18.96-5.08,5.96-55.83,65.56c-.31.39-.61.74-.88,1.14Z" />
              <path className="cls-1" d="m159.28,19.08v134.27c-.04,5.3-6.87,7.58-10.38,3.55l-41.03-46.81c-1.58-1.8-3.72-2.76-5.87-2.8-.26,0-.57-.04-.83.04-1.62.04-3.15.66-4.47,1.8l-56.45,49.44c-1.93,1.71-4.12,2.45-6.26,2.45-6.83,0-13.05-7.66-8.41-14.58.26-.39.57-.74.88-1.14l55.83-65.56,5.08-5.96,20.06-23.6,34.11-39.11c6.44-7.4,17.74-2.32,17.74,8.01Z" />
            </svg>
          </div>
        </Button>
      ) : (
        <>
          <ScrollArea className="h-[80dvh] w-full max-w-2xl p-4 [&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-10">
            {messages.map((m) => (
              <div key={m.id} className="flex flex-col gap-4 last:mb-20 last:border-none">
                {m.role === "user" ? (
                  <UserMessage content={m.content} />
                ) : (
                  <AIMessage content={m.content} />
                )}
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
        </>
      )}
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  const { user } = useUser();
  return (
    <div className="flex items-start gap-4 p-4 pb-10 max-w-[80%] border-b border-gray-100">
      <div className="flex size-8 items-center gap-2 rounded-full overflow-hidden">
        <img src={user?.imageUrl} alt="User" />
      </div>
      {content}
    </div>
  );
}

function AIMessage({ content }: { content: string }) {
  return (
    <div className="max-w-[80%] text-foreground/80 text-pretty pb-10 border-b border-gray-100">
      {content}
    </div>
  );
}

