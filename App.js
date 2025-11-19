import { NavigationContainer } from "@react-navigation/native";
import useAuth from "./src/hooks/useAuth";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return null; // Aquí puedes mostrar un splash

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
