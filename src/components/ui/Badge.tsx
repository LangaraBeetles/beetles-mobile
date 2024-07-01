import { styled } from "@fast-styles/react";
import { View } from "react-native";

import DummyBadge from "assets/badges/dummy-badge.svg";
import Locked from "assets/badges/locked.svg";

const BadgeConfig = {
  "dummy-badge": DummyBadge,
  locked: Locked,
};

export type BadgeName = `${keyof typeof BadgeConfig}`;

type BadgeProps = {
  name: BadgeName;
  color?: string;
};

const Badge: React.FC<BadgeProps> = ({ name }) => {
  const CustomBadge = BadgeConfig[name];

  return (
    <StyledView>
      <CustomBadge width="100%" height="100%" />
    </StyledView>
  );
};

export default Badge;

const StyledView = styled(View, {
  width: 63,
  height: 63,
  justifyContent: "center",
  alignItems: "center",
});
