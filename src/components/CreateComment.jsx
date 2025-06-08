import { CircleUser, Image, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMe } from '../config/service/AuthService'
import { PhotoIcon } from '@heroicons/react/16/solid'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { toast } from 'react-toastify'

export default function CreateComment({ id, setShow, post }) {
    const [user, setUser] = useState({})
    const [comment, setComment] = useState('')
    const [photo, setPhoto] = useState(null)

    useEffect(() => {
        getMe(setUser)
    }, [])

    const CreateComment = async () => {

        const formData = new FormData()
        formData.append('post_id', post._id)
        formData.append('user_id', user._id)
        formData.append('comment', comment)
        formData.append('photo', photo)

        const res = await AutoPost(APP_API.comment, formData)
        console.log(res)

        if (res.success) {
            setComment('')
            setPhoto(null)
            await AutoGet(APP_API.comment)
            setShow(false)
            return toast.success(res.message)
        }

        toast.error(res.message)
    }
    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-white/25 z-50 flex justify-center p-10'>
            <div className="bg-black p-4 rounded-xl h-[380px] w-xl">
                <div className="flex items-center justify-between">
                    <X className='text-white cursor-pointer' onClick={() => setShow(false)} />
                    <p className='text-sky-600'>Fikr bildirish</p>
                </div>
                <div className='flex mt-5'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img src={post.user.photo} className='w-10 h-10 object-cover' alt="" />
                    </div>
                    <div className='ms-3'>
                        <div className='flex items-center'>
                            <p>{post.user.name} {post.user.surname}</p>
                            <p className='truncate ms-2 text-gray-500'>@{post.user.username} - {post.time}</p>
                        </div>
                        <div>
                            <p className='truncate w-[330px] text-[14px]'>{post.post}</p>
                        </div>
                    </div>
                </div>
                <div className='border-l-1 border-gray-800 h-10 ms-5'></div>
                <div className='flex items-start ms-1 h-[50%]'>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        {user.photo ? (
                            <img src={user.photo} className='h-10 w-10 object-cover' alt="" />
                        ) : <CircleUser className='text-white' />}
                    </div>
                    <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='ms-2 outline-none h-full w-full text-white flex items-start' placeholder='Bu postga fikr bildiring!' />
                </div>
                <div className='w-full h-[10%] flex items-center justify-between mt-5'>
                    <label>
                        <input type="file" className='hidden' id='photo' onChange={(e) => setPhoto(e.target.files[0])} />
                        <Image className='text-sky-600 cursor-pointer' id='photo' />
                    </label>
                    <button className={`p-2 rounded-full ${comment.trim().length > 0 ? "bg-white" : "bg-white/50"} w-22 cursor-pointer`} onClick={() => CreateComment()}>Comment</button>
                </div>
            </div>
        </div>
    )
}
