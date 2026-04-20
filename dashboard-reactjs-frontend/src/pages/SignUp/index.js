import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo.jpg';
import pattern from '../../assets/images/pattern.jpg'
import { MyContext } from '../../App';
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiEye } from "react-icons/ti";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";


import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import gooleIcon from '../../assets/images/googleIcon.png'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const SignUp=()=>{
 

   const [inputIndex, setInputIndex]=useState(null);
  const [isShowPassword, setisShowPassword]=useState(false);
   const [isShowConfirmPassword, setisShowConfirmPassword]=useState(false);
  

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
        <section className="loginSection signUpSection">

            <div className='row'>
            <div className='col-md-8 d-flex align-items-center flex-column part1
            justify-content-center'>
                <h1>  Welcome! Let’s Get You Started <span className='text-sky'>Ecommerce Dashboard</span></h1>
                <p>Create your account to start managing your online store, products, and customer orders in one place. 
                    Build your store, manage your products, and track your sales effortlessly with our platform. 
                    Everything you need to run your online store is just one account away.</p>
                    
                   <div className='w-100 mt-4'>
                  <Link to={'/'}>   <Button className='btn-blue btn-lg btn-big'><AiFillHome />
                     Go To Home</Button></Link>
                   </div>
            </div>
           

            <div className='col-md-4 pr-0'>
                 <div className="loginBox">
    <div className="logo text-center">
      <img src={logo} width="90" alt="Logo" />
      <h5 className="fw-bold">Register a new account</h5>
    </div>

    <div className='wrapper mt-3 card border '>
      <form>

         <div className={`form-group  position-relative ${inputIndex===0 && 'focus'}`}>
        <span className='icon'><FaUserCircle /> </span>
        <input type='text' className='form-control' 
        placeholder= 'Enter your name' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} autoFocus/>
       
      </div>


      <div className={`form-group  position-relative ${inputIndex===1 && 'focus'}`}>
        <span className='icon'><MdOutlineMail /> </span>
        <input type='text' className='form-control' 
        placeholder= 'Enter your Email' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)}/>
       
      </div>

       <div className={`form-group  position-relative ${inputIndex===2 && 'focus'}`}>
        <span className='icon'><RiLockPasswordFill /> </span>
        <input type={`${ isShowPassword===true ? 'text' : 'password'}`} 
        className='form-control' 
        placeholder= 'Enter your password' onFocus={()=>focusInput(2)} onBlur={() =>setInputIndex(null)}/>
       
       <span className='toggleShowPassword' onClick={()=>setisShowPassword(!isShowPassword)}>
        {
          isShowPassword===true ? <IoEyeOffSharp /> :  <TiEye />
        }
       

       </span>
      </div>


       <div className={`form-group  position-relative ${inputIndex===3 && 'focus'}`}>
        <span className='icon'><IoShieldCheckmark /> </span>
        <input type={`${ isShowConfirmPassword===true ? 'text' : 'password'}`} 
        className='form-control' 
        placeholder= 'Confirm your password' onFocus={()=>focusInput(3)} onBlur={() =>setInputIndex(null)}/>
       
       <span className='toggleShowPassword' onClick={()=>setisShowConfirmPassword(!isShowConfirmPassword)}>
        {
          isShowConfirmPassword===true ? <IoEyeOffSharp /> :  <TiEye />
        }
       

       </span>
      </div>

        <FormControlLabel  control={<Checkbox />} label="I agree to the all Terms & Conditions"/>

      <div className='form-group'>
        <Button className="btn-blue btn-lg w-100 btn-big">Sign Up</Button>
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
      <span className='text-cente d-block mt-3'>
        Already have an account? 
        <Link to={'/login'} className='link color ml-2'> Sign In</Link>
      </span>

    </div>

   
      
      </div>
    



  </div>

            </div>


 
</section>
       </>
    )
  


}
export default SignUp;