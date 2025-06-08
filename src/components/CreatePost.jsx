import { CircleUser, Image, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMe } from '../config/service/AuthService'
import { PhotoIcon } from '@heroicons/react/16/solid'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { toast } from 'react-toastify'

export default function CreatePost({ setShow }) {
    const [user, setUser] = useState({})
    const [post, setPost] = useState('')
    const [photo, setPhoto] = useState(null)

    useEffect(() => {
        getMe(setUser)
    }, [])

    const CreatePost = async () => {
        const date = new Date()

        const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
        const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
        const year = date.getFullYear()

        const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

        const time = `${day}.${month}.${year}, ${hour}:${minute}`


        const formData = new FormData()
        formData.append('user', user._id)
        formData.append('post', post)
        formData.append('time', time)
        formData.append('photo', photo)

        const res = await AutoPost(APP_API.post, formData)
        console.log(res)

        if (res.success) {
            setPost('')
            setPhoto(null)
            await AutoGet(APP_API.post)
            setShow(false)
            return toast.success(res.message)
        }

        toast.error(res.message)
    }
    return (
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-white/25 z-50 flex justify-center p-10'>
            <div className="bg-black p-4 rounded-xl h-[250px] w-xl">
                <div className="flex items-center justify-between">
                    <X className='text-white cursor-pointer' onClick={() => setShow(false)} />
                    <p className='text-sky-600'>Post joylash</p>
                </div>
                <div className='flex items-start p-4 h-[80%]'>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        {user.photo ? (
                            <img src={user.photo} className='h-10 w-10 object-cover' alt="" />
                        ) : <CircleUser className='text-white' />}
                    </div>
                    <textarea type="text" value={post} onChange={(e) => setPost(e.target.value)} className='ms-2 outline-none h-full w-full text-white flex items-start' placeholder='Fikrlaringizni yozing!' />
                </div>
                <div className='w-full h-[10%] flex items-center justify-between'>
                    <label>
                        <input type="file" className='hidden' id='photo' accept='image/png, image/jpg, image/jpeg' onChange={(e) => setPhoto(e.target.files[0])} />
                        <Image className='text-sky-600 cursor-pointer' id='photo' />
                    </label>
                    <button className={`p-2 rounded-full ${post.trim().length > 0 ? "bg-white" : "bg-white/50"} w-20 cursor-pointer`} onClick={() => CreatePost()}>Post</button>
                </div>
            </div>
        </div>
    )
}
