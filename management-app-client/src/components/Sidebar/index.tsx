"use client";

import { setIsSidebarCollapsed } from "@/lib/state";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SidebarLink from "./SidebarLink";
import { useGetProjectsQuery } from "@/lib/state/api";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data } = useGetProjectsQuery();
  const projects = data?.data || [];

  const sideBarClassnames = `fixed z-40 flex h-[100%] flex-col overflow-y-auto bg-white shadow-xl transition-all duration-300 dark:bg-black ${isSidebarCollapsed ? "w-0" : "w-64"}`;

  return (
    <div className={sideBarClassnames}>
      <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          MANAGEMENT
        </span>
        {isSidebarCollapsed ? null : (
          <button
            className="py-3"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <X className="h-6 w-6 cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <div>
          <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
            CRIS TEAM
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
            <p className="text-xs text-gray-500">Private</p>
          </div>
        </div>
      </div>

      {/* NAVBAR LINKS */}
      <nav className="z-10 w-full">
        <SidebarLink href="/" icon={Home} label="Home" />
        <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
        <SidebarLink href="/search" icon={Search} label="Search" />
        <SidebarLink href="/settings" icon={Settings} label="Settings" />
        <SidebarLink href="/users" icon={User} label="Users" />
        <SidebarLink href="/teams" icon={Users} label="Team" />
      </nav>

      {/* PROJECTS LIST */}
      <button
        onClick={() => setShowProjects((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
      >
        <span className="">Projects</span>
        {showProjects ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {/* PROJECTS LIST */}
      {showProjects &&
        projects?.map((project) => {
          return (
            <SidebarLink
              key={project.id}
              href={`/projects/${project.id}`}
              icon={Briefcase}
              label={project.name}
            />
          );
        })}

      {/* PRIORITY LIST */}
      <button
        onClick={() => setShowPriority((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
      >
        <span className="">Priority</span>
        {showPriority ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {showPriority && (
        <>
          <nav className="z-10 w-full">
            <SidebarLink
              href="/priority/urgent"
              icon={AlertCircle}
              label="Urgent"
            />
            <SidebarLink
              href="/priority/high"
              icon={ShieldAlert}
              label="High"
            />
            <SidebarLink
              href="/priority/medium"
              icon={AlertTriangle}
              label="Medium"
            />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink
              href="/priority/backlog"
              icon={Layers3}
              label="Backlog"
            />
          </nav>
        </>
      )}
      {/* PRIORITY LIST */}
    </div>
  );
};

export default Sidebar;
