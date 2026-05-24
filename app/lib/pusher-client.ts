import PusherClinet from 'pusher-js'
export const pusherclient = new PusherClinet(
    process.env.pusher_key as string
,{
cluster:process.env.pusher_cluser as string
})