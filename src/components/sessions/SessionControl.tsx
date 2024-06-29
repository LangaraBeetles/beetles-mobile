import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SessionStatesType } from "@src/interfaces/session.types";
import Timer from "@src/components/ui/Timer";
import Button from "@src/components/ui/Button";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "@src/components/ui/CustomBackdrop";
import { useRouter } from "expo-router";
import {
  PostureSessionInput,
  PostureSessionRecord,
} from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";

const SessionControl = () => {
  const [sessionState, setSessionState] =
    useState<SessionStatesType["SessionStatesEnum"]>("STOP");
  const [timerState, setTimerState] =
    useState<SessionStatesType["TimerStatesEnum"]>("STOPPED");

  const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const [postureData, setPostureData] = useState<Array<PostureSessionRecord>>(
    [],
  );
  const [startDate, setStartDate] = useState<string>("");

  const router = useRouter();

  // ref for BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const currentPosture = useUser((state) => state.currentPosture);
  const setTrackingEnabled = useUser((state) => state.setTrackingEnabled);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setSessionState("INIT");
    setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 100); // Small delay to ensure state update and ref readiness
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const onStartSession = (timeInHours: number, timeInMinutes: number) => {
    setSessionState("START");
    setTimerState("RUNNING");
    // TODO: stop real time tracking: Need to be on to read the posture
    setTrackingEnabled(true);
    setTimeInSeconds(timeInHours * 3600 + timeInMinutes * 60);
    setStartDate(new Date().toISOString());
    handleDismissModalPress();
  };

  const onCancelSession = () => {
    setSessionState("CANCEL");
    setTimerState("STOPPED");
    setTimeInSeconds(-1);
    handleDismissModalPress();
    // TODO: start real time tracking
    setPostureData([]);
  };

  const onStopSession = () => {
    setSessionState("PAUSE");
    setTimerState("PAUSED");
    setModalVisible(true);
  };

  const onPauseSession = () => {
    setSessionState((prevState) => (prevState === "START" ? "PAUSE" : "START"));
    setTimerState((prevState) =>
      prevState === "RUNNING" ? "PAUSED" : "RUNNING",
    );
  };

  const handleContinue = () => {
    setModalVisible(false);
    setSessionState("START");
    setTimerState("RUNNING");
  };

  const handleEndSession = () => {
    setModalVisible(false);
    setSessionState("STOP");
    setTimerState("STOPPED");

    const payload: PostureSessionInput = {
      started_at: startDate,
      ended_at: new Date().toISOString(),
      records: postureData,
    };

    saveSessionRecords(payload);
    setPostureData([]);
    // TODO: Show session summary
    router.push("/session-summary");
    // Reset the timer
    setTimeInSeconds(-1);
    // TODO: start real time tracking
  };

  const SetTimer = ({
    onStartSession,
  }: {
    onStartSession: (timeInHours: number, timeInMinutes: number) => void;
  }) => {
    const [timeInHours, setTimeInHours] = useState(0);
    const [timeInMinutes, setTimeInMinutes] = useState(0);

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {/* TODO: create number input component */}
          <View style={styles.bottomSheetContainer}>
            <Text>Hours:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTimeInHours(Number(text))}
              value={timeInHours.toString()}
              placeholder="Hours"
              keyboardType="numeric"
            />
            <Text>Minutes:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTimeInMinutes(Number(text))}
              value={timeInMinutes.toString()}
              placeholder="Minutes"
              keyboardType="numeric"
            />
            <Button
              title="Start Session"
              onPress={() => onStartSession(timeInHours, timeInMinutes)}
              type={{ type: "primary", size: "s" }}
            />
            <Button
              title="X"
              onPress={onCancelSession}
              type={{ type: "primary", size: "s" }}
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkPosture = () => {
      const posture = {
        good_posture: currentPosture === "good",
        recorded_at: new Date().toISOString(),
      };
      setPostureData((prevState) => [...prevState, posture]);
    };

    if (sessionState === "START" && timerState === "RUNNING") {
      interval = setInterval(() => {
        checkPosture();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [sessionState, timerState, currentPosture, postureData]);

  useEffect(() => {
    if (sessionState === "START" && timeInSeconds === 0) {
      handleEndSession();
    } else if (sessionState === "START" && timeInSeconds > 0) {
      const timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeInSeconds, sessionState]);

  return (
    <View>
      {timerState === "STOPPED" && (
        <Button
          title="Start a session"
          onPress={handlePresentModalPress}
          type={{ type: "primary", size: "l" }}
        />
      )}

      {sessionState === "INIT" && <SetTimer onStartSession={onStartSession} />}

      {(sessionState === "START" || sessionState === "PAUSE") && (
        <Timer
          timeInSeconds={timeInSeconds}
          handlePause={onPauseSession}
          handleStop={onStopSession}
          isPaused={timerState === "PAUSED"}
        />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to end the session?</Text>
            <Button
              title="Keep Going"
              onPress={handleContinue}
              type={{ type: "primary", size: "l" }}
            />
            <Button
              title="End Session"
              onPress={handleEndSession}
              type={{ type: "primary", size: "l" }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default SessionControl;
