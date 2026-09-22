
import { useEffect, useState } from "react";
import axios from "axios";

import DashboardBox from "./components/dashboardBox";

import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";

import { Chart } from "react-google-charts";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const API_URL = "http://localhost:4000/api/orders";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      const orderData = Array.isArray(response.data)
        ? response.data
        : response.data.orders || [];

      setOrders(orderData);
    } catch (err) {
      console.error("Dashboard order fetch error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, []);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((total, order) => {
    return total + Number(order.total || 0);
  }, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "CONFIRMED"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "PROCESSING"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "SHIPPED"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED"
  ).length;

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const chartData = [
    ["Order Status", "Orders"],
    ["Pending", pendingOrders],
    ["Confirmed", confirmedOrders],
    ["Processing", processingOrders],
    ["Shipped", shippedOrders],
    ["Delivered", deliveredOrders],
    ["Cancelled", cancelledOrders],
  ];

  const chartOptions = {
    backgroundColor: "transparent",
    legend: {
      textStyle: {
        color: "#ffffff",
      },
    },
    chartArea: {
      width: "90%",
      height: "80%",
    },
  };

  const productSales = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const productName =
        item.name ||
        item.productName ||
        item.title ||
        "Unknown Product";

      const quantity = Number(item.quantity || 1);
      const price = Number(item.price || 0);

      if (!productSales[productName]) {
        productSales[productName] = {
          name: productName,
          quantity: 0,
          sales: 0,
        };
      }

      productSales[productName].quantity += quantity;
      productSales[productName].sales += price * quantity;
    });
  });

  const bestSellingProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  if (loading) {
    return (
      <div className="right-content w-100 d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="right-content w-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="hd">Dashboard</h2>

          <p className="text-muted mb-0">
            Overview of your store performance
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchOrders}
        >
          Refresh Statistics
        </button>
      </div>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex flex-wrap">
            <DashboardBox
              title="Total Orders"
              value={totalOrders}
              subtitle="All Time"
              color={["#1da256", "#48d483"]}
              icon={<FaShoppingCart />}
              grow={true}
            />

            <DashboardBox
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              subtitle="All Time"
              color={["#c012e2", "#eb64fe"]}
              icon={<FaBagShopping />}
              grow={true}
            />

            <DashboardBox
              title="Pending Orders"
              value={pendingOrders}
              subtitle="Needs Attention"
              color={["#e1950e", "#f3cd29"]}
              icon={<FaRegUser />}
              grow={false}
            />

            <DashboardBox
              title="Delivered Orders"
              value={deliveredOrders}
              subtitle="Completed"
              color={["#2c78e5", "#60aff5"]}
              icon={<GiStarsStack />}
              grow={true}
            />
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="col-md-4 pl-0">
          <div className="box graphBox">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="text-white mb-0">
                Order Statistics
              </h6>
            </div>

            <Chart
              chartType="PieChart"
              data={chartData}
              options={chartOptions}
              width="100%"
              height="250px"
            />
          </div>
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="card shadow border-0 p-3 mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="hd">Best Selling Products</h3>

          <span className="badge bg-primary">
            {bestSellingProducts.length} Products
          </span>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>PRODUCT</th>
                <th>QUANTITY SOLD</th>
                <th>TOTAL SALES</th>
              </tr>
            </thead>

            <tbody>
              {bestSellingProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No product sales available.
                  </td>
                </tr>
              ) : (
                bestSellingProducts.map((product, index) => (
                  <tr key={product.name}>
                    <td>{index + 1}</td>

                    <td>
                      <strong>{product.name}</strong>
                    </td>

                    <td>{product.quantity}</td>

                    <td className="text-danger">
                      {formatCurrency(product.sales)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="hd">Order Summary</h3>

        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>STATUS</th>
                <th>TOTAL ORDERS</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>PENDING</td>
                <td>{pendingOrders}</td>
              </tr>

              <tr>
                <td>CONFIRMED</td>
                <td>{confirmedOrders}</td>
              </tr>

              <tr>
                <td>PROCESSING</td>
                <td>{processingOrders}</td>
              </tr>

              <tr>
                <td>SHIPPED</td>
                <td>{shippedOrders}</td>
              </tr>

              <tr>
                <td>DELIVERED</td>
                <td>{deliveredOrders}</td>
              </tr>

              <tr>
                <td>CANCELLED</td>
                <td>{cancelledOrders}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;