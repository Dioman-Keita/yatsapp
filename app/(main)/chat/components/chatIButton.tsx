"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { AudioLinesIcon, PlusIcon, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth_client";
import { sendMessageAction } from "../actions/messageAction";

export function ChatButton() {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const receiverId = searchParams.get("id");
    const { data: session } = authClient.useSession();

    const handleSend = async () => {
        if (!content.trim() || !receiverId || !session?.user?.id || isLoading) return;

        setIsLoading(true);
        try {
            const result = await sendMessageAction(session.user.id, receiverId, content);
            if (result.success) {
                setContent("");
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!receiverId) return null;

    return (
        <div className="flex items-end gap-2 w-full">
            <InputGroup className="flex-1 min-w-0 bg-secondary/20">
                <Textarea
                    className="min-h-[40px] max-h-[120px] py-2 resize-none"
                    placeholder="Type a message..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
            </InputGroup>
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 mb-1"
                onClick={handleSend}
                disabled={isLoading || !content.trim()}>
                <Send className="size-5" />
            </Button>
        </div>
    );
}
