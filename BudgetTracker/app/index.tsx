import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ExpenseTable from './expenseTable';


export default function Index() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(true); // To manage camera visibility

  if (!permission) {
    return <View />; // Camera permissions are still loading
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const closeCamera = () => {
    setIsCameraActive(false); // Hide the camera when 'Close' is pressed
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        setPhotoUri(source); // Set the photoUri when a picture is taken
        console.log("picture", source);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isCameraActive && (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={() => console.log("Camera is ready")}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={closeCamera}>
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      {!isCameraActive && (
        <>
        <ExpenseTable></ExpenseTable>
        <Button title="Open Camera" onPress={() => (setIsCameraActive(true))}></Button>
        </>
      )}
      {/* {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#00000080',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  preview: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
