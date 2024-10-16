import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import formSchema from "@/schemas/formSchema.jsx";
import {supabase} from "@/backend/client.js"
import { useToast } from "@/hooks/use-toast";


export async function validateUser(values: z.infer<typeof formSchema>) {
    const { toast } = useToast()

    const email = values.email
    const password = values.password
        
    const { data: user, error } = await supabase.from("administrator").select("*")
    if (error) {
      console.error(error)
    } else {
      if(user[0].Email !== email){
        toast({
          variant: "destructive",
          title: "User or Password not found",
          description: "Please try again.",
          duration: 3000,
        })
        return
      }
      if(user[0].Password === password) {
        console.log("User authenticated successfully")
        window.location.href = "/adminDashboard"
        return
      }
      toast({
        variant: "destructive",
        title: "User or Password not found",
        description: "Please try again.",
        duration: 3000,
      })
    }
  }