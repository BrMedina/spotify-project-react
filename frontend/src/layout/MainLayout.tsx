import { Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable'
import { LeftSidebar } from './components/LeftSidebar';
import FriendsActivity from './components/FriendsActivity';
import TopBar from '@/components/Topbar';

const MainLayout = () => {
    const isMobile = false;

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
        <TopBar/>
        <ResizablePanelGroup className='flex-1 flex h-full min-h-0 overflow-hidden'>
            

            {/*left panel */}
            <ResizablePanel className='min-h-0' defaultSize={30} minSize={isMobile ? 0:12} maxSize={280}>
                <LeftSidebar/>
            </ResizablePanel>

            <ResizableHandle className='w-2 bg-black rouned-lg transition-colors'/>
            
            {/* main content */}
            <ResizablePanel className='min-h-0' defaultSize={isMobile ? 80:60}>
                <Outlet/>
            </ResizablePanel>

            <ResizableHandle className='w-2 bg-black rouned-lg transition-colors'/>

            {/*right panel */}
            <ResizablePanel className='min-h-0' defaultSize={24} minSize={0} maxSize={240} collapsedSize={0}>
                <FriendsActivity />
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout