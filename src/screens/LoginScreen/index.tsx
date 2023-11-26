import { useState } from "react";

// import uis
import { View, TouchableOpacity } from "react-native";
import { Title, TextInput, HelperText, Text } from "react-native-paper";

// server connection
import { serverIP, serverMode } from "../../../serverConfig";

// import styles
import { createStyles } from "./styles";
import axios from "axios";

// props for onboarding screen
interface LoginScreenProps {
  navigation: any;
}
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // create styles
  const styles = createStyles();

  // for existing user to login
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] =
    useState<boolean>(false);

  // handle sign in
  const signIn = async () => {
    try {
      if (serverMode === "online") {
        const response = await axios.get(`${serverIP}/profile/login/signin`, {
          params: {
            username: username,
            password: password
          }
        });
  
        if (response.data && response.data.error) {
          setIsPasswordIncorrect(true);
        } else {
          navigation.navigate("HomeTab");
        }
      } else if (serverMode === "offline") {
        navigation.navigate("HomeTab");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.root, styles.content]}>
      <View style={styles.tab}>
        <Title
          style={[styles.tabRow, { marginBottom: 25, textAlign: "center" }]}
        >
          Welcome back!
        </Title>
        <View style={[styles.tabRow]}>
          <TextInput
            label="Username"
            left={<TextInput.Icon icon="account" />}
            onChangeText={setUsername}
          />
        </View>
        <View style={[styles.tabRow]}>
          <TextInput
            label="Password"
            left={
              <TextInput.Icon
                icon={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <HelperText type="error" visible={isPasswordIncorrect}>
            Incorrect password
          </HelperText>
        </View>
        <TouchableOpacity style={styles.getStarted} onPress={signIn}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
