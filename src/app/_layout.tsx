import { ExerciseProvider } from '@/context/ExerciseContext';
import { ProgramProvider } from '@/context/ProgramContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

const headerButton = {
  width: 38,
  height: 38,
  borderRadius: 19,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  backgroundColor: "#FFFFFF",
  borderWidth: 2,
  borderColor: "#FFFFFF"
}

export default function TabLayout() {
  const router = useRouter()
  return (
    <ExerciseProvider>
      <ProgramProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#000000" },
            headerTintColor: "#FFFFFF",
            headerShadowVisible: false,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "900",
              letterSpacing: 1.5,
              color: "#FFFFFF"
            }
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              title: "Home Page",
              headerRight: () => (
                <Pressable
                  hitSlop={12}
                  style={({ pressed }) => [
                    headerButton,
                    pressed && { backgroundColor: "#000000", transform: [{ scale: 0.9 }] }
                  ]}
                  onPress={() => { router.navigate("/addProgram") }}
                >
                  {({ pressed }) => (
                    <Ionicons name="add" size={26} color={pressed ? "#FFFFFF" : "#000000"} />
                  )}
                </Pressable>
              )
            }}
          />
          <Stack.Screen
            name='program_overview'
            options={{
              title: "Programm Übersicht",
              headerLeft: () => <Pressable style={headerButton} onPress={() => router.push("/")}><Ionicons size={22} name='home' color="#000000" /></Pressable>
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
