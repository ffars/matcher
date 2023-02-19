import { ScrollView, View } from "react-native";
import MyEventsList from "../../components/EventsList/MyEventsList";


export default function MyEventsListScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
            <ScrollView>
                <MyEventsList />
            </ScrollView>
        </View>
    )
}
