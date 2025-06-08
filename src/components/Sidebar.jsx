import { CircleUserRound, Home, LogOut, MessageCircle, MessageCirclePlus, MessageSquareQuote } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreatePost from './CreatePost'
import { AutoGet } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'

export default function Sidebar({ user, setShowS, notification }) {
    const location = useNavigate()
    const [show, setShow] = useState(false)

    const logout = () => {
        localStorage.clear()
        toast.success("Xisobingizdan chiqdingiz!")
        location('/')
    }
    return (
        <div className='Sidebar'>
            {show && <CreatePost setShow={setShow}/>}
            <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-3 py-4 overflow-y-auto bg-black border-r border-r-gray-800">
                    <div className='flex items-center justify-between'>
                        <img src={logo} className='w-25' alt="" />
                    </div>
                    <ul className="space-y-2 font-medium mt-10">
                        <li>
                            <NavLink to="/home" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                                <Home />
                                <span className="ms-3">Bosh sahifa</span>
                            </NavLink>
                        </li>
                        <li>
                            <div className="flex items-center justify-between p-2 text-white rounded-lg hover:bg-gray-700" onClick={() => setShowS(true)}>
                                <div className='flex items-center'>
                                    <MessageCircle />
                                    <span className="ms-3">Xabarlar</span>
                                </div>
                                {/* <div>
                                    <span className='p-2 flex items-center justify-center bg-red-600 rounded-full w-5 h-5'>
                                        {notification.length}
                                    </span>
                                </div> */}
                            </div>
                        </li>
                        <li>
                            <NavLink to="/home/profil" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                                <div className='w-8 h-8 rounded-full overflow-hidden'>
                                    {user.photo ? <img src={user.photo} className='w-8 h-8 object-cover' alt="" /> : <CircleUserRound />}
                                </div>
                                <span className="ms-3">Profil</span>
                            </NavLink>
                        </li>
                        <li>
                            <div className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 cursor-pointer" onClick={() => setShow(true)}>
                                <MessageCirclePlus />
                                <span className="ms-3">Post joylash</span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 text-white rounded-lg bg-red-500/25 hover:bg-red-500/50 cursor-pointer" onClick={logout}>
                                <LogOut />
                                <span className="ms-3">Akountdan Chiqish</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>



        </div>
    )
}
