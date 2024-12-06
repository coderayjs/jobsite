import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react'

interface Comment {
    id: string
    author: string
    content: string
    timestamp: string
}

interface CommunityPostProps {
    id: string
    author: string
    content: string
    timestamp: string
    likes: number
    comments: Comment[]
}

export function CommunityPost({ id, author, content, timestamp, likes: initialLikes, comments: initialComments }: CommunityPostProps) {
    const [likes, setLikes] = useState(initialLikes)
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState('')
    const [showComments, setShowComments] = useState(false)

    const handleLike = () => {
        setLikes(likes + 1)
    }

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now().toString(),
                author: 'Current User', // This should be replaced with the actual logged-in user
                content: newComment,
                timestamp: new Date().toISOString(),
            }
            setComments([...comments, comment])
            setNewComment('')
        }
    }

    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{author[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{author}</h3>
                    <p className="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={handleLike}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {likes} Likes
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {comments.length} Comments
                </Button>
                <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </CardFooter>
            {showComments && (
                <CardContent>
                    <div className="mt-4 space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-2">
                                <Avatar>
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{comment.author}</p>
                                    <p className="text-sm">{comment.content}</p>
                                    <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button onClick={handleAddComment}>Post</Button>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}

