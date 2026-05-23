import { MoreVertical, PhoneCall, VideoIcon } from "lucide-react";

import BackButton from "@/components/ui/backButton";
import UserIcon from "@/app/(main)/chat/components/userIcon";
import ChatText from "@/app/(main)/chat/components/chatText";
import { ChatButton } from "@/app/(main)/chat/components/chatIButton";

export default async function Page() {
    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-background w-full">
            <header className="fixed top-0 right-0 left-0 lg:relative z-30 h-16 border-b flex flex-row items-center px-4 md:px-8 bg-background/95 backdrop-blur-md transition-all duration-300">
                <BackButton />
                <div className="flex-1 min-w-0">
                    <UserIcon name="name" />
                </div>
                <div className="flex flex-row gap-4 items-center shrink-0">
                    <VideoIcon className="size-5 md:size-6 cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
                    <PhoneCall className="size-5 md:size-6 cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
                    <MoreVertical className="size-5 md:size-6 cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pt-16 pb-24 px-4 md:px-6 lg:px-8 noScrollBar scroll-smooth">
                <div className="max-w-4xl mx-auto w-full pt-4">
                    <ChatText />
                </div>
            </main>

            <footer className="fixed bottom-15 right-0 left-0 md:left-auto lg:relative lg:bottom-5  z-30 p-4 bg-background/95 backdrop-blur-md border-t lg:border-t-0 transition-all duration-300">
                <div className="max-w-3xl xl:max-w-4xl mx-auto w-full">
                    <ChatButton />
                </div>
            </footer>
        </div>
    );
}
