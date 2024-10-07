import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import Header from "@/components/Header";
import {UserTable} from "@/components/table/user"

export const Route = createFileRoute("/users")({
  component: () => <Users />,
});

function Users() {
  return (
    <main>
      <section className="sticky top-0 bg-white">
        <Header />
      </section>
      <section className="px-6 pt-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Users
        </h1>
        <UserTable />
      </section>
    </main>
  );
}
