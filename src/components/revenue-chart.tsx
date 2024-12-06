'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const data = [
    { name: 'Jan', total: 20000, unspent: 4000 },
    { name: 'Feb', total: 25000, unspent: 5000 },
    { name: 'Mar', total: 30000, unspent: 6000 },
    { name: 'Apr', total: 35000, unspent: 7000 },
    { name: 'May', total: 40000, unspent: 8000 },
]

export function RevenueChart() {
    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-normal">Total Revenue</CardTitle>
                <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="unspent" stroke="#1e293b" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

