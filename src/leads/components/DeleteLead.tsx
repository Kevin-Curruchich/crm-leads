import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export const DeleteLead = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("deleteLead") === "true";
  const leadId = searchParams.get("leadId") || "";
  const leadName = searchParams.get("leadName") || "";

  const onChangeDialogDisplay = (open: boolean) => {
    if (!open) {
      searchParams.delete("deleteLead");
      searchParams.delete("leadId");
      searchParams.delete("leadName");
      setSearchParams(searchParams);
    }
  };

  const handleConfirmDelete = () => {
    console.log("Deleting lead with ID:", leadId);
  };

  const handleCancelDelete = () => {
    onChangeDialogDisplay(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChangeDialogDisplay}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the lead <strong>{leadName}</strong>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
