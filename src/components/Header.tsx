import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AILOGO_Plain from "@/assets/AILOGO.svg";
import MenuIcon from "@/assets/MenuIcon.svg";
import MenuList from "@/assets/menu_list.svg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/logo";
import Sidebar from "./Sidebar";
import { removeCookie } from "@/helpers/sessionstorage";

function Logout () {
  removeCookie("isLoggedIn");
  window.location.replace("/")
};

const DropDownMenu = ({ trigger }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="text-red-600" onClick={Logout}>Logout &rarr;</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserImage = () => {
  return (
    <div className="flex gap-2 items-center">
      <Logo src={MenuList} width="4" text="Telvin Otieno" />
    </div>
  );
};

function Header(props) {
  return (
    <header className="px-6 py-4 relative border-b-[1px] flex items-center border-gray-100">
      <section className="flex items-center">
        <div className="flex items-center scale-75">
          <Sidebar trigger={<Logo src={MenuIcon} width="8" height="8" />} />
        </div>
        <div className="w-15 h-max">
          <Logo src={AILOGO_Plain} />
        </div>
      </section>
      <section className="ml-auto w-max h-max">
        <DropDownMenu trigger={<UserImage />} />
      </section>
    </header>
  );
}

export default Header;
