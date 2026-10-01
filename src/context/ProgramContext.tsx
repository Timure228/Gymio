import Program from "@/models/program";
import { createContext, ReactNode, useContext, useState } from "react";
import { useExercise } from "./ExerciseContext";

interface ProgramContextType {
    programList: Program[]
}
const ProgramContext = createContext<ProgramContextType | undefined>(undefined)

export function ProgramProvider({ children }: { children: ReactNode }) {

    const { exerciseList } = useExercise()

    // Define Program List
    const [programList, setProgramList] = useState<Program[]>([
        { programmName: "Super Shredded 8", status: "In Progress", exercises_list: exerciseList[0] },
        { programmName: "Super Heavy", status: "Done", exercises_list: exerciseList[1] }
    ])

    return (
        <ProgramContext.Provider value={{ programList }}>
            {children}
        </ProgramContext.Provider>
    )
}

export function useProgram() {
    const context = useContext(ProgramContext)

    if (!context) {
        throw new Error('useProgram muss innerhalb von ProgramProvider verwendet werden');
    }

    return context;
}
