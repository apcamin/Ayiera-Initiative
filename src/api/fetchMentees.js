import { supabase } from "@/backend/client";

async function fetchMentees() {
  try {
    const { data, error } = await supabase
      .from("mentees")
      .select("*")

    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching mentees:", error);
    return null;
  }
}

export default fetchMentees;
