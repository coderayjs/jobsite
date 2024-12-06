'use client'

import { Bell, Maximize, Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Header() {
    return (
        <div className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-700">Collaborators</h1>
                <span className="text-sm text-gray-500">Dashboard / Collaborators</span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="default" size="sm" className="bg-green-100 text-green-600 hover:bg-green-200">
                    Collaborators
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                    Benefits
                </Button>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search Dashboard"
                        className="w-64 pl-8"
                    />
                </div>
                <Button variant="ghost" size="icon">
                    <Maximize className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <Button className="bg-green-500 hover:bg-green-600">
                    Import <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

