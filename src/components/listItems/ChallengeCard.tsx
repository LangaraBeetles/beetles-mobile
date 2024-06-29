import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import ProgressBar from "@src/components/ui/ProgressBar";

const ChallengeCard = (props: any) => {
  const router = useRouter();
  const { challenge, isOngoing } = props;

  const showDetails = () => {
    router.navigate({
      pathname: "challengeDetailsScreen",
      //TODO: get the challengeId only, then make a GET request from the challenge API. Will be done on ChallengeDetail ticket# 86b11cydp
      params: {
        name: challenge.name,
        startDate: challenge.start_at,
        endDate: challenge.end_at,
        goal: challenge.goal,
        progress: challenge.progress,
        isOngoing: isOngoing,
      },
    });
  };
  const end = new Date(challenge.end_at);
  const endMonth = end.toLocaleDateString("default", { month: "long" });
  const endDay = end.getDate();

  const goalPoints =
    challenge.goal * challenge.duration * challenge.members.length ?? 1;
  const total = challenge.members.reduce(
    (accu: any, curr: any) => accu + curr.points,
    0,
  );

  const progressBarLabel = (
    <Text>
      {total}/{goalPoints}
    </Text>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDetails}>
        <Text>{challenge.name}</Text>
        <Text>
          {isOngoing
            ? `${challenge.duration} days left`
            : `Ended on ${endMonth} ${endDay} `}
        </Text>
        <ProgressBar
          currentValue={challenge.progress}
          goal={challenge.goal}
          content={progressBarLabel}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 16,
    padding: 10,
  },
});

export default ChallengeCard;
