import { Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable'

const MainLayout = () => {
    const isMobile = false;

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
        
        <ResizablePanelGroup className='flex-1 flex h-full overflow-hidden'>

            {/*left panel */}
            <ResizablePanel defaultSize={24} minSize={isMobile ? 0:12} maxSize={140}>
                left sidebar
            </ResizablePanel>

            <ResizableHandle className='w-2 bg-black rouned-lg transition-colors'/>
            
            {/* main content */}
            <ResizablePanel defaultSize={isMobile ? 80:60}>
                <Outlet/>
            </ResizablePanel>

            <ResizableHandle className='w-2 bg-black rouned-lg transition-colors'/>

            {/*right panel */}
            <ResizablePanel defaultSize={24} minSize={0} maxSize={140} collapsedSize={0}>
                friends activity component
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout