import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Alert from './Components/Alert';
import { useState } from 'react';
import Chat from './Pages/Chat';

function App() {
  const [alert, setAlert] = useState()

  const showAlert = (msg, type) =>{
    setAlert({msg, type})

    setTimeout(()=>{
      setAlert(null)
    }, 2000)
  }
  return (
    <Router>
      <Alert alert={alert}/>
      <Routes>
        <Route path='/' element={<Home showAlert={showAlert}/>}/>
        <Route path='/chats' element={<Chat showAlert={showAlert}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
