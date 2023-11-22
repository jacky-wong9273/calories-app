import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Modal,
  Title,
  Caption,
} from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import styles from "./styles";
import { useUserId } from "../../context/userContext";
import DatePicker from "react-native-modern-datepicker";
import axios from "axios";
import { serverIP } from "../../../serverConfig";

interface BarcodeScannerProps {
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

interface CalorieRecord {
  user_id: number;
  record_date: string;
  food_item: string;
  cal_get: number;
  protein_gram: number;
  carbs_gram: number;
  fat_gram: number;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  setSelectedOption,
}) => {
  const userId = useUserId().userId;

  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [foodName, setFoodName] = useState("");
  const [foodKcal, setFoodKcal] = useState(0);
  const [foodCarbs, setFoodCarbs] = useState(0);
  const [foodPro, setFoodPro] = useState(0);
  const [foodFat, setFoodFat] = useState(0);
  const [hasData, setHasData] = useState(false);
  const [date, setDate] = useState("");

  const [confirmBarcode, setConfirmBarcode] = useState(false);
  const [portion, setPortion] = useState(1);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when scanning barcode
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setText(data);
  };

  const getBarcodeDataFromAPI = async (barcodeData: string) => {
    var myHeaders = new Headers();
    // API authentication token
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Token token=6c3b233f7fd40016099247f2f364201a"
    );
    myHeaders.append(
      "Cookie",
      "_food_repo_session=SDwWKPX9eixJLXM4Q6H6OniJ5vu3EGqfmO6kJTV1zL9%2Fbcg3ddtnSM4iYhTI1evyrPnFOvAQilF3KO2YZq%2FXdRm8e5xEyVZyDacegCm%2FhmeB62Y7%2Bxgs%2BXfYI2If7m8muLGalt3A%2FG%2BRca8hj9Ak4VCeIVf3Fae%2FyO4wVOFDSlZw5szqlMb1TS%2FMY4zvm3W8mzITi3tiAG0F8Q%3D%3D--VXmcKOM2HlEFXJuB--f0b10adTRFlOdfJba%2FkYyw%3D%3D"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // try to fetch from API
    try {
      const response = await fetch(
        `https://www.foodrepo.org/api/v3/products?barcodes=${barcodeData}`,
        requestOptions
      );
      const result = await response.json();
      // if Fetch successful and result valid, set states, otherwise reset states
      try {
        // Updates state w API response
        setHasData(true);
        setFoodName(result.data[0].display_name_translations.en);
        setFoodKcal(
          result.data[0].nutrients.energy_calories_kcal.per_portion || 0
        );
        setFoodCarbs(result.data[0].nutrients.carbohydrates.per_portion || 0);
        setFoodPro(result.data[0].nutrients.protein.per_portion || 0);
        setFoodFat(result.data[0].nutrients.fat.per_portion || 0);
      } catch (error) {
        // no data returned from API
        setFoodName("NO DATA AVAILABLE");
        setHasData(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Check if the barcode has been scanned
    if (scanned && text !== "Not yet scanned") {
      // Call the API using the getBarcodeDataFromAPI function
      getBarcodeDataFromAPI(text);
    }
  }, [scanned, text]);

  const handleConfirm = () => {
    setDate("");
    setConfirmBarcode(true);
  };

  const handleSave = () => {
    const newData: CalorieRecord = {
      user_id: userId,
      record_date: date,
      food_item: foodName,
      cal_get: foodKcal * portion,
      protein_gram: foodPro * portion,
      carbs_gram: foodCarbs * portion,
      fat_gram: foodFat * portion,
    };

    Alert.alert("Saved to my history.");

    setSelectedOption(null);

    return;

    axios
      .post(`${serverIP}/calorie/addrecord`, newData)
      .then((response) => {
        console.log("Form data submitted successfully", response.data);

        setFoodName("");
        setDate("");
        setFoodKcal(0);
        setFoodCarbs(0);
        setFoodPro(0);
        setFoodFat(0);
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });

    setSelectedOption(null);
  };

  const handleCancel = () => {
    setDate("");
    setSelectedOption(null);
  };

  const handleReturn = () => {
    setConfirmBarcode(false);
  };

  // check permissions and return screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Button>Requesting for camera permission</Button>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <Modal style={styles.container} visible={hasPermission === false}>
        <View style={styles.nopermission}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button onPress={() => askForCameraPermission()}>Allow Camera</Button>
        </View>
      </Modal>
    );
  }

  type datumRowProps = {
    title: string;
    value: string;
    caption?: string;
    setValue: React.SetStateAction<string> | React.SetStateAction<number>;
  };
  const DatumRow = ({ title, value, setValue, caption }: datumRowProps) => (
    <View style={styles.datumRow}>
      <TouchableOpacity style={styles.datumRowDescription}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
        {caption && <Caption>{caption}</Caption>}
      </TouchableOpacity>
      <View></View>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        style={styles.input}
      ></TextInput>
    </View>
  );

  if (hasPermission === true) {
    return (
      <View style={{ ...styles.container, width: "100%" }}>
        {confirmBarcode ? (
          <View style={[styles.modalContent, { width: "100%" }]}>
            <Title>{foodName}</Title>
            <Caption>
              Scanned on {new Date().toLocaleTimeString()}
              {", "}
              {new Date().toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Caption>
            <DatumRow
              title="Portion"
              value={portion.toString()}
              setValue={setPortion}
            />
            <DatumRow
              title="Calories"
              value={foodKcal.toString()}
              setValue={setFoodKcal}
              caption="kCal per portion"
            />
            <DatumRow
              title="Carbs"
              value={foodCarbs.toString()}
              setValue={setFoodCarbs}
              caption="g per portion"
            />
            <DatumRow
              title="Protein"
              value={foodPro.toString()}
              setValue={setFoodPro}
              caption="g per portion"
            />
            <DatumRow
              title="Fat"
              value={foodFat.toString()}
              setValue={setFoodFat}
              caption="g per portion"
            />

            {/* {date !== "" ? (
              <Button onPress={() => handleSave()}>Save</Button>
            ) : (
              <Text style={{ color: "red" }}>Choose Date</Text>
            )} */}
            <Button onPress={handleSave} style={{ marginTop: 10 }}>
              Save
            </Button>
            <Button onPress={handleReturn} style={{ marginTop: 10 }}>
              Cancel
            </Button>
          </View>
        ) : (
          <View style={styles.modalContent}>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
              />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            <Text style={styles.maintext}>{foodName}</Text>

            {scanned && (
              <View>
                <Button
                  style={{ backgroundColor: "tomato" }}
                  onPress={() => setScanned(false)}
                >
                  <Text>Scan Again?</Text>
                </Button>
              </View>
            )}

            {hasData && (
              <View style={styles.confirmBtn}>
                <Button onPress={handleConfirm}>Confirm</Button>
              </View>
            )}

            <View style={styles.cancelBtn}>
              <Button onPress={handleCancel}>Cancel</Button>
            </View>
          </View>
        )}
      </View>
    );
  }
};

export default BarcodeScanner;
