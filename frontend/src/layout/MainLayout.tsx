import { Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable'
import { LeftSidebar } from './components/LeftSidebar';
import PlaybackControls from './components/PlaybackControls.tsx'
import FriendsActivity from './components/FriendsActivity';
import TopBar from '@/components/Topbar';
import AudioPlayer from './components/AudioPlayer';
import { useEffect, useState } from 'react';

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile)
    })

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
        <TopBar/>
        <ResizablePanelGroup className='flex-1 flex h-full min-h-0 overflow-hidden'>
            
            <AudioPlayer />

            {/*left panel */}
            <ResizablePanel className='min-h-0' defaultSize={30} minSize={isMobile ? 0:12} maxSize={280}>
                <LeftSidebar/>
            </ResizablePanel>

            <ResizableHandle className='w-2 bg-black rouned-lg transition-colors'/>
            
            {/* main content */}
            <ResizablePanel className='min-h-0' defaultSize={isMobile ? 80:60}>
                <Outlet/>
            </ResizablePanel>

            {!isMobile && (
                <>
                    <ResizableHandle className='w-2 bg-black rouned-lg transition-colors'/>

                {/*right panel */}
                    <ResizablePanel className='min-h-0' defaultSize={24} minSize={0} maxSize={240} collapsedSize={0}>
                        <FriendsActivity />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>

        <PlaybackControls />
    </div>
  )
}

export default MainLayout