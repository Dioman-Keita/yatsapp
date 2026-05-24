import { PusherServer } from "@/app/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

  const send=  await PusherServer.trigger("chat-chanel","new-message",{
        message:"hello pusher",
        sendID:"234bankai"
    })
    return NextResponse.json({message:send})
}