"use client"
import { createClient } from "@/utils/supabase/client"
import { PostProps } from "@/app/post/page"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { set } from "date-fns"

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
    const [pfp, setPfp] = useState<string>("")
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
                avg = Number(avg.toFixed(2));
                setBid(avg)
            }
            else {
                setBid(posts.askingPrice)
            }
            getData()
        }

        getPost()

        const getData = async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", posts.uid)

            if (error) {
                console.error("Error fetching username:", error)
                return
            }
            setUsername(data[0].username)
            setPfp(data[0].pfp)

        }
        //getData()
    }, [supabase])


    return (
        <>
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                    translateZ="50"
                    className="text-xl font-bold flex flex-row items-center text-neutral-600 dark:text-white"
                    >
                    <img src={pfp} alt="" className="rounded-full mr-4 h-10 w-10" />
                    {username}
                    </CardItem>
                    <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                    Asking Price: {posts.askingPrice}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src={posts.image}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {posts.description}
                    </CardItem>
                    <div className="flex justify-between items-center mt-50">
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        Average Bid: {bid}
                    </CardItem>
                    </div>
                </CardBody>
                </CardContainer>
        </>
    )
}

export default Posted