import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

interface Review {
    id: number
    author: string
    rating: number
    content: string
    date: string
}

interface UserReviewsProps {
    reviews: Review[]
}

export function UserReviews({ reviews }: UserReviewsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Reviews</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center space-x-2 mb-2">
                                <Avatar>
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{review.author}</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="ml-auto text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-sm text-gray-600">{review.content}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

