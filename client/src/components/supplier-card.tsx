import { Building, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SupplierCardProps {
  supplier: {
    id: number;
    name: string;
    category: string;
    performanceScore: number;
    status: string;
    riskLevel: string;
  };
  isActive?: boolean;
  onClick?: () => void;
}

export function SupplierCard({ supplier, isActive, onClick }: SupplierCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    return "text-yellow-600";
  };

  const getStatusBadge = (status: string, riskLevel: string) => {
    if (status === "active" && riskLevel === "low") {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
    if (riskLevel === "medium" || riskLevel === "high") {
      return <Badge className="bg-yellow-100 text-yellow-800">Risk</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  const getProgressWidth = (score: number) => `${score}%`;

  return (
    <div 
      className={cn(
        "supplier-card",
        isActive && "supplier-card-active"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Building className="h-4 w-4 text-gray-500" />
            <h4 className="font-medium text-gray-900">{supplier.name}</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">{supplier.category}</p>
          <div className="flex items-center space-x-2">
            <span className={cn("text-lg font-bold", getScoreColor(supplier.performanceScore))}>
              {supplier.performanceScore}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
              <div 
                className={cn("h-2 rounded-full", {
                  "bg-green-500": supplier.performanceScore >= 85,
                  "bg-blue-500": supplier.performanceScore >= 70 && supplier.performanceScore < 85,
                  "bg-yellow-500": supplier.performanceScore < 70
                })}
                style={{ width: getProgressWidth(supplier.performanceScore) }}
              />
            </div>
          </div>
        </div>
        <div className="text-right">
          {getStatusBadge(supplier.status, supplier.riskLevel)}
        </div>
      </div>
    </div>
  );
}
