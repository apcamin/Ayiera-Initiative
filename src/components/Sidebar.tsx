import * as React from 'react';
import { Link } from '@tanstack/react-router';
import Logo from './ui/logo';
import AILOGO from "@/assets/AILOGO.svg"
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
          <div className='flex flex-col gap-10'>
            <Logo src={AILOGO} />
            <section className='flex flex-col gap-6'>
              <p className="text-sm text-gray-600">Navigation</p>
              <Link to="/dashboard" className="flex gap-2">
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/></svg>
                Dashboard
              </Link>
              <Link to="/users" className="flex gap-2">
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"/><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"/></svg>
                Users
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