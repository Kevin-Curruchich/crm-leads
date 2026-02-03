import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  leadsCount: number;
  newLeadsCount: number;
}

export const LeadsStats = ({ leadsCount, newLeadsCount }: Props) => {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leadsCount}</div>
            <p className="text-xs text-gray-500 mt-2">All-time leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              New
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {newLeadsCount}
            </div>
            <p className="text-xs text-gray-500 mt-2">Awaiting contact</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Qualified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">1</div>
            <p className="text-xs text-gray-500 mt-2">Ready for next step</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
