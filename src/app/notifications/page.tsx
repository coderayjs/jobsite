'use client'

import { useState } from 'react'
import { NotificationItem } from "@/components/notification-item"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
    id: string
    type: 'message' | 'task' | 'review' | 'system'
    content: string
    timestamp: string
    isRead: boolean
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', type: 'message', content: 'You have a new message from Chidi Okonkwo', timestamp: '2023-06-28T10:00:00Z', isRead: false },
        { id: '2', type: 'task', content: 'New task available: Website Development for Local Business', timestamp: '2023-06-27T15:30:00Z', isRead: false },
        { id: '3', type: 'review', content: 'Your task "Logo Design" has been reviewed', timestamp: '2023-06-26T09:45:00Z', isRead: true },
        { id: '4', type: 'system', content: 'Your account has been verified successfully', timestamp: '2023-06-25T14:20:00Z', isRead: true },
        { id: '5', type: 'task', content: 'Reminder: Task "Content Writing" is due tomorrow', timestamp: '2023-06-24T11:00:00Z', isRead: false },
    ])

    const [filter, setFilter] = useState('all')

    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ))
    }

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
    }

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'all') return true
        if (filter === 'unread') return !notif.isRead
        return notif.type === filter
    })

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <div className="flex items-center space-x-4">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter notifications" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Notifications</SelectItem>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="message">Messages</SelectItem>
                            <SelectItem value="task">Tasks</SelectItem>
                            <SelectItem value="review">Reviews</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleMarkAllAsRead}>Mark All as Read</Button>
                </div>
            </div>
            <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        {...notification}
                        onMarkAsRead={handleMarkAsRead}
                    />
                ))}
                {filteredNotifications.length === 0 && (
                    <p className="text-center text-gray-500">No notifications to display.</p>
                )}
            </div>
        </div>
    )
}

