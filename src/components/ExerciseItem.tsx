import { FlatList, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import ListEmptyComponentShow from "./ListEmptyComponentShow";
import Exercise from "@/models/exercise";

interface ExerciseItemProps {
    dataSource: Exercise[]
}

export default function ExerciseItems({ dataSource }: ExerciseItemProps) {

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        exercise_card: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 24,
        },
        exercise_style: {
            fontSize: 14,
            fontWeight: "bold"
        }
    })

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) =>
                    <View style={styles.exercise_card}>
                        <AppText style={styles.exercise_style}>
                            {item.exercise_name + ": Reps: " + item.reps + " | Sets: " + item.sets + " | Pause: " + item.pause_sec}
                        </AppText>
                    </View>
                }
                keyExtractor={item => `basicListEntry-${item.exercise_name}`}
                ListEmptyComponent={ListEmptyComponentShow}
            />
        </View>
    )
}
