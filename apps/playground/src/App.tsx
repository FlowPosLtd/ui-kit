import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@flowpos/ui";

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "tertiary",
  "destructive",
  "destructive-outline",
  "ghost",
  "link",
] as const;

const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "status-success",
  "status-warning",
  "status-danger",
  "status-info",
  "tag",
] as const;

export function App() {
  const [dark, setDark] = useState(false);

  return (
    <TooltipProvider>
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground p-section">
          <div className="mx-auto max-w-4xl space-y-section">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-heading-1 font-display">@flowpos/ui playground</h1>
                <p className="text-body-2 text-content-secondary">
                  Sanity-check the ported components against the design tokens.
                </p>
              </div>
              <div className="flex items-center gap-inner">
                <Label htmlFor="dark-toggle">Dark mode</Label>
                <Switch id="dark-toggle" checked={dark} onCheckedChange={setDark} />
              </div>
            </header>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Every variant, default size.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-inner">
                {BUTTON_VARIANTS.map((variant) => (
                  <Button key={variant} variant={variant}>
                    {variant}
                  </Button>
                ))}
                <Button loading>Loading</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-inner">
                {BADGE_VARIANTS.map((variant) => (
                  <Badge key={variant} variant={variant}>
                    {variant}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-grid max-w-sm">
                <Input label="Email" placeholder="you@example.com" />
                <Input label="Password" type="password" placeholder="••••••••" />
                <Input label="With error" error="This field is required" />
                <Textarea placeholder="A textarea" />
                <Checkbox label="Accept terms" />
                <div className="flex items-center gap-inner">
                  <Avatar>
                    <AvatarFallback>FP</AvatarFallback>
                  </Avatar>
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="one">
                  <TabsList>
                    <TabsTrigger value="one">One</TabsTrigger>
                    <TabsTrigger value="two">Two</TabsTrigger>
                  </TabsList>
                  <TabsContent value="one">Tab one content.</TabsContent>
                  <TabsContent value="two">Tab two content.</TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialog &amp; Tooltip</CardTitle>
                <CardDescription>
                  Exercises the tailwindcss-animate classes (animate-in/fade-in-0/zoom-in-95).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-inner">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Example dialog</DialogTitle>
                      <DialogDescription>
                        If this fades/zooms in smoothly, the animate plugin is wired correctly.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button>Done</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="tertiary">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>A tooltip</TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Alert>
              <AlertTitle>Default alert</AlertTitle>
              <AlertDescription>Uses bg-background / text-foreground.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Destructive alert</AlertTitle>
              <AlertDescription>Uses the destructive color tokens.</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
