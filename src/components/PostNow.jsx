import { ChartNoAxesColumn, CircleUser, CircleUserRound, Ellipsis, Heart, Image, MenuIcon, MessageSquare, Repeat2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import Comment from './Comment'
import { toast } from 'react-toastify'
import Answer from './Answer'
import { getMe } from '../config/service/AuthService'
import { useNavigate } from 'react-router-dom'

export default function PostNow({ id, setShow, nowPost, nowUser }) {
  const [comment, setComment] = useState([])
  const [nowComment, setNowComment] = useState('')
  const [photo, setPhoto] = useState(null)
  const [user, setUser] = useState({})
  const location = useNavigate()
  

  const getAll = async () => {
    const idUser = await getMe(setUser, location) 
    const formData = new FormData()
    formData.append('userId', idUser._id)
    const res = await AutoPost(`${APP_API.comment}/comment/${id}`, formData)

    setComment(res.data)
  }

  const newComment = async () => {

    if (nowComment.trim().length === 0) {
      return toast.error("Fikr yozilishi shart!")
    }

    const formData = new FormData()
    formData.append('post_id', nowPost._id)
    formData.append('user_id', nowUser._id)
    formData.append('comment', nowComment)
    formData.append('photo', photo)

    const res = await AutoPost(APP_API.comment, formData)

    if(res.success){
      setNowComment('')
      setPhoto(null)
      return toast.success(res.message)
    }

    toast.error(res.message)
  }

  useEffect(() => {
    getAll()
  }, [])
  return (
    <div className='fixed bg-black/75 top-0 left-0 h-[100vh] text-white z-50 w-full md:grid grid-cols-12'>
      <div className='p-3 col-span-1'>
        <X className='cursor-pointer' onClick={() => setShow(false)} />
      </div>
      <div className='col-span-8 w-full'>
        <img src={nowPost.photo} alt="" />
      </div>
      <div className="col-span-3 w-full bg-black h-[100vh] overflow-auto border-l-1 border-gray-800 ms-4">
        <div className="flex items-center justify-between p-3">
          <div className='flex items-center'>
            <div className='w-11 h-10 overflow-hidden rounded-full'>
              {
                nowPost.user.photo ? (
                  <img src={nowPost.user.photo} className='w-11 h-10 object-cover' alt="" />
                ) :
                  (
                    <CircleUser size={25} />
                  )
              }
            </div>
            <div className='ms-2'>
              <p>{nowPost.user.name} {nowPost.user.surname}</p>
              <span className='text-gray-500'>@{nowPost.user.username}</span>
            </div>
          </div>
          <div className='mr-3'>
            <Ellipsis />
          </div>
        </div>
        <div className='ms-3'>
          <p>
            {nowPost.post}
          </p>
        </div>
        <div className='border-b border-gray-800 p-3'>
          <p className='text-gray-500 flex items-center w-full'>{nowPost.time} - <span className='truncate ms-2'>2 ko'rishlar</span></p>
        </div>
        <div className='border-b border-gray-800 flex items-center justify-around'>
          <div className='p-3 flex items-center'>
            <MessageSquare size={16} />
            <p className='ms-2 text-[14px] text-gray-500'>{comment.length}</p>
          </div>

          <div className='p-3 flex items-center'>
            <Repeat2 size={16} />
          </div>

          <div className='p-3 flex items-center'>
            <i className={`${nowPost.liked ? 'bi bi-heart-fill text-red-600' : 'bi bi-heart'}`}></i>
            <p className='ms-2 text-gray-500 text-[14px]'>{nowPost.like_count}</p>
          </div>

          <div className='p-3 flex items-center'>
            <ChartNoAxesColumn size={16} />
          </div>
        </div>
        <div className='border-b-1 border-gray-800 p-3 flex items-center justify-around'>
          <div>
            <div className='flex items-start'>
              <div className='h-10 w-10 rounded-full overflow-full'>
                {nowUser.photo ? (
                  <img src={nowUser.photo} className='h-10 w-10 object-cover rounded-full' alt="" />
                ) : (
                  <CircleUserRound />
                )}
              </div>
              <div>
                <textarea className='outline-none ms-2' placeholder='Fikringizni bildiring!' value={nowComment} onChange={(e) => setNowComment(e.target.value)}></textarea>
              </div>
            </div>
            <label>
              <input type="file" className='hidden' onChange={(e) => setPhoto(e.target.files[0])} accept='image/png, image/jpg, image/jpeg' />
              <Image className='text-blue-600 cursor-pointer' />
            </label>
          </div>
          <div>
            <button className={`${nowComment.trim().length > 0 ? 'bg-white text-black p-2 rounded-full w-30' : 'bg-gray-100/50 text-gray-400 p-2 rounded-full w-30'}`} onClick={newComment}>Post</button>
          </div>
        </div>
        <Comment comment={comment} getAll={getAll}/>
      </div>
    </div>
  )
}
