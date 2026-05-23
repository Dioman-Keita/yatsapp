export default function ChatText() {
    return (
        <div className=" overflow-y-scroll noScrollBar">
            <div className="flex items-start gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-none" />
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 ml-1 mb-1">Anthony Lewis • 08:00 AM</span>
                    <div className="bg-[#23232f] p-3 rounded-2xl rounded-tl-none">
                        <p className="text-sm">
                            Hi John, I wanted to update you on a new company policy regarding remote work.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary flex-none" />
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 mr-1 mb-1">08:00 AM • You</span>
                    <div className="bg-primary/50 p-3 rounded-2xl rounded-tr-none">
                        <p className="text-sm text-white">Sure, Mike. What's the new policy?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
