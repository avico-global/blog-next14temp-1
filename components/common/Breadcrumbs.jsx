import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import React from "react";

export default function Breadcrumbs({ breadcrumbs, className }) {
  return (
    <div
      className={cn(
        "w-full flex items-center py-2 font-semibold text-gray-500",
        className
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronsRight className="w-4" />}
          <a href={breadcrumb.url} className="hover:underline transition-all">
            {breadcrumb.label}
          </a>
        </span>
      ))}
    </div>
  );
}
