export type ActivityType =
  | "NOTE"
  | "CALL"
  | "EMAIL"
  | "MEETING"
  | "STATUS_CHANGE";

export interface Activity {
  id: string;
  leadId: string;
  leadName: string;
  type: ActivityType;
  title: string;
  description: string;
  dateCreated: string;
}
