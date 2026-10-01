import { useProgram } from "@/context/ProgramContext";
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
            flex: 1
        },
        program_card: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            margin: 5,
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 24,
            gap: 16

        },
        program_style: {
            fontSize: 18,
            fontWeight: "bold"
        }
    })

    const { updateStatus } = useProgram()
    const { deleteProgram } = useProgram()

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) =>
                    <View style={styles.program_card}>
                        <Pressable onPress={() => router.push({
                            pathname: "/program_overview",
                            params: { program_name: item.programName, status: item.status, exercises_list: JSON.stringify(item.exercises_list) }
                        })}>
                            <AppText style={styles.program_style}>{item.programName + " (" + item.status + ")"}</AppText>
                        </Pressable>
                        <Pressable onPress={() => updateStatus(item.programName, "Done")}><Ionicons color="yellow" size={24} name="checkmark" /></Pressable>
                        <Pressable onPress={() => {
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

                        }><Ionicons color="red" size={24} name="trash" /></Pressable>
                    </View>
                }
                keyExtractor={item => `basicListEntry-${item.programName}`}
                ListEmptyComponent={ListEmptyComponentShow}
            />
        </View >
    )
}
