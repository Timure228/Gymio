import Exercise from "./exercise"

interface Program {
    programmName: string,
    status: string,
    exercises_list?: Exercise[]
}

export default Program
