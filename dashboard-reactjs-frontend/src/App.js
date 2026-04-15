
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import Login from './pages/Login';


const MyContext =createContext();


function App() {
  
  const [isToggleSidebar, setIsToggleSidebar]=useState(false);
  const [isLogin, setIsLogin]= useState(false);
  const [isLogin, setIsLogin]= useState(false);
  

const values={
  isToggleSidebar,
  setIsToggleSidebar,
  isLogin,
   setIsLogin
}

  return (
   <BrowserRouter>
   <MyContext.Provider value={values}>
   <Header/>
   <div className='main d-flex'>
    <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
      <Sidebar/>
    </div>
    <div className={`content ${isToggleSidebar===true ? 'toggle' : ''}`}>
      <Routes>
    <Route path="/" exact={true} element={<Dashboard/>} />
    <Route path="/dashboard" exact={true} element={<Dashboard/>} />
     <Route path="/login" exact={true} element={<Login/>} />

   </Routes>

    </div>
   </div>
   </MyContext.Provider>
   </BrowserRouter>
  );


}

export default App;
export {MyContext}