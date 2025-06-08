import { ArrowLeft, CircleUserRound, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMe } from '../config/service/AuthService'
import { AutoGet, AutoPost, AutoPut } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import PostUser from '../components/PostUser'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function UserProfil() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [nowUser, setNowUser] = useState({})
    const location = useNavigate()
    const { id } = useParams()

    const userPost = async () => {
        const userId = await getMe(setNowUser, location)
        const res = await AutoGet(`${APP_API.userPost}/${id}`)

        const formData = new FormData()
        formData.append('userId', userId._id)

        const nowUser = await AutoPost(`${APP_API.auth}/get-one/${id}`, formData)
        setUser(nowUser)

        setPosts(res)
    }

    const follow = async () => {
        const userId = await getMe(setNowUser, location)
        const formData = new FormData()
        formData.append('follow_user', id)
        formData.append('following_user', userId._id)

        const res = await AutoPost(APP_API.follow, formData)

        if (res.success) {
            getAll()
            return toast.success(res.message)
        }

        toast.error(res.message)
    }

    const upgradePhoto = async (e) => {
        const formData = new FormData()
        formData.append('photo', e.target.files[0])

        const res = await AutoPut(APP_API.auth, user.data._id, formData)

        if (res.success) {
            getMe(setUser, location)
            return toast.success(res.message)
        }

        toast.error(res.message)
    }

    useEffect(() => {
        userPost()
    }, [])
    return (
        <div className='w-full text-white'>
            <div className="flex items-center p-3">
                <div>
                    <NavLink to="/home">
                        <ArrowLeft />
                    </NavLink>
                </div>
                <div className='ms-5 text-white'>
                    <h1>
                        {user.data?.name} {user.data?.surname}
                    </h1>
                    <p className='text-gray-600'>{posts?.length} posts</p>
                </div>
            </div>
            <div>
                <div className="bg-gray-400 w-full h-[35vh]"
                >
                    {user.data?.fon ? (
                        <img src={user.data?.fon} className='w-full h-full object-cover' alt="" />
                    ) : ''}
                </div>
                <div className='flex items-center justify-between'>
                    <div className='-mt-15 text-white text-start'>
                        <div className='w-40 h-40 ms-4 overflow-hidden rounded-full z-50'>
                            {user.data?.photo ? (
                                <label>
                                    <input type="file" className='hidden' onChange={(e) => upgradePhoto(e)} />
                                    <img src={user.data?.photo} className='w-40 h-40 object-cover cursor-pointer' alt="" />
                                </label>
                            ) : (
                                <label>
                                    <input type="file" className='hidden' onChange={(e) => upgradePhoto(e)} />
                                    <CircleUserRound className='text-white cursor-pointer' size={150} />
                                </label>
                            )}
                        </div>
                        <div className='ms-6'>
                            <h1>{user.data?.name} {user.data?.surname}</h1>
                            <p className='text-gray-600'>@{user.data?.username}</p>
                        </div>
                        <div className="flex items-center ms-6 mt-3">
                            <p>{user.data?.following} <span className='text-gray-600'>Kuzatadi</span></p>
                            <p className='ms-4'>{user.data?.follow} <span className='text-gray-600'>Kuzatuvchilari</span></p>
                        </div>
                    </div>
                    <div>
                        <button className={`border-1 border-white rounded-full p-2 m-2 cursor-pointer ${user?.follows ? 'bg-white text-black hover:bg-white/50' : 'hover:bg-white/50'} hover:text-black cursor-pointer`} onClick={follow}>{user.follows ? "Bekor qilish" : "Kuzatish"} {user.follows}</button>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <div className='p-4 bg-indigo-600/50 rounded-[16px]'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold text-2xl'>Bepul galochka oling! ☑️</h1>
                        <X className='text-gray-300 cursor-pointer' />
                    </div>
                    <div className='mt-4 text-gray-400'>
                        <p>
                            Bepul galochkani faollashtiring va postlaringiz yonidan galochka chiqib to'radi. 3 oy mutlaqo bepul hoziroq faollashtiring
                        </p>
                    </div>
                    <div>
                        <button className='p-2 rounded-full bg-white text-black mt-3 font-bold'>Faollashtirish</button>
                    </div>
                </div>
            </div>
            <div className='mt-10 mb-10'>
                <div className="flex border-b border-gray-800 pl-4 pr-4">
                    <div>
                        <p>Posts</p>
                        <div className='p-1 mt-3 rounded-full bg-sky-600'></div>
                    </div>
                </div>
                <PostUser post={posts} setPost={setPosts}/>
            </div>
        </div>
    )
}
