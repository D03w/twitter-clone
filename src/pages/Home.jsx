import { CircleUserRound, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AutoGet, AutoPost } from "../config/service/AppService";
import { APP_API } from "../config/BaseConfig";
import { getMe } from "../config/service/AuthService";
import { toast } from "react-toastify";

export default function Home() {
  const [allUser, setAllUser] = useState([])
  const [user, setUser] = useState({})
  const location = useNavigate()

  const follow = async (follow_user_id) => {
    const formData = new FormData()
    formData.append('follow_user', follow_user_id)
    formData.append('following_user', user._id)

    const res = await AutoPost(APP_API.follow, formData)

    if (res.success) {
      getAll()
      return toast.success(res.message)
    }

    toast.error(res.message)
  }

  const getAll = async () => {
    const idU = await getMe(setUser, location)
    const res = await AutoGet(`${APP_API.auth}/${idU._id}`)
    getMe(setUser, location)

    setAllUser(res)
  }

  useEffect(() => {
    getAll()
  }, [])
  return (
    <div className='md:grid grid-cols-12 Home h-full'>
      <div className="col-span-8 w-full">
        <Outlet />
      </div>
      <div className='p-3 border-l border-gray-800 text-white w-full h-full col-span-4 md:block hidden'>
        <label className='flex border-1 border-gray-800 rounded-full w-full p-3 text-white' id='name'>
          <input type="text" id='search' placeholder='Qidirish..' className='outline-none border-none w-full' />
          <Search />
        </label>
        <div className='p-3 h-[280px] overflow-auto border-1 border-gray-800 rounded-xl mt-10'>
          <h1>Hamjamiyat</h1>
          <div>
            {
              allUser.map(item => (
                <div className='flex items-center justify-between mt-2 p-2 hover:bg-indigo-600/50 cursor-pointer rounded-lg' onClick={() => window.location = `/home/user-profile/${item._id}`}>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                      {item.photo ? (
                        <img className='w-10 h-10 object-cover' src={item.photo} alt="" />
                      ) :
                        <CircleUserRound size={30} />
                      }
                    </div>
                    <div className='ms-2'>
                      <p className='text-white font-bold truncate'>{item.name} {item.surname}</p>
                      <p className='text-gray-500 truncate'>@{item.username}</p>
                    </div>
                  </div>
                  <div>
                    <button className={`p-2 rounded-full text-black bg-white cursor-pointer hover:bg-gray-50 font-bold`} onClick={() => follow(item._id)}>{item.follows ? "Bekor qilish" : "Kuzatish"}</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
