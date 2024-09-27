import Signup from "@/components/Signup";
import Logo from "@/components/ui/logo";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";


export const Route = createFileRoute("/signup")({
  component: () => <SignupPage />,
});

function SignupPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute top-10 left-10">
        <Logo text="Ayiera Initiative" />
      </div>
      <div className="h-max w-1/4">
        <Signup />
      </div>
    </div>
  );
}