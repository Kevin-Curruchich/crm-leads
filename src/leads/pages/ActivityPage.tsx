import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8">
          <p className="text-gray-600 ">
            View a stream of touchpoints, follow-ups, and changes to your leads.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Activity timeline</CardTitle>
          <CardDescription>Recent updates will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          No activity yet. Start by adding leads or logging interactions.
        </CardContent>
      </Card>
    </div>
  );
}
