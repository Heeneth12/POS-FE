import {useState} from "react";
import {
  Menu,
  X,
  UtensilsCrossed,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Home,
  CreditCard,
  Package,
  Calendar,
  MessageSquare,
  ChevronRight,
  User,
  LogOut,
  Minimize2,
  Maximize2,
} from "lucide-react";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null) as any;

  const sidebarLinks = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: ShoppingCart, label: "Orders", href: "/orders", badge: "12" },
    { icon: UtensilsCrossed, label: "Menu", href: "/menu" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Customers", href: "/customers" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: Package, label: "Inventory", href: "/inventory", badge: "3" },
    { icon: Calendar, label: "Reservations", href: "/reservations" },
    { icon: MessageSquare, label: "Feedback", href: "/feedback" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isSidebarCollapsed ? "lg:pl-20" : "lg:pl-80"
          }`}>
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="group relative p-2 rounded-xl bg-gray-100 hover:bg-green-100 transition-all duration-300 hover:scale-105 lg:hidden">
                <Menu
                  size={20}
                  className="text-gray-700 group-hover:text-green-600 transition-colors"
                />
                <div className="absolute inset-0 bg-green-200 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>

              {/* Logo - Only visible when sidebar is collapsed on desktop */}
              <div
                className={`lg:flex items-center group cursor-pointer transition-all duration-300 ${
                  isSidebarCollapsed ? "lg:flex" : "lg:hidden"
                } flex`}>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-200 group-hover:scale-105 transition-all duration-300">
                    <UtensilsCrossed size={20} className="text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-75"></div>
                </div>
                <div className="ml-3 hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    EZ-POS
                  </h1>
                  <p className="text-xs text-gray-500 leading-none">
                    Restaurant Pro
                  </p>
                </div>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search
                    size={16}
                    className="text-gray-400 group-focus-within:text-green-500 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search orders, customers, menu items..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-green-50/50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-4 mr-4">
                <div className="text-center group cursor-pointer p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <div className="text-sm font-bold text-gray-900 group-hover:text-green-600">
                    $2,847
                  </div>
                  <div className="text-xs text-gray-500">Today's Sales</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center group cursor-pointer p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <div className="text-sm font-bold text-gray-900 group-hover:text-green-600">
                    23
                  </div>
                  <div className="text-xs text-gray-500">Active Orders</div>
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-green-50 transition-all duration-300 group hover:scale-105">
                <Bell
                  size={18}
                  className="text-gray-600 group-hover:text-green-600 transition-colors"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">
                      John Manager
                    </div>
                    <div className="text-xs text-gray-500">
                      Restaurant Admin
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-[slideDown_0.2s_ease-out]">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        John Manager
                      </div>
                      <div className="text-xs text-gray-500">
                        john@restaurant.com
                      </div>
                    </div>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                      <User size={16} className="mr-3" />
                      Profile Settings
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                      <Settings size={16} className="mr-3" />
                      Preferences
                    </a>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out lg:shadow-none lg:border-r lg:border-gray-200 ${
          // Mobile behavior
          isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"
        } ${
          // Desktop behavior
          "lg:translate-x-0"
        } ${
          // Desktop width based on collapsed state
          isSidebarCollapsed ? "lg:w-16" : "lg:w-72"
        }`}>
        {/* Sidebar Header */}
        <div
          className={`h-16 flex items-center border-b border-gray-200 bg-gradient-to-r from-green-50 to-white transition-all duration-300 ${
            isSidebarCollapsed
              ? "lg:justify-center lg:px-2"
              : "justify-between px-6"
          }`}>
          <div
            className={`flex items-center transition-all duration-300 ${
              isSidebarCollapsed ? "lg:justify-center" : ""
            }`}>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed size={16} className="text-white" />
            </div>
            <div
              className={`ml-3 transition-all duration-300 ${
                isSidebarCollapsed ? "lg:hidden" : "block"
              }`}>
              <div className="text-sm font-bold text-gray-900">EZ-POS</div>
              <div className="text-xs text-gray-500">v2.1.0</div>
            </div>
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-300 hidden lg:flex items-center justify-center group ${
              isSidebarCollapsed ? "lg:hidden" : ""
            }`}>
            {isSidebarCollapsed ? (
              <Maximize2
                size={16}
                className="text-gray-500 group-hover:text-green-600"
              />
            ) : (
              <Minimize2
                size={16}
                className="text-gray-500 group-hover:text-green-600"
              />
            )}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Expand button for collapsed sidebar */}
        {isSidebarCollapsed && (
          <div className="hidden lg:block absolute top-20 -right-3 z-10">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md group">
              <ChevronRight
                size={12}
                className="text-gray-500 group-hover:text-green-600"
              />
            </button>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav
          className={`flex-1 py-6 space-y-2 overflow-y-auto transition-all duration-300 ${
            isSidebarCollapsed ? "lg:px-2" : "px-4"
          }`}>
          {sidebarLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <div key={link.label} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group flex items-center transition-all duration-300 hover:scale-[1.02] relative ${
                    isSidebarCollapsed
                      ? "lg:justify-center lg:w-12 lg:h-12 lg:rounded-xl lg:mx-auto"
                      : "justify-between px-3 py-3 rounded-xl"
                  } ${
                    link.active
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}>
                  <div
                    className={`flex items-center ${
                      isSidebarCollapsed ? "lg:justify-center" : ""
                    }`}>
                    <Icon
                      size={18}
                      className={`transition-all duration-300 ${
                        isSidebarCollapsed ? "lg:mr-0" : "mr-3"
                      } ${
                        link.active
                          ? "text-white"
                          : "text-gray-500 group-hover:text-green-500 group-hover:scale-110"
                      }`}
                    />
                    <span
                      className={`font-medium transition-all duration-300 ${
                        isSidebarCollapsed ? "lg:hidden" : "block"
                      }`}>
                      {link.label}
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isSidebarCollapsed ? "lg:hidden" : "flex"
                    }`}>
                    {link.badge && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          link.active
                            ? "bg-white/20 text-white"
                            : "bg-red-100 text-red-600 group-hover:bg-red-200"
                        }`}>
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight
                      size={14}
                      className={`transition-all duration-300 ${
                        link.active
                          ? "text-white/70"
                          : "text-gray-400 group-hover:text-green-400 group-hover:translate-x-1"
                      }`}
                    />
                  </div>

                  {/* Badge for collapsed sidebar */}
                  {isSidebarCollapsed && link.badge && (
                    <span className="lg:block absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </a>

                {/* Tooltip for collapsed sidebar */}
                {isSidebarCollapsed && hoveredItem === index && (
                  <div className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2 ml-2 z-50">
                    <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap animate-[slideIn_0.2s_ease-out]">
                      {link.label}
                      {link.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-xs rounded-full">
                          {link.badge}
                        </span>
                      )}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div
          className={`border-t border-gray-200 transition-all duration-300 ${
            isSidebarCollapsed ? "lg:p-2" : "p-4"
          }`}>
          <div
            className={`bg-gradient-to-r from-green-50 to-green-100 rounded-xl transition-all duration-300 ${
              isSidebarCollapsed ? "lg:p-2" : "p-4"
            }`}>
            <div
              className={`flex items-center transition-all duration-300 ${
                isSidebarCollapsed ? "lg:justify-center lg:mb-0" : "mb-2"
              }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span
                className={`text-sm font-semibold text-green-800 transition-all duration-300 ${
                  isSidebarCollapsed ? "lg:hidden ml-2" : "ml-2"
                }`}>
                System Status
              </span>
            </div>
            <div
              className={`text-xs text-green-600 transition-all duration-300 ${
                isSidebarCollapsed ? "lg:hidden" : "block"
              }`}>
              All systems operational
            </div>
            <div
              className={`text-xs text-green-500 mt-1 transition-all duration-300 ${
                isSidebarCollapsed ? "lg:hidden" : "block"
              }`}>
              Last updated: 2 min ago
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div
        className={`h-16 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}></div>
    </>
  );
}
