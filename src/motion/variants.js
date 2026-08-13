export const premiumEase = [0.22, 1, 0.36, 1];

export const motionTokens = {
  instant: 0.18,
  fast: 0.28,
  normal: 0.5,
  slow: 0.78,
  reveal: 0.92,
  stagger: 0.065,
};

export const viewportOnce = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
};

export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.slow,
      ease: premiumEase,
    },
  },
};

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.normal,
      ease: premiumEase,
    },
  },
};

export const maskReveal = {
  hidden: {
    opacity: 0,
    y: "92%",
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: motionTokens.reveal,
      ease: premiumEase,
    },
  },
};

export const imageReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    scale: 1.025,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: {
      duration: motionTokens.reveal,
      ease: premiumEase,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTokens.stagger,
      delayChildren: 0.04,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.975, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionTokens.slow,
      ease: premiumEase,
    },
  },
};
