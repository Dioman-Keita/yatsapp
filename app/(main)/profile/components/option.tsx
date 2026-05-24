export default function Option({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">{icon}</div>
            <div className="flex flex-col">
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
            </div>
        </div>
    );
}
