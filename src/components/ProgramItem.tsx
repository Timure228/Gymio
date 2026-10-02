import { useProgram } from "@/context/ProgramContext";
import { supabase } from "@/lib/supebase";
import Program from "@/models/program";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import ListEmptyComponentShow from "./ListEmptyComponentShow";

interface ProgramItemProps {
    dataSource: Program[]
}

export default function ProgramItem({ dataSource }: ProgramItemProps) {
    const router = useRouter()

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 8,
            paddingTop: 8
        },
        program_card: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
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
        program_title_wrapper: {
            flex: 1
        },
        program_style: {
            fontSize: 18,
            fontWeight: "800",
            letterSpacing: 0.4,
            color: "#000000"
        },
        action_button_done: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            borderWidth: 2,
            borderColor: "#000000"
        },
        action_button_publish: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderWidth: 2,
            borderColor: "#000000"
        },
        action_button_delete: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderWidth: 2,
            borderColor: "#000000"
        }
    })

    const { updateStatus } = useProgram()
    const { deleteProgram } = useProgram()

    const publishProgram = async (program: Program) => {
        const { data: existing, error: checkError } = await supabase
            .from("workshop_programs")
            .select("programName")
            .eq("programName", program.programName)

        if (checkError) {
            Alert.alert("Fehler", checkError.message)
            return
        }

        if (existing && existing.length > 0) {
            Alert.alert("Schon veröffentlicht", "Im Workshop gibt es bereits ein Programm mit diesem Namen.")
            return
        }

        const { error } = await supabase.from("workshop_programs").insert({
            programName: program.programName,
            status: program.status,
            exercises_list: program.exercises_list ?? []
        })

        if (error) {
            Alert.alert("Fehler", error.message)
        } else {
            Alert.alert("Veröffentlicht", `"${program.programName}" ist jetzt im Workshop.`)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                    <View style={styles.program_card}>
                        <Pressable style={styles.program_title_wrapper} onPress={() => router.push({
                            pathname: "/program_overview",
                            params: { program_name: item.programName, status: item.status, exercises_list: JSON.stringify(item.exercises_list) }
                        })}>
                            <AppText style={styles.program_style}>{item.programName + " (" + item.status + ")"}</AppText>
                        </Pressable>
                        <Pressable style={styles.action_button_done} onPress={() => updateStatus(item.programName, "Done")}><Ionicons color="white" size={24} name="checkmark" /></Pressable>
                        <Pressable style={styles.action_button_publish} onPress={() => {
                            Alert.alert('Veröffentlichen',
                                'Dieses Programm im Workshop für alle sichtbar machen?',
                                [
                                    {
                                        text: 'Abbrechen',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Veröffentlichen',
                                        onPress: () => {
                                            publishProgram(item);
                                        }
                                    },
                                ]
                            );
                        }}><Ionicons color="black" size={22} name="cloud-upload" /></Pressable>
                        <Pressable style={styles.action_button_delete} onPress={() => {
                            Alert.alert('Löschen bestätigen',
                                'Möchten Sie diese Vokabel wirklich löschen?',
                                [
                                    {
                                        text: 'Abbrechen',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Löschen',
                                        style: 'destructive',
                                        onPress: () => {
                                            deleteProgram(item.programName);
                                        }
                                    },
                                ]
                            );


                        }

                        }><Ionicons color="black" size={24} name="trash" /></Pressable>
                    </View>
                }
                keyExtractor={item => `basicListEntry-${item.programName}`}
                ListEmptyComponent={ListEmptyComponentShow}
            />
        </View >
    )
}
