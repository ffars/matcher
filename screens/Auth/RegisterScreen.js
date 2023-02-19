import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { authentication, db } from "../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore/lite'

export default function RegisterScreen() {

    const navigation = useNavigation();

    const [error, setError] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registrationHandler = async () => {
        if(password !== confirmPassword) {
            setError('Password do not match');
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(authentication, email, password);

            await addDoc(collection(db, 'usersData'), {
                userId: res.user.uid,
                email: res.user.email
            })

            navigation.navigate('Login');
        } catch (err){
            setError(err.message)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'} style={ { flex: 1 } }>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder={'Email'}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            secureTextEntry
                            value={password}
                            placeholder={'Password'}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder={'Confirm Password'}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={registrationHandler}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 30,
        backgroundColor: 'white',
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
    button: {
        backgroundColor: '#3C5A99',
        borderRadius: 8,
        padding: 12,
        margin: 12,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    errorBox: {
        padding: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }
})
