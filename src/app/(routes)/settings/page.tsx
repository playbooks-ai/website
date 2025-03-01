"use client";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/settings/profile-form";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { ApiKeysForm } from "@/components/settings/api-keys-form";

export default function SettingsPage() {
  return (
    <div className="container space-y-6 py-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="grid gap-10">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            Update your personal information.
          </p>
          <Separator className="my-4" />
          <ProfileForm />
        </div>
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app.
          </p>
          <Separator className="my-4" />
          <AppearanceForm />
        </div>
        <div>
          <h3 className="text-lg font-medium">API Keys</h3>
          <p className="text-sm text-muted-foreground">
            Manage your API keys for external services.
          </p>
          <Separator className="my-4" />
          <ApiKeysForm />
        </div>
      </div>
    </div>
  );
} 