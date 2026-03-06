import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";


const ProductModal  = ()=> {
    return(
        <>
        <Dialog open={true} >
      
       

 <Button className='close_'><IoClose /> </Button>

       
          
</Dialog>
        
        
        
        
        </>



 )


}
export default ProductModal;