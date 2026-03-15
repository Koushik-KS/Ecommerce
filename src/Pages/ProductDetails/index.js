import ProductZoom from "../../Components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import Button from "@mui/material/Button";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {

  const [activeSize, setActiveSize] = useState(null);
  const [activeTabs, setActiveTabs] = useState(0);

  const isActive = (index) => {
    setActiveSize(index);
  };

  const currentProduct = {
    description:
      "Packed in an integrated nuts & dried fruits unit and may contain occasional traces of other nuts & dried fruits.",
  };

  return (
    <>
      <section className="productDetails section">
        <div className="container">
          <div className="row">

            <div className="col-md-4 pl-5">
              <ProductZoom />
            </div>

            <div className="col-md-7 pl-5 pr-5">

              <h2 className="hd text-capitalize">
                Purely Natural Badam Crunchy & Nutty
              </h2>

              <ul className="list list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <span className="text-light mr-2">Brand:</span>
                    <span>Vedaka</span>
                  </div>
                </li>

                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <Rating
                      name="read-only"
                      value={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <span className="text-light cursor ml-2">
                      1 Review
                    </span>
                  </div>
                </li>
              </ul>

              <div className="d-flex info mb-3">
                <span className="oldPrice">₹1729</span>
                <span className="netPrice text-danger ml-3">₹1529</span>
              </div>

              <span className="badge badge-success">IN STOCK</span>

              <p className="mt-3">
                Packed in an integrated nuts & dried fruits unit and may
                contain occasional traces of other nuts & dried fruits
              </p>

              {/* SIZE */}
              <div className="productSize d-flex align-items-center">
                <span>Size/Weight: </span>

                <ul className="list list-inline mb-0 pl-4">

                  <li className="list-inline-item">
                    <button
                      className={`tag ${activeSize === 0 ? "active" : ""}`}
                      onClick={() => isActive(0)}
                    >
                      50g
                    </button>
                  </li>

                  <li className="list-inline-item">
                    <button
                      className={`tag ${activeSize === 1 ? "active" : ""}`}
                      onClick={() => isActive(1)}
                    >
                      100g
                    </button>
                  </li>

                  <li className="list-inline-item">
                    <button
                      className={`tag ${activeSize === 2 ? "active" : ""}`}
                      onClick={() => isActive(2)}
                    >
                      200g
                    </button>
                  </li>

                  <li className="list-inline-item">
                    <button
                      className={`tag ${activeSize === 3 ? "active" : ""}`}
                      onClick={() => isActive(3)}
                    >
                      300g
                    </button>
                  </li>

                  <li className="list-inline-item">
                    <button
                      className={`tag ${activeSize === 4 ? "active" : ""}`}
                      onClick={() => isActive(4)}
                    >
                      500g
                    </button>
                  </li>

                </ul>
              </div>

              {/* CART */}
              <div className="d-flex align-items-center mt-3">
                <QuantityBox />

                <Button className="btn-blue btn-lg btn-big btn-round">
                  <FaShoppingCart /> &nbsp; Add to Cart
                </Button>

                <Tooltip title="Add to WishList">
                  <Button className="btn-blue btn-lg btn-circle ml-4">
                    <FaRegHeart />
                  </Button>
                </Tooltip>

                <Tooltip title="Add to Compare">
                  <Button className="btn-blue btn-lg btn-circle ml-2">
                    <MdOutlineCompareArrows />
                  </Button>
                </Tooltip>
              </div>

            </div>
          </div>

          {/* TABS */}

          <div className="card mt-5 p-5 detailsPageTabs">

            <div className="customTabs">

              <ul className="list list-inline">

                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 ? "active" : ""}`}
                    onClick={() => setActiveTabs(0)}
                  >
                    Description
                  </Button>
                </li>

                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 ? "active" : ""}`}
                    onClick={() => setActiveTabs(1)}
                  >
                    Additional Info
                  </Button>
                </li>

                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 ? "active" : ""}`}
                    onClick={() => setActiveTabs(2)}
                  >
                    Reviews
                  </Button>
                </li>

              </ul>

              <br />

              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>{currentProduct.description}</p>
                </div>
              )}

              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">

                    <table className="table table-bordered">
                      <tbody>

                        <tr>
                          <th>Frame</th>
                          <td>Aluminium</td>
                        </tr>

                        <tr>
                          <th>Weight</th>
                          <td>20 LBS</td>
                        </tr>

                        <tr>
                          <th>Color</th>
                          <td>Black, Blue</td>
                        </tr>

                      </tbody>
                    </table>

                  </div>
                </div>
              )}

              {activeTabs === 2 && (
                <div className="tabContent">

                  <div className="row">

                    <div className="col-md-8">

                      <h3>Customer Questions & Answers</h3>

                      <br />

                      <div className="card p-4 reviewsCard flex-row">

                        <div className="image">

                          <div className="rounded-circle">
                            <img
                              src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png"
                              alt=""
                            />
                          </div>

                          <span className="text-g d-block text-center font-weight-bold">
                            koushik shetty
                          </span>

                        </div>

                        <div className="info pl-5">

                          <div className="d-flex align-items-center w-100">

                            <h5 className="text-light">01/06/2026</h5>

                            <div className="ml-auto">
                              <Rating value={4.5} precision={0.5} readOnly />
                            </div>

                          </div>

                          <p>
                            Good product quality and packaging.
                          </p>

                        </div>

                      </div>

                      {/* REVIEW FORM */}

                      <form className="reviewForm">

                        <h4>Add a Review</h4>

                        <br />

                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Write a review"
                          />
                        </div>

                        <div className="row">

                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>

                          <div className="col-md-6">
                            <Rating precision={0.5} />
                          </div>

                        </div>

                        <br />

                        <div className="form-group">

                        <Button type="submit" className="btn-blue btn-lg btn-big btn-round">
                          Submit Review
                        </Button></div>

                      </form>

                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>
          <br/>

          <RelatedProducts title="RELATED PRODUCTS"/>

           <RelatedProducts title="RECENTLY VIEWED PRODUCTS"/>

          

        </div>
      </section>
    </>
  );
};

export default ProductDetails;