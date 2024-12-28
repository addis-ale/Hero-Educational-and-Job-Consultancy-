import Link from "next/link";
import Container from "../Container";
import UserMenu from "./UserMenu";
import HamburgurMenu from "./HamburgurMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import logo from "../../assets/logo.jpg";
import Image from "next/image";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: "400" });
const NavBar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="sticky top-0 w-full z-30 shadow-sm font-semibold">
      <div className=" bg-blue-700 border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div>
              <Link href="/">
                <div className="flex items-center gap-2">
                  <Image
                    src={logo}
                    alt="logo"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div
                    className={`${redressed.className} font-bold text-1xl text-white flex flex-col`}
                  >
                    <span className="uppercase">Hero Edu. &amp; job</span>
                    <span className="uppercase">CONSULTANCY</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="md:hidden block">
              <HamburgurMenu currentUser={currentUser} />
            </div>
            <div className="items-center gap-4 hidden md:flex">
              <div className="flex gap-8 md:gap-12 items-center">
                <div className="text-white">
                  <Link href="/apply">Apply Now </Link>
                </div>
                <div className="text-white">
                  <Link href="/aboutUs">About Us</Link>
                </div>
                <div className="text-white">
                  <Link href="/contactUs">Contact Us</Link>
                </div>
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
