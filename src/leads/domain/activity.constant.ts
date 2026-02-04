export type ActivityType =
  | "NOTE"
  | "CALL"
  | "EMAIL"
  | "MEETING"
  | "STATUS_CHANGE";

export const activityTypes = [
  { value: "NOTE", label: "Note", icon: "📝" },
  { value: "CALL", label: "Call", icon: "📞" },
  { value: "EMAIL", label: "Email", icon: "📧" },
  { value: "MEETING", label: "Meeting", icon: "🤝" },
  { value: "STATUS_CHANGE", label: "Status Change", icon: "🔄" },
];

export const activityColors = {
  CALL: "bg-blue-100 text-blue-700 border-blue-200",
  EMAIL: "bg-purple-100 text-purple-700 border-purple-200",
  NOTE: "bg-gray-100 text-gray-700 border-gray-200",
  MEETING: "bg-green-100 text-green-700 border-green-200",
  STATUS_CHANGE: "bg-orange-100 text-orange-700 border-orange-200",
};
