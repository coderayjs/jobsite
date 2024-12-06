import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatePostFormProps {
    onPostCreated: (post: { content: string }) => void
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
    const [content, setContent] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content.trim()) {
            onPostCreated({ content })
            setContent('')
        }
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Create a Post</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex items-start space-x-4">
                        <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <Textarea
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">Post</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

