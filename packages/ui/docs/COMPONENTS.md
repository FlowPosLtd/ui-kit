# @flowposltd/ui — Component Reference

Every component exported by `@flowposltd/ui`, with props, variants, and a usage example for each. Grounded directly in the source under `packages/ui/src/components/` — if something here looks off, the source is the tiebreaker.

> Most components mirror tenant-dashboard's own `src/components/ui` 1:1 (colors, radius, spacing, interaction). Where this library intentionally diverges (e.g. `Combobox`, `DatePicker`, `TableToolbar` are net-new; a couple of known tenant-dashboard bugs were **not** copied — see the PR history / conversation notes), it's called out inline.

## Contents

**Buttons & Form**
[Button](#button) · [Input](#input) · [Textarea](#textarea) · [Checkbox](#checkbox) · [Switch](#switch) · [Select](#select) · [Label](#label) · [Form](#form) · [MultiSelect](#multiselect) · [Combobox](#combobox) · [PhoneInput](#phoneinput) · [InputOTP](#inputotp) · [Slider](#slider) · [DatePicker](#datepicker) · [DateRangePicker](#daterangepicker)

**Overlays & Navigation**
[Dialog](#dialog) · [AlertDialog](#alertdialog) · [Sheet](#sheet) · [Popover](#popover) · [DropdownMenu](#dropdownmenu) · [Tooltip](#tooltip) · [SidePanel](#sidepanel) · [Tabs](#tabs) · [Breadcrumb](#breadcrumb) · [Sidebar](#sidebar)

**Data Display**
[Table](#table) · [Card](#card) · [Badge](#badge) · [Tag](#tag) · [Avatar](#avatar) · [Skeleton](#skeleton) · [Pagination](#pagination) · [ManageColumns](#managecolumns) · [Stepper](#stepper)

**Feedback & Misc**
[Alert](#alert) · [Toast system (Radix)](#toast-system-radix) · [Sonner](#sonner) · [Kbd](#kbd) · [Command](#command) · [Toggle](#toggle) · [ToggleGroup](#togglegroup) · [ToggleButtonGroup](#togglebuttongroup) · [Separator](#separator)

---

# Buttons & Form

## Button

Clickable action element built on Radix `Slot` (via `asChild`) with loading state, icon slots, and CVA-driven variants/sizes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "tertiary" \| "destructive" \| "destructive-outline" \| "ghost" \| "link"` | `"default"` | Visual style. |
| `size` | `"lg" \| "default" \| "md" \| "sm" \| "xs" \| "icon"` | `"default"` | Button height/padding. |
| `asChild` | `boolean` | `false` | Render the given child element (via Radix `Slot`) instead of a `<button>`. |
| `loading` | `boolean` | `false` | Shows a centered spinner, hides content (kept in DOM via `invisible`), and disables the button. |
| `label` | `string` | `undefined` | Text content when not passing `children` directly. |
| `icon` | `React.ReactNode` | `undefined` | Icon rendered alongside `label`/`children`. |
| `iconPosition` | `"left" \| "right"` | `"left"` | Side the `icon` renders on. |
| `disabled` | `boolean` | `undefined` | Native disabled attribute; also forced `true` while `loading`. |
| ...rest | `React.ButtonHTMLAttributes<HTMLButtonElement>` | — | Passed through to the underlying element. |

- `variant`: `default`, `secondary`, `tertiary`, `destructive`, `destructive-outline`, `ghost`, `link`
- `size`: `lg`, `default`, `md`, `sm`, `xs`, `icon`

```tsx
import { Button } from "@flowposltd/ui";

function Example() {
  return (
    <div className="flex gap-2">
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive" size="sm">Delete</Button>
      <Button loading>Saving…</Button>
    </div>
  );
}
```

---

## Input

Text input with built-in label, left/right icon slots, password show/hide toggle, and inline error/success states with icons.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "success" \| "error"` | `"default"` | Border/background style; overridden automatically when `error`/`success` is set. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Field height. |
| `error` | `string` | `undefined` | Error message shown below the field; forces error styling and icon. |
| `success` | `string` | `undefined` | Success message shown below the field (ignored if `error` set); forces success styling and icon. |
| `type` | `string` | `"text"` | Native input type; `"password"` adds a show/hide eye toggle. |
| `leftIcon` | `React.ReactNode` | `undefined` | Icon rendered inside the field on the left. |
| `rightIcon` | `React.ReactNode` | `undefined` | Icon rendered on the right (hidden when password/success/error icon is shown). |
| `label` | `string` | `undefined` | Label rendered above the field. |
| `required` | `boolean` | `undefined` | Adds a red asterisk next to the label. |
| `showSuccessIcon` | `boolean` | `true` | Toggles the check icon when `success` is set. |
| `showErrorIcon` | `boolean` | `true` | Toggles the error icon when `error` is set. |
| ...rest | `Omit<React.ComponentProps<"input">, "type" \| "size">` | — | Passed through to the native `<input>`. |

```tsx
import { Input } from "@flowposltd/ui";

function Example() {
  return (
    <div className="space-y-2 max-w-sm">
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="With error" error="This field is required" />
    </div>
  );
}
```

---

## Textarea

Multi-line text field matching the Input field styling (field-token driven: `bg-field-bg`/`border-field-border`/`shadow-input`), with an optional inline error message.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `error` | `string` | `undefined` | Error message shown below the field; also applies destructive border. |
| ...rest | `React.TextareaHTMLAttributes<HTMLTextAreaElement>` | — | Passed through to the native `<textarea>`. |

```tsx
import { Textarea } from "@flowposltd/ui";

function Example() {
  return <Textarea placeholder="A textarea" />;
}
```

---

## Checkbox

Radix-based checkbox supporting a tri-state (`true | false | "indeterminate"`) value, plus optional label/description/error/success text rendered alongside it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "success" \| "error"` | `"default"` | Border/fill style; overridden by `error`/`success`. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Checkbox box size. |
| `checked` | `boolean \| "indeterminate"` | `undefined` | Controlled checked state. |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | `undefined` | Change handler. |
| `label` | `string` | `undefined` | Label text; clicking it toggles the checkbox. |
| `description` | `string` | `undefined` | Helper text under the label (hidden if `error`/`success` set). |
| `error` | `string` | `undefined` | Error message under the label; forces error styling. |
| `success` | `string` | `undefined` | Success message under the label (ignored if `error` set). |
| `disabled` | `boolean` | `undefined` | Disables interaction and dims styling. |

- `variant`: `default`, `success`, `error`
- `size`: `sm`, `md`, `lg`

```tsx
import { Checkbox } from "@flowposltd/ui";

function Example() {
  return (
    <Checkbox
      label="Accept terms"
      description="You agree to our terms of service."
    />
  );
}
```

---

## Switch

Radix-based toggle switch (thin wrapper over `@radix-ui/react-switch`, no custom props).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `undefined` | Controlled checked state. |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Change handler. |
| `disabled` | `boolean` | `undefined` | Disables the switch. |
| ...rest | `React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>` | — | All other Radix Switch root props. |

```tsx
import { Switch, Label } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [dark, setDark] = useState(false);
  return (
    <div className="flex items-center gap-inner">
      <Label htmlFor="dark-toggle">Dark mode</Label>
      <Switch id="dark-toggle" checked={dark} onCheckedChange={setDark} />
    </div>
  );
}
```

---

## Select

Radix `Select` primitives (`Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`) with custom trigger styling, error/success states, and an optional label.

### Sub-parts

| Component | Notes |
| --- | --- |
| `Select` | Root — alias of `SelectPrimitive.Root`. Controlled via `value`/`onValueChange` or `defaultValue`. |
| `SelectGroup` | Groups items under a `SelectLabel`. |
| `SelectValue` | Displays selected value/placeholder. |
| `SelectTrigger` | Custom trigger button; see props below. |
| `SelectContent` | Portal + popper-positioned dropdown panel with scroll buttons. |
| `SelectLabel` | Non-interactive label inside a `SelectGroup`. |
| `SelectItem` | Selectable option; shows a check indicator when active. |
| `SelectSeparator` | Visual divider between items/groups. |
| `SelectScrollUpButton` / `SelectScrollDownButton` | Auto-rendered inside `SelectContent` for overflow scrolling. |

`SelectTrigger` props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "success" \| "error"` | `"default"` | Trigger border/style; overridden by `error`/`success`. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Trigger height. |
| `error` | `string` | `undefined` | Error message rendered below the trigger; shows an alert icon. |
| `success` | `string` | `undefined` | Success message rendered below the trigger (ignored if `error` set); shows a check icon. |
| `label` | `string` | `undefined` | Label rendered above the trigger. |
| `showSuccessIcon` | `boolean` | `true` | Toggles the success check icon. |
| `showErrorIcon` | `boolean` | `true` | Toggles the error alert icon. |
| `disabled` | `boolean` | `undefined` | Disables the trigger. |

- `variant`: `default`, `success`, `error`
- `size`: `sm`, `md`, `lg`

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [fruit, setFruit] = useState("apple");
  return (
    <Select value={fruit} onValueChange={setFruit}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

---

## Label

Thin wrapper around Radix `LabelPrimitive.Root` with default typography; no custom props beyond what Radix's `Label.Root` accepts (`htmlFor`, `children`, etc.).

```tsx
import { Label, Switch } from "@flowposltd/ui";

function Example() {
  return (
    <div className="flex items-center gap-inner">
      <Label htmlFor="dark-toggle">Dark mode</Label>
      <Switch id="dark-toggle" />
    </div>
  );
}
```

---

## Form

`react-hook-form` integration layer (`FormProvider` + context plumbing): `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, and the `useFormField` hook.

| Component / Hook | Description |
| --- | --- |
| `Form` | Alias of RHF's `FormProvider`. Wrap your `<form>` with it, passing the `useForm()` return value. |
| `FormField` | Thin wrapper around RHF `Controller`; provides field `name` via context to descendants. Requires `control`, `name`, `render`. |
| `FormItem` | Layout wrapper (`space-y-inner`) that generates a unique `id` shared by its children via context. |
| `FormLabel` | `Label` wired to the field's `formItemId`; turns destructive-colored when the field has an error. |
| `FormControl` | `Slot`-based wrapper that attaches `id`, `aria-describedby`, and `aria-invalid` to the actual input element. |
| `FormDescription` | Helper text `<p>`, wired to `formDescriptionId` for `aria-describedby`. |
| `FormMessage` | Renders the field's validation error message (or `children` if no error); returns `null` if there's nothing to show. |
| `useFormField()` | Hook returning `{ id, name, formItemId, formDescriptionId, formMessageId, ...fieldState }`. Must be called within a `FormField`/`FormItem` — throws otherwise. |

```tsx
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button,
} from "@flowposltd/ui";
import { useForm } from "react-hook-form";

type Values = { email: string };

function Example() {
  const form = useForm<Values>({ defaultValues: { email: "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => console.log(values))}>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

---

## MultiSelect

Popover + Command-based multi-value picker with search, checkbox-style item selection, and optional selected-value chips (rendered via `Tag`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `MultiSelectOption[]` (`{ value: string \| number; label: string }`) | — | Available options. |
| `selectedValues` | `(string \| number)[]` | — | Controlled selected values. |
| `onSelectionChange` | `(values: (string \| number)[]) => void` | — | Called with the updated selection on toggle/remove. |
| `placeholder` | `string` | `"Select options..."` | Trigger text when nothing is selected. |
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder for the search input. |
| `emptyMessage` | `string` | `"No options found."` | Shown when filtering yields no results. |
| `label` | `string` | `undefined` | Label above the trigger. |
| `error` | `string` | `undefined` | Error message below the control; forces error variant. |
| `success` | `string` | `undefined` | Success message below the control (ignored if `error` set); forces success variant. |
| `disabled` | `boolean` | `false` | Disables the trigger and prevents opening. |
| `showChips` | `boolean` | `true` | Renders removable `Tag` chips for each selected option below the trigger. |
| `variant` | `"default" \| "error" \| "success"` | auto | Trigger style; auto-computed from `error`/`success` if not set. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Trigger height. |
| `className` | `string` | `undefined` | Wrapper className. |
| `triggerClassName` | `string` | `undefined` | Extra className on the trigger button. |
| `onSearch` | `(query: string) => void` | `undefined` | Called on every search input change (e.g. for async/remote filtering). |
| `isSearching` | `boolean` | `false` | Shows "Searching..." instead of `emptyMessage` while true. |

```tsx
import { MultiSelect } from "@flowposltd/ui";
import { useState } from "react";

const OPTIONS = [
  { value: "burger", label: "Burger" },
  { value: "fries", label: "Fries" },
  { value: "shake", label: "Shake" },
];

function Example() {
  const [selected, setSelected] = useState<(string | number)[]>(["burger"]);
  return (
    <div className="w-64">
      <MultiSelect
        options={OPTIONS}
        selectedValues={selected}
        onSelectionChange={setSelected}
        placeholder="Select items..."
      />
    </div>
  );
}
```

---

## Combobox

Single-select, search-filterable picker — **"MultiSelect, but one value."** Use this instead of jamming `MultiSelect` into single-value mode (e.g. Location/Status pickers that need type-to-filter). Built on the same Popover/Command primitives; closes on select instead of showing chips/checkboxes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `ComboboxOption[]` (`{ value: string \| number; label: string }`) | — | Available options. |
| `value` | `string \| number \| null` | — | Controlled selected value. |
| `onChange` | `(value: string \| number \| null) => void` | — | Called with the new value on selection. |
| `placeholder` | `string` | `"Select an option..."` | Trigger text when nothing is selected. |
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder for the search input. |
| `emptyMessage` | `string` | `"No options found."` | Shown when filtering yields no results. |
| `label` | `string` | `undefined` | Label above the trigger. |
| `error` | `string` | `undefined` | Error message below the control; forces error variant. |
| `success` | `string` | `undefined` | Success message below the control (ignored if `error` set); forces success variant. |
| `disabled` | `boolean` | `false` | Disables the trigger and prevents opening. |
| `clearable` | `boolean` | `false` | Re-selecting the current value calls `onChange(null)` instead of a no-op. |
| `variant` | `"default" \| "error" \| "success"` | auto | Trigger style; auto-computed from `error`/`success` if not set. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Trigger height. |
| `className` | `string` | `undefined` | Wrapper className. |
| `triggerClassName` | `string` | `undefined` | Extra className on the trigger button. |
| `onSearch` | `(query: string) => void` | `undefined` | Called on every search input change. |
| `isSearching` | `boolean` | `false` | Shows "Searching..." instead of `emptyMessage` while true. |

```tsx
import { Combobox } from "@flowposltd/ui";
import { useState } from "react";

const OPTIONS = [
  { value: "burger", label: "Burger" },
  { value: "fries", label: "Fries" },
];

function Example() {
  const [selected, setSelected] = useState<string | number | null>("burger");
  return (
    <div className="w-64">
      <Combobox options={OPTIONS} value={selected} onChange={setSelected} placeholder="Select an item..." />
    </div>
  );
}
```

---

## PhoneInput

Phone number field with a country-select popover (flag + dial code) and live `AsYouType` formatting via `libphonenumber-js`. Currently ships with a single supported country (`GB`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `""` | Controlled formatted phone value. |
| `onChange` | `(value: string) => void` | `undefined` | Called with the newly formatted value. |
| `onBlur` | `() => void` | `undefined` | Blur handler on the native input. |
| `defaultCountry` | `string` | `"GB"` | Initial selected country code. |
| `label` | `string` | `undefined` | Label above the field. |
| `error` | `string` | `undefined` | Error message below the field; forces error styling. |
| `success` | `string` | `undefined` | Success message below the field (ignored if `error` set). |
| `placeholder` | `string` | `"XXX - XXXX - XXXX"` | Native input placeholder. |
| `disabled` | `boolean` | `false` | Disables the country trigger and input. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Field height. |
| `className` | `string` | `undefined` | Extra className on the outer wrapper. |

```tsx
import { PhoneInput } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [phone, setPhone] = useState("");
  return <PhoneInput value={phone} onChange={setPhone} placeholder="7911 123456" />;
}
```

---

## InputOTP

One-time-passcode input built on the `input-otp` library: `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`.

| Component | Description |
| --- | --- |
| `InputOTP` | Root; forwards all props to `OTPInput` (`maxLength`, `value`, `onChange`, `onComplete`, ...). |
| `InputOTPGroup` | Layout wrapper grouping a set of slots. |
| `InputOTPSlot` | One character cell; requires `index` prop. |
| `InputOTPSeparator` | Visual divider (`Dot` icon) between groups, e.g. `123-456` layouts. |

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [otp, setOtp] = useState("");
  return (
    <InputOTP maxLength={4} value={otp} onChange={setOtp}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}
```

---

## Slider

Native `<input type="range">` wrapper with an optional label showing the current value (suffixed `px`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Label above the slider; also displays `{value}px` on the right. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Step increment. |
| `value` | `number` | required | Controlled value. |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | required | Change handler; read `e.target.value`. |
| ...rest | `React.InputHTMLAttributes<HTMLInputElement>` | — | Passed through to the native input. |

```tsx
import { Slider } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [width, setWidth] = useState(40);
  return (
    <Slider
      label="Table width"
      value={width}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWidth(Number(e.target.value))}
      min={20}
      max={100}
    />
  );
}
```

---

## DatePicker

Single-date picker — a button trigger showing the formatted date, opening a portal-rendered popover with a native `date`/`datetime-local` input and Clear/Apply actions. Same visual language as `DateRangePicker`; the single-value sibling of it. *(Net-new — no equivalent exists in tenant-dashboard.)*

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| null` | required | Selected date as an ISO-local string (`YYYY-MM-DD`, or `YYYY-MM-DDTHH:mm` if `includeTime`). |
| `onChange` | `(date: string) => void` | required | Called with the draft value when "Apply" is clicked. |
| `onClear` | `() => void` | `undefined` | Called when "Clear" is clicked. |
| `placeholder` | `string` | `"Select date"` | Trigger text when no date is set. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Trigger height. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `className` | `string` | `undefined` | Extra className on the outer wrapper. |
| `align` | `"start" \| "end"` | `"start"` | Horizontal alignment of the popover relative to the trigger. |
| `labelClassName` | `string` | `undefined` | Extra className on the formatted-date label. |
| `includeTime` | `boolean` | `false` | Uses a `datetime-local` input and includes time in the display. |
| `min` | `string` | `undefined` | Native `min` constraint on the date input. |
| `max` | `string` | `undefined` | Native `max` constraint on the date input. |

```tsx
import { DatePicker } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [date, setDate] = useState<string | null>(null);
  return <DatePicker value={date} onChange={setDate} onClear={() => setDate(null)} />;
}
```

---

## DateRangePicker

From/To date-range picker: a button trigger showing the formatted range, opening a portal-rendered popover with two `datetime-local` inputs, inline range-validation (`"To" must be after "From"`), and Clear/Apply actions.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `DateRange \| null` (`{ from: string; to: string }`) | required | Selected range as ISO-local strings. |
| `onChange` | `(range: DateRange) => void` | required | Called with the draft range when "Apply" is clicked (only if valid). |
| `onClear` | `() => void` | `undefined` | Called when "Clear" is clicked. |
| `placeholder` | `string` | `"Select date range"` | Trigger text when no range is set. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Trigger height. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `className` | `string` | `undefined` | Extra className on the outer wrapper. |
| `align` | `"start" \| "end"` | `"start"` | Horizontal alignment of the popover relative to the trigger. |
| `labelClassName` | `string` | `undefined` | Extra className on the formatted-range label. |

```tsx
import { DateRangePicker } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [range, setRange] = useState<{ from: string; to: string } | null>(null);
  return <DateRangePicker value={range} onChange={setRange} onClear={() => setRange(null)} />;
}
```

---

# Overlays & Navigation

## Dialog

A modal dialog built on `@radix-ui/react-dialog`, centered on screen with a backdrop overlay and a built-in close (X) button.

| Sub-part | Description |
|---|---|
| `Dialog` | Root component, controls open/closed state. |
| `DialogTrigger` | Opens the dialog when clicked. |
| `DialogPortal` | Portals content to `document.body`. |
| `DialogClose` | Closes the dialog when clicked. |
| `DialogOverlay` | The backdrop behind the content. |
| `DialogContent` | The modal box; renders `DialogOverlay` + an `X` close button automatically. |
| `DialogHeader` | Layout wrapper for title/description (flex column). |
| `DialogFooter` | Layout wrapper for actions (row on `sm:`, stacked-reverse on mobile). |
| `DialogTitle` | Accessible dialog title. |
| `DialogDescription` | Accessible supporting text. |

```tsx
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button,
} from "@flowposltd/ui";

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example dialog</DialogTitle>
          <DialogDescription>Short supporting copy goes here.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

`DialogContent` always renders its own close button — you don't need to add one. Its close button uses `focus-visible` (not `focus`) for the ring, so it only shows on keyboard focus, not mouse clicks.

---

## AlertDialog

A modal confirmation dialog (built on `@radix-ui/react-alert-dialog`) for interrupting the user to confirm a destructive or important action — unlike `Dialog`, it cannot be dismissed by clicking the overlay and has no close (X) button.

| Sub-part | Description |
|---|---|
| `AlertDialog` | Root component. |
| `AlertDialogTrigger` | Opens the alert dialog. |
| `AlertDialogPortal` | Portals content to `document.body`. |
| `AlertDialogOverlay` | Backdrop. |
| `AlertDialogContent` | The modal box. |
| `AlertDialogHeader` / `AlertDialogFooter` | Layout wrappers for title/description and actions. |
| `AlertDialogTitle` / `AlertDialogDescription` | Title and supporting text. |
| `AlertDialogAction` | Confirm button — styled with the default `buttonVariants()`. |
| `AlertDialogCancel` | Cancel button — styled with `buttonVariants({ variant: "secondary" })`. |

```tsx
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button,
} from "@flowposltd/ui";

function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete order</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete order #1042?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## Sheet

A dialog that slides in from an edge of the screen (built on `@radix-ui/react-dialog` with `cva`-driven `side` positioning) — used for panels like order details or filters.

| Sub-part | Description |
|---|---|
| `Sheet` | Root component. |
| `SheetTrigger` / `SheetClose` | Open / close the sheet. |
| `SheetPortal` | Portals content to `document.body`. |
| `SheetOverlay` | Backdrop. |
| `SheetContent` | The sliding panel; accepts `side`. Renders its own close (X) button. |
| `SheetHeader` / `SheetFooter` | Layout wrappers for title/description and actions. |
| `SheetTitle` / `SheetDescription` | Title and supporting text. |

`SheetContent` props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Edge of the screen the sheet slides in from. |
| `className` | `string` | — | Additional classes merged onto the content. |

```tsx
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Button,
} from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">Open order details</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Order #1042</SheetTitle>
          <SheetDescription>Slides in from the right.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

---

## Popover

A non-modal floating panel anchored to a trigger element (built on `@radix-ui/react-popover`).

| Sub-part | Description |
|---|---|
| `Popover` | Root component. |
| `PopoverTrigger` | Toggles the popover. |
| `PopoverContent` | The floating panel content (auto-portaled). Accepts `align` (`"start" \| "center" \| "end"`, default `"center"`) and `sideOffset` (default `4`). |

```tsx
import { Popover, PopoverContent, PopoverTrigger, Button } from "@flowposltd/ui";

function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>A popover, positioned by Radix.</PopoverContent>
    </Popover>
  );
}
```

---

## DropdownMenu

A menu of actions triggered from a button (built on `@radix-ui/react-dropdown-menu`), supporting items, checkboxes, radio groups, submenus, labels and separators.

| Sub-part | Description |
|---|---|
| `DropdownMenu` | Root component. |
| `DropdownMenuTrigger` | Opens the menu. |
| `DropdownMenuGroup` | Groups related items. |
| `DropdownMenuPortal` | Portals content. |
| `DropdownMenuSub` / `DropdownMenuSubTrigger` / `DropdownMenuSubContent` | Nested submenu (`SubTrigger` accepts `inset?: boolean`). |
| `DropdownMenuContent` | Top-level menu panel (`sideOffset` default `4`). |
| `DropdownMenuItem` | A single action item (`inset?: boolean`). |
| `DropdownMenuCheckboxItem` | Toggleable item, `checked` prop, check indicator. |
| `DropdownMenuRadioGroup` / `DropdownMenuRadioItem` | Single-select radio group of items. |
| `DropdownMenuLabel` | Non-interactive section label (`inset?: boolean`). |
| `DropdownMenuSeparator` | Divider line. |
| `DropdownMenuShortcut` | Right-aligned keyboard-shortcut hint. |

```tsx
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, Button,
} from "@flowposltd/ui";

function Example() {
  return (
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
  );
}
```

---

## Tooltip

A small hover/focus-triggered label (built on `@radix-ui/react-tooltip`).

| Sub-part | Description |
|---|---|
| `TooltipProvider` | Wraps a subtree (or the whole app) to configure shared tooltip behavior. Required ancestor for `Tooltip` — mount once near the app root. |
| `Tooltip` | Root for a single tooltip instance. |
| `TooltipTrigger` | The element that shows the tooltip on hover/focus. |
| `TooltipContent` | The floating label content (`sideOffset` default `4`). |

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button } from "@flowposltd/ui";

function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>A tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

---

## SidePanel

A pre-composed, opinionated wrapper around `Sheet` for a right-hand-side detail/edit panel with a fixed header, scrollable body, and sticky footer. Always renders on the right — `side` isn't exposed as a prop.

| Sub-part | Description |
|---|---|
| `SidePanel` | The full panel: `Sheet` + `SheetContent` + a `SheetHeader` with title/description wired up. |
| `SidePanelBody` | Scrollable content area. |
| `SidePanelFooter` | Sticky bottom bar with a top border, for action buttons. |

`SidePanel` props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Whether the panel is open (controlled). |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the panel requests to open/close. |
| `title` | `string` | — | Panel heading. |
| `description` | `string` | — | Optional supporting text under the title. |
| `width` | `string` | `"sm:max-w-[360px]"` | Tailwind class(es) controlling the panel width. |

```tsx
import { SidePanel, SidePanelBody, SidePanelFooter, Button } from "@flowposltd/ui";
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <SidePanel open={open} onOpenChange={setOpen} title="Order #1042" description="Review and edit order details.">
      <SidePanelBody>
        <p>Panel content goes here.</p>
      </SidePanelBody>
      <SidePanelFooter>
        <Button onClick={() => setOpen(false)}>Save</Button>
      </SidePanelFooter>
    </SidePanel>
  );
}
```

---

## Tabs

A set of layered content panels switched by a horizontal, scrollable tab list (built on `@radix-ui/react-tabs`).

| Sub-part | Description |
|---|---|
| `Tabs` | Root component; controls the active tab (`defaultValue`/`value`/`onValueChange`). |
| `TabsList` | Horizontally scrollable, sticky row of triggers with a bottom border. |
| `TabsTrigger` | A single tab button; underline + text color change when active. |
| `TabsContent` | Panel content shown when its `value` matches the active tab. |

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@flowposltd/ui";

function Example() {
  return (
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Tab one content.</TabsContent>
      <TabsContent value="two">Tab two content.</TabsContent>
    </Tabs>
  );
}
```

---

## Breadcrumb

Primitive breadcrumb building blocks plus a ready-to-use `BreadcrumbNav` that renders a path of items from data.

| Sub-part | Description |
|---|---|
| `Breadcrumb` | Root `<nav aria-label="breadcrumb">` wrapper. |
| `BreadcrumbList` | The `<ol>` list of crumbs. |
| `BreadcrumbItem` | A single `<li>` wrapper. |
| `BreadcrumbLink` | A crumb link (`<a>` by default); accepts `asChild?: boolean`. |
| `BreadcrumbPage` | The current (non-link) page crumb. |
| `BreadcrumbSeparator` | Separator between crumbs; defaults to a chevron icon. |
| `BreadcrumbEllipsis` | Collapsed-crumbs indicator for long paths. |
| `BreadcrumbNav` | High-level convenience component: pass an `items` array and it renders the full list for you. |

`BreadcrumbNav` props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `BreadcrumbPathItem[]` (`{ label: string; href?: string }`) | — | Ordered path items; the last item always renders as the current page. |
| `className` | `string` | — | Classes applied to the root `Breadcrumb`. |
| `renderLink` | `(item, className) => React.ReactNode` | plain `<a>` | Custom renderer for non-last item links — pass your router's `Link` (react-router-dom, next/link) for client-side navigation. This library can't depend on a specific router, so it defaults to a full-page-navigating `<a>` unless you configure this. |

```tsx
import { BreadcrumbNav } from "@flowposltd/ui";

function Example() {
  return (
    <BreadcrumbNav
      items={[
        { label: "Orders", href: "/orders" },
        { label: "#1042" },
      ]}
    />
  );
}
```

---

## Sidebar

A full app-shell sidebar system (collapsible, responsive, keyboard-shortcut-toggled) composed of a provider, the sidebar itself, and a large set of layout sub-parts for headers/groups/menus. Collapses to icon-only or off-canvas on desktop and becomes a `Sheet` on mobile.

### Core contract

| Piece | Description |
|---|---|
| `SidebarProvider` | Must wrap the whole layout. Owns open/collapsed state (controlled or uncontrolled), persists it to a `sidebar:state` cookie, wires up the `⌘/Ctrl+B` toggle shortcut, and supplies `--sidebar-width`/`--sidebar-width-icon` CSS vars. Also wraps children in a `TooltipProvider`. |
| `useSidebar()` | Returns `{ state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }`. Throws outside a `SidebarProvider`. |
| `SidebarTrigger` | A `Button` pre-wired to call `toggleSidebar()` — drop it anywhere inside the provider. |
| `Sidebar` | The sidebar container. Renders as a `Sheet` automatically on mobile, regardless of `variant`/`collapsible`. |

`SidebarProvider` props: `defaultOpen` (`boolean`, default `true`), `open`, `onOpenChange` (controlled mode), plus `React.ComponentProps<"div">`.

`Sidebar` props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `"left" \| "right"` | `"left"` | Which edge the sidebar docks to. |
| `variant` | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` | `inset` gives a card-like main content area with margin; `floating` adds border/shadow/rounding to the sidebar itself. |
| `collapsible` | `"offcanvas" \| "icon" \| "none"` | `"offcanvas"` | Fully hidden, shrunk to icon width, or not collapsible. |

Other importable sub-parts: `SidebarInset`, `SidebarInput`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`/`SidebarGroupLabel`/`SidebarGroupAction`/`SidebarGroupContent`, `SidebarMenu`/`SidebarMenuItem`, `SidebarMenuButton` (`asChild`, `isActive`, `variant`: `default`/`outline`, `size`: `default`/`sm`/`lg`, `tooltip`), `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`/`SidebarMenuSubItem`/`SidebarMenuSubButton`, `SidebarRail`.

```tsx
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@flowposltd/ui";
import { Home, Settings } from "lucide-react";

function AppShell() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>Flowpos</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" isActive>
                    <Home />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>v1.0.0</SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex items-center gap-2 p-inner">
          <SidebarTrigger />
          <h1>Dashboard</h1>
        </header>
        {/* page content */}
      </SidebarInset>
    </SidebarProvider>
  );
}
```

---

# Data Display

## Table

Composable table primitives plus an optional toolbar for search/filter controls that sits above the table inside the same card.

| Component | Renders | Notes |
|---|---|---|
| `Table` | `<table>` (wrapped in an `overflow-auto` div) | Base table container, horizontally scrollable |
| `TableHeader` | `<thead>` | Muted background, bottom border |
| `TableBody` | `<tbody>` | Removes border from the last row |
| `TableFooter` | `<tfoot>` | Muted background, top border, medium font weight |
| `TableRow` | `<tr>` | Bottom border, hover highlight, `data-[state=selected]` support |
| `TableHead` | `<th>` | Uppercase, small, semibold column label styling |
| `TableCell` | `<td>` | Standard body cell padding/typography |
| `TableCaption` | `<caption>` | Muted caption text below the table |
| `TableToolbar` | `<div>` | Bordered bar above the table for search/filter controls |
| `TableToolbarFilters` | `<div>` | Left-aligned flex group inside `TableToolbar` (search/selects) |
| `TableToolbarActions` | `<div>` | Right-aligned flex group inside `TableToolbar` (buttons like Manage Columns) |

All sub-parts forward `ref` and accept the corresponding native HTML element props plus `className`. *(`TableToolbar`/`TableToolbarFilters`/`TableToolbarActions` are net-new, added to give the boxed/bordered filter-bar look tenant-dashboard achieves inline.)*

```tsx
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableToolbar, TableToolbarFilters, TableToolbarActions,
  Card, CardContent, Input, Button, Badge,
} from "@flowposltd/ui";

function OrdersTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <TableToolbar>
          <TableToolbarFilters>
            <Input placeholder="Search order" className="max-w-[220px]" />
          </TableToolbarFilters>
          <TableToolbarActions>
            <Button variant="tertiary" size="sm">Manage Columns</Button>
          </TableToolbarActions>
        </TableToolbar>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#1042</TableCell>
              <TableCell>
                <Badge variant="status-success">Paid</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

---

## Card

A bordered, elevated surface (header/title/description/content/footer sub-parts) used to group related content.

| Component | Renders | Notes |
|---|---|---|
| `Card` | `<div>` | Rounded, bordered container with card background/shadow |
| `CardHeader` | `<div>` | Flex column with vertical spacing, top padding |
| `CardTitle` | `<h3>` | Heading-5 sized, medium weight title |
| `CardDescription` | `<p>` | Muted body-2 text |
| `CardContent` | `<div>` | Padded content area |
| `CardFooter` | `<div>` | Flex row, padded (no top padding) |

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@flowposltd/ui";

function SummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
        <CardDescription>Every variant, default size.</CardDescription>
      </CardHeader>
      <CardContent>Card body content goes here.</CardContent>
      <CardFooter>
        <Button>Done</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Badge

A small inline label/pill used for statuses, counts, or tags, with an optional colored dot indicator.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "border-active" \| "border-inactive" \| "status-success" \| "status-warning" \| "status-danger" \| "status-info" \| "status-neutral" \| "tag"` | `"default"` | Color/style scheme |
| `shape` | `"rounded" \| "pill"` | `"rounded"` | Corner radius style |
| `label` | `string` | — | Text content; takes precedence over `children` if both are set |
| `dotColor` | `string` | — | Tailwind background-color class applied to a small leading dot (e.g. `"bg-red-500"`) |
| `className` | `string` | — | Additional classes merged in |

> `shape` defaults to `"rounded"` (a small radius) to match how tenant-dashboard actually renders status/payment/source pills. Pass `shape="pill"` for a fully-rounded look where that's wanted instead.

```tsx
import { Badge } from "@flowposltd/ui";

function OrderStatusBadges() {
  return (
    <div className="flex gap-2">
      <Badge variant="status-success">Paid</Badge>
      <Badge variant="status-warning" shape="pill">Pending</Badge>
      <Badge variant="status-danger">Cancelled</Badge>
      <Badge variant="outline" dotColor="bg-blue-500">Online</Badge>
    </div>
  );
}
```

---

## Tag

A rounded-pill label, similar to `Badge` but with its own variant/size scale and a built-in removable "x" button.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "success" \| "destructive" \| "warning" \| "muted" \| "product"` | `"primary"` | Color scheme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding/text sizing |
| `onRemove` | `() => void` | — | If provided, renders a trailing remove ("x") button that calls this handler |
| `className` | `string` | — | Additional classes merged in |

```tsx
import { Tag } from "@flowposltd/ui";

function ItemTags() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success" size="sm">Success</Tag>
      <Tag variant="destructive">Destructive</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="product" onRemove={() => console.log("removed")}>Removable</Tag>
    </div>
  );
}
```

---

## Avatar

A circular user/entity image with a fallback (e.g. initials) shown while the image loads or fails, built on `@radix-ui/react-avatar`.

| Component | Renders | Notes |
|---|---|---|
| `Avatar` | `<span>` | 40×40px circular container |
| `AvatarImage` | `<img>` | Fills the container, `aspect-square` |
| `AvatarFallback` | `<span>` | Shown when the image hasn't loaded/errored |

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@flowposltd/ui";

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="/avatars/user.png" alt="Jane Doe" />
      <AvatarFallback>FP</AvatarFallback>
    </Avatar>
  );
}
```

---

## Skeleton

A shimmering placeholder block used to indicate loading content. Size/shape entirely via `className` (e.g. `"h-4 w-32"`, `"rounded-full h-10 w-10"`).

```tsx
import { Skeleton, Avatar } from "@flowposltd/ui";

function LoadingRow() {
  return (
    <div className="flex items-center gap-inner">
      <Avatar />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
```

---

## Pagination

A page-number navigation control with optional "showing X–Y of Z" summary and rows-per-page selector, typically placed below a `Table`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentPage` | `number` | required | 1-indexed current page |
| `totalPages` | `number` | required | Total number of pages; renders `null` if `<= 1` |
| `onPageChange` | `(page: number) => void` | required | Called with the target page number |
| `totalItems` | `number` | — | When provided (with `itemsPerPage`), shows "Showing X–Y of Z" instead of "Page X of Y" |
| `itemsPerPage` | `number` | `20` | Items per page, used for the summary text and range calc |
| `onLimitChange` | `(limit: number) => void` | — | If provided, renders a "Rows per page" `Select` |
| `perPageOptions` | `number[]` | `PER_PAGE_OPTIONS` (`[15, 25, 50]`) | Options shown in the rows-per-page select |

`PER_PAGE_OPTIONS` (`[15, 25, 50]`) is also exported as a named constant.

```tsx
import { Pagination } from "@flowposltd/ui";
import { useState } from "react";

function OrdersPagination() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      currentPage={page}
      totalPages={8}
      onPageChange={setPage}
      totalItems={153}
      itemsPerPage={20}
      onLimitChange={(limit) => console.log("limit changed", limit)}
    />
  );
}
```

---

## ManageColumns

A popover-triggered menu of switches for toggling table column visibility, meant to live inside a `TableToolbarActions`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `ManageColumnsColumn[]` — `{ key: string; label: string; alwaysVisible?: boolean }` | required | Column definitions to list |
| `visibility` | `Record<string, boolean>` | required | Current visibility keyed by column `key`; a missing key is treated as visible |
| `onToggle` | `(key: string) => void` | required | Called when a non-`alwaysVisible` column's switch is toggled |

Columns marked `alwaysVisible: true` render `checked` and `disabled`; `onToggle` is never invoked for them.

```tsx
import { ManageColumns, TableToolbar, TableToolbarActions } from "@flowposltd/ui";
import { useState } from "react";

const COLUMNS = [
  { key: "id", label: "Order", alwaysVisible: true },
  { key: "payment", label: "Payment" },
  { key: "status", label: "Status" },
];

function OrdersToolbar() {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  return (
    <TableToolbar>
      <TableToolbarActions>
        <ManageColumns
          columns={COLUMNS}
          visibility={visibility}
          onToggle={(key) => setVisibility((v) => ({ ...v, [key]: v[key] === false }))}
        />
      </TableToolbarActions>
    </TableToolbar>
  );
}
```

---

## Stepper

A horizontal or vertical progress stepper showing done/active/upcoming steps, with optional click-to-navigate behavior.

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `StepperStep[]` — `{ label: string; description?: string }` | required | Steps to render, in order |
| `currentStep` | `number` | required | 0-indexed active step; steps before it are "done", it is "active", the rest are "upcoming" |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `onStepClick` | `(index: number) => void` | — | Called when a clickable step's circle/label is clicked. **Omit to render a static, non-interactive stepper** — no step is clickable when this is undefined |
| `isStepClickable` | `(index: number) => boolean` | — | Overrides which steps are clickable. Defaults to `i <= currentStep` (done + current steps clickable), matching tenant-dashboard's `StepTabs` |

**Click behavior:** a step is clickable only when `onStepClick` is provided AND (`isStepClickable(i)` if given, else `i <= currentStep`). Non-clickable step buttons render `disabled`. Done steps (`i < currentStep`) render a "✓"; others render their 1-indexed number.

```tsx
import { Stepper } from "@flowposltd/ui";
import { useState } from "react";

const ORDER_STEPS = [
  { label: "Placed", description: "Order received" },
  { label: "Confirmed", description: "Kitchen notified" },
  { label: "Preparing", description: "Being made" },
  { label: "Ready", description: "Awaiting pickup" },
  { label: "Completed", description: "Handed over" },
];

function OrderStepper() {
  const [step, setStep] = useState(2);
  return (
    <>
      {/* Horizontal, clickable back to any done/current step */}
      <Stepper steps={ORDER_STEPS} currentStep={step} onStepClick={setStep} />

      {/* Vertical variant */}
      <Stepper steps={ORDER_STEPS} currentStep={step} orientation="vertical" onStepClick={setStep} />

      {/* Static (non-interactive): omit onStepClick */}
      <Stepper steps={ORDER_STEPS} currentStep={step} />
    </>
  );
}
```

---

# Feedback & Misc

## Alert

Static, non-modal banner for surfacing status/error messages inline in a page (not a toast, doesn't auto-dismiss). Composed of `Alert`, `AlertTitle`, `AlertDescription`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "destructive"` | `"default"` | `destructive` uses the destructive color tokens for borders/icons/text |

```tsx
import { Alert, AlertTitle, AlertDescription } from "@flowposltd/ui";

function OrderAlerts() {
  return (
    <>
      <Alert>
        <AlertTitle>Default alert</AlertTitle>
        <AlertDescription>Uses bg-background / text-foreground.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive alert</AlertTitle>
        <AlertDescription>Uses the destructive color tokens.</AlertDescription>
      </Alert>
    </>
  );
}
```

---

## Toast system (Radix)

A Radix-based toast stack: `ToastProvider`, `ToastViewport`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`. Most apps won't touch these primitives directly — render the pre-wired `Toaster` once at the app root and call `toast()` (from `useToast`/`hooks/use-toast`) anywhere to push a toast.

> **Two independent toast systems ship in this package** — this Radix-based one, and the separate Sonner-based one below (`sonner.tsx`). They don't share state, styling, or a viewport. Mount **only one** of `<Toaster />` / `<SonnerToaster />` per app, and consistently use the matching `toast()` import.

`Toast` props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "success" \| "destructive" \| "warning"` | `"default"` | Visual style; also selects the icon rendered by `Toaster` |

`Toaster` props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `viewportClassName` | `string` | `undefined` | Extra classes for the `ToastViewport` — e.g. nudge it below a fixed banner (a staging-environment strip) |

`toast(props)` — `props` is `Omit<ToasterToast, "id">`:

| Field | Type | Description |
| --- | --- | --- |
| `title` | `React.ReactNode` | Heading; falls back to this if no `description` |
| `description` | `React.ReactNode` | Body text; preferred over `title` for the rendered message |
| `variant` | `"default" \| "success" \| "destructive" \| "warning" \| null` | Controls color + icon |
| `action` | `ToastActionElement` | A `<ToastAction>` element for an inline action |

Returns `{ id, dismiss(), update(props) }`. Note: the internal queue is capped at `TOAST_LIMIT = 1` — a new toast replaces the previous one rather than stacking.

```tsx
import { Toaster, Button, toast } from "@flowposltd/ui";

function App() {
  return (
    <>
      {/* ...app content... */}
      <Button
        variant="tertiary"
        onClick={() => toast({ title: "Order updated", description: "Order #1042 marked as ready.", variant: "success" })}
      >
        Fire toast
      </Button>
      <Toaster />
    </>
  );
}
```

---

## Sonner

An alternative toast system wrapping the third-party `sonner` library, wired to `next-themes`. Exported as `SonnerToaster` (not `Toaster`) specifically to avoid clashing with the Radix system above.

> Separate system, not interoperable with the Radix Toast above. Pick exactly one per app.

```tsx
import { SonnerToaster } from "@flowposltd/ui";
import { toast } from "sonner";

function App() {
  return <SonnerToaster position="bottom-right" />;
}

// trigger with sonner's own toast(), not the package's toast()
<button onClick={() => toast("Order updated")}>Notify</button>
```

---

## Kbd

Small styled `<kbd>` for a single keyboard key/shortcut hint.

```tsx
import { Kbd } from "@flowposltd/ui";

<span className="flex items-center gap-1">
  <span className="text-body-3 text-content-secondary">Toggle sidebar</span>
  <Kbd>⌘</Kbd>
  <Kbd>B</Kbd>
</span>
```

---

## Command

Styling wrapper around `cmdk` for a command palette. `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`.

```tsx
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@flowposltd/ui";
import { useState } from "react";

function CommandPalette() {
  const [open, setOpen] = useState(false);
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Orders">
          <CommandItem onSelect={() => setOpen(false)}>
            View order #1042
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Preferences</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
```

---

## Toggle

A single Radix-based on/off pressable button.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "outline"` | `"default"` |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` |

```tsx
import { Toggle } from "@flowposltd/ui";
import { Bold } from "lucide-react";

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

---

## ToggleGroup

Radix `ToggleGroup` wrapper (`ToggleGroup` + `ToggleGroupItem`) — a set of toggles sharing `variant`/`size` via context; single- or multi-select depending on `type`.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "outline"` | `"default"` |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` |
| `type` (Root, required) | `"single" \| "multiple"` | — |

```tsx
import { ToggleGroup, ToggleGroupItem } from "@flowposltd/ui";
import { Bold, Italic, Underline } from "lucide-react";

<ToggleGroup type="single" defaultValue="bold">
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>
```

---

## ToggleButtonGroup

A custom (non-Radix) segmented-control component, **distinct from `ToggleGroup`** — controlled, generic over `T extends string | number | boolean`, built on `Button`. Prefer this for a simple controlled single value (e.g. a day/week/month range picker).

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `{ label: ReactNode; value: T }[]` | — | Options in display order |
| `value` | `T` | — | Currently selected value (controlled) |
| `onChange` | `(value: T) => void` | — | Called with newly selected value |
| `size` | `ButtonProps["size"]` | `"sm"` | Passed to each `Button` |
| `selectedVariant` | `ButtonProps["variant"]` | `"default"` | Variant for the selected option; unselected options use `"ghost"` |

```tsx
import { ToggleButtonGroup } from "@flowposltd/ui";
import { useState } from "react";

const TOGGLE_OPTIONS: { label: string; value: "day" | "week" | "month" }[] = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

function RangePicker() {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  return <ToggleButtonGroup options={TOGGLE_OPTIONS} value={range} onChange={setRange} />;
}
```

---

## Separator

A Radix `Separator` — a thin visual divider, decorative by default.

| Prop | Type | Default |
| --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `decorative` | `boolean` | `true` |

```tsx
import { Separator } from "@flowposltd/ui";

<div>
  <p>Dark mode</p>
  <Separator />
  <p>Notifications</p>
</div>
```
