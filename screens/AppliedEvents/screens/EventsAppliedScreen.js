import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import appContext from "../../../AppContext";
import EventCard from "../../../components/EventCard/EventCard";
import MyEventCard from "../../../components/EventCard/MyEventCard";
import { db } from "../../../firebase";

export default function EventsAppliedScreen() {

    const appState = useContext(appContext)

    const navigation = useNavigation();

    const [eventsApplied, setEventsApplied] = useState([]);
    const [eventsApproved, setEventsApproved] = useState([]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focused get data Events Applied Screen');
            fetchData();
        })
    }, [])

    const fetchData = async () => {
        const userId = appState.user.id;

        const qApplied = query(collection(db, 'events'), where('applicants', 'array-contains', userId))
        const resApplied = await getDocs(qApplied);
        const listApplied = resApplied.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        setEventsApplied(listApplied)

        const qApproved = query(collection(db, 'events'), where('approved', 'array-contains', userId))
        const resApproved = await getDocs(qApproved);
        const listApproved = resApproved.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        setEventsApproved(listApproved)
    }

    const detailsNavigate = (id) => {
        setEventsApplied([]);
        setEventsApproved([]);
        navigation.navigate('EventDetails', { id })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Approved Participation</Text>
                    {eventsApproved.length === 0 && <View>
                        <Text style={{ textAlign: 'center' }}>Nothing to show for now...</Text>
                    </View>}
                    {eventsApproved.map((event) => {
                        const dateObject = event.date.toDate();
                        const date = `${dateObject.toLocaleDateString('en-de')} ${dateObject.toLocaleTimeString('en-de', {hour: '2-digit', minute: '2-digit'})}`;

                        return <EventCard alreadyApplied cost={event.cost} detailsNavigate={detailsNavigate} key={event.id} id={event.id} sport={event.sport} city={event.city} dateTime={date} description={event.description}  />
                    })}

                    <Text style={styles.title}>Pending Approval</Text>
                    {eventsApplied.length === 0 && <View>
                        <Text style={{ textAlign: 'center' }}>Nothing to show for now...</Text>
                    </View>}
                    {eventsApplied.map((event) => {
                        const dateObject = event.date.toDate();
                        const date = `${dateObject.toLocaleDateString('en-de')} ${dateObject.toLocaleTimeString('en-de', {hour: '2-digit', minute: '2-digit'})}`;

                        return <EventCard alreadyApplied cost={event.cost} detailsNavigate={detailsNavigate} key={event.id} id={event.id} sport={event.sport} city={event.city} dateTime={date} description={event.description}  />
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    message: {
        textAlign: "center",
        marginBottom: 10
    }
});

