import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <Avatar className="outline-1 outline-offset-2 outline-black outline w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <p>Admin</p>
    </div>
  );
};

function Header(props) {
  return (
    <header className="px-6 py-4 bg-red-100">
      <DropDownMenu trigger={<UserImage />} />
    </header>
  );
}

export default Header;
