import { FC } from "react";
import * as Icons from "@radix-ui/react-icons";

interface IconProps {
  name: keyof typeof Icons;
  className?: string;
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = Icons[name];
  return <IconComponent className={className} />;
};
