import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore/lite";
import React, { useContext, useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Platform,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from "react-native";
import appContext from "../../../AppContext";
import { db } from "../../../firebase";

export default function EditUserDetailsScreen() {

    const appState = useContext(appContext)
    const navigation = useNavigation();

    const [detailsId, setDetailsId] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [sport, setSport] = useState('');

    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focused get data EDIT USER DETAILS');
            fetchUserData();
        })
    }, [])

    useEffect(() => {
        setName(userDetails.name || '')
        setSurname(userDetails.surname || '')
        setEmail(userDetails.email || '')
        setCity(userDetails.city || '')
        setDescription(userDetails.description || '')
        setSport(userDetails.sport || '')
    }, [userDetails])

    const fetchUserData = async () => {
        const userId = appState.user.id;

        const q = query(collection(db, 'usersData'), where('userId', '==', userId))

        try{
            const res = await getDocs(q)
            console.log('fetcing user deatil')
            res.forEach(doc => {
                setDetailsId(doc.id)
                const data = doc.data();
                setUserDetails(data);
            })
        }catch (err){
            console.log(err)
        }
    }

    const editUserDetails = async () => {
        const userData = {
            name,
            surname,
            city,
            description,
            sport
        }

        await updateDoc(doc(db, 'usersData', detailsId), {
            ...userDetails,
            ...userData
        })

        navigation.navigate('Details')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'} style={ { flex: 1 } }>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.title}>Edit User Details</Text>
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
                            <Text style={styles.label}>Surname</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setSurname}
                                value={surname}
                                placeholder={'Surname'}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                editable={false}
                                style={styles.input}
                                value={email}
                                placeholder={'Email'}
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
                            <Text style={styles.label}>Sport</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setSport}
                                value={sport}
                                placeholder={'Sport'}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={editUserDetails}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
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
        textAlign: 'center',
        color: '#3C5A99'
    },
    label: {
        fontWeight: 'bold',
        color: '#3C5A99',
        marginBottom: 10,
        marginLeft: 10
    },
    inputBox: {
        margin: 12,
    },
    input: {
        borderRadius: 18,
        padding: 12,
        borderWidth: 2,
        borderColor: '#3C5A99',
        color: '#3C5A99'
    },
    multiTextInput: {
        borderRadius: 18,
        padding: 12,
        borderWidth: 2,
        borderColor: '#3C5A99',
        height: 120,
        color: '#3C5A99'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#3C5A99',
        borderRadius: 8,
        padding: 12,
        margin: 12,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
