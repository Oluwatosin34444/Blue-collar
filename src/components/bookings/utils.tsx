import { Badge } from "../ui/badge";

export const getStatusBadge = (state: number) => {
  switch (state) {
    case 0:
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pending
        </Badge>
      );
    case 1:
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
