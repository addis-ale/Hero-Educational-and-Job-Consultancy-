"use client";

import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
// types.ts
export interface CurrentUser {
  id: string; // User's unique identifier
  name?: string | null; // User's name, optional
  email?: string | null; // User's email, optional
  emailVerified?: string | null; // ISO string or null
  image?: string | null; // User's image URL, optional
  role: Role; // User's role
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  isVerified: boolean;
  active: boolean;
}

// Role enum remains the same
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface UserMenuProps {
  currentUser: CurrentUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(currentUser);
  return (
    <div className="relative z-30">
      <div
        className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={toggleOpen}
      >
        <Avatar src={currentUser?.image} />
        <span className="text-white">
          <AiFillCaretDown />
        </span>
      </div>
      {isOpen && (
        <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm cursor-pointer flex flex-col z-50">
          {currentUser ? (
            <>
              <Link href="/myApplications">
                <MenuItem onClick={toggleOpen}>Your Applications</MenuItem>
              </Link>
              {currentUser.role === Role.ADMIN && (
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
              )}
              <hr />
              <MenuItem
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
              >
                Log out
              </MenuItem>
            </>
          ) : (
            <>
              <Link href="/login">
                <MenuItem onClick={toggleOpen}>Log in</MenuItem>
              </Link>
              <Link href="/register">
                <MenuItem onClick={toggleOpen}>Register</MenuItem>
              </Link>
            </>
          )}
        </div>
      )}
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </div>
  );
};

export default UserMenu;
