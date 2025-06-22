import { FileText } from "lucide-react";

export default function Contracts() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Contract Management</h3>
        <p className="text-gray-500 mt-2">Managing supplier agreements for Mother Parkers' global tea & coffee operations</p>
        <p className="text-gray-400 text-sm mt-1">Advanced contract features in development</p>
      </div>
    </div>
  );
}
