import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'order' | 'promo' | 'info' | 'alert';
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Order Shipped!',
    message: 'Your order #12345 has been shipped and will arrive in 2-3 business days.',
    timestamp: '2 minutes ago',
    isRead: false,
    type: 'order',
  },
  {
    id: '2',
    title: 'Flash Sale! 🔥',
    message: 'Don\'t miss out on our 24-hour flash sale! Up to 50% off on selected items.',
    timestamp: '1 hour ago',
    isRead: false,
    type: 'promo',
  },
  {
    id: '3',
    title: 'New Products Added',
    message: 'Check out our latest collection of wireless earbuds and accessories.',
    timestamp: '3 hours ago',
    isRead: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Price Drop Alert',
    message: 'The Wireless Headphones you liked are now 20% off!',
    timestamp: '5 hours ago',
    isRead: true,
    type: 'alert',
  },
  {
    id: '5',
    title: 'Order Delivered',
    message: 'Your order #12344 has been delivered. Enjoy your purchase!',
    timestamp: '1 day ago',
    isRead: true,
    type: 'order',
  },
  {
    id: '6',
    title: 'Weekend Special Offer',
    message: 'Get an extra 10% off on all accessories this weekend.',
    timestamp: '2 days ago',
    isRead: true,
    type: 'promo',
  },
];

type NotificationsContextType = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
};

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  markAsRead: () => {},
  markAllAsRead: () => {},
  unreadCount: 0,
});

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        markAsRead,
        markAllAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext); 