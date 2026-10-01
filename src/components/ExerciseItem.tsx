import Exercise from "@/models/exercise";
import Ionicons from "@react-native-vector-icons/ionicons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
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
            marginHorizontal: 4,
            marginVertical: 7,
            paddingVertical: 18,
            paddingHorizontal: 18,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#000000",
            gap: 14,
            shadowColor: "#000000",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 6
        },
        exercise_style: {
            fontSize: 15,
            fontWeight: "800",
            letterSpacing: 0.4,
            lineHeight: 22,
            color: "#000000"
        },
        bottom_row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopWidth: 2,
            borderTopColor: "#000000",
            paddingTop: 14
        },
        pause_block: {
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 6
        },
        pause_number: {
            fontSize: 56,
            lineHeight: 60,
            fontWeight: "900",
            letterSpacing: -1,
            color: "#000000"
        },
        pause_label: {
            fontSize: 12,
            fontWeight: "800",
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#000000",
            paddingBottom: 8
        },
        play_button: {
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 3,
            backgroundColor: "#000000",
            borderWidth: 2,
            borderColor: "#000000"
        },
        play_button_pressed: {
            transform: [{ scale: 0.92 }],
            backgroundColor: "#FFFFFF"
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

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

            let remaining = pause
            const id = setInterval(() => {
                remaining -= 1

                if (remaining <= 0) {
                    clearInterval(id)
                    setSets(s => s - 1)
                    setPause(item.pause_sec)
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                } else {
                    setPause(remaining)
                    if (remaining <= 3) {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                }
            }, 1000)
        }
        return (
            <Animated.View entering={FadeInDown.duration(450)} style={styles.exercise_card}>
                <AppText style={styles.exercise_style}>
                    {item.exercise_name + ": Reps: " + item.reps + " | Sets: " + sets + " | Pause: " + pause}
                </AppText>
                <View style={styles.bottom_row}>
                    <View style={styles.pause_block}>
                        <AppText style={styles.pause_number}>{pause}</AppText>
                        <AppText style={styles.pause_label}>sek</AppText>
                    </View>
                    <Pressable
                        style={({ pressed }) => [styles.play_button, pressed && styles.play_button_pressed]}
                        onPress={startPause}
                    >
                        {({ pressed }) => (
                            <Ionicons name="play" size={26} color={pressed ? "#000000" : "#ffffff"} />
                        )}
                    </Pressable>
                </View>
            </Animated.View>
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