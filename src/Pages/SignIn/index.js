import { useEffect, useContext } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/eshop.png";
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
                </div>
            </div>
        </section>
    );
};

export default SignIn;