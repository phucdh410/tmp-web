import { LottieProps, Options as LottieOptionsProps } from "react-lottie";

export interface ICLottieIconWrapperProps extends Omit<LottieProps, "options"> {
  size?: number;
  animationSize?: number;
  animationData: any;
  options?: LottieOptionsProps;
}
