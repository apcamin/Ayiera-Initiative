import * as React from 'react';
import { Link } from '@tanstack/react-router';
import Logo from '@/components/ui/logo';
import {
  users_icon,
  dashboard_icon,
  feedback_icon,
  AILOGO,
} from "@/assets/icons";
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
        <SheetContent side="left" className="md:w-1/5">
          <div className="flex flex-col gap-10">
            <Logo src={AILOGO} />
            <section className="flex flex-col gap-6">
              <p className="text-sm text-gray-600">Navigation</p>
              <Link to="/dashboard" className="flex gap-2">
                <img src={dashboard_icon} alt="" />
                Dashboard
              </Link>
              <Link to="/users" className="flex gap-2">
                <img src={users_icon} alt="" />
                Users
              </Link>
              <Link to="/feedback" className="flex gap-2">
                <img src={feedback_icon} alt="" />
                Feedback
              </Link>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    );
}

function Sidebar({trigger}) {
    return (
      <>
        <SideBarComponents trigger={trigger} />
      </>
    );
}

export default Sidebar;