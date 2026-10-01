import { ProgramDetail } from "@/components/ProgramDetail";
import { useProgram } from "@/context/ProgramContext";
import Program from "@/models/program";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function addProgram() {
    const router = useRouter()
    const { addProgram } = useProgram()

    const handleAdd = (newProgram: Program) => {
        addProgram(newProgram)
        router.back()
    }  

    return (
        <View style={{flex: 1}}>
            <ProgramDetail onSubmit={handleAdd}/>
        </View>
    )
}