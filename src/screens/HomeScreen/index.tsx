import { useState } from "react";

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
  // create styles
  const styles = createStyles();

  // handle menu click
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // create theme
  const { colors } = useTheme();
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.sectionContainer]}>
        <View style={[styles.target, { marginTop: 20 }]}>
          <Text style={{ fontSize: 24 }}>Welcome back, Elijah!</Text>
        </View>
        <View style={styles.dataCardContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.title}>2100 kcal</Text>
            <Caption>Daily Calories Intake</Caption>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.title1}>1219 kcal</Text>
            <Caption>Today's Calories Intaken</Caption>
          </View>
        </View>
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
              <Text>ddd</Text>
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
