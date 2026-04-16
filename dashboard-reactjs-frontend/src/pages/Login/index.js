
import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo.jpg';
import pattern from '../../assets/images/pattern.jpg'
import { MyContext } from '../../App';
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiEye } from "react-icons/ti";
import { IoEyeOffSharp } from "react-icons/io5";

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const Login=()=>{

  const [inputIndex, setInputIndex]=useState(null);
  const [isShowPassword, setisShowPassword]=useState(false);

    const context =useContext(MyContext)

    useEffect(()=>{
        context.setisHideSidebarAndHeader(true);

    },[]);

    const focusInput=(index)=>{
      setInputIndex(index);
    }
    return(

       <>
       <img src={pattern} className='loginPattern'/>
        <section className="loginSection">
  <div className="loginBox">
    <div className="logo text-center">
      <img src={logo} width="90" alt="Logo" />
      <h5 className="fw-bold">Login to Admin</h5>
    </div>

    <div className='wrapper mt-3 card border '>
      <form>
      <div className={`form-group mb-3 position-relative ${inputIndex===0 && 'focus'}`}>
        <span className='icon'><MdOutlineMail /> </span>
        <input type='text' className='form-control' 
        placeholder= 'Enter your Email' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)}/>
       
      </div>

       <div className={`form-group mb-3 position-relative ${inputIndex===1 && 'focus'}`}>
        <span className='icon'><RiLockPasswordFill /> </span>
        <input type={`${ isShowPassword===true ? 'text' : 'password'}`} 
        className='form-control' 
        placeholder= 'Enter your password' onFocus={()=>focusInput(1)} onBlur={() =>setInputIndex(null)}/>
       
       <span className='toggleShowPassword' onClick={()=>setisShowPassword(!isShowPassword)}>
        {
          isShowPassword===true ? <IoEyeOffSharp /> :  <TiEye />
        }
       

       </span>
      </div>

      <div className='form-group'>
        <Button className="btn-blue btn-lg w-100 btn-big">Sign In</Button>
      </div>

      <div className='form-group'>
        <Link to={'/forget-password'} className='link'>FORGET PASSWORD</Link>
      </div>


      </form>

    </div>



  </div>
</section>
       </>
    )
    


}
export default Login;