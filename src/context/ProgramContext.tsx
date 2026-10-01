import Program from "@/models/program";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useExercise } from "./ExerciseContext";


interface ProgramContextType {
    programList: Program[]
    addProgram: (program: Program) => void
    deleteProgram: (programName: string) => void
    updateStatus: (programName: string, status: string) => void
    isLoading: boolean
}
const ProgramContext = createContext<ProgramContextType | undefined>(undefined)

export function ProgramProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    // Define Program List
    const { exerciseList } = useExercise()

    const [programList, setProgramList] = useState<Program[]>([
        { programName: "Super Shredded 8", status: "In Progress", exercises_list: exerciseList[0] },
        { programName: "Super Heavy", status: "Done", exercises_list: exerciseList[1] }
    ])


    useEffect(() => {
        if (isLoading) return
        const savePrograms = async () => {
            try {
                await AsyncStorage.setItem("programList", JSON.stringify(programList))
                console.log("Änderungen Gespeichert")
            } catch (error) {
                console.error("Fehler", error)
            }
        }
        savePrograms()
    }, [programList]);

    useEffect(() => {
        const loadPrograms = async () => {
            try {
                let json = await AsyncStorage.getItem("programList")
                if (json === null) {
                    console.log("Keine gespeicherten Programs (erste Installation)");
                    return;
                }
                try {
                    const parsed = JSON.parse(json);
                    setProgramList(parsed);
                    console.log("Programs Loaded")
                } catch (parseError) {
                    console.error("Ungültiges JSON, starte mit leerer Liste:", parseError);
                }
            } catch (error) {
                console.error("Fehler", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadPrograms()
    }, []);




    const addProgram = (program: Program) => {
        setProgramList(prevList => [...prevList, program])
    }

    const deleteProgram = (programName: string) => {
        setProgramList(programList.filter(program => program.programName !== programName))
    }

    const updateStatus = (programName: string, status: string) => {
        setProgramList(prev =>
            prev.map(p => (p.programName === programName ? { ...p, status } : p))
        )
    }

    return (
        <ProgramContext.Provider value={{ programList, addProgram, deleteProgram, updateStatus, isLoading }}>
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
