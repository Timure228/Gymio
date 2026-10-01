import Exercise from "./exercise"

interface Program {
    programName: string,
    status: string,
    exercises_list?: Exercise[]
}

export default Program
