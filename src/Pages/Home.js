import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home({ showAlert }) {

    let navigate = useNavigate()

    const [username, setUserName] = useState('')

    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (username === '') {
            showAlert('Please Enter Anything', <i className='fa fa-times'></i>)
        }
        else {
            let response = await fetch(`${process.env.REACT_APP_CHAT_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            let jsData = await response.json()

            if (response.ok && response.status === 200 && jsData.token) {
                showAlert('Done', <i className='fa-solid fa-check'></i>)
                localStorage.setItem('token', JSON.stringify(jsData.token))
                localStorage.setItem('_id', JSON.stringify(jsData._id))
                navigate('/chats')
            }
            else {
                showAlert(jsData.message, <i className='fa fa-times'></i>)
            }
        }
    }

    return (
        <div className="container-div">
            <h1>Hey There</h1>
            <h3>What's Your Name?</h3>
            <form method="post" className='form-content' onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="name" value={username} onChange={handleChange} id="name" />
                </div>
                <button type="submit">Start</button>
            </form>
        </div>
    )
}
