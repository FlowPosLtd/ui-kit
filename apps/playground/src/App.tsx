import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  DateRangePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Kbd,
  Label,
  MultiSelect,
  Pagination,
  PhoneInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  Toaster,
  Toggle,
  ToggleButtonGroup,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  toast,
} from "@flowposltd/ui";
import { Bold, Italic, Underline } from "lucide-react";

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

const ORDERS = [
  { id: "#1042", payment: "Paid", status: "Preparing", source: "In-store" },
  { id: "#1041", payment: "Pending", status: "Placed", source: "Online" },
  { id: "#1040", payment: "Refunded", status: "Cancelled", source: "App" },
] as const;

const ORDER_STEPS = [
  { label: "Placed", description: "Order received" },
  { label: "Confirmed", description: "Kitchen notified" },
  { label: "Preparing", description: "Being made" },
  { label: "Ready", description: "Awaiting pickup" },
  { label: "Completed", description: "Handed over" },
];

const MULTI_SELECT_OPTIONS = [
  { value: "burger", label: "Burger" },
  { value: "fries", label: "Fries" },
  { value: "shake", label: "Shake" },
  { value: "salad", label: "Salad" },
];

const TOGGLE_OPTIONS: { label: string; value: "day" | "week" | "month" }[] = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export function App() {
  const [dark, setDark] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [multiSelected, setMultiSelected] = useState<(string | number)[]>(["burger"]);
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);
  const [sliderValue, setSliderValue] = useState(40);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [page, setPage] = useState(1);

  return (
    <TooltipProvider>
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground p-section">
          <div className="mx-auto max-w-4xl space-y-section">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-heading-1 font-display">@flowposltd/ui playground</h1>
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

            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
                <CardDescription>
                  Order listing with payment / status / source pills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.payment === "Paid"
                                ? "status-success"
                                : order.payment === "Pending"
                                  ? "status-warning"
                                  : "status-danger"
                            }
                          >
                            {order.payment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Cancelled"
                                ? "status-danger"
                                : order.status === "Placed"
                                  ? "status-info"
                                  : "status-warning"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.source}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sheet &amp; Toast</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-inner">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="secondary">Open order details</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Order #1042</SheetTitle>
                      <SheetDescription>
                        Slides in from the right, built on the existing Dialog primitive.
                      </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                      <Button onClick={() => setSheetOpen(false)}>Close</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Button
                  variant="tertiary"
                  onClick={() =>
                    toast({
                      title: "Order updated",
                      description: "Order #1042 marked as ready.",
                      variant: "success",
                    })
                  }
                >
                  Fire toast
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stepper</CardTitle>
                <CardDescription>Horizontal (default) and vertical.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-section">
                <Stepper steps={ORDER_STEPS} currentStep={2} />
                <Stepper steps={ORDER_STEPS} currentStep={2} orientation="vertical" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select &amp; MultiSelect</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-section max-w-2xl">
                <Select value={selectedFruit} onValueChange={setSelectedFruit}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="cherry">Cherry</SelectItem>
                  </SelectContent>
                </Select>

                <div className="w-64">
                  <MultiSelect
                    options={MULTI_SELECT_OPTIONS}
                    selectedValues={multiSelected}
                    onSelectionChange={setMultiSelected}
                    placeholder="Select items..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date range, Slider, OTP, Phone</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-section max-w-2xl">
                <DateRangePicker value={dateRange} onChange={setDateRange} onClear={() => setDateRange(null)} />

                <Slider
                  label="Table width"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  min={20}
                  max={100}
                />

                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>

                <PhoneInput value={phone} onChange={setPhone} placeholder="7911 123456" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toggle, ToggleGroup, ToggleButtonGroup</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-section">
                <Toggle aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </Toggle>

                <ToggleGroup type="single" defaultValue="bold">
                  <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>

                <ToggleButtonGroup options={TOGGLE_OPTIONS} value={range} onChange={setRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popover, DropdownMenu, AlertDialog</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-inner">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Open popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>A popover, positioned by Radix.</PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">Open menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Order #1042</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Mark as ready</DropdownMenuItem>
                    <DropdownMenuItem>Cancel order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete order</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete order #1042?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb, Tag, Kbd</CardTitle>
              </CardHeader>
              <CardContent className="space-y-grid">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>#1042</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-wrap gap-inner">
                  <Tag variant="primary">Primary</Tag>
                  <Tag variant="success">Success</Tag>
                  <Tag variant="destructive">Destructive</Tag>
                  <Tag variant="warning">Warning</Tag>
                  <Tag variant="product" onRemove={() => {}}>
                    Removable
                  </Tag>
                </div>

                <div className="flex items-center gap-inner">
                  <span className="text-body-3 text-content-secondary">Toggle sidebar</span>
                  <Kbd>⌘</Kbd>
                  <Kbd>B</Kbd>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pagination</CardTitle>
              </CardHeader>
              <CardContent>
                <Pagination
                  currentPage={page}
                  totalPages={8}
                  onPageChange={setPage}
                  totalItems={153}
                  itemsPerPage={20}
                  onLimitChange={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
