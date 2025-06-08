import { CircleUser, CircleUserRound, Image, Search, User, UserRound } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { getMe } from '../config/service/AuthService'
import { toast } from 'react-toastify'
import Posts from '../components/Posts'

export default function HomeMain() {
    const location = useLocation()
    const [allUser, setAllUser] = useState([])
    const [user, setUser] = useState({})
    const [allPost, setAllPost] = useState([])

    const [post, setPost] = useState('')
    const [photo, setPhoto] = useState(null)


    const getAll = async () => {
        const idUser = await getMe(setUser, location)
        const res = await AutoGet(`${APP_API.auth}/${idUser._id}`)
        const resPost = await AutoGet(`${APP_API.post}/${idUser._id}`)
        setAllPost(resPost)


        setAllUser(res)
    }

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

    useEffect(() => {
        getAll()
        getMe(setUser)
    }, [])
    return (
        <div className='w-full'>
            <div className='flex items-center justify-around border-b border-gray-800 p-2 w-full mt-2'>
                <div>
                    <NavLink to="/home">
                        <h1>Umumiy</h1>
                        <div className={`${location.pathname === "/home" ? "bg-blue-600" : ""} p-1 mt-2 rounded`}></div>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/home/follow">
                        <h1>Obuna bo'lganlaringiz</h1>
                        <div className={`${location.pathname === "/home/follow" ? "bg-blue-600" : ""} p-1 mt-2 rounded`}></div>
                    </NavLink>
                </div>
            </div>


            <div>
                <div className='p-4 border-b border-gray-800'>
                    <div className='flex items-start'>
                        <div className='h-10 w-10 overflow-hidden rounded-full'>
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
                <Posts allPost={allPost} getAll={getAll}/>
            </div>


        </div>


    )
}
