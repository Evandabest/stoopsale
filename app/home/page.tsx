import { createClient } from "@/utils/supabase/server";
import Posts from "@/components/post";


const Home = async() => {
    const supabase = createClient()
    const posts = await supabase.from('posts').select('*')


    return (
        <div>
            {posts?.data?.map((post) => (
                <Posts posts={post} />
            ))}
        </div>
    );
}

export default Home;