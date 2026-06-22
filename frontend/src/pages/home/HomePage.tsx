import { useEffect } from "react";
import { useMusicStore } from "../../stores/useMusicStore"


const HomePage = () => {

  const {fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
   } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  

  return (
    <div className='rounded-md overflow-hidden'>
    </div>
  )
}

export default HomePage