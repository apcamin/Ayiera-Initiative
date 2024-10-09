import { supabase } from "@/backend/client";
import Header from "@/components/admin/Header";
import { LineGraph } from "@/components/LineGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToLocalStorage, fetchLocalStorage } from "@/helpers/localStorage";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { ChartComponent } from "@/components";

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

function AdminDashboard() {
  const [approved, setApproved] = useState("0");
  const [pending, setPending] = useState("0");
  const [disapproved, setDisapproved] = useState("0");
  const [deleted, setDeleted] = useState("0");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: dramaData, error: dramaError } = await supabase
        .from("drama_instructor")
        .select("status");

      const { data: danceData, error: danceError } = await supabase
        .from("dance_instructor")
        .select("status");

      const { data: artData, error: artError } = await supabase
        .from("art_instructor")
        .select("status");

      const { data: musicData, error: musicError } = await supabase
        .from("music_instructor")
        .select("status");

      // Join all data together
      const statusData = [
        ...(dramaData || []),
        ...(danceData || []),
        ...(artData || []),
        ...(musicData || []),
      ];

      if (dramaError || danceError || artError || musicError) {
        console.log(dramaError || danceError || artError || musicError);
        return;
      }

      const activeCount = statusData.filter(
        (status) => status.status === "active"
      ).length;

      const inactiveCount = statusData.filter(
        (status) => status.status === "inactive"
      ).length;
      const disapprovedCount = statusData.filter(
        (status) => status.status === "deactivated"
      ).length;
      const deletedCount = statusData.filter(
        (status) => status.status === "deleted"
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

    async function fetchStatusFromLocalStorage(status: string){
      const response = await fetchLocalStorage(status);
      const data = await response
      return data
    }
    
    async function checkActiveCount(){
      const activeCount = await fetchLocalStorage("activeCount");
      console.log(activeCount);
      
      if (await activeCount === null) {
        fetchStatus();
      } else {
        setApproved(await fetchStatusFromLocalStorage("activeCount"))
        setPending(await fetchStatusFromLocalStorage("inactiveCount"));
        setDisapproved(await fetchStatusFromLocalStorage("disapprovedCount"))
        setDeleted(await fetchStatusFromLocalStorage("deletedCount"))
      }
    }
    checkActiveCount()
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
        <div className="grid md:grid-cols-4 gap-6">
          {CardData.map((data) => (
            <React.Fragment key={data.title}>
              <CardComponent
                title={data.title}
                content={
                  data.title === "Approved"
                    ? approved
                    : data.title === "Pending"
                      ? pending
                      : data.title === "Disapproved"
                        ? disapproved
                        : data.title === "Deleted"
                          ? deleted
                          : "0"
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

