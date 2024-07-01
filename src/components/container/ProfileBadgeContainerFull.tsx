import { StyleSheet } from "react-native";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import { BadgeType } from "@src/interfaces/badges.types";

// TODO: get the badges from the user
const badgeData: BadgeType[] = [
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2023-08-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2024-04-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2023-04-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2021-08-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2021-08-01",
  },
];

const ProfileBadgeContainerFull = () => {
  const renderBadges = () => {
    return badgeData.map((badge, index) => (
      <BadgeContainer
        key={index}
        title={badge.title}
        subtitle={badge.subtitle}
        badge={badge.badge}
        unlocked={badge.unlocked}
      />
    ));
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      gap={16}
      style={styles.container}
    >
      {renderBadges()}
    </Stack>
  );
};

export default ProfileBadgeContainerFull;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
  },
});
