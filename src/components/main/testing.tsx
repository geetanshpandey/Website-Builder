"use client";

import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, Settings, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function DashboardLinks() {
  const pathname = usePathname();

  return (
    <div className="fixed">
      {/* Event Types */}
      <Link
        href="/dashboard"
        className={cn(
          pathname === "/dashboard"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
        )}
      >
        <HomeIcon className="h-4 w-4" />
        Event Types
      </Link>

      {/* Meetings */}
      <Link
        href="/dashboard/meetings"
        className={cn(
          pathname === "/dashboard/meetings"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
        )}
      >
        <Users2 className="h-4 w-4" />
        Meetings
      </Link>

      {/* Availability */}
      <Link
        href="/dashboard/availability"
        className={cn(
          pathname === "/dashboard/availability"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
        )}
      >
        <CalendarCheck className="h-4 w-4" />
        Availability
      </Link>

      {/* Settings */}
      <Link
        href="/dashboard/settings"
        className={cn(
          pathname === "/dashboard/settings"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
        )}
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </div>
  );
}
