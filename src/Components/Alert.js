import React from 'react'

export default function Alert({alert}) {
    const alertStyle = {
        background: '#f4ab3f',
        height: '40px',
        position: 'fixed',
        bottom: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px',
        minWidth: '250px',
        fontSize: '1.15rem',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
        borderRadius: '3px',
        color: 'white'
    }
  return (
    alert && <div style={alertStyle}><p style={{paddingRight: '0.5rem'}}>{alert.msg}</p> {alert.type}</div>
  )
}
