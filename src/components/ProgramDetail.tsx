import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export function ProgramDetail() {
    const [programName, setProgramName] = useState("")


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
                gap: 44
            },
            text_input_num: {
                backgroundColor: "white",
                margin: 4
            }
        }
    )

    return (
        <View style={styles.container}>
            <TextInput style={{ backgroundColor: "white" }}
                onChangeText={setProgramName}
                placeholderTextColor="#000000"
                placeholder="Programm Name eingeben"
            />
            <View>
                <TextInput style={styles.text_input}
                    placeholder="1. Übung Name"
                    placeholderTextColor="#000000"
                />
                <View style={styles.numeric_inputs_style}>
                    <TextInput style={styles.text_input_num}
                        placeholder="Sätze"
                        keyboardType="numeric"
                        placeholderTextColor="#000000"
                    />
                    <TextInput style={styles.text_input_num}
                        keyboardType="numeric"
                        placeholder="Wdh."
                        placeholderTextColor="#000000"
                    />
                    <TextInput style={styles.text_input_num}
                        keyboardType="numeric"
                        placeholder="Pause (sec)"
                        placeholderTextColor="#000000"
                    />
                </View>

            </View>

        </View>
    )
}