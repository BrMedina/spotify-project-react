import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton';
import { useMusicStore } from '@/stores/useMusicStore'
import React from 'react'

const FeaturedSection = () => {
    const {isLoading, featuredSongs, error} =  useMusicStore();

    if(isLoading) return <FeaturedGridSkeleton />

    if(error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
        {featuredSongs.map((song) => (
            <div></div>
        ))}
    </div>
  )
}

export default FeaturedSection