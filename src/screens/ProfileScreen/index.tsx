import { useState, useEffect } from "react";
import * as React from "react";

// import UI components
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  type ColorValue,
  type ImageSourcePropType,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Button,
  Text,
  useTheme,
} from "react-native-paper";
import {
  TabView,
  SceneMap,
  TabBar,
  type TabBarProps,
} from "react-native-tab-view";
import { LineChart } from "react-native-chart-kit";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios, { Axios } from "axios";

// import data processing utils
import {
  type AnalyticsProps,
  processAnalyticsToLineChart,
  processAnalyticsToPercentage,
} from "../../analytics";

// import styles
import { createStyles } from "./styles";

// import demo case
import { user, analytics, history } from "../../demo";

// rget utils functions
import { proper, getUnit, getSource } from "../../utils";
import { useUserId } from "../..//context/userContext";
import { serverIP } from "../../../serverConfig";

export type ProfileScreenProps = {
  initialTab: number;
};

type historyCardFormat = {
  date: Date;
  intake: {
    calories: number;
    carbs?: number;
    fat?: number;
    protein?: number;
  };
  source: string;
  itemName: string;
  img?: string | null;
};

type databaseFormat = {
  CALORIES: number;
  CARBS_GRAM: number;
  FAT_GRAM: number;
  PROTEIN_GRAM: number;
  RECORD_DATE: string;
  PHOTO: string;
  FOOD_ITEM: string;
  INPUT: string;
};


const ProfileScreen: React.FC<ProfileScreenProps> = ({ initialTab }) => {
  // create styles
  const styles = createStyles();
  const { colors } = useTheme();
  const userId = useUserId().userId;
  const [tab, setTab] = useState<number>(initialTab ? initialTab : 0);

  // constant tag colors
  const tagColors = ["#5047a7", "#33aa22", "#cc2233"];

  // user background
  type UserBackgroundType = {
    imgSrc: ImageSourcePropType;
  };
  const UserBackground = ({ imgSrc }: UserBackgroundType) => (
    <View style={styles.background}>
      <TouchableOpacity onPress={handleBackgroundPress}>
        <Image
          source={imgSrc}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  // handle handlers for user background
  const handleBackgroundPress = () => {
    /** todo */
  };

  // user profile card
  type UserCardType = {
    imgSrc: ImageSourcePropType;
    name: string;
    bio?: string;
    joinTime: string;
    userTag: string;
    featureTags?: Array<{ tag: string; color: ColorValue }>;
  };
  const UserCard = ({
    imgSrc,
    name,
    userTag,
    bio,
    joinTime,
    featureTags,
  }: UserCardType) => (
    <View style={styles.userCard}>
      {/** user avatar */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Avatar.Image source={imgSrc} size={100} style={{ zIndex: 10 }} />
      </TouchableOpacity>
      {/* user info*/}
      <View style={styles.name}>
        <Title>{name}</Title>
        <TouchableOpacity style={styles.tagContainer}>
          <Text style={styles.tag}>{userTag}</Text>
        </TouchableOpacity>
      </View>
      {/* introduction */}
      <View style={styles.bio}>
        <Text>{bio}</Text>
      </View>
      {/* feature tags */}
      <View style={styles.featureTags}>
        {featureTags &&
          featureTags.map(({ tag, color }, i) => (
            <View
              key={i}
              style={[{ backgroundColor: color }, styles.featureTagContainer]}
            >
              <Text style={styles.featureTag}>
                {"# "}
                {tag}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.buttonRow}>
        <Button style={styles.editButton}>
          <Icon name="lead-pencil" size={15} style={{}} />
          {"  Edit Profile  "}
        </Button>
        <Button style={styles.shareButton} rippleColor={"#22299d"}>
          <Icon name="share-outline" size={20} style={{}} />
        </Button>
      </View>
    </View>
  );

  // tab views under profile card
  // summary tab
  const summary = processAnalyticsToPercentage(analytics);
  const SummaryTab = () => (
    <ScrollView style={styles.summaryTab}>
      <View style={styles.chartContainer}>
        <Text>Calories Intake (kcal) in Past 7 Days</Text>
        <Analytics data={analytics.slice(7, 14)} />
      </View>
      <View style={styles.dataSection}>
        <Text>
          This Week (
          {analytics[7].date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}{" "}
          to{" "}
          {analytics[13].date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
          )
        </Text>
        <View style={styles.dataCardContainer}>
          {Object.keys(summary).map((key, index) => (
            <DataCard
              key={index}
              title={key}
              value={summary[key].value}
              percentage={summary[key].percentage}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
  // render analytics
  const Analytics = ({ data }: { data: AnalyticsProps }) => (
    <View id="analytics_container">
      <LineChart
        data={processAnalyticsToLineChart(data)}
        width={Dimensions.get("screen").width * 1}
        height={Dimensions.get("screen").height * 0.2}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: colors.primary,
          },
          backgroundColor: styles.chartBackground.color,
          backgroundGradientFrom: styles.chartBackground.color,
          backgroundGradientTo: styles.chartBackground.color,
        }}
        bezier
        style={{
          marginVertical: 15,
          borderRadius: 10,
        }}
      />
    </View>
  );

  // data card
  type DataCardProps = {
    title: string;
    value: number;
    percentage: number;
  };

  const DataCard = ({ title, value, percentage }: DataCardProps) => {
    return (
      <TouchableOpacity style={styles.dataCard}>
        <Text style={styles.dataCardTitle}>{proper(title)}</Text>
        <View style={styles.percentageCard}>
          <Icon
            name={percentage >= 0 ? "arrow-up" : "arrow-down"}
            color={percentage >= 0 ? "#3e3" : "#e33"}
            size={30}
          />
          <Text style={{ fontSize: 22 }}>
            {percentage >= 0 ? percentage : percentage * -1}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [records, setRecords] = useState<(historyCardFormat | null)[]>([]);

  useEffect(() => {
    if (tab === 1){
      axios.get(serverIP + '/calorie/viewrecords',{
        params: {
            user_id: 1
        },
      }).then((response: any) => {
          setRecords(convertJSONData(response.data))
      }).catch((error:any) => {
          console.log("Error fetching calorie history:", error);
      });
    }
  }, [tab]);
  

  const convertJSONData = (jsonData: databaseFormat[]): historyCardFormat[] => {
    return jsonData.map((data) => {
      const {
        CALORIES,
        CARBS_GRAM,
        FAT_GRAM,
        PROTEIN_GRAM,
        RECORD_DATE,
        PHOTO,
        INPUT,
        FOOD_ITEM,
      } = data;

      if (CARBS_GRAM === 0 && FAT_GRAM === 0 && PROTEIN_GRAM === 0 && PHOTO === "") {
        return null!; // Set the entry to null
      }
  
      return {
        date: new Date(RECORD_DATE),
        intake: {
          calories: CALORIES,
          carbs: CARBS_GRAM,
          fat: FAT_GRAM,
          protein: PROTEIN_GRAM,
        },
        source: INPUT,
        itemName: FOOD_ITEM,
        img: PHOTO
      };
    });
  };


  // history tab
  const HistoryTab = () => (
    <ScrollView style={styles.history}>
      {records
      ?.filter((datum) => datum !== null)
      .map((datum, index) => (
        datum && <HistoryCard key={index} data={datum!} />
      ))}
    </ScrollView>
  );

  // history card
  type historyCardProps = {
    data: historyCardFormat | null;
  };
  
  const HistoryCard = ({
    data,
  }: historyCardProps) => {

    if(!data) {
      return null; 
    }

    const { date, intake, source, itemName, img } = data;

    return(
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.historyDateContainer}>
        <Text style={styles.historyDate}>
          {date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
        <Text style={styles.historyDate}>Source: {source}</Text>
      </View>

      <View style={styles.historyItemTitle}>
        <Title>{itemName}</Title>
      </View>
      {img && (
        <TouchableOpacity style={styles.historyImageContainer}>
          <Image style={styles.historyImage} source={{ uri: img }} resizeMode="center" />
        </TouchableOpacity>
      )}

      <View style={styles.historyCardBottomRow}>
        {Object.keys(intake).map((key, index) => (
          <TouchableOpacity key={index} style={styles.historyCardBottomItem}>
            <View
              style={[
                styles.historyCardBottomTag,
                { backgroundColor: tagColors[index % 3] },
              ]}
            >
              <Text
                style={[
                  styles.historyCardBottomItemTitle,
                  styles.historyCardBottomItemText,
                ]}
              >
                {proper(key)}
              </Text>

              <Text style={styles.historyCardBottomItemText}>
                {"  "}
                {intake[key as keyof typeof intake]} {getUnit(key)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>)
  };

  // render tab view
  const tabs = [
    { key: "summary", title: "Summary" },
    { key: "history", title: "History", onPress: () => setTab(1) },
  ];
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabBarIndicator}
    />
  );
  const renderTabs = SceneMap({
    summary: SummaryTab,
    history: HistoryTab,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* user section */}
      <View style={styles.userSection}>
        <UserBackground imgSrc={user.background} />
        <UserCard
          imgSrc={user.avatar}
          name={user.name}
          userTag={user.userTag}
          featureTags={user.featureTags}
          bio={user.bio}
          joinTime={user.joinTime.toLocaleDateString()}
        />
      </View>
      {/* tab section */}
      <TabView
        style={styles.tabSection}
        navigationState={{ index: tab, routes: tabs }}
        renderScene={renderTabs}
        onIndexChange={setTab}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
