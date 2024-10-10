"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

import { supabase } from "@/backend/client";
import { useEffect, useState } from "react";

// Sample configuration for the chart
const chartConfig = {
  art: {
    label: "Art",
    color: "#8884d8",
  },
  dance: {
    label: "Dance",
    color: "#82ca9d",
  },
  drama: {
    label: "Drama",
    color: "#ffc658",
  },
  slumfootie: {
    label: "Slum Footie",
    color: "#ff7300",
  },
};

// Helper function to convert date to "YYYY-MM" format for monthly grouping
const formatDateToMonthYear = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};
export async function Mentees() {
  const { data, error } = await supabase.from("mentees").select("*");

  if (error) {
    throw error;
  }

  return data;
}


export function ChartComponent() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await Mentees();

        const countOccurrences = (data) => {
          return data.reduce((acc, { created_on }) => {
            const monthYear = formatDateToMonthYear(created_on);
            acc[monthYear] = (acc[monthYear] || 0) + 1;
            return acc;
          }, {});
        };

        const skillGroups = ["drama", "dance", "art", "slumfootie"];
        const countsBySkillGroup = skillGroups.reduce((acc, skill) => {
          acc[skill] = countOccurrences(
            data.filter((mentee) => mentee.skill_group === skill)
          );
          return acc;
        }, { drama: {}, dance: {}, art: {}, slumfootie: {} });

        const dramaCounts = countsBySkillGroup.drama;
        const danceCounts = countsBySkillGroup.dance;
        const artCounts = countsBySkillGroup.art;
        const slumfootieCounts = countsBySkillGroup.slumfootie;

        const allMonths = new Set([
          ...Object.keys(dramaCounts),
          ...Object.keys(danceCounts),
          ...Object.keys(artCounts),
          ...Object.keys(slumfootieCounts),
        ]);

        const combinedCounts = Array.from(allMonths).map((month) => ({
          month,
          drama: dramaCounts[month] || 0,
          dance: danceCounts[month] || 0,
          art: artCounts[month] || 0,
          slumfootie: slumfootieCounts[month] || 0,
        }));

        const sortedCounts = combinedCounts.sort(
          (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
        );
        setChartData(sortedCounts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);


  if (loading) return <Skeleton className="w-full h-full rounded-md" />;
  if (error) return <div>Error: {error}</div>;
  if (chartData.length === 0) return <div>No data available.</div>;

  return (
    <Card className="h-max shadow-none border-none bg-slate-50">
      <CardHeader>
        <CardTitle>Mentees' Enrollment Over Time</CardTitle>
        <CardDescription>
          Showing total participants in each field, aggregated monthly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[300px] xl:h-[200px] 2xl:h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(month) => month.slice(0, 7)}
            />{" "}
            {/* Displays month as YYYY-MM */}
            <Tooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillArt" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.art.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.art.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.dance.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.dance.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDrama" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.drama.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.drama.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSlumfootie" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig.slumfootie.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig.slumfootie.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="art"
              type="natural"
              fill="url(#fillArt)"
              fillOpacity={0.4}
              stroke={chartConfig.art.color}
              stackId="a"
            />
            <Area
              dataKey="dance"
              type="natural"
              fill="url(#fillDance)"
              fillOpacity={0.4}
              stroke={chartConfig.dance.color}
              stackId="a"
            />
            <Area
              dataKey="drama"
              type="natural"
              fill="url(#fillDrama)"
              fillOpacity={0.4}
              stroke={chartConfig.drama.color}
              stackId="a"
            />
            <Area
              dataKey="slumfootie"
              type="natural"
              fill="url(#fillSlumfootie)"
              fillOpacity={0.4}
              stroke={chartConfig.slumfootie.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
