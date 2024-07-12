"use client"
import { createClient } from "@/utils/supabase/client"
import { PostProps } from "@/app/post/page"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
 
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"

const Posts = ({ posts } : {posts: PostProps}) => {
    const supabase = createClient()
    const [username, setUsername] = useState<string>("")
    const [bid, setBid] = useState<number>(0)
    const [uid, setUid] = useState<string>("")
    const router = useRouter()
    const [pfp, setPfp] = useState<string>("")

    useEffect(()=> {

        const getData = async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", posts.uid)

            if (error) {
                console.error("Error fetching username:", error)
                return
            }
            setUsername(data[0].username)
            setPfp(data[0].pfp)

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
            avg = Number(avg.toFixed(2));
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
        <>
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-80 sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                    translateZ="50"
                    className="text-xl font-bold flex flex-row items-center text-neutral-600 w-[90%] dark:text-white"
                    >
                    <img src={pfp} alt="" className="rounded-full mr-4 h-10 w-10" />
                    <p className="mr-10">{username}</p>
                    {posts.fcfs ? (
                        <img className="w-20 flex flex-end" src="https://csabmhnamijitrwiiaga.supabase.co/storage/v1/object/public/posts/Screenshot_2024_07_12_at_1.58.11_AM.png"
                        alt="fcfs"/>) : null}
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
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        onClick={goToPage}
                    >
                        Place Bid
                    </CardItem>
                    </div>
                </CardBody>
                </CardContainer>
        </>
    )
}

export default Posts  