// import React, { useEffect, useState } from "react";
// import api from "../../services/api";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [dailySales, setDailySales] = useState([]);
//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);
//   const [userGrowth, setUserGrowth] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const analyticsRes = await api.get("/admin/dashboard/analytics");
//         const dailySalesRes = await api.get(
//           "/admin/dashboard/daily-sales?days=30"
//         );
//         const monthlyRevenueRes = await api.get(
//           "/admin/dashboard/monthly-revenue"
//         );
//         const userGrowthRes = await api.get(
//           "/admin/dashboard/user-growth?days=30"
//         );

//         setAnalytics(analyticsRes.data);
//         setDailySales(dailySalesRes.data);
//         setMonthlyRevenue(monthlyRevenueRes.data);
//         setUserGrowth(userGrowthRes.data);
//       } catch (error) {
//         console.error("Dashboard load failed", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (!analytics) {
//     return <p className="p-6">Loading dashboard...</p>;
//   }

//   return (
//     <div className="p-6 space-y-8">
//       <h2 className="text-3xl font-bold">Admin Dashboard</h2>
//       <p className="text-gray-600">
//         Overview of platform performance and growth
//       </p>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           icon={<Users className="h-8 w-8 text-blue-500" />}
//           label="Total Users"
//           value={analytics.users.total}
//         />
//         <StatCard
//           icon={<ShoppingBag className="h-8 w-8 text-green-500" />}
//           label="Total Orders"
//           value={analytics.orders.total}
//         />
//         <StatCard
//           icon={<Package className="h-8 w-8 text-purple-500" />}
//           label="Total Products"
//           value={analytics.products.total}
//         />
//         <StatCard
//           icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
//           label="Total Revenue"
//           value={`₹${analytics.revenue.total}`}
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Daily Sales */}
//         <ChartCard title="Daily Sales (Last 7 Days)">
//           <ResponsiveContainer width="100%" height={260}>
//             <LineChart data={dailySales}>
//               <XAxis
//                 dataKey="date"
//                 tickFormatter={(d) =>
//                   new Date(d).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                   })
//                 }
//               />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="totalSales"
//                 stroke="#10b981"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         {/* User Growth */}
//         <ChartCard title="User Growth (Last 30 Days)">
//           <ResponsiveContainer width="100%" height={260}>
//             <LineChart data={userGrowth}>
//               <XAxis
//                 dataKey="date"
//                 tickFormatter={(d) =>
//                   new Date(d).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                   })
//                 }
//               />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="usersCount"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* Monthly Revenue */}
//       <ChartCard title="Monthly Revenue">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={monthlyRevenue}>
//             <XAxis
//               dataKey="month"
//               tickFormatter={(m, index) => {
//                 const item = monthlyRevenue[index];
//                 return new Date(
//                   item.year,
//                   item.month - 1
//                 ).toLocaleString("en-IN", { month: "short", year: "numeric" });
//               }}
//             />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="revenue" fill="#10b981" />
//           </BarChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </div>
//   );
// };

// export default AdminDashboard;

// /* ---------------- Components ---------------- */

// const StatCard = ({ icon, label, value }) => (
//   <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
//     {icon}
//     <div>
//       <p className="text-gray-500 text-sm">{label}</p>
//       <h3 className="text-2xl font-bold">{value}</h3>
//     </div>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-white shadow rounded-xl p-5">
//     <h3 className="text-lg font-semibold mb-4">{title}</h3>
//     {children}
//   </div>
// );



import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    users: { total: 0, active: 0, blocked: 0 },
    orders: { total: 0, today: 0 },
    products: { total: 0, outOfStock: 0 },
    revenue: { total: 0, today: 0 },
  });

  const [dailySales, setDailySales] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          analyticsRes,
          dailySalesRes,
          monthlyRevenueRes,
          userGrowthRes,
        ] = await Promise.all([
          api.get("/admin/dashboard/analytics"),
          api.get("/admin/dashboard/daily-sales?days=30"),
          api.get("/admin/dashboard/monthly-revenue"),
          api.get("/admin/dashboard/user-growth?days=30"),
        ]);

        setAnalytics(analyticsRes.data);
        setDailySales(dailySalesRes.data);
        setMonthlyRevenue(monthlyRevenueRes.data);
        setUserGrowth(userGrowthRes.data);
      } catch (error) {
        console.error("Dashboard load failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Platform overview and growth analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard
    icon={<Users className="h-8 w-8 text-blue-500" />}
    label="Total Users"
    value={analytics.users.totalUsers}
    subText={`Active: ${analytics.users.activeUsers}`}
  />

  <StatCard
    icon={<ShoppingBag className="h-8 w-8 text-green-500" />}
    label="Total Orders"
    value={analytics.orders.totalOrders}
    subText={`Today: ${analytics.orders.ordersToday}`}
  />

  <StatCard
    icon={<Package className="h-8 w-8 text-purple-500" />}
    label="Total Products"
    value={analytics.products.totalProducts}
    subText={`Out of stock: ${analytics.products.outOfStockProducts}`}
  />

  <StatCard
    icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
    label="Total Revenue"
    value={`₹${analytics.revenue.totalRevenue}`}
    subText={`Today: ₹${analytics.revenue.todayRevenue}`}
  />
</div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Daily Sales (Last 30 Days)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailySales}>
              <XAxis
                dataKey="date"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User Growth (Last 30 Days)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={userGrowth}>
              <XAxis
                dataKey="date"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usersCount"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Monthly Revenue">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <XAxis
              tickFormatter={(_, index) => {
                const item = monthlyRevenue[index];
                return new Date(
                  item.year,
                  item.month - 1
                ).toLocaleString("en-IN", {
                  month: "short",
                  year: "numeric",
                });
              }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default AdminDashboard;

/* ---------------- Components ---------------- */

const StatCard = ({ icon, label, value, subText }) => (
  <div className="bg-white shadow rounded-xl p-5 flex items-start gap-4">
    {icon}
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      {subText && <p className="text-xs text-gray-400 mt-1">{subText}</p>}
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow rounded-xl p-5">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);
