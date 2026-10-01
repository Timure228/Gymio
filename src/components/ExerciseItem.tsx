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
            flex: 1,
            paddingHorizontal: 8,
            paddingTop: 8
        },
        exercise_card: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 4,
            marginVertical: 7,
            paddingVertical: 16,
            paddingHorizontal: 18,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#000000",
            gap: 12,
            shadowColor: "#000000",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 6
        },
        exercise_style: {
            flex: 1,
            fontSize: 15,
            fontWeight: "800",
            letterSpacing: 0.4,
            lineHeight: 22,
            color: "#000000"
        },
        play_button: {
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 3,
            backgroundColor: "#000000",
            borderWidth: 2,
            borderColor: "#000000"
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
                <Pressable style={styles.play_button} onPress={startPause}>
                    <Ionicons name="play" size={24} color="#ffffff" />
                </Pressable>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ExerciseRow item={item} />}
                keyExtractor={item => `basicListEntry-${item.exercise_name}`}
                ListEmptyComponent={ListEmptyComponentShow}
            />
        </View>
    )
}