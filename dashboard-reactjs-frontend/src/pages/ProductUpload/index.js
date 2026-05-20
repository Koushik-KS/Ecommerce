
const ProductUpload = () => {
    return(
      
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
    )
    
}
export default ProductUpload;