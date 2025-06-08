import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { AuthLogin, AuthRegister } from '../config/service/AuthService'
import { APP_API } from '../config/BaseConfig'
import { toast } from 'react-toastify'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const location = useNavigate()

  const register = async (e) => {
    e.preventDefault()

    if(username.trim().length === 0 && password.trim().length === 0){
      return toast.error("Barcha malumotlar to'ldirilishi shart!")
    }

    const data = {
      username,
      password
    }
    AuthLogin(APP_API.login, data, location)
  }
  return (
    <>
      <div className="flex h-[100vh] overflow-auto text-white flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-30">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            <span className="text-3xl text-indigo-600">Y</span> platformasidan Logindan o'ting!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">

            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md bg-gray-950 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md bg-gray-950 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => register(e)}
              >
                Xisobga kirish
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            <NavLink>
              Siz ro'yxatdan o'tganmisiz?
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}
