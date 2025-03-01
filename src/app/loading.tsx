import { Icons } from "@/components/icons"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
      <h2 className="mt-4 text-xl font-semibold">Loading...</h2>
      <p className="text-muted-foreground mt-2">
        Please wait while we load the content.
      </p>
    </div>
  )
} 