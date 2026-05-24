"use client";

import { useEffect, useState, useRef } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth_client";
import { getMessagesAction } from "../actions/messageAction";

export default function ChatText() {
    const searchParams = useSearchParams();
    const receiverId = searchParams.get("id");
    const { data: session } = authClient.useSession();
    const [messages, setMessages] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (session?.user?.id && receiverId) {
            getMessagesAction(session.user.id, receiverId).then(setMessages);
        }
    }, [session?.user?.id, receiverId]);

    useEffect(() => {
        if (!session?.user?.id) return;

        const channel = pusherClient.subscribe(`chat-${session.user.id}`);

        channel.bind("new-message", (newMessage: any) => {
            // Only add if the message is from the person we are chatting with
            if (newMessage.senderId === receiverId || newMessage.receiverId === receiverId) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            pusherClient.unsubscribe(`chat-${session.user.id}`);
        };
    }, [session?.user?.id, receiverId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!receiverId) return <div className="text-center p-10">Sélectionnez un ami pour discuter</div>;

    return (
        <div className="flex flex-col gap-4 overflow-y-auto noScrollBar pb-20">
            {messages.map((message) => {
                const isMe = message.senderId === session?.user?.id;
                return (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 max-w-[80%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex-none ${isMe ? "bg-primary" : "bg-blue-500"}`} />
                        <div className={`flex flex-col ${isMe ? "items-end" : ""}`}>
                            <span className="text-xs text-gray-400 mx-1 mb-1">
                                {isMe ? "You" : message.sender?.name} • {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className={`p-3 rounded-2xl ${isMe ? "bg-primary/50 rounded-tr-none" : "bg-[#23232f] rounded-tl-none"}`}>
                                <p className="text-sm text-white">{message.content}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={scrollRef} />
        </div>
    );
}
