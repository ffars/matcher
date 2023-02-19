import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import appContext from "../../AppContext";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from 'firebase/firestore/lite'
import MyEventCard from "../EventCard/MyEventCard";

export default function MyEventsList() {

    const appState = useContext(appContext)

    const navigation = useNavigation();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focused get data MY EVENTS LIST');
            fetchData();
        })
    }, [])

    const fetchData = async () => {
        const userId = appState.user.id;

        const q = query(collection(db, 'events'), where('userId', '==', userId))

        const res = await getDocs(q);

        const list = res.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        console.log(list)
        setEvents(list);
    }

    const detailsNavigate = (id) => {
        setEvents([]);
        navigation.navigate('ManageEvent', { id })
    }

    const infoNavigate = (id) => {
        setEvents([]);
        navigation.navigate('EventDetails', {id})
    }

    return (
        <View style={styles.container}>
            {events.length === 0 && <View>
                <Text style={{ textAlign: 'center' }}>Nothing to show for now...</Text>
            </View>}
            {events.map((event) => {
                const dateObject = event.date.toDate();
                const date = `${dateObject.toLocaleDateString('en-de')} ${dateObject.toLocaleTimeString('en-de', {hour: '2-digit', minute: '2-digit'})}`;

                return <MyEventCard infoNavigate={infoNavigate} count={event.applicants.length} cost={event.cost} detailsNavigate={detailsNavigate} key={event.id} id={event.id} sport={event.sport} city={event.city} dateTime={date} description={event.description}  />
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        paddingHorizontal: 15,
        flex: 1,
    },
});
