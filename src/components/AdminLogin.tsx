import { supabase } from "@/backend/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formSchema from "@/schemas/formSchema.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { createCookie } from "@/helpers/sessionstorage";
function AdminLogin() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email;
    const password = values.password;

    const { data: user, error } = await supabase
      .from("administrator")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      if (user[0].Email !== email) {
        toast({
          variant: "destructive",
          title: "User or Password not found",
          description: "Please try again.",
          duration: 3000,
        });
        return;
      }
      if (user[0].Password === password) {
        createCookie("isLoggedIn", true)
        console.log("User authenticated successfully");
        window.location.href = "/adminDashboard";
        return;
      }
      toast({
        variant: "destructive",
        title: "User or Password not found",
        description: "Please try again.",
        duration: 3000,
      });
    }
  }

  return (
    <Form {...form}>
      <div className="grid gap-6">
        <Toaster />
        <p className="text-4xl font-bold text-slate-800">
          Administrator Sign-In
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-800 w-full h-12">
            Login and continue
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default AdminLogin;
