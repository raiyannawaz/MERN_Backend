import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Chat({showAlert}) {
    
    let navigate = useNavigate()
    
    useEffect(()=>{
        if(localStorage.getItem('token')===null){
            navigate('/')
        }
        showAlert('Please Enter Credentials', <i className='fa fa-times'></i>)
    }, [])

    const [chats, setChats] = useState()

    const getMessage = async () => {
        const response = await fetch(`${process.env.REACT_APP_CHAT_URL}/api/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('token'))
            },

        })
        let jsData = await response.json()
        setChats(jsData)
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            getMessage()
        }
    }, [])

    const [message, setMessage] = useState('')

    const handleChange = (e) =>{
        setMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(message === ''){
            showAlert('Please Enter Anything', <i className='fa fa-times'></i>)
        }
        else{
            const response = await fetch(`${process.env.REACT_APP_CHAT_URL}/api/messages/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({message})
            })
            // let jsData = await response.json()
            setMessage('')
            getMessage()
        }
    }

    return (
        <div className="container-div" id='chatContainer'>
            <div className="chat-content">
                <div className={`chats`}>
                    {chats ? chats.map((chat) => {
                        return <div className={`chat ${chat.userId === JSON.parse(localStorage.getItem('_id')) ? 'active' : ''}`} key={chat._id}>
                            <p>{chat.userId === JSON.parse(localStorage.getItem('_id')) ? 'You' : chat.name}</p>
                            <p>{chat.message}</p>
                        </div>
                    })
                        : ''}
                </div>
                <form method='post' className="chat-group" onSubmit={handleSubmit}>
                    <input type="text" name='message' value={message} onChange={handleChange} id='message' />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div >
    )
}
