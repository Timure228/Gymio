import { AppText } from "@/components/AppText";
import { useProgram } from "@/context/ProgramContext";
import { supabase } from "@/lib/supebase";
import Program from "@/models/program";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, View } from "react-native";

export default function Workshop() {
    const [workshopList, setWorkshopList] = useState<Program[]>([])
    const [loading, setLoading] = useState(true)
    const [errorText, setErrorText] = useState<string | null>(null)

    const { programList, addProgram } = useProgram()

    const loadWorkshop = useCallback(async () => {
        setLoading(true)
        setErrorText(null)

        const { data, error } = await supabase
            .from("workshop_programs")
            .select("programName, status, exercises_list")
            .order("created_at", { ascending: false })

        if (error) {
            setErrorText(error.message)
        } else {
            setWorkshopList((data ?? []) as Program[])
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        loadWorkshop()
    }, [loadWorkshop])

    const adoptProgram = (program: Program) => {
        const exists = programList.some(p => p.programName === program.programName)
        if (exists) {
            Alert.alert("Schon vorhanden", "Du hast bereits ein Programm mit diesem Namen.")
            return
        }

        // ANNAHME: addProgram nimmt ein Program entgegen
        addProgram({
            programName: program.programName,
            status: "In Progress",
            exercises_list: program.exercises_list ?? []
        })

        Alert.alert("Übernommen", `"${program.programName}" ist jetzt in deiner Liste.`)
    }

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Workshop</AppText>
            <AppText style={styles.subtitle}>Programme von allen</AppText>
            <View style={styles.divider} />

            {errorText && (
                <View style={styles.error_box}>
                    <AppText style={styles.error_text}>Fehler: {errorText}</AppText>
                </View>
            )}

            <FlatList
                data={workshopList}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={loadWorkshop}
                contentContainerStyle={styles.list_content}
                keyExtractor={(item, index) => `workshop-${item.programName}-${index}`}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    ) : (
                        <AppText style={styles.empty_text}>Noch keine Programme veröffentlicht.</AppText>
                    )
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.card_text}>
                            <AppText style={styles.card_title}>{item.programName}</AppText>
                            <AppText style={styles.card_meta}>
                                {(item.exercises_list?.length ?? 0) + " Übungen"}
                            </AppText>
                        </View>
                        <Pressable
                            style={({ pressed }) => [styles.adopt_button, pressed && styles.adopt_button_pressed]}
                            onPress={() => adoptProgram(item)}
                        >
                            {({ pressed }) => (
                                <Ionicons name="download" size={24} color={pressed ? "#FFFFFF" : "#000000"} />
                            )}
                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        paddingHorizontal: 20,
        paddingTop: 16
    },
    title: {
        fontSize: 34,
        fontWeight: "900",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#FFFFFF"
    },
    subtitle: {
        fontSize: 13,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "#8a8a8a",
        marginTop: 4
    },
    divider: {
        height: 3,
        backgroundColor: "#FFFFFF",
        marginTop: 14,
        marginBottom: 18
    },
    list_content: {
        paddingBottom: 40
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 14
    },
    card_text: {
        flex: 1
    },
    card_title: {
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 0.4,
        color: "#000000"
    },
    card_meta: {
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#555555",
        marginTop: 4
    },
    adopt_button: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#000000"
    },
    adopt_button_pressed: {
        backgroundColor: "#000000",
        transform: [{ scale: 0.92 }]
    },
    empty_text: {
        fontSize: 15,
        color: "#8a8a8a",
        textAlign: "center",
        marginTop: 40
    },
    error_box: {
        borderWidth: 2,
        borderColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 14
    },
    error_text: {
        fontSize: 14,
        color: "#FFFFFF"
    }
})
