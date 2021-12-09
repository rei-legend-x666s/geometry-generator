import { ReactNode } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: string;
  value: string;
}

const TabPanel = ({ children, index, value }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
