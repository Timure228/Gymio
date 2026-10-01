import Exercise from "@/models/exercise";
import Program from "@/models/program";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { AppText } from "./AppText";
import Ionicons from "@react-native-vector-icons/ionicons";

const emptyExercise = (): Exercise => ({ exercise_name: "", sets: 0, reps: 0, pause_sec: 0 })

export function ProgramDetail({ onSubmit }: { onSubmit: (program: Program) => void }) {
    const [programName, setProgramName] = useState("")
    const [exercises, setExercises] = useState<Exercise[]>([emptyExercise()])

    const updateName = (index: number, text: string) =>
        setExercises(prev => prev.map((e, i) => (i === index ? { ...e, exercise_name: text } : e)))

    const updateNumber = (index: number, field: "sets" | "reps" | "pause_sec", text: string) =>
        setExercises(prev => prev.map((e, i) =>
            i === index ? { ...e, [field]: Number(text.replace(/[^0-9]/g, "")) } : e))

    const handleSave = () => {
        const incomplete = exercises.some(
            e => !e.exercise_name.trim() || !e.sets || !e.reps || !e.pause_sec
        )

        if (!programName.trim() || incomplete) {
            Alert.alert("Alle Felder müssen ausgefüllt sein!")
            return
        }
        onSubmit({
            programName: programName.trim(),
            status: "In Progress",
            exercises_list: exercises.map(e => ({ ...e, exercise_name: e.exercise_name.trim() })),
        })

    }


    const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: "#000000",
                paddingHorizontal: 16,
                paddingTop: 16
            },
            program_input: {
                backgroundColor: "#0a0a0a",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: "bold",
                letterSpacing: 0.5,
                paddingVertical: 16,
                paddingHorizontal: 18,
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: "#ffffff",
                marginBottom: 12
            },
            exercise_card: {
                backgroundColor: "#0a0a0a",
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "#2a2a2a",
                paddingVertical: 12,
                paddingHorizontal: 8,
                marginVertical: 8
            },
            text_input: {
                backgroundColor: "#111111",
                color: "#ffffff",
                fontSize: 16,
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#2a2a2a",
                margin: 8
            },
            numeric_inputs_style: {
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                gap: 12,
                paddingHorizontal: 8,
                paddingBottom: 4
            },
            text_input_num: {
                flex: 1,
                backgroundColor: "#111111",
                color: "#ffffff",
                fontSize: 15,
                textAlign: "center",
                paddingVertical: 14,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#2a2a2a"
            },
            add_save_buttons: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 20,
                gap: 24
            },
            round_button: {
                width: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 22,
                borderWidth: 1.5,
                borderColor: "#ffffff",
                backgroundColor: "#0a0a0a",
                shadowColor: "#ffffff",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 8
            }
        }
    )

    return (
        <View style={styles.container}>
            <TextInput style={styles.program_input}
                onChangeText={setProgramName}
                placeholderTextColor="#6a6a6a"
                placeholder="Programm Name eingeben"
            />
            {exercises.map((ex, index) => (
                <View key={index} style={styles.exercise_card}>
                    <TextInput style={styles.text_input}
                        value={ex.exercise_name}
                        onChangeText={t => updateName(index, t)}
                        placeholder={`${index + 1}. Übung Name`}
                        placeholderTextColor="#6a6a6a"
                    />
                    <View style={styles.numeric_inputs_style}>
                        <TextInput style={styles.text_input_num}
                            onChangeText={t => updateNumber(index, "sets", t)}
                            placeholder="Sätze"
                            keyboardType="numeric"
                            placeholderTextColor="#6a6a6a"
                        />
                        <TextInput style={styles.text_input_num}
                            onChangeText={t => updateNumber(index, "reps", t)}
                            keyboardType="numeric"
                            placeholder="Wdh."
                            placeholderTextColor="#6a6a6a"
                        />
                        <TextInput style={styles.text_input_num}
                            onChangeText={t => updateNumber(index, "pause_sec", t)}
                            keyboardType="numeric"
                            placeholder="Pause (sec)"
                            placeholderTextColor="#6a6a6a"
                        />
                    </View>
                </View>
            ))}
            <View style={styles.add_save_buttons}>
                <Pressable style={styles.round_button} onPress={() => setExercises(prev => [...prev, emptyExercise()])}>
                    <AppText style={{ color: "#ffffff", fontWeight: "bold", fontSize: 36 }}>+</AppText>
                </Pressable>
                <Pressable style={styles.round_button} onPress={handleSave}>
                    <Ionicons size={32} name="save" color="#ffffff" />
                </Pressable>
            </View>

        </View>
    )
}
