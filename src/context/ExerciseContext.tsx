import Exercise from "@/models/exercise";
import { createContext, ReactNode, useContext, useState } from "react";

interface ExerciseContextType {
    exerciseList: Exercise[][]
}
const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined)

export function ExerciseProvider({ children }: { children: ReactNode }) {

    // Define Exercise List
    const [exerciseListSuperShredded8, setExerciseListSuperShredded8] = useState<Exercise[]>([
        { exercise_name: "Bankdrücken", reps: 20, sets: 3, pause_sec: 5 }
    ])

    const [exerciseListSuperHeavy, setExerciseListSuperHeavy] = useState<Exercise[]>([
        { exercise_name: "Kniebeugen", reps: 6, sets: 3, pause_sec: 90 }
    ])

    const [exerciseList, setExerciseList] = useState(
        [exerciseListSuperShredded8, exerciseListSuperHeavy]
    )

    return (
        <ExerciseContext.Provider value={{ exerciseList }}>
            {children}
        </ExerciseContext.Provider>
    )
}

export function useExercise() {
    const context = useContext(ExerciseContext)

    if (!context) {
        throw new Error('useExercise muss innerhalb von ProgramProvider verwendet werden');
    }

    return context;
}
