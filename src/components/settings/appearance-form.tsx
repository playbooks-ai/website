"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

export function AppearanceForm() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [highContrastMode, setHighContrastMode] = useState(false)

  // Use useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDarkModeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Appearance settings updated successfully!")
    }, 1000)
  }

  if (!mounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Enable dark mode for a better experience in low-light environments.
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={handleDarkModeChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">Animations</Label>
                <p className="text-xs text-muted-foreground">
                  Enable animations for a more dynamic experience.
                </p>
              </div>
              <Switch
                id="animations"
                checked={animationsEnabled}
                onCheckedChange={setAnimationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Increase contrast for better accessibility.
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrastMode}
                onCheckedChange={setHighContrastMode}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save appearance settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
} 