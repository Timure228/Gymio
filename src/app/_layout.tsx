import { ExerciseProvider } from '@/context/ExerciseContext';
import { ProgramProvider } from '@/context/ProgramContext';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <ExerciseProvider>
      <ProgramProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              title: "Home Page"
            }}
          />
          <Stack.Screen
            name='program_overview'
            options={{
              title: "Programm Übersicht"
            }}
          />
        </Stack>
      </ProgramProvider>
    </ExerciseProvider>

  );
}
