import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import LoginScreen from "../../screens/Auth/LoginScreen";
import RegisterScreen from "../../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigation({ setUser }) {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" options={{ title: 'Login' }}>
                    {(props) => <LoginScreen {...props} setUser={setUser} />}
                </Stack.Screen>
                <Stack.Screen name="Register" options={{ title: 'Register' }} component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
