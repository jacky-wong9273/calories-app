import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Modal,
} from "react-native-paper";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { serverIP } from "../../../serverConfig";

import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useUserId } from "../../context/userContext";

interface CameraInputProps {
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
  photo: string;
  input: string
}

const CameraInput: React.FC<CameraInputProps> = ({ setSelectedOption }) => {
  const userId = useUserId().userId;
  const [date, setDate] = useState("");

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [kcal, setKcal] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [carb, setCarb] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  

  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setModalVisible(true);

      cameraRef.current.pausePreview();
    }
  };

  const cancel = () => {
    setSelectedOption(null);
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const saveData = async () => {
    try {
      if (photo) {
        // Save the photo and data to the local database using Axios
        const newData: CalorieRecord = {
          user_id: 1,
          record_date: date,
          food_item: name,
          cal_get: kcal,
          protein_gram: protein,
          carbs_gram: carb,
          fat_gram: fat,
          photo: photo,
          input: "Camera"
        };

        await axios.post(`${serverIP}/calorie/addrecord`, newData);

        // After successful save, you can close the modal and reset the state
        setModalVisible(false);
        setPhoto(null);
        setName('');
        setKcal(0);
        setProtein(0);
        setCarb(0);
        setFat(0);

      } else {
        Alert.alert('Error', 'Please take a photo first.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data. Please try again.');
    }
  };

  const cancelPhoto = async() =>{
    // reset values
    setModalVisible(false);
    setPhoto(null);
    setName('');
    setKcal(0);
    setProtein(0);
    setCarb(0);
    setFat(0);
    setModalVisible(false)

    if (cameraRef.current) {
      cameraRef.current?.resumePreview();
    }
  }

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting Camera Permission</Text>
      ) : hasPermission === false ? (
        <Button onPress={() => {
          Camera.requestCameraPermissionsAsync().then(({ status }) => {
            setHasPermission(status === 'granted');
          });
        }}>
          Allow Access
        </Button>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            ref={cameraRef}
            style={{ flex: 1, aspectRatio: 10/13 }} 
            
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }} >            
                  <TouchableOpacity
                    style={{
                      marginBottom: 20,
                      padding: 20,
                      backgroundColor: 'white',
                      margin: 15,
                      borderRadius: 10,
                    }}
                    onPress={takePicture}
                  >
                    <Text style={{ color: '#000', textAlign: 'center' }}>Take Photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginBottom: 20,
                      padding: 20,
                      backgroundColor: 'white',
                      margin: 15,
                      borderRadius: 10,
                    }}
                    onPress={pickImage}
                  >
                    <Text style={{ color: '#000', textAlign: 'center' }}>Pick Photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginBottom: 20,
                      padding: 20,
                      backgroundColor: 'white',
                      margin: 15,
                      borderRadius: 10,
                    }}
                    onPress={cancel}
                  >
                    <Text style={{ color: '#000', textAlign: 'center' }}>Cancel</Text>
                  </TouchableOpacity>
              </View>
          </Camera>
          <Modal
            visible={isModalVisible}
            contentContainerStyle={styles.inputbox}
          >
            <KeyboardAvoidingView enabled  behavior={Platform.OS === "android" ? undefined : "position"}>
            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
              <View style={styles.modalContainer}>
              <Image source={{ uri: photo?.toString() }} style={styles.modalImage} />
                  <TextInput
                    label="Food Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                  />
                <TextInput
                  label="Kcal"
                  value={kcal ? kcal.toString() : ''}
                  onChangeText={(text) => setKcal(text ? parseInt(text) : 0)}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="Protein"
                  value={protein ? protein.toString() : ''}
                  onChangeText={(text) => setProtein(text ? parseInt(text) : 0)}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="Carb"
                  value={carb ? carb.toString() : ''}
                  onChangeText={(text) => setCarb(text ? parseInt(text) : 0)}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="Fat"
                  value={fat ? fat.toString() : ''}
                  onChangeText={(text) => setFat(text ? parseInt(text) : 0)}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }} >  
                  <TouchableOpacity
                    style={{
                      marginBottom: 20,
                      padding: 20,
                      backgroundColor: 'white',
                      margin: 15,
                      borderRadius: 10,
                    }}
                    onPress={saveData}
                  >
                    <Text style={{ color: '#000', textAlign: 'center' }}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginBottom: 20,
                      padding: 20,
                      backgroundColor: 'white',
                      margin: 15,
                      borderRadius: 10,
                    }}
                    onPress={cancelPhoto}
                  >
                    <Text style={{ color: '#000', textAlign: 'center' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default CameraInput;
