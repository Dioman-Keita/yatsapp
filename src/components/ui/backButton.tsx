"use client"

import { useCanGoBack, useRouter } from "@tanstack/react-router"
import { ChevronLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => {
          if (canGoBack) {
            router.history.back()
            return
          }

          router.navigate({ to: "/" })
        }}
      >
        <ChevronLeft />
      </button>
    </div>
  )
}
