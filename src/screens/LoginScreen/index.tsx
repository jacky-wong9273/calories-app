import { useState } from "react";

// import uis
import { View, TouchableOpacity } from "react-native";
import { Title, TextInput, HelperText, Text } from "react-native-paper";

// import styles
import { createStyles } from "./styles";

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
  const [isPasswordIncorrect, setIsPasswordInccorect] =
    useState<boolean>(false);

  // handle sign in
  const signIn = () => {
    // for demo
    setTimeout(() => {
      navigation.navigate("HomeTab");
    }, 2120);

    // todo @chris
    // sign in with existing account
    // if password is incorrect, setIsPasswordIncorrect = true
    // then navigate to hometab
    // navigation.navigate("HomeTab");
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
