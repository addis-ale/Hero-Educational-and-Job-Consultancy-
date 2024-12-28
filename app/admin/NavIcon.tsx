"use client";

import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminNavItem from "../components/AdminNavItem";

const AdminNavIcon = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-screen md:w-64 bg-gray-900" : "w-20 bg-white"
        } transition-all duration-300 ease-in-out 
        text-white flex flex-col relative z-20`}
      >
        <div className="flex-grow"></div>

        {/* Navigation Items */}
        {isOpen && (
          <div className="flex flex-col gap-4 p-4 items-start w-full">
            <Link href="/admin">
              <div onClick={navToggle}>
                <AdminNavItem
                  label="Summary"
                  icon={MdDashboard}
                  selected={pathName === "/admin"}
                />
              </div>
            </Link>

            <Link href="/admin/add-scholarship">
              <div onClick={navToggle}>
                <AdminNavItem
                  label="Add Scholarship"
                  icon={MdLibraryAdd}
                  selected={pathName === "/admin/add-scholarship"}
                />
              </div>
            </Link>

            <Link href="/admin/manage-scholarship">
              <div onClick={navToggle}>
                <AdminNavItem
                  label="Manage Scholarship"
                  icon={MdDns}
                  selected={pathName === "/admin/manage-scholarship"}
                />
              </div>
            </Link>

            <div className="mb-8">
              <Link href="/admin/manage-applications">
                <div onClick={navToggle}>
                  <AdminNavItem
                    label="Manage Applications"
                    icon={MdFormatListBulleted}
                    selected={pathName === "/admin/manage-applications"}
                  />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Toggle Icon */}
        <div
          className="mt-8 absolute bottom-4 right-4 cursor-pointer"
          onClick={navToggle}
        >
          {isOpen ? (
            <BiChevronLeft size={24} />
          ) : (
            <BiChevronRight size={24} className="text-black" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavIcon;
