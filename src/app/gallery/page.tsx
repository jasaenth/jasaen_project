import PageHero from '@/components/common/PageHero'
import GallerySection from '@/components/gallery/GallerySection'
import Amenities from '@/components/home/Amenities'
import React from 'react'

const page = () => {
  return (
    <>
        <PageHero
        title="GALLERY"
        subtitle="Explore our beautiful space and memorable moments."
        image="/images/hero/hero-1.JPG"
        breadcrumb='Gallery'
      />
      <GallerySection />
      <Amenities showTitle={false} />
    </>
  )
}

export default page
