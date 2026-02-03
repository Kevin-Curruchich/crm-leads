import { use } from "react";
import { useSearchParams } from "react-router";

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
import { LeadsContext } from "../context/LeadsContext";
import { LeadStatus } from "../domain/lead-status.type";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  status: z.enum(LeadStatus),
});

export const AddNewLead = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const leadModalOpen = searchParams.get("leadModalOpen") === "true" || false;
  const leadId = searchParams.get("leadId") || null;

  const { addLead, updateLead, getLeadById } = use(LeadsContext);

  const open = leadModalOpen;

  const leadData = leadId
    ? getLeadById?.(leadId)
    : {
        name: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        status: LeadStatus.NEW,
      };

  const setOpen = (isOpen: boolean) => {
    if (isOpen) {
      searchParams.set("leadModalOpen", "true");
    } else {
      searchParams.delete("leadModalOpen");
      searchParams.delete("leadId");
    }
    setSearchParams(searchParams);
  };

  const isEditMode = !!leadId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: leadData,
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      status: LeadStatus.NEW,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode && leadId) {
      updateLead(leadId, data);
    } else {
      addLead(data);
    }
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Lead</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Lead" : "Add New Lead"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details of your client."
              : "Enter the details of your new client."}
          </DialogDescription>
        </DialogHeader>
        <form
          key={leadId || "new-lead"}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Client name"
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
            <label htmlFor="name" className="text-sm font-medium">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Client lastName"
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
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="client@example.com"
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
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="phone"
                    placeholder="+1 (555) 000-0000"
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
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="company"
                    placeholder="Company name"
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
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="status"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(LeadStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status
                            .replace("_", " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
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
              {isEditMode ? "Update Lead" : "Save Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
