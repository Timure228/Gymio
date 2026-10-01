import { AppText } from '@/components/AppText';
import ProgramItem from '@/components/ProgramItem';
import { useProgram } from '@/context/ProgramContext';
import { useFonts } from "expo-font";
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const today = new Date();

  // Load fonts
  const [loaded, error] = useFonts({ BlippoRegular: require("../../assets/fonts/Blippo_Regular.ttf") })

  if (!loaded && !error) {
    return null;
  }

  // Define Program List
  const { programList, isLoading } = useProgram()

  return (
    <View style={styles.container}>
      <View style={styles.title_header}>
        <AppText style={styles.title_text}>Gymio</AppText>
        <Image style={{ width: 64, height: 64 }} source={require("@/assets/images/dumbell.png")} />
      </View>
      <View style={styles.date_text_container}>
        <AppText style={styles.date_text}>{today.toLocaleDateString()}</AppText>
        <AppText style={{ fontSize: 20 }}>Meine Programme:</AppText>
      </View>
      <ProgramItem dataSource={programList} />
      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  date_text_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    position: "relative",
    top: 120
  },
  date_text: {
    fontSize: 34,
  },
  title_text: {
    fontFamily: "BlippoRegular",
    fontWeight: "bold",
    fontSize: 34
  },
  title_header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 6
  }
});
