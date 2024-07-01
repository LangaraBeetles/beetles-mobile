import { StyleSheet } from "react-native";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";

type Badge = {
  title: string;
  subtitle: string;
  badge: string;
};

// TODO: get the badges from the user
const badgeData: Badge[] = [
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
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
