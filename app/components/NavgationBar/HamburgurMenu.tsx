"use client";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";
import { CurrentUser, Role } from "./UserMenu";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
interface HamburgurMenuProps {
  currentUser: CurrentUser | null;
}
const HamburgurMenu: React.FC<HamburgurMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const router = useRouter();
  return (
    <>
      <div className="relative z-30" onClick={toggleMenu}>
        <span>
          <AiOutlineMenu size={24} />
        </span>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[200px] right-0 top-12 cursor-pointer flex flex-col bg-white">
            <MenuItem
              onClick={() => {
                router.push("/apply");
              }}
            >
              Apply Now
            </MenuItem>

            <MenuItem
              onClick={() => {
                router.push("/aboutUs");
              }}
            >
              About Us
            </MenuItem>

            <MenuItem
              onClick={() => {
                router.push("/contactUs");
              }}
            >
              Contact Us
            </MenuItem>
            {!currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Register
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log in
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/myApplications");
                  }}
                >
                  Your Applications
                </MenuItem>
                <hr />
                {currentUser.role === Role.ADMIN && (
                  <Link href="/admin">
                    <MenuItem onClick={() => {}}>Admin Dashboard</MenuItem>
                  </Link>
                )}
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log out
                </MenuItem>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleMenu} />}
    </>
  );
};

export default HamburgurMenu;
