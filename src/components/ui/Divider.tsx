import { View } from "react-native";
import { theme } from "@src/styles/theme";

const Divider: React.FC<{
  color?: string;
  variant?: "horizontal" | "vertical";
}> = ({ color = theme.colors.neutral[100], variant = "horizontal" }) => {
  if (variant === "vertical") {
    return <View style={{ width: 1, backgroundColor: color }} />;
  } else {
    return <View style={{ height: 1, backgroundColor: color }} />;
  }
};

export default Divider;
