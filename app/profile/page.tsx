import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Posted from "@/components/posts";

const Profile = async () => {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser();
    const id = user?.id;
    const {data, error} = await supabase.from('profiles').select('*').eq('id', id)
    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(data[0])

    let posts : any = []
    for (let i = 0; i < data.length; i++) {
        posts = [...posts, data[i].posts]
    }

    const goToEdit = async (formData: FormData) => {
        "use server"
        redirect("/profile/edit") 
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <img src="https://csabmhnamijitrwiiaga.supabase.co/storage/v1/object/public/posts/Screenshot_2024_07_11_at_11.33.42_PM.png?t=2024-07-12T03%3A38%3A06.326Z" alt="logo" className="h-24 w-24 mt-4" />
            <form className="flex flex-col shadow-md bg-white rounded-md shadow-black p-4 w-80 m-auto items-center justify-center mt-12">
                <img className="rounded-full mb-8 h-24 w-24" src={data[0].pfp} alt="Profile Picture" />
                <p className="mb-4">Display name: {data[0].username}</p>
                <Button formAction={goToEdit}>Edit</Button>
            </form>
            {data[0].posts &&  data[0].posts.length > 0 ? (
                <>
                    {data[0].posts.map((post: any) => (
                        <Posted key={post.id} post={post} />
                    ))}
                </>
            ) : (
                <p>No posts</p>
            )}
        </div>
        </>
    )
}

export default Profile
