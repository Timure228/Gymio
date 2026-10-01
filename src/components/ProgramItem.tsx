import Program from "@/models/program";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
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

        },
        program_style: {
            fontSize: 18,
            fontWeight: "bold"
        }
    })

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={({ item }) =>
                    <View style={styles.program_card}>
                        <Pressable onPress={() => router.push({
                            pathname: "/program_overview",
                            params: { program_name: item.programmName, status: item.status, exercises_list: JSON.stringify(item.exercises_list) }
                        })}>
                            <AppText style={styles.program_style}>{item.programmName + " (" + item.status + ")"}</AppText>
                        </Pressable>
                    </View>

                }
                keyExtractor={item => `basicListEntry-${item.programmName}`}
                ListEmptyComponent={ListEmptyComponentShow}
            />
        </View>
    )
}
