import { AnalyticsProps } from "../analytics";

const user = {
  avatar: require("./user.jpeg"),
  background: require("./background.jpeg"),
  joinTime: new Date(),
  name: "Elijah Katz",
  userTag: "@elijah23419",
  featureTags: [
    { tag: "coffee", color: "#5047a7" },
    { tag: "gym lover", color: "#33aa22" },
    { tag: "LGBTQ+", color: "#cc2233" },
  ],
  bio: "Welcome to my homepage. Let's start a healthy diet togther!",
};

const analytics = [
  {
    date: new Date(new Date().setDate(new Date().getDate() - 14)),
    calories: 2109,
    fat: 370,
    protein: 166,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 13)),
    calories: 2213,
    fat: 211,
    protein: 189,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 12)),
    calories: 2132,
    fat: 213,
    protein: 221,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 11)),
    calories: 1879,
    fat: 151,
    protein: 161,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 10)),
    calories: 2561,
    fat: 414,
    protein: 128,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 9)),
    calories: 1719,
    fat: 141,
    protein: 141,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 8)),
    calories: 2311,
    fat: 317,
    protein: 142,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
    calories: 1967,
    fat: 175,
    protein: 162,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
    calories: 2413,
    fat: 313,
    protein: 210,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    calories: 2199,
    fat: 221,
    protein: 201,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    calories: 1988,
    fat: 126,
    protein: 171,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    calories: 1761,
    fat: 118,
    protein: 159,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    calories: 1812,
    fat: 144,
    protein: 191,
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    calories: 2391,
    fat: 398,
    protein: 161,
  },
];

const history = [
  {
    date: new Date(Date.now()),
    intake: { calories: 122, fat: 5, protein: 1 },
    source: 1,
    itemName: "Coca-Cola",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    intake: { calories: 452, fat: 57, protein: 43 },
    source: 2,
    itemName: "Dinner",
    img: require("./historyCard/dinner_1.jpeg"),
    location: "Resturant 1",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    intake: { calories: 122, fat: 5, protein: 1 },
    source: 1,
    itemName: "Snack",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    intake: { calories: 499, fat: 51, protein: 81 },
    source: 2,
    itemName: "Lunch",
    img: require("./historyCard/lunch_1.jpeg"),
    location: "Resturant 2",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    intake: { calories: 611, fat: 45, protein: 76 },
    source: 2,
    itemName: "Breakfast",
    img: require("./historyCard/breakfast_1.jpeg"),
    location: "Resturant 3",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    intake: { calories: 352, fat: 35, protein: 99 },
    source: 2,
    itemName: "Dinner",
    img: require("./historyCard/dinner_2.jpeg"),
    location: "Resturant 4",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    intake: { calories: 632, fat: 92, protein: 67 },
    source: 2,
    itemName: "Tea",
    img: require("./historyCard/tea_2.jpeg"),
    location: "Resturant 5",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    intake: { calories: 491, fat: 72, protein: 68 },
    source: 2,
    itemName: "Brunch",
    img: require("./historyCard/brunch_2.jpeg"),
    location: "Resturant 6",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    intake: { calories: 561, fat: 52, protein: 45 },
    source: 2,
    itemName: "Dinner",
    img: require("./historyCard/dinner_3.jpeg"),
    location: "Resturant 7",
  },
];

const explore = [
  {
    avatar: require("./userCard/user2.jpeg"),
    background: require("./background.jpeg"),
    joinTime: new Date(),
    name: "Cath Gomez",
    userTag: "@cathg177718",
    bio: "Click to my page for more <3",

    featureTags: [
      { tag: "vegan", color: "#872980" },
      { tag: "gym lover", color: "#33aa22" },
    ],
  },
  {
    avatar: require("./userCard/user3.jpeg"),
    background: require("./background.jpeg"),
    joinTime: new Date(),
    name: "Elijah Katz",
    userTag: "@elijah23419",
    bio: "I love junk food! Let's not keep a healthy diet but oily food.",

    featureTags: [
      { tag: "coffee", color: "#5047a7" },
      { tag: "gym lover", color: "#33aa22" },
      { tag: "hike", color: "#888814" },
    ],
  },
  {
    avatar: require("./userCard/user4.jpeg"),
    background: require("./background.jpeg"),
    joinTime: new Date(),
    name: "Elijah Katz",
    userTag: "@elijah23419",
    bio: "This person is lazy. He did not leave any words in bio.",

    featureTags: [
      { tag: "coffee", color: "#5047a7" },
      { tag: "gym lover", color: "#33aa22" },
    ],
  },
];

const explore2 = [
  {
    avatar: require("./user.jpeg"),
    background: require("./background.jpeg"),
    joinTime: new Date(),
    name: "Elijah Katz",
    userTag: "@elijah23419",
    bio: "Welcome to my homepage. Let's start a healthy diet togther!",

    featureTags: [
      { tag: "coffee", color: "#5047a7" },
      { tag: "gym lover", color: "#33aa22" },
      { tag: "LGBTQ+", color: "#cc2233" },
    ],
  },
  {
    avatar: require("./userCard/user1.jpeg"),
    background: require("./background.jpeg"),
    joinTime: new Date(),
    name: "Samoyed and Ragdoll",
    userTag: "@samandrag155",
    bio: "Ruff... Meowww?!",

    featureTags: [
      { tag: "meat", color: "#aa3188" },
      { tag: "meatttt!", color: "#35484f" },
    ],
  },
];

export { user, analytics, history, explore, explore2 };
