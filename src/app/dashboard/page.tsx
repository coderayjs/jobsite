import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { RevenueChart } from '@/components/revenue-chart'
import { RecentTasks } from '@/components/recent-tasks'

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard type="credits" />
              <StatsCard type="spent" />
              <StatsCard type="unspent" />
              <StatsCard type="payback" />
            </div>
            <RevenueChart />
            <RecentTasks />
          </div>
        </div>
      </main>
    </>
  )
}