"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"


export interface PostProps {
    id: string
    image: string
    description: string
    askingPrice: number
    fcfs: boolean
    bids: bidProps[]
    uid: string
}

interface bidProps {
    bid: number
    uid: string
}


const Post = () => {
    const supabase = createClient()
    const [field, setField] = useState<PostProps>({
        id: "",
        image: "",
        description: "",
        askingPrice: 0,
        fcfs: false,
        bids: [],
        uid: ""
  
    })
    const router = useRouter()

    const [postPic, setPostPic] = useState<File | undefined>()
    const [id, setId] = useState<string | undefined>()
    const [posts, setPosts] = useState<any>([])
    const [first, setFirst] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            const id2 = user?.id;
            if (!id2) {
                console.error('Error fetching user id');
                return;
            }
            setId(id2)
            setField({
                ...field,
                uid: id2
            })
            const { data, error } = await supabase.from('profiles').select('*').eq('id', id2)
            if (error) {
                console.error('Error fetching posts:', error);
                return;
            }
            console.log(data[0].posts)
            setPosts(data[0].posts)
        }
        getData()
    }, [supabase])

    const changeInfo = (e: any) => {
        const {name, value} = e.target
        setField({
            ...field,
            [name]: value
        })
    }

    const newFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            return;
        }
        console.log(file)
        setPostPic(file)
    }

    const getURL = async (link:string) => {
        const { data: {publicUrl} } = await supabase.storage.from('posts').getPublicUrl(link);
        if (!publicUrl) {
            console.error('Error fetching public url');
            return;
        }
        return {publicUrl:publicUrl}
    }

    const handleSumbit = async (e: any) => {
        e.preventDefault();
        let updatedProfile = { ...field }
        if (postPic) {
            const time = Date.now()
            const {data, error} = await supabase.storage.from('posts').upload(`${id}_${time}`, postPic)
            if (error) {
                console.error('Error uploading picture:', error);
                return;
            }
            const info = await getURL(`${id}_${time}`)
            if (!info) {
                console.error('Error fetching public url');
                return;
            }
            updatedProfile.image = info.publicUrl
        }
        const postId = uuidv4()
        updatedProfile.id = postId
        const {data, error} = await supabase.from('posts').insert({
            id: updatedProfile.id,
            image: updatedProfile.image,
            description: updatedProfile.description,
            askingPrice: updatedProfile.askingPrice,
            fcfs: updatedProfile.fcfs,
            bids: updatedProfile.bids,
            uid: updatedProfile.uid,
        })

        if (error) {
            console.error('Error inserting post:', error);
            return;
        }

        let latestPost = posts.length > 0 ? [...posts.flat(), postId] : [postId];
        
        const data1 = await supabase.from('profiles').update({
            posts: latestPost
        }).eq('id', id)
        
        router.push('/home')
    }
       
    const changeFirst = () => {
        setFirst(!first)
    }

    return (
        <>
            <h1>Post your finds</h1>
            <form onSubmit={handleSumbit}>
                {postPic && <img src={URL.createObjectURL(postPic)} alt="Post Picture" />}
                <Input onChange={newFile} type="file" name="image" required />
                <Textarea onChange={(e) => changeInfo(e)} name="description" required />
                <Input onChange={(e) => changeInfo(e)} type="number" name="Asking price" required />
                <p>First come first serve?</p>
                <Switch 
                    name="fcfs"
                    checked={first}
                    onCheckedChange={changeFirst}
                />
                <Button type="submit">Submit</Button>
            </form>
        </>
    )
}

export default Post