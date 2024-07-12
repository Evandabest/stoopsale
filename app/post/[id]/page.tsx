"use client"
import { createClient } from "@/utils/supabase/client"
import { PostProps } from "@/app/post/page"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"

const PostsPage = ({ params } : { params : {id: string}}) => {
    const supabase = createClient()
    const [username, setUsername] = useState<string>("")
    const [bid, setBid] = useState<number>(0)
    const [uid, setUid] = useState<string>("")
    const [pfp, setPfp] = useState<string>("")
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
            console.log(params.id)
            const { data, error } = await supabase.from('posts').select('*').eq('id', params.id)
            if (error) {
                console.error('Error fetching posts:', error);
                return
            }
            setPosts(data[0])
            if (data[0].bids.length != 0) {
                let avg = 0
                for (let i = 0; i < data[0].bids.length; i++) {
                    avg += data[0].bids[i].bid
                }
                avg = avg / data[0].bids.length
                avg = Number(avg.toFixed(2));
                setBid(avg)
            }
            else {
                setBid(data[0].askingPrice)
            }
            return data[0]
        }
        const getData = async () => {
            const postData = await getPost()
            const { data, error } = await supabase.from("profiles").select("*").eq("id", postData.uid)

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
    
    }, [supabase])

    const handleBid = (e: any) => {
        e.preventDefault()
        if ((e.target as HTMLButtonElement).name === "plus") {
            setBid(bid + 1)
        }
        else {
            setBid(bid - 1)
        }
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const newBid = {
            bid: bid, 
            uid: uid
        }
        const { data, error } = await supabase.from("posts").update({ bids: [...posts.bids, newBid] }).eq("id", posts.id)
        if (error) {
            console.error("Error updating bids:", error)
            return
        }
        console.log("Bid submitted")
        router.push("/home")
    }

    const handleChange = (e: any) => {
        setBid(parseInt(e.target.value))
    }


    return (
        <div className="flex flex-col h-screen items-center justify-center">
        <img src="https://csabmhnamijitrwiiaga.supabase.co/storage/v1/object/public/posts/Screenshot_2024_07_11_at_11.33.42_PM.png?t=2024-07-12T03%3A38%3A06.326Z" alt="logo" className="h-24 w-24 mt-4" />
        <div className="mt-20">
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full flex flex-col sm:w-[30rem] h-auto rounded-xl p-6 border  ">
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
                        as="div"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 items-center justify-center dark:text-neutral-300"
                    >
                        <form className="flex flex-row">
                            <Button name = "minus" onClick = {(e)=> handleBid(e)}> - </Button>
                            <Input className="w-20" value={bid} onChange={handleChange}/>
                            <Button name = "plus" onClick = {(e)=> handleBid(e)}> + </Button>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </form>
                    </CardItem>
                    </div>
                </CardBody>
                </CardContainer>
        </div>
        </div>
    )
}


export default PostsPage  