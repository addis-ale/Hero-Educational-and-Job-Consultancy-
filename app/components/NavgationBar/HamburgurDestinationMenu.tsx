"use client";
import Link from "next/link";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import MenuItem from "./MenuItem";

import { useState } from "react";

export type Scholarship = {
  id: number;
  nation: string;
  school: string;
  type: string;
  amount: string;
  description: string;
  eligibility: string[];
  applicationDeadline: string;
  website: string;
};

interface DestinationProps {
  scholarshipsDestinations: string[];
}

const HamburgurDestination: React.FC<DestinationProps> = ({
  scholarshipsDestinations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={(prev) => {
            setIsOpen(!prev);
          }}
          className="flex flex-col gap-1 cursor-pointer px-4 py-3 hover:bg-neutral-100 transition text-md font-normal"
        >
          <div className="flex gap-1 items-center">
            <span>Destinations</span>
            {isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
          </div>
          {isOpen && (
            <div className="px-4 cursor-pointer flex flex-col">
              {scholarshipsDestinations.map((destination) => (
                <Link key={destination} href={`/${destination}`}>
                  <MenuItem
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                    }}
                  >
                    {destination}
                  </MenuItem>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* {isOpen && (
        <BackDrop
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        />
      )} */}
    </>
  );
};

export default HamburgurDestination;
