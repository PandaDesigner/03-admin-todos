// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import SidebarComponents from "@/components/layout/sidebar/Sidebar";
import TopMenu from "@/components/layout/top-menu/TopMenu";
import WidgetItem from "@/components/WidgetItem";

export default function DashboardLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SidebarComponents/>
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen bg-gray-200">
                <TopMenu/>
                <div className="px-6 pt-6">
                    {children}
                </div>
            </div>
        </>
    );
}
