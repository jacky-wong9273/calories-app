import { useState, useEffect } from "react";

//BACKEND

// calculation
import {
  profile,
  TEA,
  goal,
  dietstyle,
  target,
  intakeReport,
  listAllTarget,
} from "../../calculation/calculation";

// connect server
import { serverIP, serverMode } from "../../../serverConfig";
import axios from "axios";

// user context
import { useUserId } from "../../context/userContext";

// import UIs
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Dimensions, TouchableOpacity } from "react-native";
import { Text, Title, Caption, Button, Menu } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// import styles
import { createStyles } from "./styles";

// import theme
import { useTheme } from "react-native-paper";

const HomeScreen = () => {
  const [targetCur, setTargetCur] = useState<target>();
  const [targetRec, setTargetRec] = useState<target[]>();
  const [intakeReport, setIntakeReport] = useState<intakeReport>();

  //get user id
  const userId = useUserId().userId;
  //get profile information

  useEffect(() => {
    if (serverMode === "online") {
      //get target information
      axios
        .get(`${serverIP}/target/get`, {
          params: {
            user_id: userId,
          },
        })
        .then((response: any) => {
          if (response.data && response.data.error) {
            //target has not been set
          } else {
            const data: target[] = response.data;
            const [tempCur, ...tempRec] = data;
            setTargetCur(tempCur);
            setTargetRec(tempRec);
          }
        })
        .catch((err) => {
          const message = err.reponse.data;
          console.log(message);
        });

      //get today daily sum
      axios
        .get(`${serverIP}calories/get/dailyreport`, {
          params: {
            user_id: userId,
          },
        })
        .then((response: any) => {
          if (response.data && response.data.error) {
            //target has not been set
          } else {
            setIntakeReport(response.data);
          }
        })
        .catch((err) => {
          const message = err.reponse.data;
          console.log(message);
        });
    } else if (serverMode === "offline") {
      //data for offline demo
      setIntakeReport({
        calorieSum: 1000,
        caloriePer: 70,
        proteinSum: 60,
        proteinPer: 100,
        carbsSum: 30,
        carbsPer: 50,
        fatSum: 24,
        fatPer: 24,
      });
      setTargetCur({
        dietstyle: "Causal",
        bmr: 1800,
        tdee: 2100,
        protein: {
          percentage: 30,
          gram: 135,
          calorie: 540,
        },
        carbs: {
          percentage: 5,
          gram: 30,
          calorie: 120,
        },
        fat: {
          percentage: 65,
          gram: 130,
          calorie: 1440,
        },
      });
      setTargetRec([
        {
          dietstyle: "High Carbs",
          bmr: 2000,
          tdee: 2300,
          protein: {
            percentage: 25,
            gram: 125,
            calorie: 500,
          },
          carbs: {
            percentage: 40,
            gram: 200,
            calorie: 800,
          },
          fat: {
            percentage: 35,
            gram: 78,
            calorie: 1000,
          },
        },
      ]);
    }
  }, [serverMode, serverIP, userId]);

  // create styles
  const styles = createStyles();

  // handle menu click
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // create theme
  const { colors } = useTheme();

  const ReportComponent = ({ targetCur }: { targetCur?: target }) => {
    if (targetCur === undefined) {
      return (
        <View style={styles.dataCardContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.title}>Let's seta Target!</Text>
            <Caption> Target Setting</Caption>
          </View>
          <View>
            <Button>{"ADD"}</Button>
          </View>
        </View>
      );
    }

    return (
      <>
        <View style={styles.dataCardContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.title}>{targetCur.tdee} kcal</Text>
            <Caption>Daily Calories Intake</Caption>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.title1}>{intakeReport?.calorieSum} kcal</Text>
            <Caption>Today's Calories Intaken</Caption>
          </View>
        </View>
        <View style={styles.dataCardContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.title}>{targetCur.carbs.gram} g</Text>
            <Caption>Carbs</Caption>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.title}>{targetCur.protein.gram} g</Text>
            <Caption>Protein</Caption>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.title}>{targetCur.fat.gram} g</Text>
            <Caption>Fat</Caption>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.sectionContainer]}>
        <View style={[styles.target, { marginTop: 20 }]}>
          <Text style={{ fontSize: 24 }}>Welcome back, Elijah!</Text>
        </View>

        <ReportComponent targetCur={targetCur} />

        <View style={styles.dataCardContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.title}>54 kg</Text>
            <Caption>Target Weight</Caption>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.title2}>58.1 kg</Text>
            <Caption>Current Weight</Caption>
          </View>
        </View>
      </View>

      {/* my plan */}
      <View style={styles.section}>
        <Title>My Current Plan</Title>

        <View style={styles.plan}>
          <Caption>Meal Plan</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Dinner</Text>

            <Text style={{ color: "#44dd44", marginLeft: 10 }}>
              {"<881 kcal"}
            </Text>
          </View>
          <Button>{"Suggested Menu"}</Button>
        </View>
        <View style={styles.plan}>
          <Caption>Workout Plan</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Scheduled Next Workout</Text>

            <Text style={{ color: "#44dd44", marginLeft: 10 }}>{"Nov 25"}</Text>
          </View>
          <Button>{"Suggested Workout"}</Button>
        </View>
      </View>
      {/* more plan */}
      <View style={styles.section}>
        <Title>Explore More Plans</Title>

        <View style={styles.plan}>
          <Caption>Meal Plan 1</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Expected Daily Calories</Text>

            <Text style={{ color: "#44dd44", marginLeft: 10 }}>
              {"2019 kcal"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "#242424",
              borderRadius: 5,
              marginTop: 5,
            }}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon
              name={isMenuOpen ? "chevron-up" : "chevron-down"}
              color={colors.primary}
              size={24}
            />
          </TouchableOpacity>
          {isMenuOpen && (
            <View>
              <Text>Coming soon</Text>
            </View>
          )}
        </View>

        <View style={styles.plan}>
          <Caption>Meal Plan 2</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Expected Daily Calories</Text>

            <Text style={{ color: "#44dd44", marginLeft: 10 }}>
              {"1899 kcal"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "#242424",
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <Icon name="chevron-down" color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.plan}>
          <Caption>Meal Plan 3</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Expected Daily Calories</Text>

            <Text style={{ color: "#dd4444", marginLeft: 10 }}>
              {"2161 kcal"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "#242424",
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <Icon name="chevron-down" color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.plan}>
          <Caption>Workout Plan 1</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Workout</Text>

            <Text style={{ marginLeft: 10 }}>{"3 times/week"}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "#242424",
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <Icon name="chevron-down" color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.plan}>
          <Caption>Workout Plan 2</Caption>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Workout</Text>

            <Text style={{ marginLeft: 10 }}>{"2 times/week"}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              backgroundColor: "#242424",
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <Icon name="chevron-down" color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.plan}>
          <Caption>Coming soon...</Caption>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
