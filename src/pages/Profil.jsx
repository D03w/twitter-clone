import { ArrowLeft, CircleUserRound, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMe } from '../config/service/AuthService'
import { AutoGet, AutoPut } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import PostUser from '../components/PostUser'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Profil() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const location = useNavigate()
    const navigate = useLocation()

    const userPost = async () => {
        const id = await getMe(setUser)
        const res = await AutoGet(`${APP_API.userPost}/${id._id}`)

        setPosts(res)
    }

    const upgradePhoto = async (e) => {
        const formData = new FormData()
        formData.append('photo', e.target.files[0])

        const res = await AutoPut(APP_API.auth, user._id, formData)

        if (res.success) {
            getMe(setUser, location)
            return toast.success(res.message)
        }

        toast.error(res.message)
    }

    const updateFon = async (e) => {
        const formData = new FormData()
        formData.append('fon', e.target.files[0])

        const res = await AutoPut(`${APP_API.auth}/update-fon`, user._id, formData)

        if (res.success) {
            getMe(setUser, location)
            return toast.success(res.message)
        }

        toast.error(res.message)
    }

    useEffect(() => {
        getMe(setUser, location)
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
                        {user.name} {user.surname}
                    </h1>
                    <p className='text-gray-600'>{posts?.length} posts</p>
                </div>
            </div>
            <div>
                <label>
                    <div className="bg-gray-400 w-full h-[35vh] cursor-pointer"
                    >
                        {user.fon ? (
                            <img src={user.fon} className='w-full h-full object-cover' alt="" />
                        ) : ''}
                    </div>
                    <input type="file" className='hidden' accept='image/png, image/jpg, image/jpeg' onChange={(e) => updateFon(e)} />
                </label>
                <div className='flex items-center justify-between'>
                    <div className='-mt-15 text-white text-start'>
                        <div className='w-40 h-40 ms-4 overflow-hidden rounded-full z-50'>
                            {user.photo ? (
                                <label>
                                    <input type="file" className='hidden' accept='image/png, image/jpg, image/jpeg' onChange={(e) => upgradePhoto(e)} />
                                    <img src={user.photo} className='w-40 h-40 object-cover cursor-pointer' alt="" />
                                </label>
                            ) : (
                                <label>
                                    <input type="file" className='hidden' accept='image/png, image/jpg, image/jpeg' onChange={(e) => upgradePhoto(e)} />
                                    <CircleUserRound className='text-white cursor-pointer' size={150} />
                                </label>
                            )}
                        </div>
                        <div className='ms-6'>
                            <h1>{user.name} {user.surname}</h1>
                            <p className='text-gray-600'>@{user.username}</p>
                        </div>
                        <div className="flex items-center ms-6 mt-3">
                            <p>{user.following} <span className='text-gray-600'>Kuzatasiz</span></p>
                            <p className='ms-4'>{user.follow} <span className='text-gray-600'>Kuzatuvchilar</span></p>
                        </div>
                    </div>
                    <div>
                        <button className='border-1 border-white rounded-full p-2 m-2 cursor-pointer hover:bg-white hover:text-black cursor-pointer'>Edit Profile</button>
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
                <div className="flex items-center justify-around border-b border-gray-800 pl-4 pr-4">
                    <div>
                        <NavLink to="/home/profil">
                            <p>Posts</p>
                            <div className={`p-1 mt-3 rounded-full ${navigate.pathname === '/home/profil' ? 'bg-sky-600' : ''} Profils`}></div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/home/profil/follows-user">
                            <p>Kuzatuvchilaringiz</p>
                            <div className={`p-1 mt-3 rounded-full ${navigate.pathname === '/home/profil/follows-user' ?  'bg-sky-600' : ''}`}></div>
                        </NavLink>
                    </div>
                </div>
                <div className='p-3'>
                    <Outlet />
                </div>
                {navigate.pathname === '/home/profil' && <PostUser post={posts} setPost={setPosts} />}
            </div>
        </div>
    )
}
