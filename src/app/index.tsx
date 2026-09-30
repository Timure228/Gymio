import { AppText } from '@/components/AppText';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const today = new Date();
  const programms = 

  return (
    <View style={styles.container}>
      <AppText style={styles.date_text}>{today.toLocaleDateString()}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center", 
    flexDirection: 'row',
    backgroundColor: "black"
  },
  date_text: {
    fontSize: 34,
  }
});
