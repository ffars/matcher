import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from 'react'
import { ScrollView, Text, View, TextInput, StyleSheet, Button, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc } from 'firebase/firestore/lite'
import AppContext from "../../../AppContext";
import { db } from "../../../firebase";

export default function NewEventScreen() {

    const appState = useContext(AppContext);
    const navigation = useNavigation();

    const [name, setName] = React.useState('');
    const [sport, setSport] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [city, setCity] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = React.useState('');
    const [special, setSpecial] = React.useState('');

    const handleDateChanged = (_, date) => {
        setDate(date)
    }

    const handleSubmit = async () => {
        const newEvent = {
            name,
            sport,
            description,
            cost,
            city,
            date,
            duration,
            special,
            userId: appState.user.id,
            applicants: [],
            comments: [],
            approved: []
        }

        await addDoc(collection(db, 'events'), {
            ...newEvent
        })

        navigation.navigate('List')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'} style={ { flex: 1 } }>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.title}>New Event</Text>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                value={name}
                                placeholder={'Name'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Sport</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setSport}
                                value={sport}
                                placeholder={'Sport'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.multiTextInput}
                                onChangeText={setDescription}
                                value={description}
                                multiline
                                numberOfLines={10}
                                placeholder={'Description'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Cost in BAM</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setCost}
                                value={cost}
                                keyboardType={'numeric'}
                                placeholder={'Cost in BAM'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setCity}
                                value={city}
                                placeholder={'City'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Location / Address</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setLocation}
                                value={location}
                                placeholder={'Location / Address'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Date & Time</Text>
                            <DateTimePicker mode={'datetime'} onChange={handleDateChanged} value={date} />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Duration (hours)</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setDuration}
                                value={duration}
                                keyboardType={'numeric'}
                                placeholder={'Duration (hours)'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Skill level required</Text>
                            <TextInput
                                style={styles.multiTextInput}
                                onChangeText={setSpecial}
                                value={special}
                                multiline
                                numberOfLines={10}
                                placeholder={'Skill level required'}
                            />
                        </View>

                        <Button onPress={handleSubmit} title={"Create New"} />
                    </ScrollView>
                </View>
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
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputBox: {
        margin: 12,
    },
    label: {
        fontWeight: 'bold',
        color: '#3C5A99',
        marginBottom: 10,
        marginLeft: 10
    },
    input: {
        borderRadius: 18,
        padding: 12,
        borderWidth: 2,
        borderColor: '#3C5A99',
        color: '#3C5A99'
    },
    multiTextInput: {
        height: 120,
        marginTop: 10,
        borderRadius: 18,
        padding: 12,
        borderWidth: 2,
        borderColor: '#3C5A99',
        color: '#3C5A99'
    },
});
