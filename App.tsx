import {StyleSheet, Text, View} from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Title</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
});

export default App;
