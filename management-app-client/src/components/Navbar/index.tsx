import React from "react";
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/lib/state";
import { useGetAuthUserQuery } from "@/lib/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: currentUser } = useGetAuthUserQuery({});

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!currentUser) {
    return null;
  }

  const currentUserDetail = currentUser?.userDetail;
  return (
    <div className="dark: flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search bar */}
      <div className="gap8 flex items-center">
        {!isSideBarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSideBarCollapsed))}
          >
            <Menu
              className={`mr-2 h-8 w-8 dark:text-white ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
          </button>
        )}

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search ..."
          />
        </div>
      </div>

      {/* Icon */}
      <div className="flex items-center gap-0">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={`rounded p-2 ${
            isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={`h-min w-min rounded p-2 ${
            isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block" />
        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetail?.profilePictureUrl ? (
              <Image
                src={getImageUrl(currentUserDetail?.profilePictureUrl)}
                alt={currentUserDetail?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetail?.username}
          </span>
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
