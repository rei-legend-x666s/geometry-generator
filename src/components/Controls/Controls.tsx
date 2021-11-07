import { ReactNode } from "react";

interface ControlsProps {
  children: ReactNode;
}

const Controls = ({ children }: ControlsProps) => {
  return <div>{children}</div>;
};

export default Controls;
