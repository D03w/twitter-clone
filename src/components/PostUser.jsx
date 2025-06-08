import React, { useEffect, useState } from 'react'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { ChartNoAxesColumn, CircleUser, DotSquare, Ellipsis, Heart, MessageSquare, Repeat2 } from 'lucide-react'
import { getMe } from '../config/service/AuthService'
import PostNow from './PostNow'
import { useNavigate, useParams } from 'react-router-dom'

export default function PostUser({ post, setPost }) {
    const isUser = useParams().id
    const [like, setLike] = useState({})
    const [user, setUser] = useState({})
    const location = useNavigate()
    const [id, setId] = useState('')
    const [nowPost, setNowPost] = useState({})
    const [show, setShow] = useState(false)

    const getAll = async () => {
        const idUser = await getMe(setUser, location)
        const res = await AutoGet(`${APP_API.post}/user-post/${isUser}`)

        setPost(res)
    }

    const likePost = async (id) => {
        const idUser = await getMe(setUser, location)

        setLike((prev) => {
            return { ...prev, [id]: like[id] ? false : true }
        })
        const formData = new FormData()
        formData.append('post_id', id)
        formData.append('user_id', idUser._id)
        const res = await AutoPost(APP_API.like, formData)
        getAll()
    }
    const postNows = async (id, post) => {
        setId(id)
        setNowPost(post)
        setShow(true)
    }

    useEffect(() => {
        // getAll()
    }, [])
    return (
        <div className='text-white'>
            {show && <PostNow id={id} setShow={setShow} nowPost={nowPost} nowUser={user} />}
            {
                post?.map(item => (
                    <div className='w-full border-b border-gray-800 p-4 hover:bg-orange-300/25' id={item._id}>
                        <div className='w-full' onClick={() => postNows(item._id, item)}>
                            <div className='flex items-start justify-between w-full' >
                                <div className='flex items-start w-full'>
                                    <div className='h-10 w-10 rounded-full overflow-hidden'>
                                        {item.user.photo ? (
                                            <img src={item.user.photo} className='h-10 w-10 object-cover' alt="" />
                                        ) :
                                            <CircleUser size={30} />
                                        }
                                    </div>
                                    <div className='ms-2 flex text-[14px]'>
                                        <p className='font-bold'>{item.user.name} {item.user.surname}</p>
                                        <span className='ms-2 text-gray-500'>@{item.user.username} - {item.time}</span>
                                    </div>
                                </div>
                                <div>
                                    <Ellipsis />
                                </div>
                            </div>
                            <div className='ms-10'>
                                <p>{item.post}</p>
                                <div>
                                    {item.photo ? (
                                        <img src={item.photo} className='w-full mt-4 rounded-xl' alt="" />
                                    ) : ''}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-around mt-3 ms-10">
                            <p className='flex items-center text-[14px] cursor-pointer' onClick={() => comment(item._id, item)}>
                                <MessageSquare size={16} />
                                <span className='ms-2'>{item.comment_count}</span>
                            </p>
                            <p className='flex items-center text-[14px] cursor-pointer'>
                                <Repeat2 className='ms-3' size={16} />
                                <span className='ms-2'>1K</span>
                            </p>
                            <p className='flex items-center text-[14px] cursor-pointer' onClick={() => likePost(item._id)}>
                                <i className={`${item.liked || like[item._id] ? 'bi bi-heart-fill text-red-600' : 'bi bi-heart'}`}></i>
                                <span className='ms-2'>{item.like_count ? item.like_count : 0}</span>
                            </p>
                            <p className='flex items-center text-[14px] cursor-pointer'>
                                <ChartNoAxesColumn className='ms-3' size={16} />
                                <span className='ms-2'>12.2M</span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
