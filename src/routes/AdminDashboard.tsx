import { supabase } from "@/backend/client";
import { ChartComponent } from "@/components";
import Header from "@/components/admin/Header";
import { LineGraph } from "@/components/LineGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToLocalStorage, fetchLocalStorage } from "@/helpers/localstorage";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCookie } from "@/helpers/sessionstorage";

export const Route = createFileRoute("/AdminDashboard")({
  component: () => <AdminDashboard />,
});

function CardComponent({ title, content }) {
  return (
    <Card className="shadow-none border-none bg-slate-50">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 h-max font-bold">
        <h1 className="text-3xl leading-3">{content}</h1>
      </CardContent>
    </Card>
  );
}

export async function Mentees() {
  const { data, error } = await supabase.from("mentees").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function checkLoginStatus(){
  const cookieValue = await fetchCookie("isLoggedIn");
  if(cookieValue === null || cookieValue === undefined || cookieValue === "false"){
    window.location.replace("/")
  }
}

function AdminDashboard() {
  const LoginStatus = checkLoginStatus();
  
  const [approved, setApproved] = useState("0");
  const [pending, setPending] = useState("0");
  const [disapproved, setDisapproved] = useState("0");
  const [deleted, setDeleted] = useState("0");

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await Mentees();

      const dramaData = data.filter((mentee) => mentee.skill_group === "drama");
      const danceData = data.filter((mentee) => mentee.skill_group === "dance");
      const artData = data.filter((mentee) => mentee.skill_group === "art");
      const musicData = data.filter(
        (mentee) => mentee.skill_group === "slumfootie"
      );

      // Join all data together
      const statusData = [
        ...(dramaData || []),
        ...(danceData || []),
        ...(artData || []),
        ...(musicData || []),
      ];

      const activeCount = statusData.filter(
        (status) => status.status === "Active"
      ).length;

      const inactiveCount = statusData.filter(
        (status) => status.status === "Inactive"
      ).length;
      const disapprovedCount = statusData.filter(
        (status) => status.status === "Disapproved"
      ).length;
      const deletedCount = statusData.filter(
        (status) => status.status === "Deleted"
      ).length;

      // Update the counts
      setApproved(activeCount.toString());
      setPending(inactiveCount.toString());
      setDisapproved(disapprovedCount.toString());
      setDeleted(deletedCount.toString());

      // Add fetched data to localstorage
      addToLocalStorage("activeCount", activeCount);
      addToLocalStorage("inactiveCount", inactiveCount);
      addToLocalStorage("disapprovedCount", disapprovedCount);
      addToLocalStorage("deletedCount", deletedCount);
    };

    async function fetchStatusFromLocalStorage(status: string) {
      const response = await fetchLocalStorage(status);
      const data = await response;
      return data;
    }

    async function checkActiveCount() {
      const activeCount = await fetchLocalStorage("activeCount");

      if ((await activeCount) === null) {
        fetchStatus();
      } else {
        setApproved(await fetchStatusFromLocalStorage("activeCount"));
        setPending(await fetchStatusFromLocalStorage("inactiveCount"));
        setDisapproved(await fetchStatusFromLocalStorage("disapprovedCount"));
        setDeleted(await fetchStatusFromLocalStorage("deletedCount"));
      }
    }
    checkActiveCount();
  }, []);

  return (
    <main>
      <section className="sticky top-0 bg-white">
        <Header />
      </section>
      <section className="px-6 pt-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CardData.map((data) => (
            <React.Fragment key={data.title}>
              <CardComponent
                title={data.title}
                content={
                  data.title === "Approved" && approved === "0" ? (
                    <Skeleton className="w-full h-4 rounded-md" />
                  ) : data.title === "Pending" && pending === "0" ? (
                    <Skeleton className="w-full h-4 rounded-md" />
                  ) : data.title === "Disapproved" && disapproved === "0" ? (
                    <Skeleton className="w-full h-4 rounded-md" />
                  ) : data.title === "Deleted" && deleted === "0" ? (
                    <Skeleton className="w-full h-4 rounded-md" />
                  ) : data.title === "Approved" ? (
                    approved
                  ) : data.title === "Pending" ? (
                    pending
                  ) : data.title === "Disapproved" ? (
                    disapproved
                  ) : data.title === "Deleted" ? (
                    deleted
                  ) : (
                    "0"
                  )
                }
              />
            </React.Fragment>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-2 h-full">
            <ChartComponent />
          </div>
          <LineGraph />
        </div>
      </section>
    </main>
  );
}

const CardData = [
  { title: "Approved", count: "0" },
  { title: "Pending", count: "0" },
  { title: "Disapproved", count: "0" },
  { title: "Deleted", count: "0" },
];

