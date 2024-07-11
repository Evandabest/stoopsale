"use client"
import { createClient } from "@/utils/supabase/client"
import { PostProps } from "@/app/post/page"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const PostsPage = ({ params } : { params : {id: string}}) => {
    const supabase = createClient()
    const [username, setUsername] = useState<string>("")
    const [bid, setBid] = useState<number>(0)
    const [uid, setUid] = useState<string>("")
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
                setBid(avg)
            }
            else {
                setBid(data[0].askingPrice)
            }
            return data[0]
        }
        const getData = async () => {
            const postData = await getPost()
            const { data, error } = await supabase.from("profiles").select("username").eq("id", postData.uid)

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
        <div>
            <img src={posts.image} alt="" />
            <p>{username}</p>
            <p>{posts.description}</p>
            <p>{posts.askingPrice}</p>
            <p>{posts.fcfs}</p>
            <p>Average Bid price:</p>
            <form>
                <Button name = "minus" onClick = {(e)=> handleBid(e)}> - </Button>
                <Input value={bid} onChange={handleChange}/>
                <Button name = "plus" onClick = {(e)=> handleBid(e)}> + </Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </form>

        </div>
    )
}


export default PostsPage  