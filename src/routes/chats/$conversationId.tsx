import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chats/$conversationId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chats/$conversationId"!</div>
}
