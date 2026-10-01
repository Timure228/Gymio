import { AppText } from '@/components/AppText';
import ProgramItem from '@/components/ProgramItem';
import { useProgram } from '@/context/ProgramContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFonts } from "expo-font";
import { useRouter } from 'expo-router';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const today = new Date();

  const router = useRouter()
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
        <Image style={styles.logo_image} source={require("@/assets/images/dumbell.png")} />
        <Pressable style={styles.progress_button} onPress={() => router.push("/progress")}><Image style={styles.progress_image} source={require("@/assets/images/progress.png")} /></Pressable>
      </View>
      <View style={styles.divider} />
      <View style={styles.date_text_container}>
        <AppText style={styles.date_text}>{today.toLocaleDateString()}</AppText>
        <AppText style={styles.section_text}>Meine Programme:</AppText>
      </View>
      <ProgramItem dataSource={programList} />
      {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 16,
  },
  title_header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title_text: {
    fontFamily: "BlippoRegular",
    fontWeight: "bold",
    fontSize: 38,
    color: "#ffffff",
    letterSpacing: 1.5,
  },
  logo_image: {
    width: 56,
    height: 56,
  },
  progress_button: {
    marginLeft: "auto",
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#111111",
  },
  progress_image: {
    width: 40,
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#2a2a2a",
    marginBottom: 20,
  },
  date_text_container: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 12,
  },
  date_text: {
    fontSize: 15,
    color: "#8a8a8a",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  section_text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
});