import Program from "@/models/program";
import Ionicons from "@react-native-vector-icons/ionicons";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import ListEmptyComponentShow from "./ListEmptyComponentShow";

interface ProgramItemProps {
    dataSource: Program[]
}

export default function ProgramItem({ dataSource }: ProgramItemProps) {
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        program_card: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 24,

        },
        program_name: {
            fontSize: 18,
            fontWeight: "bold"
        }
    })

    return (
        <View style={styles.container}>
            <FlatList data={dataSource}
            renderItem={({item}) => 
                <View style={styles.program_card}>
                    <AppText style={styles.program_name}>{item.programmName + " (" + item.status + ")"}
                    </AppText>
                    <Pressable><Ionicons name="play" size={24} color="#6aff00"/></Pressable>
                </View>
                
            }
            keyExtractor={item => `basicListEntry-${item.programmName}`}
            ListEmptyComponent={ListEmptyComponentShow}
            />
        </View>
    )
}