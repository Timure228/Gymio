import { AppText } from "@/components/AppText";
import ExerciseItem from "@/components/ExerciseItem";
import Exercise from "@/models/exercise";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function programOverview() {
    const { program_name, status, exercises_list } = useLocalSearchParams<{
        program_name: string,
        status: string,
        exercises_list: string
    }>();

    const parsedExercises: Exercise[] = exercises_list ? JSON.parse(exercises_list) : []
    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "black"
        }
    })

    return (
        <View style={styles.container}>
            <AppText style={{fontSize: 24, fontWeight: "bold", textAlign: "center", padding: 4}}>{program_name}</AppText>
            <AppText style={{fontSize: 16, fontWeight: "bold", textAlign: "center", color: status === "Done" ? "green" : "yellow"}}>{status}</AppText>
            <ExerciseItem dataSource={parsedExercises}/>
        </View>
    )
}