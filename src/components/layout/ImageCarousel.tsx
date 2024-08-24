import { Children } from 'react'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export interface ImageCarouselProps {
  children: React.ReactNode
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ children }) => {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  }

  return (
    <div style={{ height: '400px', overflow: 'hidden' }}>
      <Carousel
        responsive={responsive}
        swipeable
        draggable={false}
        ssr
        infinite
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType="desktop"
        sliderClass="slider-class"
        itemClass="carousel-item-padding-40-px"
      >
        {children}
      </Carousel>
    </div>
  )
}
