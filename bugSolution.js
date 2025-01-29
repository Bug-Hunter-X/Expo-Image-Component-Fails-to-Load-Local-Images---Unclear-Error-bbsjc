```javascript
import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

const imagePath = 'file:///path/to/your/image.jpg'; //replace with actual path

export default function App() {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const verifyImage = async () => {
      try {
        const info = await FileSystem.getInfoAsync(imagePath);
        if (!info.exists) {
          setError('Image file does not exist at the specified path.');
        } else {
          setImageLoaded(true);
        }
      } catch (e) {
        setError(`Error verifying image: ${e.message}`);
      }
    };
    verifyImage();
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {imageLoaded && (
        <Image source={{ uri: imagePath }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
```