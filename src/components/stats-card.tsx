import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, Wallet, Wand2, PiggyBank, Clock } from 'lucide-react'

interface StatsCardProps {
    type: 'credits' | 'spent' | 'unspent' | 'payback'
}

export function StatsCard({ type }: StatsCardProps) {
    const cardData = {
        credits: {
            icon: <Wallet className="h-8 w-8 text-emerald-500" />,
            title: 'Total Credits',
            amount: '$800,909',
            trend: 'up',
        },
        spent: {
            icon: <Wand2 className="h-8 w-8 text-emerald-500" />,
            title: 'Total Spent',
            amount: '$678,909',
            trend: 'up',
        },
        unspent: {
            icon: <PiggyBank className="h-8 w-8 text-emerald-500" />,
            title: 'Total Unspent',
            amount: '$92,725',
            trend: 'down',
        },
        payback: {
            icon: <Clock className="h-8 w-8 text-rose-500" />,
            amount: '$67,909',
        },
    }

    const data = cardData[type]

    return (
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className={`p-6 flex items-center ${type === 'payback' ? 'justify-between' : 'justify-start'}`}>
                <div className="flex items-start gap-4">
                    {data.icon}
                    <div className="space-y-1">
                        {data.title && <p className="text-gray-400 text-sm font-medium">{data.title}</p>}
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-gray-900">{data.amount}</span>
                            {data.trend && (
                                <span className={`${data.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {data.trend === 'up' ? (
                                        <ArrowUp className="h-5 w-5" />
                                    ) : (
                                        <ArrowDown className="h-5 w-5" />
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {type === 'payback' && (
                    <Button
                        variant="secondary"
                        className="bg-[#1C1C25] text-white hover:bg-[#2C2C35] text-sm px-4 py-2 rounded-md"
                    >
                        Pay Back Ready
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

