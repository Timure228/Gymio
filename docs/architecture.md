# Gymio App (Tymur Arduch)
## Komponenten 
* ProgramList
* Progress
* ProgramOverview
* ProgramDetail
* ProgramItem
* ListEmptyComponent

## Navigation
Stack

/  
/programs  
/progress  
/addProgram  
/viewProgram

## Datenmodell
```
Programm
{
    programmName: string,
    status: string
}
Übung
{
    exercise_name: string,
    reps: Number,
    sets: Number,
    pause_sec: Number
}
```
## Side-Effekte
Die Liste mit Programmen und Übungen ist für alles Screens durch Provider gestellt.
