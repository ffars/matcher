import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Text } from "react-native";
import AboutScreen from "../../screens/About/AboutScreen";
import AppliedEventsScreen from "../../screens/AppliedEvents/AppliedEventsScreen";
import HomeScreen from "../../screens/Events/HomeScreen";
import MyEventsScreen from "../../screens/MyEvents/MyEventsScreen";

const Tab = createBottomTabNavigator();

export default function InAppNavigation() {

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={'Home'} screenOptions={{headerShown: false}}>
                {/*<Tab.Screen options={{*/}
                {/*    tabBarIcon: () => {*/}
                {/*        return <Text style={{ fontSize: 18 }}>đŠī¸ī¸</Text>*/}
                {/*    }*/}
                {/*}} name={"Activity"} component={ActivitiesScreen} />*/}
                <Tab.Screen options={{
                    tabBarIcon: () => {
                        return <Text style={{ fontSize: 18 }}>đ</Text>
                    }
                }} name={"Events Applied"} component={AppliedEventsScreen} />
                <Tab.Screen options={{
                    tabBarIcon: () => {
                        return <Text style={{ fontSize: 18 }}>đī¸</Text>
                    }
                }} name={"My Events"} component={MyEventsScreen} />
                <Tab.Screen options={{
                    tabBarIcon: () => {
                        return <Text style={{ fontSize: 18 }}>âŊī¸ī¸</Text>
                    }
                }} name={"Home"} component={HomeScreen} />
                <Tab.Screen name={"About Me"} options={{
                    tabBarIcon: () => {return <Text style={{ fontSize: 18 }}>ī¸âšâ</Text>}
                }} component={AboutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
