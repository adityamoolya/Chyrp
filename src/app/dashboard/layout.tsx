import { MainSidebar } from '@/components/main-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
            <SidebarTrigger className="md:hidden" />
            <Logo className="md:hidden"/>
        </header>
        <main className="flex flex-1 flex-col p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
