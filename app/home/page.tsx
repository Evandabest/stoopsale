import { createClient } from "@/utils/supabase/server";
import Posts from "@/components/post";


const Home = async() => {
    const supabase = createClient()
    const posts = await supabase.from('posts').select('*')
    const newPosts = posts?.data?.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    )

    return (
        <div className="flex flex-col items-center justify-center">
            <img src="https://csabmhnamijitrwiiaga.supabase.co/storage/v1/object/public/posts/Screenshot_2024_07_11_at_11.33.42_PM.png?t=2024-07-12T03%3A38%3A06.326Z" alt="logo" className="h-24 w-24 mt-4" />
            <div className="flex flex-col items-center justify-center">
                {newPosts?.map((post) => (
                    <Posts posts={post} />
                ))}
            </div>
        </div>
    );
}

export default Home;