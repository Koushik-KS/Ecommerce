
import { useContext, useEffect } from 'react';
import logo from '../../assets/images/logo.jpg';
import pattern from '../../assets/images/pattern.jpg'
import { MyContext } from '../../App';

const Login=()=>{

    const context =useContext(MyContext)

    useEffect(()=>{
        context.setisHideSidebarAndHeader(true);

    },[]);
    return(

       <>
       <img src={pattern} className='loginPattern'/>
        <section className="loginSection">
  <div className="loginBox">
    <div className="logo text-center">
      <img src={logo} width="90" alt="Logo" />
      <h5 className="fw-bold">Login to Admin</h5>
    </div>

    <div className='wrapper mt-3 card border p-4'>
      <div className='form-group mb-3'>
        <input type='text' className='form-control' placeholder='Enter your Email'/>
      </div>

    </div>



  </div>
</section>
       </>
    )
    


}
export default Login;