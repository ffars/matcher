import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageEvent from "./ManageEvent";
import MyEventsListScreen from "./MyEventsListScreen";

const Stack = createNativeStackNavigator();

export default function MyEventsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyEventsList" options={{ title: 'My Events' }} component={MyEventsListScreen} />
            <Stack.Screen name="ManageEvent" options={{ title: 'Manage Event' }} component={ManageEvent} />
        </Stack.Navigator>
    )
}
