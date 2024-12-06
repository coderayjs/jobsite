'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

type Task = {
    id: string
    title: string
    client: string
    amount: number
    date: string
    status: 'active' | 'pending' | 'completed'
}

const tasks: Task[] = [
    { id: '1', title: 'Website Redesign', client: 'TechCorp', amount: 2500, date: '2023-12-01', status: 'active' },
    { id: '2', title: 'Mobile App Development', client: 'StartupX', amount: 5000, date: '2023-11-15', status: 'pending' },
    { id: '3', title: 'SEO Optimization', client: 'LocalBiz', amount: 1000, date: '2023-12-10', status: 'completed' },
    { id: '4', title: 'E-commerce Integration', client: 'FashionBrand', amount: 3000, date: '2023-12-05', status: 'active' },
    { id: '5', title: 'Content Writing', client: 'BlogCo', amount: 500, date: '2023-11-20', status: 'pending' },
]

export function RecentTasks() {
    const [activeTab, setActiveTab] = useState('all')

    const filteredTasks = tasks.filter(task =>
        activeTab === 'all' || task.status === activeTab
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeTab}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-medium">{task.title}</TableCell>
                                        <TableCell>{task.client}</TableCell>
                                        <TableCell>${task.amount.toLocaleString()}</TableCell>
                                        <TableCell>{new Date(task.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
                                                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

