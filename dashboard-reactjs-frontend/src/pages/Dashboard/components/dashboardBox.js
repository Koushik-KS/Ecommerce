import { FaRegUser } from "react-icons/fa";
import { useEffect } from "react";

const DashboardBox = (props) => {

   

    return(
      
        <div className="dashboardBox" style={{
    backgroundImage:
     `linear-gradient(to right, ${props.color?.[0]} , ${props.color?.[1]})`
  }}>

    <div className="d-flex w-100">
        <div className="col1">
        <h4 className="text-white mb-0">Total Users</h4>
        <span className="text-white">277</span>
        </div>
        <div className="ml-auto">
            {
                props.icon? props.icon 

                     <span className="icon">
                        {props.icon? props.icon :''}
                         </span>



                 }
               
               




          
        </div>
    </div>

                    
     </div>
       
    )
}
export default DashboardBox;