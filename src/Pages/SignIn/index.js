import { useEffect, useContext } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/eshop.png";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import googleimg from "../../assets/images/google.jpg";
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
                         <h2 className="mb-3">Sign In</h2>
                        <div className="form-group">
                           <TextField id="standard-basic" label="Email"type="email" required variant="standard" className="w-100" />
                        </div>

                         <div className="form-group">
                           <TextField id="standard-basic" label="Password"type="password" required variant="standard" className="w-100" />
                        </div>


                        <a className="border-effect cursor txt" >Forget Password?</a>

                        <div className="d-flex align-items-center mt-3 mb-3">
                            <Button className="btn-blue col btn-lg btn-big ">Sign In</Button>

                          <Link to="/">   <Button className=" btn-lg btn-big col ml-3 "
                          variant="outlined"onClick={()=> context.setisHeaderFooterShow(true)}>Cancel
                            </Button> </Link>




                        </div>
                        <p className="txt">Not Registered? <Link to="/signUp" className="border-effect">Sign UP </Link></p>
                   
                        <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                       

                        <Button className="loginwithgoogle mt-2 " variant="outlined" ><img src={googleimg} className="w-100"/>Sign In with Google</Button>


                         
                                        
                        
                   
                   </form>




                </div>
            </div>
        </section>
    );
};

export default SignIn;