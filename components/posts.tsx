"use client"
import { createClient } from "@/utils/supabase/client"
import { PostProps } from "@/app/post/page"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { get } from "http"

const Posted = ({ post } : {post: string}) => {
    const supabase = createClient()
    const [username, setUsername] = useState<string>("")
    const [bid, setBid] = useState<number>(0)
    const [posts, setPosts] = useState<PostProps>({
        id: "",
        image: "",
        description: "",
        askingPrice: 0,
        fcfs: false,
        bids: [],
        uid: ""
    })
    const router = useRouter()

    useEffect(()=> {

        const getPost = async () => {
            const { data, error } = await supabase.from('posts').select('*').eq('id', post)
            if (error) {
                console.error('Error fetching posts:', error);
                return
            }
            setPosts(data[0])

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
            getData()
        }

        getPost()

        const getData = async () => {
            const { data, error } = await supabase.from("profiles").select("username").eq("id", posts.uid)

            if (error) {
                console.error("Error fetching username:", error)
                return
            }
            setUsername(data[0].username)

        }
        //getData()
    }, [supabase])


    return (
        <div>
            <img src={posts.image} alt="" />
            <p>{username}</p>
            <p>{posts.description}</p>
            <p>{posts.askingPrice}</p>
            <p>{posts.fcfs}</p>
            <p>Average Bid price:</p>
            <p>{bid}</p>
        </div>
    )
}

export default Posted