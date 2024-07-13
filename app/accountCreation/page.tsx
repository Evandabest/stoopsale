"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserName } from "./actions";

const AccountCreation = async() => {
    const supabase = createClient();
    const { data: {user}, error} = await supabase.auth.getUser();
    if (error) {
        console.log(error)
        redirect("/login")
    }
    
    return (
        <div className="h-screen flex items-center justify-center">
        <form className="flex flex-col m-auto items-center justify-center" action={updateUserName}>
            <h1 className="text-white font-bold">What do they call you?</h1>
            <Input type="text" className="my-4" name = "username" placeholder="username"></Input>
            <Button type="submit">Submit</Button>
        </form>
        </div>
    ) 
}

export default AccountCreation;



