import type { ReactNode } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ArrowRight, Box, Briefcase, Car, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from "@/components/dashboard/PostCard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { posts, currentUser } from "@/lib/mock-data";
import ServicesPage from "./ServicesPage";
import MarketplacePage from "./MarketplacePage";
import TransportPage from "./TransportPage";
import LostFoundPage from "./LostFoundPage";
import ProfilePage from "./ProfilePage";
import CreatePostPage from "./CreatePostPage";

const statsCards = [
  {
    title: "Active Services",
    icon: TrendingUp,
    href: "/dashboard/services",
    count: 248,
    growth: "+12% from last week",
    iconColor: "text-[#6C63FF]",
    iconBg: "bg-[#EEF2FF]",
  },
  {
    title: "Marketplace Items",
    icon: Box,
    href: "/dashboard/marketplace",
    count: 532,
    growth: "+8% from last week",
    iconColor: "text-[#16A34A]",
    iconBg: "bg-[#F0FDF4]",
  },
  {
    title: "Active Rides",
    icon: Users,
    href: "/dashboard/transport",
    count: 89,
    growth: "+23% from last week",
    iconColor: "text-[#EA580C]",
    iconBg: "bg-[#FFF7ED]",
  },
];

function DashboardHome() {
  const servicePosts = posts.filter((p) => p.category === "services").slice(0, 3);
  const marketplacePosts = posts.filter((p) => p.category === "marketplace").slice(0, 3);
  const transportPosts = posts.filter((p) => p.category === "transport").slice(0, 3);

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("estin_user") || "{}") as { name?: string }; }
    catch { return {}; }
  })();
  const displayName = storedUser.name || currentUser.name;
  const getFirstName = (name: string) => name.split(" ")[0];

  const SectionHeader = ({ title, href, icon }: { title: string; href: string; icon: ReactNode }) => (
    <div className="mb-4 flex items-center justify-between pb-0">
      <h3 className="flex items-center gap-2 text-[17px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
        {icon}{title}
      </h3>
      <Link to={href} className="cursor-pointer text-[13px] font-medium text-[#6C63FF] transition-colors duration-150 hover:underline">
        View all <ArrowRight className="ml-0.5 inline h-3.5 w-3.5" />
      </Link>
    </div>
  );

  return (
    <div>
      <div className="mb-9 max-w-3xl">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
          Welcome back, {getFirstName(displayName)}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] font-normal text-[#64748B] dark:text-[#9CA3AF]">
          Explore student posts, buy and sell items, coordinate transport, and find lost or found items all in one place.
        </p>
      </div>

      <div className="mb-9">
        <h2 className="mb-5 text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Browse Categories</h2>
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {statsCards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="flex h-full flex-col gap-0 rounded-[14px] border border-[#E8ECEF] bg-white p-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]">
                <CardHeader className="px-6 pb-0 pt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <CardTitle className="text-[13px] font-medium text-[#64748B] dark:text-[#A1A1AA]">{card.title}</CardTitle>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-[8px] ${card.iconBg}`}>
                      <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-4 pt-0">
                  <p className="mb-2 text-[32px] font-extrabold leading-none text-[#0F172A] dark:text-[#F8FAFC]">{card.count}</p>
                  <CardDescription className="flex items-center gap-1 text-[12px] font-medium text-[#22C55E]">
                    <TrendingUp className="h-3 w-3" />{card.growth}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <section className="mb-9">
          <SectionHeader title="Services" href="/dashboard/services" icon={<Briefcase className="h-4 w-4 text-[#6C63FF]" />} />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {servicePosts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        </section>
        <section className="mb-9">
          <SectionHeader title="Marketplace" href="/dashboard/marketplace" icon={<ShoppingBag className="h-4 w-4 text-[#16A34A]" />} />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {marketplacePosts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        </section>
        <section className="mb-9">
          <SectionHeader title="Transport" href="/dashboard/transport" icon={<Car className="h-4 w-4 text-[#EA580C]" />} />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            {transportPosts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC] dark:bg-[#050505]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          <div className="mx-auto max-w-[1200px] bg-[#F8F9FC] px-8 py-7 dark:bg-[#050505]">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="transport" element={<TransportPage />} />
              <Route path="lost-found" element={<LostFoundPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="create-post" element={<CreatePostPage />} />
            </Routes>
          </div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
