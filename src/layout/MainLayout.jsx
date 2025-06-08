import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getMe } from '../config/service/AuthService'
import Sidebar from '../components/Sidebar'
import Notification from '../pages/Notification'
import { AutoGet } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'

export default function MainLayout() {
    const [user, setUser] = useState({})
    const location = useNavigate()
    const [show, setShow] = useState(false)
    const [notification, setNotification] = useState([])

    const getAll = async () => {
        const res = await AutoGet(`${APP_API.notification}/${user._id}`)
        setNotification(res)
    }


    useEffect(() => {
        getAll()
        getMe(setUser, location)
    }, [])
    return (
        <div className='flex h-[100vh] overflow-auto bg-black MainLayout'>
            <div className='md:w-77'>
                {!show && <Sidebar user={user} setShowS={setShow} notification={notification} />}
                {show && <Notification user={user} setShowS={setShow} />}
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    )
}
