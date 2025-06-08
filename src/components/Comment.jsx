import { ChartNoAxesColumn, CircleUserRound, Ellipsis, MessageSquare, Repeat2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Answer from './Answer'
import { AutoGet, AutoPost } from '../config/service/AppService'
import { APP_API } from '../config/BaseConfig'
import { getMe } from '../config/service/AuthService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Comment({ comment, getAll }) {
    const [showAnswerModal, setShowAnswerModal] = useState(false)
    const [commentNow, setCommentNow] = useState('')
    const [showAllAnswer, setShowAllAnswer] = useState({})
    const [answer, setAnswer] = useState([])
    const [user, setUser] = useState({})
    const location = useNavigate()

    const answerShow = (item) => {
        setCommentNow(item)
        setShowAnswerModal(true)
    }

    const getAnswer = async (id) => {
        setShowAllAnswer((prev) => {
            return {...prev, [id]: showAllAnswer[id] ? false : true}
        })

        const res = await AutoGet(`${APP_API.answer}/${id}`)
        console.log(res)

        setAnswer(res)
    }

    useEffect(() => {
        getMe(setUser, location)
    }, [])

    const like = async (comment_id) => {

        const formData = new FormData()
        formData.append('comment_id', comment_id),
        formData.append('user_id', user._id)

        const res = await AutoPost(`${APP_API.like}/comment-like`, formData)
        console.log(res)
        getAll()

        if(res.success){
            return toast.success(res.message)
        }

        console.log(res)

        toast.error(res.message)
    }
    return (
        <div>
            {showAnswerModal && <Answer setShow={setShowAnswerModal} comment={commentNow} />}
            {
                comment.map(item => (
                    <div className='flex items-start mt-5 border-b border-gray-800 p-4'>
                        <div className='h-10 w-12 overflow-hidden rounded-full'>
                            {item.user_id.photo ? (
                                <img src={item.user_id.photo} className='h-10 w-12 object-cover' alt="" />
                            ) : (
                                <CircleUserRound />
                            )}
                        </div>
                        <div className='ms-3 w-full mr-2'>
                            <div className='flex items-center justify-between w-full'>
                                <div className="flex items-center">
                                    <p className='truncate w-20 font-extrabold'>{item.user_id.name} {item.user_id.surname}</p>
                                    <p className='text-gray-500 text-[14px] ms-2 truncate'>@{item.user_id.username}</p>
                                    <p className='truncate text-gray-500 text-[11px] ms-2'> - {item.time}</p>
                                </div>
                                <div>
                                    <Ellipsis className='cursor-pointer text-gray-500' size={16} />
                                </div>
                            </div>
                            <div>
                                <p>{item.comment}</p>
                                <div className='w-full'>
                                    {item.photo ? (
                                        <img src={item.photo} className='rounded-[16px] mt-2' alt="" />
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="flex w-full">
                                    <div className="flex items-center justify-around mt-3 w-full">
                                        <p className='flex items-center text-[14px] cursor-pointer' onClick={() => answerShow(item)}>
                                            <MessageSquare size={16} />
                                            <span className='ms-2'>{item.answer_count}</span>
                                        </p>
                                        <p className='flex items-center text-[14px] cursor-pointer' onClick={() => getAnswer(item._id)}>
                                            <Repeat2 className='ms-3' size={16} />
                                        </p>
                                        <p className='flex items-center text-[14px] cursor-pointer' onClick={() => like(item._id)}>
                                            <i className={` ${item.liked ? 'bi bi-heart-fill text-red-600' : 'bi bi-heart'}`}></i>
                                            <span className='ms-2'>{item.like}</span>
                                        </p>
                                        <p className='flex items-center text-[14px] cursor-pointer'>
                                            <ChartNoAxesColumn className='ms-3' size={16} />
                                            <span className='ms-2'>12.2M</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {showAllAnswer[item._id] && <div className=' mt-5'>
                                <div className='mt-4'>
                                    {
                                        answer.map(e => (
                                            <div className='flex items-start border-t-1 border-gray-800 pt-3 pb-3'>
                                                <div className='w-10 h-10 rounded-full overflow-hidden'>
                                                    {e.user_id.photo ? (
                                                        <img src={e.user_id.photo} className='w-10 h-10 object-cover' alt="" />
                                                    ) : (
                                                        <CircleUserRound/>
                                                    )}
                                                </div>
                                                <div className='ms-2'>
                                                    <div className="flex items-center">
                                                        <p className='truncate w-20 font-extrabold'>{e.user_id.name} {e.user_id.surname}</p>
                                                        <p className='text-[12px] text-gray-500'>@{e.user_id.username} - </p>
                                                        <p className='text-[10px] text-gray-500'>{e.time}</p>
                                                    </div>
                                                    <div className='w-55'>
                                                        <p>{e.answer}</p>
                                                    </div>
                                                    <div>
                                                        {e.photo ? (
                                                            <img src={e.photo} className='rounded-lg' alt="" />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
