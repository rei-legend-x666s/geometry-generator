import { ReactNode } from "react";

interface LayersProps {
  children: ReactNode;
}

const Layers = ({ children }: LayersProps) => {
  return <div>{children}</div>;
};

export default Layers;
