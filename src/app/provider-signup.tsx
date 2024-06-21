import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import config from "@src/config";
import axios from "axios";
import * as Linking from "expo-linking";

import { SafeAreaView } from "react-native-safe-area-context";

const ProviderSignUp = () => {
  const getAuthLink = async () => {
    try {
      //get google auth link [public]
      const {
        data: { data },
      } = await axios.get(`${config.api_url}/auth/google`);

      if (data.redirect) {
        Linking.openURL(data.redirect);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <SafeAreaView>
      <Center p={30}>
        <Button
          title="SignUp with Google"
          type={{ type: "primary", size: "l" }}
          onPress={getAuthLink}
        />
      </Center>
    </SafeAreaView>
  );
};

export default ProviderSignUp;
