import { useUser } from "@src/state/useUser";

const HPSystem = () => {
  const userHP = useUser((state) => state.user.hp);
  const setHP = useUser((state) => state.setHP);
  const currentPosture = "good"; //TODO: use currentPosture from user state

  if (userHP >= 0 && userHP <= 100) {
    if (currentPosture === "bad") {
      if (userHP - 1 < 0) {
        setHP(0);
      } else {
        setHP(userHP - 1);
      }
    }
    if (currentPosture === "good") {
      if (userHP + 1 > 100) {
        setHP(100);
      } else {
        setHP(userHP + 1);
      }
    }
  }

  //TODO: save the HP to the database every 1 min if it has changed in the last minute
};

export default HPSystem;
