export type NotificationType = "info" | "success" | "error" | "warning";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  timestamp: number;
}

export interface NotificationConfig {
  message: string;
  type?: NotificationType;
  duration?: number;
}