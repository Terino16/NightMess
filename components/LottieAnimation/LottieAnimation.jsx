// components/LottieAnimation.jsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../path/to/your/lottie/file.json'; // Replace with the path to your animation JSON file

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LottieAnimation;
