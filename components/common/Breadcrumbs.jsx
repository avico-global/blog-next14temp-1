import { ChevronsRight } from "lucide-react";
import React from "react";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className="w-full flex items-center justify-center py-2">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <ChevronsRight className="w-4" />}
          <a
            href={breadcrumb.url}
            className="ml-2 hover:underline transition-all"
          >
            {breadcrumb.label}
          </a>
        </span>
      ))}
    </div>
  );
}
