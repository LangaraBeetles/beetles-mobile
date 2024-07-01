import { styled } from "@fast-styles/react";
import { globalStyles } from "@src/styles/globalStyles";
import { View } from "react-native";

const StyledBox = styled(View, {
  display: "flex",
  width: "100%",
  padding: 16,
  borderRadius: 16,
  borderStyle: "solid",
  borderWidth: 1,
  styleProps: {
    bc: "borderColor",
    bg: "backgroundColor",
  },
});

const Box = ({
  bc = globalStyles.colors.neutral[100],
  bg = globalStyles.colors.white,
  ...props
}) => {
  return <StyledBox bc={bc} bg={bg} {...props} />;
};

export default Box;
