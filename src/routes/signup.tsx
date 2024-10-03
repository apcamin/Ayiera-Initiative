import Signup from "@/components/Signup";
import Logo from "@/components/ui/logo";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";


export const Route = createFileRoute("/signup")({
  component: () => <SignupPage />,
});

function SignupPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute top-10 left-10">
        <Link to="/" className="flex gap-2 items-center">
          <span>&larr;</span>
          <Logo />
        </Link>
      </div>
      <div className="h-max w-1/4">
        <Signup />
      </div>
    </div>
  );
}