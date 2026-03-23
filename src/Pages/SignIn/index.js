import { useEffect, useContext } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/eshop.png";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import googleimg from "../../assets/images/google.png";
const SignIn = () => {

    const context = useContext(MyContext);

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    return (
        <section className="section signInPage">
  <div className="shape-bottom">
  <svg
    fill="#fff"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 1921 819.8"
    style={{ enableBackground: "new 0 0 1921 819.8" }}
    xmlSpace="preserve"
  >
    <path
      className="st0"
      d="M1921,413.1v406.7h0v0.5h0.41228.1,598.3c30.74,4.80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4
      c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
    ></path>
  </svg>
</div>
            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo}/>
                    </div>
                   

                    <form className="mt-3">
                         <h2>Sign In</h2>
                        <div className="form-group">
                           <TextField id="standard-basic" label="Email"type="email" required variant="standard" className="w-100" />
                        </div>

                         <div className="form-group">
                           <TextField id="standard-basic" label="Password"type="password" required variant="standard" className="w-100" />
                        </div>


                        <a className="border-effect cursor" >Forget Password?</a>

                        <Button className="btn-blue btn-lg btn-big w-100 mt-3 mb-3">Sign In</Button>
                        <p>Not Registered? <Link to="/signUp" className="border-effect">Sign UP </Link></p>
                   
                        <h6 className="mt-3 text-center font-weight-bold">Or continue with social account</h6>

                        <span className=""><img src={googleimg} className="w-100"/></span>


                         
                                        
                        
                   
                   </form>




                </div>
            </div>
        </section>
    );
};

export default SignIn;