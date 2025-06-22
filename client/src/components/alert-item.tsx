import { AlertTriangle, Info, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItemProps {
  alert: {
    id: number;
    type: string;
    priority: string;
    title: string;
    description: string;
    createdAt: Date;
  };
}

export function AlertItem({ alert }: AlertItemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "price_spike":
        return <TrendingUp className="h-4 w-4" />;
      case "supplier_risk":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "alert-high border-l-4 border-l-red-500";
      case "medium":
        return "alert-medium border-l-4 border-l-yellow-500";
      default:
        return "alert-low border-l-4 border-l-blue-500";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const alertDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - alertDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than 1 hour ago";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  return (
    <div className={cn("p-3 rounded-md", getPriorityStyles(alert.priority))}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {getIcon(alert.type)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{alert.title}</p>
          <p className="text-xs mt-1 opacity-90">{alert.description}</p>
          <p className="text-xs mt-1 opacity-75">{getTimeAgo(alert.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
