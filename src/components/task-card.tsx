import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, DollarSign, Users } from 'lucide-react'

interface TaskCardProps {
    title: string
    description: string
    location: string
    duration: string
    pay: number
    category: string
    totalHires: number
    remainingHires: number
}

export function TaskCard({
    title,
    description,
    location,
    duration,
    pay,
    category,
    totalHires,
    remainingHires
}: TaskCardProps) {
    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{description}</p>
                    </div>
                    <Badge variant="secondary">{category}</Badge>
                </div>
                <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                        <span>₦{pay.toLocaleString()} per hire</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{remainingHires} out of {totalHires} positions remaining</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
                <Button className="w-full" disabled={remainingHires === 0}>
                    {remainingHires > 0 ? 'Apply Now' : 'Positions Filled'}
                </Button>
            </CardFooter>
        </Card>
    )
}

