export interface IOrbitingItemProps {
  data: { title?: string; img: string }; //note: Thông tin data có thể thay đổi theo yêu cầu sử dụng
  radius: number;
  duration?: number;
  reverse?: boolean;
  delay?: number;
  maxWidth?: number;
  onClick?: () => void;
}
