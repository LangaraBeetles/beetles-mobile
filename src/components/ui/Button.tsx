import React, { useState } from "react";
import { Pressable } from "react-native";
import { styled } from "@fast-styles/react";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Icon, { IconName } from "@src/components/ui/Icon";

const Button: React.FC<{
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "secondary_coral" | "tertiary";
  disabled?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}> = ({
  title,
  onPress,
  leadingIcon,
  trailingIcon,
  disabled = false,
  variant = "primary",
}) => {
  const [pressed, setPressed] = useState<boolean>();

  const pressIn = () => {
    try {
      setPressed(true);
    } catch (error) {}
  };

  const pressOut = () => {
    try {
      setPressed(false);
    } catch (error) {}
  };

  return (
    <ButtonRoot
      category={disabled ? "disabled" : variant}
      status={pressed ? "pressed" : "default"}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
    >
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          color={iconColors[disabled ? "disabled" : variant]}
        />
      )}
      <ButtonText category={disabled ? "disabled" : variant}>
        {title}
      </ButtonText>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          color={iconColors[disabled ? "disabled" : variant]}
        />
      )}
    </ButtonRoot>
  );
};

export default Button;

const ButtonRoot = styled(Pressable, {
  paddingHorizontal: 48,
  paddingVertical: 20,
  minWidth: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  borderRadius: 100,
  borderWidth: 1,
  variants: {
    category: {
      primary: {},
      secondary: {},
      secondary_coral: {
        borderColor: theme.colors.error[500],
      },
      tertiary: {
        backgroundColor: theme.colors.error[500],
        borderColor: theme.colors.error[500],
      },
      disabled: {
        backgroundColor: theme.colors.neutral[100],
      },
    },
    status: {
      default: {},
      pressed: {},
    },
  },
  compoundVariants: {
    "pressed+primary": {
      borderColor: theme.colors.secondary[700],
      backgroundColor: theme.colors.secondary[700],
    },
    "default+primary": {
      backgroundColor: theme.colors.secondary[600],
      borderColor: theme.colors.secondary[600],
    },
    "pressed+secondary": {
      borderColor: theme.colors.white,
      backgroundColor: theme.colors.white,
    },
    "default+secondary": {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.secondary[600],
    },
  },
  styleProps: {
    width: "width",
  },
});

const ButtonText = styled(Text, {
  fontSize: 20,
  fontFamily: "NunitoBold",
  lineHeight: 26,
  variants: {
    category: {
      primary: {
        color: theme.colors.white,
      },
      secondary: {
        color: theme.colors.secondary[600],
      },
      secondary_coral: {
        color: theme.colors.error[500],
      },
      tertiary: {
        color: theme.colors.white,
      },
      disabled: {
        color: theme.colors.neutral[300],
      },
    },
  },
});

const iconColors = {
  primary: theme.colors.white,
  secondary: theme.colors.secondary[600],
  secondary_coral: theme.colors.error[500],
  tertiary: theme.colors.white,
  disabled: theme.colors.neutral[300],
};
