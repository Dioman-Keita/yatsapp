import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface avatarType {
    image: string;
    CN: string | undefined;
    className?: string;
}
export function AvatarWithBadge({ image, CN, className }: avatarType) {
    return (
        <Avatar className={`w-10 h-10 border border-secondary ${className} `}>
            <AvatarImage src={`${image}`} alt="@shadcn" />
            <AvatarFallback>{CN}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
    );
}
