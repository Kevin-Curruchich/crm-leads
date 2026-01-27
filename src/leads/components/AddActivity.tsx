import { useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucidePlus } from "lucide-react";

const formSchema = z.object({
  leadId: z.string().min(1, "Please select a lead"),
  type: z.enum(["NOTE", "CALL", "EMAIL", "MEETING", "STATUS_CHANGE"] as const),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

interface AddActivityProps {
  leads: Array<{ id: string; name: string }>;
  preselectedLeadId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AddActivity = ({
  leads,
  preselectedLeadId,
  open: controlledOpen,
  onOpenChange,
}: AddActivityProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadId: preselectedLeadId || "",
      type: "NOTE",
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Activity data:", data);
    // TODO: Implement addActivity function
    form.reset();
    setOpen(false);
  }

  const activityTypes = [
    { value: "NOTE", label: "Note", icon: "📝" },
    { value: "CALL", label: "Call", icon: "📞" },
    { value: "EMAIL", label: "Email", icon: "📧" },
    { value: "MEETING", label: "Meeting", icon: "🤝" },
    { value: "STATUS_CHANGE", label: "Status Change", icon: "🔄" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <LucidePlus className="mr-2 h-4 w-4" />
            Log Activity
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
          <DialogDescription>
            Record an interaction or note for a lead.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="leadId" className="text-sm font-medium">
              Lead
            </label>
            <Controller
              name="leadId"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!!preselectedLeadId}
                  >
                    <SelectTrigger
                      id="leadId"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Activity Type
            </label>
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="title"
                    placeholder="e.g., Follow-up call completed"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <textarea
                    {...field}
                    id="description"
                    placeholder="Add details about this activity..."
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Activity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
