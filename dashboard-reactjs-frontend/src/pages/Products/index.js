import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Products = () => {

  const [showBy, setshowBy] = useState("");
  const [showBysetCat, setCatBy] = useState("");

  return (
      <div className="card shadow border-0 p-3 mt-4">
                  <h3 className="hd">Best Selling Products</h3>
                  <div className="row cardFilters mt-3">
                    <div className="col-md-3">
                    <h4>SHOW BY</h4>
                     <FormControl  size="small" className="w-100">
                     <Select
              value={showBy}
              onChange={(e)=>setshowBy(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }} 
              labelId="demo-select-small-label"
              className="w-100"
            
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
             </FormControl>
                    </div>
    
                    <div className="col-md-3">
                    <h4>CATEGORY BY</h4>
                     <FormControl  size="small" className="w-100">
                     <Select
              value={showBysetCat}
              onChange={(e)=>setCatBy(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }} 
              labelId="demo-select-small-label"
              className="w-100"
            
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
              </FormControl>
                    </div>
    
    
    
                  </div>
                  
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered v-align">
                      <thead className="thead-dark ">
                        <tr>
                        <th>UID </th>
                       <th style={{width:'300px'}}>PRODUCT</th>
                        <th>CATEGORY</th>
                          <th>BRAND</th>
                          <th>PRICE</th>
                       <th>STOCK</th>
                        <th>RATING</th>
                          <th>ORDER </th>
                           <th>SALES</th>
                          <th>ACTION</th>
                          </tr>
    
                      </thead>
                      <tbody>
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center">
                                <Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                        <tr>
                          <td>#1</td>
                          <td>
                            <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src="https://i.pinimg.com/1200x/d5/f1/fc/d5f1fcea65a20b5b13960e080e70f7fa.jpg" className="w-100"/>
                                </div>
                              </div>
                              <div className="info pl-0">
                                <h6>Tops and skirt set for Female...</h6>
                            <p>Women's exclusive summer Tops and skirt set for Female
                              Tops and skirt set
                            </p>
                              </div>
                            </div>
                            </td>
                          <td>Womans</td>
                          <td>richman</td>
                          <td>
                           <div style={{width:'70px'}}>
                             <del className="old">₹299</del>
                             <span className="new text-danger">₹299</span>
                           </div>
                            </td>
                          <td>30</td>
                          <td>4.9(16)</td>
                          <td>380</td>
                          <td>₹38k</td>
                          <td>
                            <div className="actions d-flex align-items-center"><Link to="/product/details">
                              <Button className="secondary" color="secondary"><FaEye /></Button></Link>
                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                  <Button className="error" color="error"><MdDelete /></Button>
                            </div>
                          </td>
    
    
    
                        </tr>
    
                      </tbody>
                    </table>
       <div className="d-flex tableFooter">
        <p>showing <b>12</b> of <b>60</b> results</p>
        <Pagination count={10} color="primary" className="pagination" 
         showFirstButton showLastButton/>
       </div>
    
                  </div>
    
    
                  </div> 
  );
};

export default Products;