import { ProgramDetail } from "@/components/ProgramDetail";
import Program from "@/models/program";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function addProgram() {
    const router = useRouter()
    const handleAdd = (newProgram: Program) => {
        addProgram()
        router.back()
    }  

    return (
        <View style={{flex: 1}}>
            <ProgramDetail/>
        </View>
    )
}