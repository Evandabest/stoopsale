"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const updateUserName = async(formdata: FormData) => {
    const supabase = createClient();
    const { data: {user}} = await supabase.auth.getUser();
    const id = user?.id
    if (!id) {
        console.log("Error getting user")
    }
    const getPost = async () => {
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id)
        if (error) {
            console.error("Error fetching posts:", error)
            return
        }
        console.log(data)
        return data[0]
    }


    const userN = formdata.get("username")
    const post = await getPost()
    const copy = {
        ...post,
        username: userN
    }
    console.log(copy)   
    const {data, error} = await supabase.from("profiles").update(copy).eq("id", id)
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
    redirect("/home")
}