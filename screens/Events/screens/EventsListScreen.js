import { ScrollView, View } from "react-native";
import EventsList from "../../../components/EventsList/EventsList";

export default function EventsListScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
            <ScrollView>
                <EventsList />
            </ScrollView>
        </View>
    )
}
