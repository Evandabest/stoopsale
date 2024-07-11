"use client"
import { createClient } from "@/utils/supabase/client"
import { PostProps } from "@/app/post/page"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const Posts = ({ posts } : {posts: PostProps}) => {
    const supabase = createClient()
    const [username, setUsername] = useState<string>("")
    const [bid, setBid] = useState<number>(0)
    const [uid, setUid] = useState<string>("")
    const router = useRouter()

    useEffect(()=> {
        const getData = async () => {
            const { data, error } = await supabase.from("profiles").select("username").eq("id", posts.uid)

            if (error) {
                console.error("Error fetching username:", error)
                return
            }
            setUsername(data[0].username)

        }
        getData()

        const getUser = async () => {
            const { data: {user}, error} = await supabase.auth.getUser()
            if (!user || error) {
                console.error("Error fetching user:", error)
                return
            }
            setUid(user.id)
        }
        getUser()

        if (posts.bids.length != 0) {
            let avg = 0
            for (let i = 0; i < posts.bids.length; i++) {
                avg += posts.bids[i].bid
            }
            avg = avg / posts.bids.length
            setBid(avg)
        }
        else {
            setBid(posts.askingPrice)
        }
    
    }, [supabase])
        
    const goToPage = () => {
        router.push(`/post/${posts.id}`)
    }

    return (
        <div>
            <img src={posts.image} alt="" />
            <p>{username}</p>
            <p>{posts.description}</p>
            <p>{posts.askingPrice}</p>
            <p>{posts.fcfs}</p>
            <p>Average Bid price:</p>
            <p>{bid}</p>
            <Button onClick={goToPage}>Place bid</Button>
        </div>
    )
}

export default Posts  