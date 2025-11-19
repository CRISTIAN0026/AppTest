import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateOfferScreen from "../screens/CreateOfferScreen";
import OfferDetailScreen from "../screens/OfferDetailScreen";
import OffersListScreen from "../screens/OffersListScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OffersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OffersList"
        component={OffersListScreen}
        options={{ title: "Ofertas cerca de ti" }}
      />
      <Stack.Screen
        name="OfferDetail"
        component={OfferDetailScreen}
        options={{ title: "Detalle de oferta" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Offers"
        component={OffersStack}
        options={{
          title: "Ofertas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateOffer"
        component={CreateOfferScreen}
        options={{
          title: "Publicar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
