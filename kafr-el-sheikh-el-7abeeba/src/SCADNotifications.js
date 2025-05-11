class NotificationManager {
  static notifications = [];

  static addNotification(notification) {
    const newNotification = {
      id: this.notifications.length + 1,
      message: notification.message,
      isRead: false,
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  static markAsRead(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
  }

  static getAll() {
    return this.notifications;
  }

  static getUnread() {
    return this.notifications.filter(n => !n.isRead);
  }
}

export default NotificationManager;