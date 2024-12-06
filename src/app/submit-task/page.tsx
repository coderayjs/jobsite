'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'

export default function SubmitTaskPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        category: '',
        attachments: null as File | null,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (value: string) => {
        setTaskData({ ...taskData, category: value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setTaskData({ ...taskData, attachments: e.target.files[0] })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Here we would typically send the task data to an API
        console.log('Submitting task:', taskData)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        router.push('/dashboard')
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Submit Completed Task</h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Task Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={taskData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={taskData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={taskData.category} onValueChange={handleCategoryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="writing">Writing</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="development">Development</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="attachments">Attachments</Label>
                            <Input
                                id="attachments"
                                name="attachments"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? 'Submitting...' : 'Submit Task'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

