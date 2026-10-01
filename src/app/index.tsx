import { AppText } from '@/components/AppText';
import ProgramItem from '@/components/ProgramItem';
import Program from '@/models/program';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const today = new Date();

  // Load fonts
  const [loaded, error] = useFonts({BlippoRegular: require("../../assets/fonts/Blippo_Regular.ttf")}) 

  if (!loaded && !error) {
    return null; 
  }

  // Define Program List
  const [programList, setProgramList] = useState<Program[]>([
    {programmName: "Super Shredded 8", status: "In Progress"},
    {programmName: "Super Heavy", status: "Done"}
  ])

  return (
    <View style={styles.container}>
      <AppText style={styles.title_text}>Gymio</AppText>
      <View style={styles.date_text_container}>
        <AppText style={styles.date_text}>{today.toLocaleDateString()}</AppText>
        <AppText style={{fontSize: 20}}>Meine Programme:</AppText>
      </View>
      <ProgramItem dataSource={programList}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
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
  }
});
