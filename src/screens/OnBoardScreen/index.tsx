import { useState } from "react";

// server connection
import { serverIP, serverMode } from "../../../serverConfig";
import axios from "axios";

// import uis
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import {
Title,
Caption,
Text,
Button,
TextInput,
HelperText,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// import styles and themes
import { createStyles } from "./styles";
import { useTheme } from "react-native-paper";

// import illustartion image
const Tab1Image = require("../../assets/OnBoardScreen/tab1.jpg");
const Tab2Image = require("../../assets/OnBoardScreen/tab2.jpg");
const Tab3Image = require("../../assets/OnBoardScreen/tab3.jpg");
const Tab4Image = require("../../assets/OnBoardScreen/tab4.jpg");

// import lists from utils
import { objectives, dietstyles, exerFrequencyWeeks, genders } from "../../utils";
import { targetSetup, listAllTarget} from "../../calculation/calculation";

import {UserIdProvider, useUserId} from "../../context/userContext";

// props for onboarding screen
interface OnBoardScreenProps {
navigation: any;
}
const OnBoardingScreen: React.FC<OnBoardScreenProps> = ({ navigation }) => {
// create styles and themes
const styles = createStyles();

// store states
const [tab, setTab] = useState<number>(1);
const { colors } = useTheme();

// handle change tab
const handleChangeTab = (value: 1 | -1) => {
    setTab(tab + value);
};

const setTarget = async() => {
    
    let setup: targetSetup; setup = {
        userid: useUserId().userId,
        weight: weight || 0,
        height: height || 0,
        age: age || 0,
        gender: gender || "Male",
        bodyFat: bodyFat || 0,
        TEA: exerFrequencyWeek || "Sedentary",
        goal: objective || "On Diet",
        dietstyle: dietstyle || "Causal"
      };

    try{
        const response = await axios.post(`${serverIP}/target/update`,
        listAllTarget(setup)
        );
        console.log("target has been set", response.data);
    } catch(error: any){
        console.error(error.response.data);
    }
}
// get started
const signUp = async() => {
    try{
    const response = await axios.post(`${serverIP}/profile/login/signup`,{
        username: username,
        password: password
    });

    UserIdProvider(response.data.userid);

    console.log('sign-up successful', response.data);
    } catch(error:any){
    console.error(error.response.data);
    }
    
    // ... then go to home page
    navigation.navigate("HomeTab");
};

// skip on board
const skipOnBoard = () => {
    navigation.navigate("Login");
};

// for new user: goals setting
const [height, setHeight] = useState<number>();
const [weight, setWeight] = useState<number>();
const [age, setAge] = useState<number>();
const [gender, setGender] = useState<string>();
const [bodyFat, setBodyFat] = useState<number>();
const [objective, setObjective] = useState<string>();
const [exerFrequencyWeek, setExerFrequencyWeek] = useState<string>();
const [dietstyle, setDietstyle] = useState<string>();

// handle dropdown: objectives, exerciseFre., dietstyle, gender
const [isObjDropDownOpen, setIsObjDropDownOpen] = useState<boolean>(false);
const [isExerDropDownOpen, setIsExerDropDownOpen] = useState<boolean>(false);
const [isDietDropDownOpen, setIsDietDropDownOpen] = useState<boolean>(false);
const [isGenderDropDownOpen, setIsGenderDropDownOpen] = useState<boolean>(false);

// for new user: account creation
const [username, setUsername] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
const [userNameTaken, setUserNameTaken] = useState<boolean>(false);

// handle form input
const validateUsername = (username: string) => {
    if(serverMode === "online"){
    axios.get(`${serverIP}/profile/login/check-username`,{
        params:{
        username: username
        }
    }).then((response: any) => {
        if(response.data && response.data.result){
        // case for unduplicated username
        } else if(response.data && response.data.error){
        setUserNameTaken(true);
        }
    }).catch((error: any) => {
        //network error handling
    })
    } else if (serverMode === "offline"){
        //offline mode
    }
};

const tabs = [
    // tab 1
    <View style={styles.tab}>
    <Text style={[styles.title, { alignSelf: "flex-start" }]}>
        Welcome to Calories-app!
    </Text>
    <Text
        style={[styles.caption, { alignSelf: "flex-start", textAlign: "left" }]}
    >
        In this app, you can explore on intelligent diet and workout plans
        designed just for you.
    </Text>
    </View>,
    // tab 2
    <View style={styles.tab}>
    <View style={styles.imageContainer}>
        <Image
        source={Tab1Image}
        style={{ width: 400, height: 350, alignSelf: "center" }}
        resizeMode="contain"
        />
    </View>
    <Text style={styles.caption}>
        Explore workout plans and meal plans to reach your goals.
    </Text>
    </View>,
    // tab 3
    <View style={styles.tab}>
    <View style={[styles.imageContainer, { flexDirection: "row" }]}>
        <Image
        source={Tab3Image}
        style={{ width: 150, height: 350, alignSelf: "center" }}
        resizeMode="contain"
        />
        <Image
        source={Tab4Image}
        style={{ width: 152.5, height: 350, alignSelf: "center" }}
        resizeMode="contain"
        />
    </View>
    <Text style={styles.caption}>
        Record your diets and track your goals simultaneously.
    </Text>
    </View>,
    // tab 
    <View style={styles.tab}>
    <View style={styles.imageContainer}>
        <Image
        source={Tab2Image}
        style={{ width: 400, height: 350, alignSelf: "center" }}
        resizeMode="contain"
        />
    </View>
    <Text style={styles.caption}>
        Reach out the community where people share diet and workout plans.
    </Text>
    </View>,
    // tab 5, target setting
    <ScrollView style={styles.tab}>
    <Title style={[styles.tabRow]}>Start with us today - Set Target</Title>
    <View style={styles.tabRow}>
        <DropDown
        label="My Objective"
        placeholder="click to select..."
        visible={isObjDropDownOpen}
        showDropDown={() => setIsObjDropDownOpen(true)}
        onDismiss={() => setIsObjDropDownOpen(false)}
        value={objective}
        setValue={setObjective}
        list={objectives}
        />
    </View>
    <View style={styles.tabRow}>
        <DropDown
        label="Exercise Frequency (per week)"
        placeholder="click to select..."
        visible={isExerDropDownOpen}
        showDropDown={() => setIsExerDropDownOpen(true)}
        onDismiss={() => setIsExerDropDownOpen(false)}
        value={exerFrequencyWeek}
        setValue={setExerFrequencyWeek}
        list={exerFrequencyWeeks}
        />
    </View>
    <View style={styles.tabRow}>
        <DropDown
        label="Dietstyles"
        placeholder="click to select..."
        visible={isDietDropDownOpen}
        showDropDown={() => setIsDietDropDownOpen(true)}
        onDismiss={() => setIsDietDropDownOpen(false)}
        value={dietstyle}
        setValue={setDietstyle}
        list={dietstyles}
        />
    </View>

    <Title style={[styles.tabRow, { marginTop: 25 }]}>About yourself.</Title>
    <View style={styles.tabRow}>
        <DropDown
        label="Gender"
        placeholder="click to select..."
        visible={isGenderDropDownOpen}
        showDropDown={() => setIsGenderDropDownOpen(true)}
        onDismiss={() => setIsGenderDropDownOpen(false)}
        value={gender}
        setValue={setGender}
        list={genders}
        />
    </View>

    <View
        style={[
        styles.tabRow,
        { flexDirection: "row", justifyContent: "space-between" },
        ]}
    >
        <TextInput
        keyboardType="numeric"
        style={{ width: "45%" }}
        label="Height (m)"
        right={<TextInput.Icon icon="ruler" />}
        // @ts-ignore
        onChangeText={setHeight}
        />
        <TextInput
        keyboardType="numeric"
        style={{ width: "45%" }}
        label="Weight (kg)"
        right={<TextInput.Icon icon="weight" />}
        // @ts-ignore
        onChangeText={setWeight}
        />
    </View>

    <View
        style={[
        styles.tabRow,
        { flexDirection: "row", justifyContent: "space-between" },
        ]}
    >
        <TextInput
        keyboardType="numeric"
        label="Body Fat   "
        right={<TextInput.Icon icon="percent-outline" />}
        // @ts-ignore
        onChangeText={setBodyFat}
        />
        <TextInput
        keyboardType="numeric"
        style={{ width: "45%" }}
        label="Age"
        // @ts-ignore
        onChangeText={setAge}
        />
    </View>
    <View style={[styles.tabRow, { alignItems: "center" }]}>
        <HelperText
        type="error"
        visible={!objective || !height || !weight || !gender || !bodyFat}
        >
        Complete all fields.
        </HelperText>
    </View>
    </ScrollView>,
    // tab 6
    <View style={styles.tab}>
    <Title style={[styles.tabRow, { marginBottom: 25 }]}>
        Create your account.
    </Title>
    <View style={[styles.tabRow]}>
        <TextInput
        label="Username"
        left={<TextInput.Icon icon="account" />}
        onChangeText={(text: string) => {
            setUsername(text);
            validateUsername(text);
        }}
        error={userNameTaken}
        />
        <HelperText type="error" visible={userNameTaken}>
        Username has already been taken.
        </HelperText>
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
    </View>
    </View>,
];
const maxTab = tabs.length;

return (
    <View style={styles.root}>
    {/* tab content */}
    <View style={styles.content}>{tabs[tab - 1]}</View>

    {/* button navigation */}
    <View style={styles.bottomRow}>
        {/* chevron left button */}
        <View style={styles.changeTabContainer}>
        {tab > 1 && (
            <TouchableOpacity
            style={styles.changeTab}
            onPress={() => handleChangeTab(-1)}
            >
            <Icon name="chevron-left" color={"#4d4d4d"} size={30} />
            </TouchableOpacity>
        )}
        </View>

        {/* getting started button */}
        <View style={styles.changeTabContainer}>
        {tab == maxTab && (
            <TouchableOpacity style={styles.getStarted} onPress={signUp}>
            <Text>Sign up</Text>
            </TouchableOpacity>
        )}
        </View>

        {/* chevron right button */}
        <View style={styles.changeTabContainer}>
        {tab < maxTab &&
            (!(tab == 5) ||
            !(!objective || !exerFrequencyWeek || !dietstyle || !height || !weight || !gender || !bodyFat)) && (
            <TouchableOpacity
                style={styles.changeTab}
                onPress={() => handleChangeTab(1)}
            >
                <Icon name="chevron-right" color={colors.primary} size={30} />
            </TouchableOpacity>
            )}
        </View>
    </View>

    {/* skip onboard screen */}
    <TouchableOpacity style={styles.skip} onPress={skipOnBoard}>
        <Text style={styles.skipText}>I have an account</Text>
    </TouchableOpacity>
    </View>
);
};

export default OnBoardingScreen;
