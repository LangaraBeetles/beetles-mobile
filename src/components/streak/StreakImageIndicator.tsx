import { styled } from "@fast-styles/react";
import Image from "../ui/Image";
import { View } from "react-native";
import { Text } from "../ui/typography";

const StreakImageIndicator: React.FC<{
  streak: number;
}> = ({ streak }) => {
  return (
    <StreakImageIndicatorRoot>
      <Image name="streak-flames" h={72} />
      <StreakNumberRoot>
        <Text level="title_1" weight="bold" style={{ color: "#fff" }}>
          {streak}
        </Text>
      </StreakNumberRoot>
    </StreakImageIndicatorRoot>
  );
};

export default StreakImageIndicator;

const StreakImageIndicatorRoot = styled(View, {
  position: "relative",
  width: 57.6,
  height: 72,
});

const StreakNumberRoot = styled(View, {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: -5,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
});
