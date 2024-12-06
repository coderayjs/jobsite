'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserReviews } from "@/components/user-reviews"
import { X } from 'lucide-react'

export default function ProfilePage() {
    const [user, setUser] = useState({
        name: 'Oluwaseun Adebayo',
        email: 'oluwaseun@example.com',
        bio: 'Passionate freelancer with expertise in web development and design.',
        skills: ['JavaScript', 'React', 'Node.js', 'UI/UX Design'],
        location: 'Lagos, Nigeria',
        joinDate: 'January 2023',
        completedTasks: 45,
        rating: 4.8,
    })

    const [newSkill, setNewSkill] = useState('')

    const reviews = [
        {
            id: 1,
            author: 'Chidi Okonkwo',
            rating: 5,
            content: 'Oluwaseun did an excellent job on our website redesign. Very professional and delivered on time.',
            date: '2023-05-15'
        },
        {
            id: 2,
            author: 'Amina Bello',
            rating: 4,
            content: 'Great work on the logo design. Captured our brand essence perfectly.',
            date: '2023-06-02'
        },
        {
            id: 3,
            author: 'Emeka Nwosu',
            rating: 5,
            content: 'Oluwaseun is a talented developer. Helped us fix critical bugs in our app.',
            date: '2023-06-20'
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        // Here we would typically send the updated user data to an API
        console.log('Saving user data:', user)
    }

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault()
        if (newSkill && !user.skills.includes(newSkill)) {
            setUser({ ...user, skills: [...user.skills, newSkill] })
            setNewSkill('')
        }
    }

    const handleRemoveSkill = (skillToRemove: string) => {
        setUser({ ...user, skills: user.skills.filter(skill => skill !== skillToRemove) })
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/placeholder.svg" alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <Button>Change Photo</Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={user.location} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" name="bio" value={user.bio} onChange={handleInputChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {user.skills.map((skill, index) => (
                                    <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                                        {skill}
                                        <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-primary-foreground hover:text-red-500">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <form onSubmit={handleAddSkill} className="flex gap-2">
                                <Input
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Enter a new skill"
                                />
                                <Button type="submit">Add</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>Member since: {user.joinDate}</p>
                            <p>Completed tasks: {user.completedTasks}</p>
                            <p>Rating: {user.rating} / 5</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <UserReviews reviews={reviews} />
                </div>
            </div>
        </div>
    )
}

