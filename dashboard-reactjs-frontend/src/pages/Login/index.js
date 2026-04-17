
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
import gooleIcon from '../../assets/images/googleIcon.png'
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
      <div className={`form-group  position-relative ${inputIndex===0 && 'focus'}`}>
        <span className='icon'><MdOutlineMail /> </span>
        <input type='text' className='form-control' 
        placeholder= 'Enter your Email' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)}/>
       
      </div>

       <div className={`form-group  position-relative ${inputIndex===1 && 'focus'}`}>
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

      <div className='form-group text-center mb-0'>
        <Link to={'/forget-password'} className='link'>FORGET PASSWORD</Link>
      </div>
      <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
        <span className='line'></span>
         <span className='txt'>or</span>
          <span className='line'></span>
      </div>

      <Button variant="outlined"  className='w-100
      btn-lg btn-big loginWithGoogle' >
        <img src={gooleIcon} width="25px"/> &nbsp;
  Sign In with Google
</Button>


      </form> 

    </div>

    <div  className='wrapper mt-3 card border footer p-3'>
      <span className='text-center'>
        Don't have an account?
        <Link to={'/signUp'} className='link color ml-2'> Register</Link>
      </span>
      </div>
    



  </div>
</section>
       </>
    )
    


}
export default Login;