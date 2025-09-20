import type { Notification, NotificationType } from "./types";

type Listener = (notifications: Notification[]) => void;

class NotificationService {
  
  private listeners: Set<Listener> = new Set();
  private notifications: Notification[] = [];
  private timeouts = new Map<string, NodeJS.Timeout>();

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Send current notifications to new subscriber
    listener([...this.notifications]);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.notifications]));
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  open(
    message: string,
    type: NotificationType = "info",
    duration: number = 5000
  ): string {
    const id = this.generateId();

    const notification: Notification = {
      id,
      message,
      type,
      duration,
      timestamp: Date.now()
    };

    this.notifications.push(notification);
    this.notify();

    // Auto-close after duration (if duration > 0)
    if (duration > 0) {
      const timeoutId = setTimeout(() => {
        this.close(id);
      }, duration);

      this.timeouts.set(id, timeoutId);
    }

    return id;
  }

  close(id: string): void {
    // Clear timeout if exists
    if (this.timeouts.has(id)) {
      clearTimeout(this.timeouts.get(id));
      this.timeouts.delete(id);
    }

    // Remove notification from array
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.notify();
  }

  closeAll(): void {
    // Clear all timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();

    // Clear all notifications
    this.notifications = [];
    this.notify();
  }

  // Convenience methods
  success(message: string, duration?: number): string {
    return this.open(message, "success", duration);
  }

  error(message: string, duration?: number): string {
    return this.open(message, "error", duration);
  }

  warning(message: string, duration?: number): string {
    return this.open(message, "warning", duration);
  }

  info(message: string, duration?: number): string {
    return this.open(message, "info", duration);
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  getNotificationCount(): number {
    return this.notifications.length;
  }
}

export const notificationService = new NotificationService();