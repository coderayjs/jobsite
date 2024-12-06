'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from 'lucide-react'

interface Transaction {
    id: string
    date: string
    description: string
    amount: number
    type: 'credit' | 'debit'
}

export default function EarningsPage() {
    const [timeframe, setTimeframe] = useState('all')
    const [withdrawAmount, setWithdrawAmount] = useState('')

    const transactions: Transaction[] = [
        { id: '1', date: '2023-06-25', description: 'Website Development', amount: 50000, type: 'credit' },
        { id: '2', date: '2023-06-20', description: 'Logo Design', amount: 15000, type: 'credit' },
        { id: '3', date: '2023-06-15', description: 'Content Writing', amount: 10000, type: 'credit' },
        { id: '4', date: '2023-06-10', description: 'Withdrawal', amount: 25000, type: 'debit' },
        { id: '5', date: '2023-06-05', description: 'App Bug Fixes', amount: 30000, type: 'credit' },
    ]

    const totalEarnings = transactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0)

    const availableBalance = transactions
        .reduce((sum, t) => t.type === 'credit' ? sum + t.amount : sum - t.amount, 0)

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount)
        if (isNaN(amount) || amount <= 0 || amount > availableBalance) {
            alert('Invalid withdrawal amount')
            return
        }
        // Here you would typically initiate the withdrawal process
        console.log(`Initiating withdrawal of ₦${amount}`)
        setWithdrawAmount('')
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">My Earnings</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{totalEarnings.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{availableBalance.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Withdraw Funds</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Input
                                type="number"
                                placeholder="Amount"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                            />
                            <Button onClick={handleWithdraw}>Withdraw</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Transaction History</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Select value={timeframe} onValueChange={setTimeframe}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="month">This Month</SelectItem>
                                    <SelectItem value="week">This Week</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline">Download Report</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <span className={`flex items-center ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'credit' ? (
                                                <ArrowUpIcon className="mr-1 h-4 w-4" />
                                            ) : (
                                                <ArrowDownIcon className="mr-1 h-4 w-4" />
                                            )}
                                            {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

