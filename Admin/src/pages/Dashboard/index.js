
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import DashboardBox from "./components/dashboardBox";
import RecentOrders from "./components/RecentOrders";

import {
  FaRegUser,
  FaShoppingCart,
} from "react-icons/fa";

import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";

import { Chart } from "react-google-charts";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// =========================
// API URL
// =========================

const API_URL = "http://localhost:4000/api/orders";

// =========================
// DASHBOARD COMPONENT
// =========================

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      const responseData = response.data;

      let orderData = [];

      if (Array.isArray(responseData)) {
        orderData = responseData;
      } else if (
        responseData &&
        Array.isArray(responseData.orders)
      ) {
        orderData = responseData.orders;
      } else {
        throw new Error("Invalid orders response format");
      }

      setOrders(orderData);
    } catch (err) {
      console.error("Dashboard order fetch error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, [fetchOrders]);

  // =========================
  // GET ORDER TOTAL
  // =========================

  const getOrderTotal = (order) => {
    const total =
      order.total ??
      order.totalAmount ??
      order.grandTotal ??
      order.amount ??
      0;

    const numericTotal = Number(total);

    return Number.isFinite(numericTotal)
      ? numericTotal
      : 0;
  };

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => {
      return total + getOrderTotal(order);
    },
    0
  );

  const getStatusCount = (status) => {
    return orders.filter(
      (order) =>
        String(order.status || "").toUpperCase() === status
    ).length;
  };

  const pendingOrders =
    getStatusCount("PENDING") +
    getStatusCount("PENDING_CONFIRMATION");

  const confirmedOrders = getStatusCount("CONFIRMED");

  const processingOrders = getStatusCount("PROCESSING");

  const shippedOrders = getStatusCount("SHIPPED");

  const deliveredOrders = getStatusCount("DELIVERED");

  const cancelledOrders = getStatusCount("CANCELLED");

  // =========================
  // FORMAT CURRENCY
  // =========================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // =========================
  // ORDER STATUS CHART
  // =========================

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
    is3D: true,
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

  // =========================
  // BEST-SELLING PRODUCTS
  // =========================

  const bestSellingProducts = useMemo(() => {
    const productSales = {};

    orders.forEach((order) => {
      if (!Array.isArray(order.items)) {
        return;
      }

      order.items.forEach((item) => {
        const productName =
          item.name ||
          item.productName ||
          item.title ||
          item.product?.name ||
          "Unknown Product";

        const quantity = Number(item.quantity || 1);

        const price = Number(
          item.price ||
            item.sellingPrice ||
            item.product?.price ||
            0
        );

        const validQuantity = Number.isFinite(quantity)
          ? quantity
          : 0;

        const validPrice = Number.isFinite(price)
          ? price
          : 0;

        if (!productSales[productName]) {
          productSales[productName] = {
            name: productName,
            quantity: 0,
            sales: 0,
          };
        }

        productSales[productName].quantity += validQuantity;

        productSales[productName].sales +=
          validPrice * validQuantity;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }, [orders]);

  // =========================
  // MONTHLY REVENUE
  // =========================

  const monthlyRevenueData = useMemo(() => {
    const monthlyRevenue = {};

    orders.forEach((order) => {
      const orderDate = new Date(
        order.createdAt || order.orderDate
      );

      if (Number.isNaN(orderDate.getTime())) {
        return;
      }

      const monthKey = `${orderDate.getFullYear()}-${String(
        orderDate.getMonth() + 1
      ).padStart(2, "0")}`;

      const monthName = orderDate.toLocaleDateString(
        "en-IN",
        {
          month: "short",
          year: "numeric",
        }
      );

      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = {
          month: monthName,
          revenue: 0,
        };
      }

      monthlyRevenue[monthKey].revenue +=
        getOrderTotal(order);
    });

    return [
      ["Month", "Revenue"],
      ...Object.keys(monthlyRevenue)
        .sort()
        .map((monthKey) => [
          monthlyRevenue[monthKey].month,
          monthlyRevenue[monthKey].revenue,
        ]),
    ];
  }, [orders]);

  const revenueChartOptions = {
    title: "Monthly Revenue",
    curveType: "function",
    legend: {
      position: "bottom",
    },
    hAxis: {
      title: "Month",
    },
    vAxis: {
      title: "Revenue (₹)",
      format: "₹#,##0",
    },
    chartArea: {
      width: "80%",
      height: "70%",
    },
  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div className="right-content w-100 d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }

  // =========================
  // DASHBOARD UI
  // =========================

  return (
    <div className="right-content w-100">
      {/* Dashboard Header */}

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
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Statistics"}
        </button>
      </div>

      {/* Error Message */}

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Dashboard Statistics */}

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

      {/* Best-Selling Products */}

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

      {/* Monthly Revenue Chart */}

      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="hd">Monthly Revenue</h3>

        {monthlyRevenueData.length > 1 ? (
          <Chart
            chartType="LineChart"
            width="100%"
            height="350px"
            data={monthlyRevenueData}
            options={revenueChartOptions}
          />
        ) : (
          <p className="text-muted mb-0">
            Not enough data to display monthly revenue.
          </p>
        )}
      </div>

      {/* Recent Orders */}

      <RecentOrders />
    </div>
  );
};

export default Dashboard;