import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, MessageSquare, Briefcase, CheckCircle, AlertCircle } from 'lucide-react'

interface NotificationItemProps {
    id: string
    type: 'message' | 'task' | 'review' | 'system'
    content: string
    timestamp: string
    isRead: boolean
    onMarkAsRead: (id: string) => void
}

export function NotificationItem({ id, type, content, timestamp, isRead, onMarkAsRead }: NotificationItemProps) {
    const [read, setRead] = useState(isRead)

    const handleMarkAsRead = () => {
        setRead(true)
        onMarkAsRead(id)
    }

    const getIcon = () => {
        switch (type) {
            case 'message':
                return <MessageSquare className="h-5 w-5 text-blue-500" />
            case 'task':
                return <Briefcase className="h-5 w-5 text-green-500" />
            case 'review':
                return <CheckCircle className="h-5 w-5 text-yellow-500" />
            case 'system':
                return <AlertCircle className="h-5 w-5 text-red-500" />
            default:
                return <Bell className="h-5 w-5 text-gray-500" />
        }
    }

    return (
        <Card className={`mb-4 ${read ? 'bg-gray-50' : 'bg-white'}`}>
            <CardContent className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">{getIcon()}</div>
                    <div className="flex-grow">
                        <p className={`text-sm ${read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>{content}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(timestamp).toLocaleString()}</p>
                    </div>
                    {!read && (
                        <Button variant="outline" size="sm" onClick={handleMarkAsRead} className="ml-4">
                            Mark as Read
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

