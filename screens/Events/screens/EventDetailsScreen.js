import { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View, Alert, TextInput, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore/lite'
import appContext from "../../../AppContext";
import { db } from "../../../firebase";
export default function EventDetailsScreen({ route, navigation }) {

    const appState = useContext(appContext)

    const [event, setEvent] = useState({});

    const [comment, setComment] = useState('');

    const [applied, setApplied] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focused get data EVENT DETAILS');
            fetchEvent();
        })
    }, [])

    const fetchEvent = async () => {
        const id = route.params.id;
        const userId = appState.user.id;

        try{
            const res = await getDoc(doc(db, 'events', id));

            let fetchedEvent = res.data();
            if(fetchedEvent.date){
                const dateObject = fetchedEvent.date.toDate();
                fetchedEvent.date = `${dateObject.toLocaleDateString('en-de')} ${dateObject.toLocaleTimeString('en-de', {hour: '2-digit', minute: '2-digit'})}`
            }
            console.log(fetchedEvent)
            setEvent((fetchedEvent))

            if(fetchedEvent.applicants.includes(userId) || fetchedEvent.approved.includes(userId) || fetchedEvent.userId == userId){
                setApplied(true)
            }
        }catch (err){
            console.log(err)
        }
    }

    const handleApply = async () => {
        const userId = appState.user.id;
        const eventId = route.params.id;

        await updateDoc(doc(db, 'events', eventId), {
            applicants: arrayUnion(userId)
        })

        fetchEvent();
        setApplied(true);
    }

    const addComment = async () => {
        if(!comment) return;

        const userId = appState.user.id;
        const eventId = route.params.id;

        await updateDoc(doc(db, 'events', eventId), {
            comments: [
                ...event.comments,
                {
                    userId,
                    comment
                }
            ]
        })

        fetchEvent();

        setComment('')
    }

    return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'} style={ { flex: 1 } }>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <Text style={styles.title}>Event details</Text>
                        <View style={styles.detailsCard}>
                            <Text style={styles.name}>{ event.name }</Text>
                            <Text style={styles.itemBox}>
                                <Text style={styles.label}>Sport:</Text> { event.sport }
                            </Text>
                            <View style={styles.itemBox}>
                                <Text><Text style={styles.label}>Venue:</Text> { event.city }, { event.location }</Text>
                            </View>
                            <View style={styles.itemBox}>
                                <Text><Text style={styles.label}>Date & Time:</Text> { event.date }</Text>
                            </View>
                            <View style={styles.itemBox}>
                                <Text><Text style={styles.label}>Description:</Text> {event.description}</Text>
                            </View>
                            <View style={styles.itemBox}>
                                <Text><Text style={styles.label}>Duration:</Text> {event.duration} hours</Text>
                            </View>
                            <View style={styles.itemBox}>
                                <Text><Text style={styles.label}>Participation Cost:</Text> {event.cost} KM</Text>
                            </View>
                            <View style={styles.itemBox}>
                                <Text><Text style={styles.label}>Skill level:</Text> {event.special}</Text>
                            </View>
                            <Button
                                title={"Apply"}
                                disabled={applied}
                                onPress={() => {
                                    Alert.alert(
                                        "Applied",
                                        "You have successfully applied for this event",
                                        [
                                            { text: "OK", onPress: handleApply }
                                        ]
                                    );
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: 50 }}>
                            <View style={{ borderWidth: 1, borderColor: '#3C5A99', borderRadius: 18, color: '#3C5A99', padding: 15, marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                                <TextInput value={comment} onChangeText={setComment} placeholder={'Your comment...'} />
                            </View>
                            <Button title={'Submit'} onPress={addComment} />
                            {(event.comments || []).reverse().map(com => {
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBF5FB', padding: 15, marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                                        <View style={{ backgroundColor: 'white', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderWidth: 1, borderColor: event.userId == com.userId ? "black" : 'white' }}>
                                            <Text style={{ fontSize: 30 }}>🧍</Text>
                                        </View>
                                        <Text style={{ marginLeft: 10 }}>
                                            {com.comment}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    detailsCard: {
        backgroundColor: '#EBF5FB',
        padding: 10,
        borderRadius: 8,
        margin: 20,
    },
    name: {
        color: '#3C5A99',
        fontSize: 20,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    label: {
        color: '#3C5A99',
        fontWeight: 'bold'
    },
    itemBox: {
        marginBottom: 10,
    }

})
