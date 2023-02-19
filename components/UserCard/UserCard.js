import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserCard (props) {

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.description}>
                    Email: {props.email}
                </Text>
                <Text style={styles.description}>
                    {props.description}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: 'red', marginRight: 5 }} onPress={() => props.rejectApplicant(props.id, props.noApprove ? 'approved' : 'applicants')}>
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>

                    {!props.noApprove && <TouchableOpacity style={{ ...styles.button, backgroundColor: 'forestgreen', marginLeft: 5 }} onPress={() => props.approveApplicant(props.id)}>
                        <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#EBF5FB',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        borderWidth: 1,
        borderColor: '#3C5A99',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3C5A99',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        color: '#3C5A99',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#3C5A99',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3C5A99',
        borderRadius: 8,
        padding: 12,
        flex: 1,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
