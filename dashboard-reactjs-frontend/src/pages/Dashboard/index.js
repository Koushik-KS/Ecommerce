import DashboardBox from "./components/dashboardBox";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";

const Dashboard = () => {
    return(
        <>
        <div className="right-content w-100">
            <div className="row dashboardBoxWrapperRow">
                <div className="col-md-8">
                    <div className="dashboardBoxWrapper d-flex">
                
              <DashboardBox color={["#1da256","#48d483"]} icon={<FaRegUser />}  grow={true}/> 
                <DashboardBox color={["#c012e2","#eb64fe"]}  icon={<FaShoppingCart />}/>
                <DashboardBox color={["#2c78e5","#60aff5"]}  icon={<FaBagShopping />}/>
                <DashboardBox color={["#e1950e","#f3cd29"]}  icon={<GiStarsStack />}/>
                   
                </div>
                </div> 

                <div className="col-md-4 pl-0">
                    <div className="box"></div>
                </div>



            </div>
        
        </div>
      
        </>
    )



}
export default Dashboard;