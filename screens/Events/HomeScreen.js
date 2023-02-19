import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "react-native";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import EventsListScreen from "./screens/EventsListScreen";
import NewEventScreen from "./screens/NewEventScreen";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" options={({ navigation }) => ({
                title: 'Events',
                headerRight: () => {
                    return <Button title={"+"} onPress={() => navigation.navigate('CreateNew')} />
                }
            })} component={EventsListScreen} />
            <Stack.Screen name="CreateNew" options={{ title: 'Events' }} component={NewEventScreen} />
            <Stack.Screen name="EventDetails" options={{ title: 'Events' }} component={EventDetailsScreen} />
        </Stack.Navigator>
    )
}
