import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "react-native";
import EditUserDetailsScreen from "./screens/EditUserDetailsScreen";
import UserDetailsScreen from "./screens/UserDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AboutScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Details" options={({ navigation }) => ({
                title: 'About Me',
                headerRight: () => {
                    return <Button title={"📝"} onPress={() => navigation.navigate('EditDetails')} />
                }
            })} component={UserDetailsScreen} />
            <Stack.Screen name="EditDetails" options={{ title: 'About Me' }} component={EditUserDetailsScreen} />
        </Stack.Navigator>
    )
}
