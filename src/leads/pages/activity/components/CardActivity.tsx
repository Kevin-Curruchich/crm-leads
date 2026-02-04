import { Badge } from "@/components/ui/badge";
import { ACTIVITY_ICONS } from "@/leads/domain/activity-icons.constants";
import { activityColors } from "@/leads/domain/activity.constant";
import type { Activity } from "@/leads/domain/activity.interface";
import { formatRelativeDate } from "@/lib/date.utils";

interface Props {
  activity: Activity;
}

export const CardActivity = ({ activity }: Props) => {
  return (
    <div
      key={activity.id}
      className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-0 last:pb-0"
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 ${activityColors[activity.type]}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[8px]">
          {ACTIVITY_ICONS[activity.type]}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className={activityColors[activity.type]}
              >
                {activity.type.replace("_", " ")}
              </Badge>
              <span className="text-sm font-medium text-gray-900">
                {activity.leadName}
              </span>
            </div>
            <h3 className="font-semibold text-base text-gray-900">
              {activity.title}
            </h3>
          </div>
          <time className="text-xs text-gray-500 whitespace-nowrap ml-4">
            {formatRelativeDate(activity.dateCreated)}
          </time>
        </div>
        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
      </div>
    </div>
  );
};
