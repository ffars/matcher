import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import appContext from "../../AppContext";
import UserCard from "../../components/UserCard/UserCard";
import { db } from "../../firebase";

export default function ManageEvent({ route }) {
    const appState = useContext(appContext)

    const [event, setEvent] = useState({});
    const [usersApplied, setUsersApplied] = useState([]);
    const [usersApproved, setUsersApproved] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('focused get data MANAGE EVENT');
            fetchData();
        })
    }, [])

    const fetchData = async () => {
        const id = route.params.id;
        try {
            const res = await getDoc(doc(db, 'events', id));
            let fetchedEvent = res.data();
            setEvent((fetchedEvent));

            setUsersApplied([]);

            for(const id of fetchedEvent.applicants){
                const q = query(collection(db, 'usersData'), where('userId', '==', id))
                try{
                    const res = await getDocs(q)

                    res.forEach(doc => {
                        const data = doc.data();
                        setUsersApplied(prev => prev.concat(data))
                    })
                }catch (err){
                    console.log(err)
                }
            }

            setUsersApproved([])

            for(const id of fetchedEvent.approved){
                const q = query(collection(db, 'usersData'), where('userId', '==', id))
                try{
                    const res = await getDocs(q)

                    res.forEach(doc => {
                        const data = doc.data();
                        setUsersApproved(prev => prev.concat(data))
                    })
                }catch (err){
                    console.log(err)
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    const approveApplicant = async(userId) => {
        const newEvent = {...event};
        newEvent.applicants = newEvent.applicants.filter(id => id != userId)
        newEvent.approved.push(userId)
        console.log(newEvent)

        await updateDoc(doc(db, 'events', route.params.id), {
            ...newEvent
        })

        fetchData();
    }

    const rejectApplicant = async(userId, arr) => {
        const newEvent = {...event};
        newEvent[arr] = newEvent[arr].filter(id => id != userId)
        await updateDoc(doc(db, 'events', route.params.id), {
            ...newEvent
        })

        fetchData();
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={styles.title}>Applicants</Text>
            <ScrollView>
                {usersApplied.length == 0 && <Text style={styles.message}>Nothing to show</Text>}
                {usersApplied.map(user => {
                    return <UserCard id={user.userId} name={`${user.name || ''} ${user.surname || ''}`} email={user.email} description={user.description} rejectApplicant={rejectApplicant} approveApplicant={approveApplicant}  />
                })}
                <Text style={styles.title}>Approved</Text>
                {usersApproved.length == 0 && <Text style={styles.message}>Nothing to show</Text>}
                {usersApproved.map(user => {
                    return (
                        <UserCard id={user.userId} name={`${user.name || ''} ${user.surname || ''}`} email={user.email} description={user.description} noApprove rejectApplicant={rejectApplicant} approveApplicant={approveApplicant}  />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
})
