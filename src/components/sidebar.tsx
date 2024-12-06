'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Users, MessageSquare, Bell, HelpCircle, User, Wallet, BookOpen, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: Briefcase },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Earnings', href: '/earnings', icon: Wallet },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Help Center', href: '/help', icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col bg-[#1C1C25] text-white">
      <div className="flex h-16 items-center gap-2 px-4">
        <svg className="h-8 w-8 text-green-400" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
        <span className="text-xl font-semibold">NaijaTasker</span>
      </div>
      
      <div className="flex flex-col items-center py-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>NT</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-lg font-semibold">Oluwaseun</h2>
        <span className="text-sm text-gray-400">Task Seeker</span>
      </div>

      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                isActive ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-800'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-lg bg-gradient-to-r from-green-400 to-green-500 p-4">
          <h3 className="font-semibold">Upgrade to Pro!</h3>
          <p className="text-sm">Get more tasks and higher rewards</p>
        </div>
      </div>

      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
          <span className="text-sm">NaijaTasker</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">© 2023 NaijaTasker. All rights reserved.</p>
      </div>
    </div>
  )
}

