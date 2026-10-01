import { ExerciseProvider } from '@/context/ExerciseContext';
import { ProgramProvider } from '@/context/ProgramContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const router = useRouter()
  return (
    <ExerciseProvider>
      <ProgramProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              title: "Home Page",
              headerRight: () => <Pressable onPress={() => { router.navigate("/addProgram") }}>
                <Ionicons name="add" size={24} color="#e80303" />
              </Pressable>
            }}
          />
          <Stack.Screen
            name='program_overview'
            options={{
              title: "Programm Übersicht",
              headerLeft: () => <Pressable onPress={() => router.push("/")}><Ionicons size={32} name='home' /></Pressable>
            }}
          />
          <Stack.Screen
          name="addProgram"
          options={{
            title: "Neues Programm",
            presentation: "modal"
          }}
        />
        </Stack>
      </ProgramProvider>
    </ExerciseProvider>

  );
}
