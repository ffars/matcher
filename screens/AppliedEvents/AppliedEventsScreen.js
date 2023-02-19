import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsAppliedScreen from "./screens/EventsAppliedScreen";

const Stack = createNativeStackNavigator();

export default function AppliedEventsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventsApplied" options={({ navigation }) => ({
                title: 'Events Applied',
            })} component={EventsAppliedScreen} />
        </Stack.Navigator>
    )
}
