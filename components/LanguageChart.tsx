"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export default function LanguageChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Language Distribution</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No language data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Language Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [value, 'Repositories']}
              contentStyle={{ 
                backgroundColor: '#1f1f1f', 
                border: '1px solid #3f3f3f',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.slice(0, 6).map((lang, index) => (
          <div key={lang.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-300">{lang.name}</span>
            <span className="text-sm text-gray-500 ml-auto">{lang.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}