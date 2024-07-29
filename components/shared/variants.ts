
export const containerVariants = {
  hidden: { opacity: 1,transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01, delayChildren: 0.01
    }
  }
}

export const listItemVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    // transition: {
    //   y: { stiffness: 1000 }
    // }
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      // y: { stiffness: 1000, velocity: -100 },
      //   delay: (i % 20) * 0.2
    }
  }
}