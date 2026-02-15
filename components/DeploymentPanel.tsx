import { Server, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

export default function DeploymentPanel({ deployments }: { deployments: any[] }) {
  if (!deployments || deployments.length === 0) {
    return (
      <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Vercel Deployments</h3>
        <div className="text-gray-500 text-center py-8">
          No deployments found
        </div>
      </div>
    );
  }

  const getStatusColor = (state: string) => {
    switch (state) {
      case "READY": return "text-green-500";
      case "ERROR": return "text-red-500";
      case "BUILDING": return "text-yellow-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case "READY": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "ERROR": return <XCircle className="w-4 h-4 text-red-500" />;
      case "BUILDING": return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Vercel Deployments</h3>
        <Server className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        {deployments.slice(0, 5).map((deployment: any) => (
          <div key={deployment.uid} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {getStatusIcon(deployment.state)}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-300 truncate">
                  {deployment.name || deployment.url}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(deployment.created).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${getStatusColor(deployment.state)}`}>
                {deployment.state}
              </span>
              {deployment.url && (
                <a 
                  href={`https://${deployment.url}`} 
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {deployments.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing 5 of {deployments.length} deployments
          </p>
        </div>
      )}
    </div>
  );
}