import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";

// TODO: get the latest 3 badges from the user

const ProfileBadgeContainerPreview = () => {
  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <BadgeContainer
        title="Fire Weasel"
        subtitle="Level 3"
        badge="dummy-badge"
      />
      <BadgeContainer
        title="Fire Weasel"
        subtitle="Level 3"
        badge="dummy-badge"
      />
      <BadgeContainer
        title="Fire Weasel"
        subtitle="Level 3"
        badge="dummy-badge"
      />
    </Stack>
  );
};

export default ProfileBadgeContainerPreview;
