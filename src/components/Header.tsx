import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AILOGO_Plain from "@/assets/AILOGO.svg";
import MenuIcon from "@/assets/MenuIcon.svg";
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

const DropDownMenu = ({ trigger }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserImage = () => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className=" w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <p>Admin</p>
    </div>
  );
};

function Header(props) {
  return (
    <header className="px-6 py-4 relative border-b-2 flex items-center">
      <section className="flex items-center gap-2">
        <div className="flex items-center">
          <Sidebar trigger={<Logo src={MenuIcon} />} />
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
