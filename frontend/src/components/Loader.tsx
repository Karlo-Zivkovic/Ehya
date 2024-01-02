import { ClipLoader } from 'react-spinners';

interface LoaderProps {
  size?: number;
  className?: string;
  color?: string;
}
function Loader({ size = 50, color = '', className = '' }: LoaderProps) {
  return (
    <div
      className={`${className} flex items-center justify-center overflow-hidden`}
    >
      <ClipLoader color={color} size={size} />
    </div>
  );
}

export default Loader;
