"use client";

import { FileText, Download } from "lucide-react";

interface ReportCardProps {
  title: string;
  description: string;
  lastGenerated: string;
}

export default function ReportCard({
  title,
  description,
  lastGenerated,
}: ReportCardProps) {
  return (
    <div className="bg-white border rounded-3xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <FileText size={24} />
        </div>

        <button
          className="
            w-10
            h-10
            rounded-xl
            bg-gray-100
            hover:bg-blue-100
            hover:text-blue-600
            transition
            flex
            items-center
            justify-center
          "
        >
          <Download size={18} />
        </button>
      </div>

      <h3 className="text-lg font-bold mt-5">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>

      <div className="mt-5 pt-4 border-t">
        <p className="text-xs text-gray-400">
          Last Generated
        </p>

        <p className="font-medium mt-1">
          {lastGenerated}
        </p>
      </div>
    </div>
  );
}