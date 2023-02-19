import { useNavigation } from "@react-navigation/native";
import { where, query, getDocs, collection } from "firebase/firestore/lite";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appContext from "../../../AppContext";
import { db } from "../../../firebase";

export default function UserDetailsScreen() {

    const navigation = useNavigation();

    const appState = useContext(appContext)

    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focused get data USER DETAILS');
            fetchUserData();
        })
    }, [])

    const fetchUserData = async () => {
        const userId = appState.user.id;

        const q = query(collection(db, 'usersData'), where('userId', '==', userId))

        try{
            const res = await getDocs(q)

            res.forEach(doc => {
                const data = doc.data();
                setUserDetails(data)
            })
        }catch (err){
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>User Details</Text>
                <Text style={styles.itemBox}>
                    <Text style={styles.label}>Name:</Text> { userDetails.name }
                </Text>
                <Text style={styles.itemBox}>
                    <Text style={styles.label}>Surname:</Text> { userDetails.surname }
                </Text>
                <Text style={styles.itemBox}>
                    <Text style={styles.label}>Email:</Text> { userDetails.email }
                </Text>
                <Text style={styles.itemBox}>
                    <Text style={styles.label}>City:</Text> { userDetails.city }
                </Text>
                <Text style={styles.itemBox}>
                    <Text style={styles.label}>Description:</Text> { userDetails.description }
                </Text>
                <Text style={styles.itemBox}>
                    <Text style={styles.label}>Sports:</Text> { userDetails.sport }
                </Text>

                <TouchableOpacity style={styles.logout} onPress={() => appState.logout()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
    label: {
        fontWeight: 'bold'
    },
    itemBox: {
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    logout: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        marginTop: 50
    },
    logoutText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
