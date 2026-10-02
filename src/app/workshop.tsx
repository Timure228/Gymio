import { AppText } from "@/components/AppText";
import { supabase } from "@/lib/supebase";
import { StyleSheet, View } from "react-native";

export default function workshop() {

    const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: "black"
            }
        }
    )


    supabase.from("workshop_programs").select("*").then(({ data, error }) => {
        console.log(data, error);
    });
    return (
        <View style={styles.container}>
            <AppText>Workshop</AppText>
        </View>
    )
}