import { CircleUserRound, Home, LogOut, MessageCircle, MessageCirclePlus, MessageSquareQuote, Trash, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import PostNow from '../components/PostNow'
import { getMe } from '../config/service/AuthService'

export default function Notification({ user, setShowS }) {
    const location = useNavigate()
    const [notification, setNotification] = useState([])
    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [nowPost, setNowPost] = useState({})
    const [nowUser, setNowUser] = useState({})

    const getAll = async () => {
        const res = await AutoGet(`${APP_API.notification}/${user._id}`)
        setNotification(res)
    }

    const clear = async () => {
        const arr = []
        notification.forEach(async (item) => {
            await arr.push(item._id.toString())
        })

        const formData = new FormData()
        formData.append('id', arr)

        const res = await AutoPost(`${APP_API.notification}/delete`, formData)

        if (res.success) {
            setNotification([])
            getAll()
            return toast.success(res.message)
        }

        toast.error(err.message)
    }

    const nowFunc = (id, nowPost) => {
        setId(id)
        setNowPost(nowPost)
        setShow(true)
        setShowS(false)
        console.log(true)
    }
    console.log(show)

    useEffect(() => {
        getMe(setNowUser, location)
        getAll()
    }, [])
    return (
        <div className='Sidebar'>
            {show && <PostNow id={id} setShow={setShow} nowPost={nowPost} nowUser={nowUser} />}
            <aside className="fixed top-0 left-0 z-10 w-64 h-screen overflow-auto transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-2 py-3 overflow-y-auto bg-black border-r border-r-gray-800">
                    <div className='flex items-center justify-between'>
                        <img src={logo} className='w-25' alt="" />
                        <X className='text-white cursor-pointer' onClick={() => setShowS(false)} />
                    </div>
                    <div className="flex justify-end border-b border-gray-800 p-3">
                        <p className='text-gray-500 cursor-pointer text-[14px] flex items-center hover:text-red-600' onClick={clear}>Hammasini tozalash <Trash2 className='ms-2' size={20} /></p>
                    </div>
                    <ul className="space-y-2 font-medium mt-10">
                        {notification.length === 0 ? (
                            <h1>Hozircha xabarlar mavjud emas!</h1>
                        ) :
                            notification.map(item => (
                                <div className='mt-5 text-white cursor-pointer w-full hover:bg-indigo-500/25 p-[2px] rounded-lg' onClick={() => nowFunc(item.post_id._id, item.post_id)
                                }>
                                    <div className='flex items-start w-full'>
                                        <div className='h-10 w-12 rounded-full overflow-hidden'>
                                            <img src={item.user_id.photo} className='h-10 w-12 object-cover' alt="" />
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex items-center w-full justify-between'>
                                                <div className="flex items-center">
                                                    <p className='text-[11px] w-10 ms-2 truncate'>{item.user_id.name} {item.user_id.surname}</p>
                                                    <span className='text-[11px] ms-2 text-gray-300'>@{item.user_id.username}</span>
                                                </div>
                                                <span className='text-[8px]'>{item.time}</span>
                                            </div>
                                            <p className='ms-2 text-gray-500 truncate text-[11px] w-40'>{item.status === 'like' ? "Bu user sizning postingizga like bosdi!" : item.status === 'dislike' ? 'Bu user siga dislike bosdi' : item.status === "comment" ? "Bu user sizning postingizga fikr bildirdi!" : item.status === 'follow' ? "Bu user sizga obuna bo'ldi!" : item.status === 'unfollow' ? "Bu user obunani bekor qildi!" : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </aside>



        </div>
    )
}
