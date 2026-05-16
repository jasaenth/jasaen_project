import PageHero from '@/components/common/PageHero'
import RoomsPage from '@/components/rooms/Rooms'
import React from 'react'

const page = () => {
  return (
    <>
      <PageHero
        title="OUR ROOMS"
        subtitle="Find Best Room For Stay"
        image="/images/hero/hero-1.JPG"
        breadcrumb='Rooms'
      />
      <RoomsPage />
    </>
  )
}

export default page
