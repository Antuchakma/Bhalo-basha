import React from 'react'
import '@fontsource/space-grotesk';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};



const HomePage = () => {
  return (
    <div>



    </div>
  )
}

export default HomePage
