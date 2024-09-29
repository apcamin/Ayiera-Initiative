import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SideBarComponents = ({trigger}) => {
    return (
      <Sheet>
        <SheetTrigger>{trigger}</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
}

function Sidebar({trigger}) {
    return (
      <div>
        <SideBarComponents trigger={trigger} />
      </div>
    );
}

export default Sidebar;