import Exercise from "@/models/exercise";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import ListEmptyComponentShow from "./ListEmptyComponentShow";

interface ExerciseItemProps {
    dataSource: Exercise[]
}

export default function ExerciseItem({ dataSource }: ExerciseItemProps) {
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

    type ExerciseRowProps = {
        item: Exercise
    }

    const ExerciseRow = ({ item }: ExerciseRowProps) => {
        const [sets, setSets] = useState(item.sets)
        const [pause, setPause] = useState(item.pause_sec)

        if (sets <= 0) return

        const startPause = () => {
            if (sets <= 0) return

            let remaining = pause
            const id = setInterval(() => {
                remaining -= 1

                if (remaining <= 0) {
                    clearInterval(id)
                    setSets(s => s - 1)
                    setPause(item.pause_sec)
                } else {
                    setPause(remaining)
                }
            }, 1000)
        }
        return (
            <View style={styles.exercise_card}>
                <AppText style={styles.exercise_style}>
                    {item.exercise_name + ": Reps: " + item.reps + " | Sets: " + sets + " | Pause: " + pause}
                </AppText>
                <Pressable onPress={startPause}>
                    <Ionicons name="play" size={38} color="#ffffff" />
                </Pressable>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <ExerciseRow item={item} />}
                keyExtractor={item => `basicListEntry-${item.exercise_name}`}
                ListEmptyComponent={ListEmptyComponentShow}
            />
        </View>
    )
}
