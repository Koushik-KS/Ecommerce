
import { useEffect } from 'react';
import logo from '../../assets/images/logo.jpg';
const Login=()=>{

    useEffect(()=>{

    },[]);
    return(

        <section className="loginSection">
            <div className='loginBox'>
                <div className='logo text-center'> <img src={logo} style={{ width: "60px", height: "60px" }}/></div>
            </div>
        </section>
    )
    


}
export default Login;