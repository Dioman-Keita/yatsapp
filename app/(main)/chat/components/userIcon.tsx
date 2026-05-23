import { profileNameAb } from "@/functions/string_function";
import { AvatarWithBadge } from "./avatarWithBadge";
import { cn } from "@/lib/utils";
interface inconeType {
    name: string;
    description?: string;
    offlineTime?: string;
    image?: string | null;
    className?: string;
}

export default function UserIcon({ name, offlineTime, image, className }: inconeType) {
    return (
        <div className={cn("w-full transition-colors", className)}>
            <div className="flex flex-row items-center gap-3 my-2">
                <AvatarWithBadge CN={profileNameAb(name)} image={`${image}`} />
                <div className="flex flex-1 items-center justify-between min-w-0">
                    <div className="truncate">
                        <p className="text-sm md:text-base font-bold text-primary truncate">{name}</p>
                    </div>
                    {offlineTime && (
                        <div className="ml-2 text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                            <p>{offlineTime}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
