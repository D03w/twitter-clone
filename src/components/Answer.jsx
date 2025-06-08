import { CircleUser, Image, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMe } from '../config/service/AuthService'
import { PhotoIcon } from '@heroicons/react/16/solid'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { toast } from 'react-toastify'

export default function Answer({ setShow, comment }) {
    const [user, setUser] = useState({})
    const [answer, setAnswer] = useState('')
    const [photo, setPhoto] = useState(null)

    useEffect(() => {
        getMe(setUser)
    }, [])

    const CreateComment = async () => {

        const formData = new FormData()
        formData.append('comment_id', comment._id)
        formData.append('user_id', user._id)
        formData.append('answer', answer)
        formData.append('photo', photo)

        const res = await AutoPost(APP_API.answer, formData)
        console.log(res)

        if (res.success) {
            setAnswer('')
            setPhoto(null)
            await AutoGet(APP_API.answer)
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
                        <img src={comment.user_id.photo} className='w-10 h-10 object-cover' alt="" />
                    </div>
                    <div className='ms-3'>
                        <div className='flex items-center'>
                            <p>{comment.user_id.name} {comment.user_id.surname}</p>
                            <p className='truncate ms-2 text-gray-500'>@{comment.user_id.username} - {comment.time}</p>
                        </div>
                        <div>
                            <p className='truncate w-[330px] text-[14px]'>{comment.comment}</p>
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
                    <textarea type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className='ms-2 outline-none h-full w-full text-white flex items-start' placeholder='Bu postga fikr bildiring!' />
                </div>
                <div className='w-full h-[10%] flex items-center justify-between mt-5'>
                    <label>
                        <input type="file" className='hidden' id='photo' accept='image/png, image/jpg, image/jpeg' onChange={(e) => setPhoto(e.target.files[0])} />
                        <Image className='text-sky-600 cursor-pointer' id='photo' />
                    </label>
                    <button className={`p-2 rounded-full ${answer.trim().length > 0 ? "bg-white text-black" : "bg-white/50"} w-22 cursor-pointer`} onClick={() => CreateComment()}>Javob yozish</button>
                </div>
            </div>
        </div>
    )
}
