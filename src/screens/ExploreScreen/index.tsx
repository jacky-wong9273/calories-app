import * as React from "react";

// import UIs
import { StatusBar } from "expo-status-bar";
import {
  View,
  type ImageSourcePropType,
  type ColorValue,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Text, Button, Avatar, Title, TextInput } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// import styles
import { createStyles } from "./styles";

// import demo data
import { explore, explore2 } from "../../demo";

interface ExploreScreenProps {
  navigation: any;
}
const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  // create styles
  const styles = createStyles();

  // todo @chris
  // load all profiles and replace demo data

  // user profile card
  type UserCardType = {
    imgSrc: ImageSourcePropType;
    name: string;
    id?: string;
    bio?: string;
    joinTime: string;
    userTag: string;
    featureTags?: Array<{ tag: string; color: ColorValue }>;
  };
  const UserCard = ({
    imgSrc,
    name,
    id,
    userTag,
    bio,
    joinTime,
    featureTags,
  }: UserCardType) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate("Profile", { userId: "78g8" })}
    >
      {/** user avatar */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Avatar.Image source={imgSrc} size={100} style={{ zIndex: 10 }} />
      </TouchableOpacity>
      {/* user info*/}
      <View style={styles.name}>
        <Title>{name}</Title>
      </View>
      {/* user bio */}
      <View style={styles.bio}>
        <ScrollView>
          <Text>{bio}</Text>
        </ScrollView>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* user section */}
      <ScrollView style={styles.userSection}>
        <View style={styles.infoPlaceholder}>
          <Text style={styles.infoHeader}>Explore like-minded hobbyist.</Text>
          <TextInput
            style={styles.searchBar}
            label={"Search"}
            right={<TextInput.Icon icon="magnify" />}
          />
        </View>
        <View style={styles.userColumnContainer}>
          <View style={styles.userColumn}>
            {explore.map((user, index) => (
              <UserCard
                key={index}
                id={user?.id}
                imgSrc={user.avatar}
                name={user.name}
                userTag={user.userTag}
                featureTags={user.featureTags}
                bio={user.bio}
                joinTime={user.joinTime.toLocaleDateString()}
              />
            ))}
          </View>
          <View style={styles.userColumn}>
            {explore2.map((user, index) => (
              <UserCard
                key={index}
                id={user?.id}
                imgSrc={user.avatar}
                name={user.name}
                userTag={user.userTag}
                featureTags={user.featureTags}
                bio={user.bio}
                joinTime={user.joinTime.toLocaleDateString()}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;
