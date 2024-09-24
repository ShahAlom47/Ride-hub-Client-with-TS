
import Lottie from 'react-lottie';
import animationData from '../../assets/animation/IC3BtgvmGh.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex justify-center items-center  min-h-screen">
      <div className="w-40 h-40">
        <Lottie options={defaultOptions} height={160} width={160} />
      </div>
    </div>
  );
};

export default Loading;
