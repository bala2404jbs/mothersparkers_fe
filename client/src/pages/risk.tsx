import { Globe } from "lucide-react";

export default function Risk() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Global Risk Assessment</h3>
        <p className="text-gray-500 mt-2">Monitoring supply chain risks across Mother Parkers' global tea & coffee network</p>
        <p className="text-gray-400 text-sm mt-1">Advanced risk mapping features in development</p>
      </div>
    </div>
  );
}
