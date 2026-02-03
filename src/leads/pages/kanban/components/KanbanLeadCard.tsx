import { KanbanCard } from "@/components/ui/shadcn-io/kanban";
import type { Lead } from "@/leads/domain/lead.interfact";
import { LucideBuilding2, LucideMail, LucidePhone } from "lucide-react";

import { formatRelativeDate } from "@/lib/date.utils";

interface Props {
  lead: Lead;
}

export const KanbanLeadCard = ({ lead }: Props) => {
  return (
    <KanbanCard id={lead.id} name={lead.name} column={lead.column}>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm">{lead.name}</h3>
        </div>

        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <LucideBuilding2 className="w-3 h-3" />
            <span>{lead.company as string}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideMail className="w-3 h-3" />
            <span className="truncate">{lead.email as string}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucidePhone className="w-3 h-3" />
            <span>{lead.phone as string}</span>
          </div>
        </div>

        <div className="pt-2 border-t text-xs text-gray-500">
          Added: {formatRelativeDate(lead.dateAdded)}
        </div>
      </div>
    </KanbanCard>
  );
};
