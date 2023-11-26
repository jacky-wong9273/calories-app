import React, { useState, useEffect } from "react";
import { View, Modal, ScrollView } from "react-native";
import { Text, Button, TextInput, Title } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";

import BarcodeScanner from "../BarcodeScanner";
import CameraInput from "../CameraInput";
import { useUserId } from "../../context/userContext";
import { serverIP } from "../../../serverConfig";
import axios from "axios";

// import styles
import styles from "./styles";

const CreateMealScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // form reponses
  const userId = useUserId().userId;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedCarb, setSelectedCarb] = useState(0);
  const [selectedProt, setSelectedProt] = useState(0);
  const [selectedFat, setSelectedFat] = useState(0);

  const handleOptionSelect = (option: string) => {
    setModalVisible(false);
    setSelectedOption(option);
  };

  const requestClose = () => {
    setSelectedOption(null);
    setModalVisible(false);
  };

  const renderForm = () => {
    // Form for manual entry of nutrients
    return (
      <ScrollView>
        <DatePicker
          style={{ borderRadius: 15 }}
          options={{
            backgroundColor: "#444444",
            textHeaderColor: "#eee",
            textDefaultColor: "#bebebe",
            selectedTextColor: "#fff",
            mainColor: "#6767fe",
            textSecondaryColor: "#D6C7A1",
          }}
          mode="calendar"
          onSelectedChange={(date: React.SetStateAction<string>) =>
            setSelectedDate(date)
          }
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[{ width: "30%" }]}>Food Name: </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[{ marginVertical: 10, width: "70%" }, styles.background]}
            placeholder="Food Name"
            onChangeText={(val) => setSelectedFood(val)}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ width: "30%" }}>Calories: </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[{ marginVertical: 10, width: "70%" }, styles.background]}
            placeholder="g"
            keyboardType="numeric"
            onChangeText={(val) => setSelectedCarb(Number(val))}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ width: "30%" }}>Protein: </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[{ marginVertical: 10, width: "70%" }, styles.background]}
            placeholder="g"
            keyboardType="numeric"
            onChangeText={(val) => setSelectedProt(Number(val))}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ width: "30%" }}>Fat: </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[{ marginVertical: 10, width: "70%" }, styles.background]}
            placeholder="g"
            keyboardType="numeric"
            onChangeText={(val) => setSelectedFat(Number(val))}
          />
        </View>

        {selectedDate !== "" && selectedFood !== "" ? (
          <Button onPress={() => handleFormSubmit()}>Submit</Button>
        ) : (
          <Text style={{ color: "red" }}>Complete all fields</Text>
        )}
        <Button onPress={handleFormCancel}>Cancel</Button>
      </ScrollView>
    );
  };

  const handleFormCancel = () => {
    setModalVisible(false);
    setSelectedOption(null);
  };

  const handleFormSubmit = () => {
    console.log(selectedDate);

    const formData = {
      user_id: 1,
      record_date: selectedDate,
      food_item: selectedFood,
      cal_get: selectedCarb * 4 + selectedProt * 4 + selectedFat * 9,
      protein_gram: selectedProt,
      carbs_gram: selectedCarb,
      fat_gram: selectedFat,
    };

    console.log(formData);

    axios
      .post(`${serverIP}/calorie/addrecord`, formData)
      .then((response) => {
        console.log("Form data submitted successfully", response.data);

        // reset form fields
        setSelectedDate("");
        setSelectedMeal("");
        setSelectedFood("");
        setSelectedCarb(0);
        setSelectedProt(0);
        setSelectedFat(0);
      })
      .catch((error) => {
        console.error("Error submitting form data: ", error);
      });
    setModalVisible(false);
    setSelectedOption(null);
  };

  return (
    <View style={styles.container}>
      {!selectedOption && (
        <>
          <Title style={{ marginTop: 200 }}>Add Record</Title>

          {/* Ask User for Options */}
          {!selectedOption && (
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Button 
                  style={styles.button}
                  onPress={() => handleOptionSelect("camera")}
                >
                  Camera Input
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => handleOptionSelect("barcode")}
                >
                  Scan Barcode
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => handleOptionSelect("manual")}
                >
                  Enter Manually
                </Button>
              </View>
            </View>
          )}
        </>
      )}

      {/* Conditionally render BarcodeScanner or Form based on the selected option */}
      {selectedOption === "camera" && (
        <CameraInput setSelectedOption={setSelectedOption} />
      )}
      {selectedOption === "barcode" && (
        <BarcodeScanner setSelectedOption={setSelectedOption} />
      )}
      {selectedOption === "manual" && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{renderForm()}</View>
        </View>
      )}
    </View>
  );
};

export default CreateMealScreen;
