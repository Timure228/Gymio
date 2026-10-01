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
                backgroundColor: "black"
            },
            text_input: {
                backgroundColor: "white",
                margin: 8
            },
            numeric_inputs_style: {
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                gap: 24
            },
            text_input_num: {
                backgroundColor: "white",
                width: 90
            },
            add_save_buttons: {
                flexDirection: "row",
                alignItems: "center",
                margin: 14,
                gap: 60
            }
        }
    )

    return (
        <View style={styles.container}>
            <TextInput style={{ backgroundColor: "white" }}
                onChangeText={setProgramName}
                placeholderTextColor="#959595"
                placeholder="Programm Name eingeben"
            />
            {exercises.map((ex, index) => (
                <View key={index}>
                    <TextInput style={styles.text_input}
                        value={ex.exercise_name}
                        onChangeText={t => updateName(index, t)}
                        placeholder={`${index + 1}. Übung Name`}
                        placeholderTextColor="#959595"
                    />
                    <View style={styles.numeric_inputs_style}>
                        <TextInput style={styles.text_input_num}
                            onChangeText={t => updateNumber(index, "sets", t)}
                            placeholder="Sätze"
                            keyboardType="numeric"
                            placeholderTextColor="#959595"
                        />
                        <TextInput style={styles.text_input_num}
                            onChangeText={t => updateNumber(index, "reps", t)}
                            keyboardType="numeric"
                            placeholder="Wdh."
                            placeholderTextColor="#959595"
                        />
                        <TextInput style={styles.text_input_num}
                            onChangeText={t => updateNumber(index, "pause_sec", t)}
                            keyboardType="numeric"
                            placeholder="Pause (sec)"
                            placeholderTextColor="#959595"
                        />
                    </View>
                </View>
            ))}
            <View style={styles.add_save_buttons}>
                <Pressable onPress={() => setExercises(prev => [...prev, emptyExercise()])}>
                    <AppText style={{ color: "green", fontWeight: "bold", fontSize: 44 }}>+</AppText>
                </Pressable>
                <Pressable onPress={handleSave}>
                    <Ionicons size={36} name="save" color="#2941db" />
                </Pressable>
            </View>

        </View>
    )
}