import { Text } from "../ui/typography";
import Stack from "../ui/Stack";
import { globalStyles } from "@src/styles/globalStyles";
import Icon from "../ui/Icon";
import { useState, useEffect } from "react";

type Weekdays = {
  day: string;
};

const Days: Weekdays[] = [
  { day: "Mo" },
  { day: "Tu" },
  { day: "We" },
  { day: "Th" },
  { day: "Fr" },
  { day: "Sa" },
  { day: "Su" },
];

const StreakDaysIndicator: React.FC<{
  streak: number;
  startDay?: number | null;
}> = ({ streak, startDay = null }) => {
  const [startIndex, setStartIndex] = useState<number | null>(startDay);

  useEffect(() => {
    setStartIndex(startDay);
  }, [startDay]);

  const renderDays = () => {
    if (startIndex === null) return null;

    const daysToRender = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (startIndex + i) % 7;
      daysToRender.push(
        <Stack key={i} alignItems="center">
          <Text
            level="subhead"
            style={{ color: globalStyles.colors.neutral[500] }}
          >
            {Days[dayIndex].day}
          </Text>
          <Icon
            name={
              i < streak
                ? "streak-checkmark-checked"
                : "streak-checkmark-unchecked"
            }
          />
        </Stack>,
      );
    }
    return daysToRender;
  };

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      {renderDays()}
    </Stack>
  );
};

export default StreakDaysIndicator;
