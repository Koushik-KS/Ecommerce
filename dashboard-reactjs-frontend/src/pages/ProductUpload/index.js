import React, { useState } from "react";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

import { styled, emphasize } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,

    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },

    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductUpload = () => {

const [categoryVal, setCategoryVal] =useState('');

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
  };

  return (
    <div className="right-content w-100">

      <div className="card shadow border-0 w-100 flex-row p-4">

        
        <h5 className="title">Product Upload</h5>

       


          <Breadcrumbs aria-label="breadcrumb" className="ml-auto  breadcrumb-wrapper">

            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />

            <StyledBreadcrumb
            component="a"
              label="Products"
              href="#"
              deleteIcon={<ExpandMoreIcon />}
             />

                <StyledBreadcrumb
              label="Product Upload"
              href="#"
              deleteIcon={<ExpandMoreIcon />}
             />

            

          </Breadcrumbs>

        </div>
        <form className="form">

        <div className="row">
          <div className="col-sm-7">
            <div className="card p-4">
              <h5 className="mb-4" >Basic Information</h5>
              <div className="form-group">
                <h6>TITLE</h6>
                <input type="text"/>
              </div>

              <div className="form-group">
                <h6>DESCRIPTION</h6>
               <textarea rows={5} cols={10}/>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                   <h6>CATEGORY</h6>
                    <Select
          
          value={categoryVal}
          onChange={handleChangeCategory}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="w-100"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div>
                </div>

               <div className="col">
                 <div className="form-group">
                   <h6>BRAND</h6>
                    <Select
          
          value={categoryVal}
          onChange={handleChangeCategory}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className="w-100"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div>
                </div>

              </div>


              <div className="row">
                <div className="col">
                  <div className="form-group">
                   <h6>REGULAR PRICE</h6>
                    <input type="text"/>
                   </div>
                </div>

                 <div className="col">
                  <div className="form-group">
                   <h6>DISCOUNTED PRICE</h6>
                    <input type="text"/>
                   </div>
                </div>

                </div>









            </div>
          </div>
 
          <div className="col-sm-5"></div>


          

        </div>
        </form>

      </div>


  );
};

export default ProductUpload;