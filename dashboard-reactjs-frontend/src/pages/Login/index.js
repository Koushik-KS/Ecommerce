
import { useContext, useEffect } from 'react';
import logo from '../../assets/images/logo.jpg';

import { MyContext } from '../../App';

const Login=()=>{

    const context =useContext(MyContext)

    useEffect(()=>{
        context.setisHideSidebarAndHeader(true);

    },[]);
    return(

        <section className="loginSection">
            <div className='loginBox'>
                <div className='logo text-center'> <img src={logo} style={{ width: "100px", height: "100px" }}/></div>
            </div>
        </section>
    )
    


}
export default Login;