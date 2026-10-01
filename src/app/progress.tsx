import { AppText } from "@/components/AppText";
import { useProgram } from "@/context/ProgramContext";
import { StyleSheet, View } from "react-native";

export default function Progress() {
    const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: "black",
                paddingHorizontal: 20,
                paddingTop: 24
            },
            title: {
                fontSize: 34,
                fontWeight: "900",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#FFFFFF",
                paddingBottom: 14,
                marginBottom: 24,
                borderBottomWidth: 3,
                borderBottomColor: "#FFFFFF"
            },
            stat_card_done: {
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#FFFFFF",
                paddingVertical: 24,
                paddingHorizontal: 22,
                marginBottom: 16
            },
            stat_card_progress: {
                backgroundColor: "#000000",
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#FFFFFF",
                paddingVertical: 24,
                paddingHorizontal: 22
            },
            stat_text_done: {
                fontSize: 24,
                fontWeight: "800",
                letterSpacing: 0.6,
                color: "#000000"
            },
            stat_text_progress: {
                fontSize: 24,
                fontWeight: "800",
                letterSpacing: 0.6,
                color: "#FFFFFF"
            }
        }
    )
    const { programList } = useProgram()
    const doneCount = programList.filter(p => p.status === "Done").length
    const inProgressCount = programList.filter(p => p.status === "In Progress").length

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Fortschritt</AppText>
            <View style={styles.stat_card_done}>
                <AppText style={styles.stat_text_done}>Done: {doneCount}</AppText>
            </View>
            <View style={styles.stat_card_progress}>
                <AppText style={styles.stat_text_progress}>In Progress: {inProgressCount}</AppText>
            </View>
        </View>
        )
}