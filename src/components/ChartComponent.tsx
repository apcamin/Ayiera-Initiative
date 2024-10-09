"use client";

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

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

export function ChartComponent() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dramaData, danceData, artData, slumfootieData] =
          await Promise.all([
            supabase.from("drama_instructor").select("created_on"),
            supabase.from("dance_instructor").select("created_on"),
            supabase.from("art_instructor").select("created_on"),
            supabase.from("slumfootie_instructor").select("created_on"),
          ]);

        // Handle errors for each fetch
        if (
          dramaData.error ||
          danceData.error ||
          artData.error ||
          slumfootieData.error
        ) {
          throw new Error(
            dramaData.error?.message ||
              danceData.error?.message ||
              artData.error?.message ||
              slumfootieData.error?.message
          );
        }

        // Function to count occurrences of each date
        const countOccurrences = (data) => {
          return data.reduce((acc, { created_on }) => {
            const date = new Date(created_on).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});
        };

        // Count occurrences for each category
        const dramaCounts = countOccurrences(dramaData.data);
        const danceCounts = countOccurrences(danceData.data);
        const artCounts = countOccurrences(artData.data);
        const slumfootieCounts = countOccurrences(slumfootieData.data);

        // Combine counts into the desired format
        const allDates = new Set([
          ...Object.keys(dramaCounts),
          ...Object.keys(danceCounts),
          ...Object.keys(artCounts),
          ...Object.keys(slumfootieCounts),
        ]);

        const combinedCounts = Array.from(allDates).map((date) => ({
          month: date,
          drama: dramaCounts[date] || 0,
          dance: danceCounts[date] || 0,
          art: artCounts[date] || 0,
          slumfootie: slumfootieCounts[date] || 0,
        }));

        // Sort the combined counts by date
        const sortedCounts = combinedCounts.sort(
          (a, b) => new Date(a.month) - new Date(b.month)
        );

        // Set the state with sorted counts
        setChartData(sortedCounts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (chartData.length === 0) return <div>No data available.</div>;

  return (
    <Card className="h-max shadow-none border-none bg-slate-50">
      <CardHeader>
        <CardTitle>Mentees' Progress Over Time</CardTitle>
        <CardDescription>
          Showing total participants in each field for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="aspect-auto h-[300px] xl:h-[200px] 2xl:h-[250px] w-full" config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
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
