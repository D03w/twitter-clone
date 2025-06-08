import React, { useEffect, useState } from 'react'
import { getMe } from '../config/service/AuthService'
import { NavLink, useNavigate } from 'react-router-dom'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { toast } from 'react-toastify'

export default function Folows() {
    const [user, setUser] = useState({})
    const [follows, setFollows] = useState([])
    const location = useNavigate()

    const getAll = async () => {
        const id = await getMe(setUser, location)
        const res = await AutoGet(`${APP_API.follow}/${id._id}`)

        setFollows(res)
    }

    const unfollow = async (follow_id) => {
        const formData = new FormData()
        formData.append('follow_user', follow_id)
        formData.append('following_user', user._id)
        const res = await AutoPost(APP_API.follow, formData)

        if(res.success){
            getAll()
            return toast.success(res.message)
        }

        toast.error(res.message)
    }


    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <div>
                {
                    follows.map(item => (
                        <div className='mt-5 grid grid-cols-10 gap-2 flex items-center justify-between hover:bg-indigo-600/50 p-2 rounded-lg cursor-pointer'>
                            <NavLink to={`/home/user-profile/${item.follow_user._id}`} className='col-span-8'>
                                <div className='flex items-center '>
                                    <div className='w-15 h-15 overflow-hidden rounded-full'>
                                        <img src={item.follow_user.photo} className='w-15 h-15 object-cover' alt="" />
                                    </div>
                                    <div className='ms-3'>
                                        <p className='font-bold truncate'>{item.follow_user.name} {item.follow_user.surname}</p>
                                        <p className='text-gray-500'>@{item.follow_user.username}</p>
                                    </div>
                                </div>
                            </NavLink>
                            <div className='col-span-2'>
                                <button className='bg-white p-2 rounded-[2em] text-black font-bold cursor-pointer hover:bg-white/50' onClick={() => unfollow(item.follow_user._id)}>Bekor Qilish</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
