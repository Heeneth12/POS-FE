import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  ChefHat,
  Package,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useNotifications } from "../components/Notification/NotificationContainer";

interface OrderItem {
  id: string;
  customerName: string;
  orderNumber: string;
  time: string;
  table: string;
  items: { name: string; price: number }[];
  total: number;
  status: "new" | "cooking" | "ready" | "completed" | "cancelled";
}

const Dashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const { success, error, warning, info, closeAll, count } = useNotifications();

  const showMultiple = () => {
    success("First notification!");
    setTimeout(() => info("Second notification!"), 300);
    setTimeout(() => warning("Third notification!"), 600);
    setTimeout(() => error("Fourth notification!"), 900);
  };

  const orders: OrderItem[] = [
    {
      id: "1",
      customerName: "Robert Fox",
      orderNumber: "#044",
      time: "7 Apr, 11:30 AM",
      table: "Table 03",
      items: [
        { name: "Cheese Burger", price: 12.0 },
        { name: "Lemonade", price: 4.0 },
      ],
      total: 16.0,
      status: "new",
    },
    {
      id: "2",
      customerName: "Jenny Wilson",
      orderNumber: "#043",
      time: "7 Apr, 11:25 AM",
      table: "Table 05",
      items: [
        { name: "Cheese Burger", price: 12.0 },
        { name: "Salad with Sesame", price: 16.0 },
      ],
      total: 28.0,
      status: "cooking",
    },
    {
      id: "3",
      customerName: "Cameron William",
      orderNumber: "#042",
      time: "7 Apr, 11:10 AM",
      table: "Takeaway",
      items: [
        { name: "Special Sandwich Grill", price: 14.0 },
        { name: "Sparkling Water", price: 4.0 },
      ],
      total: 18.0,
      status: "ready",
    },
    {
      id: "4",
      customerName: "Olivia Hart",
      orderNumber: "#041",
      time: "7 Apr, 11:00 AM",
      table: "Table 06",
      items: [
        { name: "Salad with Sesame", price: 16.0 },
        { name: "Noodles with Chicken", price: 12.0 },
      ],
      total: 28.0,
      status: "cooking",
    },
    {
      id: "5",
      customerName: "Ethan Reyes",
      orderNumber: "#040",
      time: "7 Apr, 11:04 AM",
      table: "Table 01",
      items: [
        { name: "Pizza Frutti", price: 10.0 },
        { name: "French Fries", price: 6.0 },
      ],
      total: 16.0,
      status: "ready",
    },
    {
      id: "6",
      customerName: "Mia Sullivan",
      orderNumber: "#039",
      time: "7 Apr, 11:52 AM",
      table: "Takeaway",
      items: [
        { name: "Chicken Fried Rice", price: 12.0 },
        { name: "Mineral Water", price: 2.0 },
      ],
      total: 14.0,
      status: "completed",
    },
  ];

  const statusConfig = {
    new: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
    cooking: {
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: ChefHat,
    },
    ready: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: Clock,
    },
    completed: {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: CheckCircle,
    },
    cancelled: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircle,
    },
  };

  const statusCounts = {
    all: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    cooking: orders.filter((o) => o.status === "cooking").length,
    ready: orders.filter((o) => o.status === "ready").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = totalRevenue / orders.length;

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500 ml-1">from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Order Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${avgOrderValue.toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5%</span>
              <span className="text-gray-500 ml-1">from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts.new + statusCounts.cooking + statusCounts.ready}
                </p>
              </div>
              <div className="bg-orange-100 rounded-lg p-3">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Clock className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-500 font-medium">2 urgent</span>
              <span className="text-gray-500 ml-1">need attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order List</h2>

          {/* Status Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: "all", label: "All" },
              { key: "new", label: "New" },
              { key: "cooking", label: "Cooking" },
              { key: "ready", label: "Ready" },
              { key: "completed", label: "Completed" },
              { key: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedStatus(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedStatus === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                  {statusCounts[tab.key as keyof typeof statusCounts]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {order.customerName}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {order.orderNumber}
                    </span>
                  </div>

                  {/* Time and Table */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {order.time}
                    </div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      {order.table}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Order ({order.items.length})
                    </div>
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>1x {item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-100">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${statusConfig[order.status].color}`}>
                      <StatusIcon className="w-4 h-4 mr-2" />
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400">
                Try selecting a different status filter
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            🚀 Notification System
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => success("Task completed successfully!")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Success
              </button>

              <button
                onClick={() => error("Something went wrong!")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Error
              </button>

              <button
                onClick={() => warning("Please check your input")}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                Warning
              </button>

              <button
                onClick={() => info("Here's some information", 0)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Info (Manual Close)
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={showMultiple}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold">
                Show Multiple Notifications
              </button>

              {count > 0 && (
                <button
                  onClick={closeAll}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Clear All ({count})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
