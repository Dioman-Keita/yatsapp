import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { AudioLinesIcon, PlusIcon, Send } from "lucide-react";

export function ChatButton() {
    return (
        <div className="flex items-end gap-2 w-full">
            <Button variant="outline" size="icon" className="shrink-0 mb-1">
                <PlusIcon className="size-5" />
            </Button>
            <InputGroup className="flex-1 min-w-0 bg-secondary/20">
                <Textarea className="min-h-[40px] max-h-[120px] py-2 resize-none" placeholder="Type a message..." />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <InputGroupAddon align="inline-end">
                            <AudioLinesIcon className="size-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
                        </InputGroupAddon>
                    </TooltipTrigger>
                    <TooltipContent>Voice Mode</TooltipContent>
                </Tooltip>
            </InputGroup>
            <Button variant="outline" size="icon" className="shrink-0 mb-1">
                <Send className="size-5" />
            </Button>
        </div>
    );
}
