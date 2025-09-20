import React, { useEffect, useState, useCallback } from "react";
import { notificationService } from "./notificationService";
import type { Notification, NotificationType } from "./types";


// NotificationItem Component
interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
  index: number;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClose,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation with stagger
    const timer = setTimeout(() => setIsVisible(true), 50 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => onClose(notification.id), 300);
  }, [notification.id, onClose]);

  const getNotificationStyles = () => {
    const baseStyles = `
      relative flex items-start gap-3 p-4 rounded-xl shadow-lg backdrop-blur-sm
      transform transition-all duration-300 ease-out border border-opacity-20
      ${isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      ${isLeaving ? "translate-x-full opacity-0 scale-95" : ""}
    `;

    switch (notification.type) {
      case "success":
        return `${baseStyles} bg-gradient-to-r from-green-500 to-green-600 text-white border-green-300 shadow-green-500/25`;
      case "error":
        return `${baseStyles} bg-gradient-to-r from-red-500 to-red-600 text-white border-red-300 shadow-red-500/25`;
      case "warning":
        return `${baseStyles} bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-300 shadow-amber-500/25`;
      case "info":
      default:
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-300 shadow-blue-500/25`;
    }
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5 flex-shrink-0 mt-0.5";
    switch (notification.type) {
      case "success":
        return <div className={`${iconClass} text-green-100`}>✓</div>;
      case "error":
        return <div className={`${iconClass} text-red-100`}>✕</div>;
      case "warning":
        return <div className={`${iconClass} text-amber-100`}>⚠</div>;
      case "info":
      default:
        return <div className={`${iconClass} text-blue-100`}>ℹ</div>;
    }
  };

  const getProgressBarColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-300";
      case "error":
        return "bg-red-300";
      case "warning":
        return "bg-amber-300";
      case "info":
      default:
        return "bg-blue-300";
    }
  };

  return (
    <div
      className={getNotificationStyles()}
      style={{
        marginBottom: "12px",
        zIndex: 1000 - index,
      }}>
      {/* Progress bar for auto-close */}
      {notification.duration && notification.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20 rounded-b-xl overflow-hidden">
          <div
            className={`h-full ${getProgressBarColor()} opacity-70`}
            style={{
              animation: `shrink ${notification.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Icon */}
      {getIcon()}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium leading-relaxed break-words">
          {notification.message}
        </div>
      </div>

      {/* Close button */}
      <button
        className="flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-20 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-white focus:ring-opacity-50 ml-2"
        onClick={handleClose}
        aria-label="Close notification">
        <div className="w-4 h-4 flex items-center justify-center text-white opacity-70 hover:opacity-100">
          ✕
        </div>
      </button>
    </div>
  );
};

// ClearAllButton Component
interface ClearAllButtonProps {
  count: number;
  onClearAll: () => void;
}

const ClearAllButton: React.FC<ClearAllButtonProps> = ({
  count,
  onClearAll,
}) => {
  if (count <= 1) return null;

  return (
    <div className="flex justify-end mt-3 pointer-events-auto">
      <button
        onClick={onClearAll}
        className="text-xs px-3 py-1 bg-gray-600 text-white rounded-full 
                   hover:bg-gray-700 transition-colors duration-200 
                   shadow-lg backdrop-blur-sm focus:outline-none 
                   focus:ring-2 focus:ring-gray-400">
        Clear All ({count})
      </button>
    </div>
  );
};

// Main NotificationContainer Component
const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  const handleClose = useCallback((id: string) => {
    notificationService.close(id);
  }, []);

  const handleClearAll = useCallback(() => {
    notificationService.closeAll();
  }, []);

  if (notifications.length === 0) return null;

  return (
    <>
      {/* Global styles for animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full space-y-2 pointer-events-none">
        <div className="space-y-3 pointer-events-auto">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={handleClose}
              index={index}
            />
          ))}
        </div>

        {/* Clear all button */}
        <ClearAllButton
          count={notifications.length}
          onClearAll={handleClearAll}
        />
      </div>
    </>
  );
};

// Custom Hook for easier usage
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  return {
    notifications,
    show: (message: string, type?: NotificationType, duration?: number) =>
      notificationService.open(message, type, duration),
    success: (message: string, duration?: number) =>
      notificationService.success(message, duration),
    error: (message: string, duration?: number) =>
      notificationService.error(message, duration),
    warning: (message: string, duration?: number) =>
      notificationService.warning(message, duration),
    info: (message: string, duration?: number) =>
      notificationService.info(message, duration),
    close: (id: string) => notificationService.close(id),
    closeAll: () => notificationService.closeAll(),
    count: notifications.length,
  };
};

export default NotificationContainer;
