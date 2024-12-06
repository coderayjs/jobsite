'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { TaskCard } from '@/components/task-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const tasks = [
    {
        title: "Website Content Writing",
        description: "Write engaging content for a new e-commerce website",
        location: "Remote",
        duration: "3 days",
        pay: 15000,
        category: "Writing"
    },
    {
        title: "Logo Design for Local Business",
        description: "Create a modern logo for a new restaurant in Lagos",
        location: "Lagos",
        duration: "2 days",
        pay: 20000,
        category: "Design"
    },
    {
        title: "Data Entry for Small Company",
        description: "Input customer information into a new CRM system",
        location: "Abuja",
        duration: "1 week",
        pay: 25000,
        category: "Admin"
    },
    {
        title: "Social Media Management",
        description: "Manage social media accounts for a growing startup",
        location: "Remote",
        duration: "Ongoing",
        pay: 30000,
        category: "Marketing"
    },
    {
        title: "Video Editing for YouTube Channel",
        description: "Edit and produce weekly videos for a popular Nigerian YouTuber",
        location: "Remote",
        duration: "Weekly",
        pay: 22000,
        category: "Multimedia"
    },
    {
        title: "Virtual Assistant for Busy Entrepreneur",
        description: "Provide administrative support and manage schedules",
        location: "Remote",
        duration: "Part-time",
        pay: 18000,
        category: "Admin"
    }
]

export default function TasksPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('all')

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === 'all' || task.category === category)
    )

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Available Tasks</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="sm:w-1/3"
                />
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="sm:w-1/3">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Writing">Writing</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Multimedia">Multimedia</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="sm:w-1/3">Search</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task, index) => (
                    <TaskCard key={index} {...task} />
                ))}
            </div>
        </div>
    )
}

