import { FaY } from "react-icons/fa6";

export default async function Page() {
    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-background justify-center items-center">
            <div className="flex  items-center justify-center size-10 w-100 h-100 rounded-full bg-primary text-primary-foreground shadow-lg shrink-0">
                <FaY className="size-20" />
            </div>
        </div>
    );
}
