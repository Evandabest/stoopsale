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
        <form className="flex flex-col border-2 shadow-md shadow-black p-4 w-96 m-auto items-center justify-center mt-12">
            <img className="rounded-full mb-8 h-24 w-24" src={data[0].pfp} alt="Profile Picture" />
            <p>Display name: </p>
            <p>{data[0].username}</p>
            {data[0].posts &&  data[0].posts.length > 0 ? (
                <>
                    {data[0].posts.map((post: any) => (
                        <Posted key={post.id} post={post} />
                    ))}
                </>
            ) : (
                <p>No posts</p>
            )}
        </form>
        </>
    )
}

export default Profile
