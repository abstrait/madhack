import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ExpenseTable from './expenseTable';
import ImagePreview from './imagePreview';


export default function Index() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false); // To manage camera visibility

  // if (!permission) {
  //   return <View />; // Camera permissions are still loading
  // }

  // if (!permission.granted) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.message}>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission} title="Grant Permission" />
  //     </View>
  //   );
  // }

  const closeCamera = () => {
    setIsCameraActive(false); // Hide the camera when 'Close' is pressed
    try {
      fetch('http://10.140.106.143:8000/get', {
        method: 'GET',
      }).then((res) => {
        console.log(res.status);
        return res.json();
      }).then((json) => console.log(json));
    } catch (error) {
      console.log("Error encountered.");
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      const encodedJPEG = data.base64;
      if (source) {
        setPhotoUri(source); // Set the photoUri when a picture is taken
        console.log("picture", source);
      }

      try {
        fetch('http://10.140.106.143:8000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: encodedJPEG,
          }),
        }).then((res) => {
          console.log(res.status);
        })
      } catch (error) {
        console.log("Error encountered.");
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
            {photoUri && (
              <ImagePreview photoUri={photoUri} ></ImagePreview>
            )}
          </View>
        </CameraView>
      )}
      {!isCameraActive && (
        <>
        <ExpenseTable></ExpenseTable>
        <Button title="Open Camera" onPress={() => (setIsCameraActive(true))}></Button>
        </>
      )}
      
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
