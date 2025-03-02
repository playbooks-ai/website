"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export function ApiKeysForm() {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("API key saved successfully!")
    }, 1000)
  }

  const handleGenerateKey = () => {
    setIsGenerating(true)

    // Simulate API key generation
    setTimeout(() => {
      const generatedKey = `pk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      setApiKey(generatedKey)
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="api-key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  type="password"
                  className="flex-1"
                />
                <SecondaryButton
                  type="button"
                  onClick={handleGenerateKey}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="mr-2">Generating...</span>
                      <span className="animate-spin">⟳</span>
                    </>
                  ) : (
                    "Generate Key"
                  )}
                </SecondaryButton>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is used to authenticate requests to the Playbooks AI API.
              </p>
            </div>

            <Button type="submit" disabled={isLoading || !apiKey}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save API Key"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
} 