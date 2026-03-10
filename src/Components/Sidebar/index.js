
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';




const Sidebar =()=>{
    return(
        <>
        <div className="sidebar">
            <div className="filterBox">
                <h6>PRODUCT CATEGORIES</h6>
                <div className='scroll'><FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

                </div>
            </div>

        </div>
        </>
    )


}
export default Sidebar;