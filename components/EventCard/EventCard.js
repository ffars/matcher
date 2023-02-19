import { StyleSheet, Text, View, TouchableOpacity} from "react-native";

export default function EventCard({ sport, special, alreadyApplied, city, dateTime, cost,  description, id, detailsNavigate }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{sport}</Text>
                <Text style={styles.price}>Fee {cost} KM</Text>
                <Text style={styles.description}>
                    Date & Time: {dateTime}
                </Text>
                <Text style={styles.description}>
                    Location: {city}
                </Text>
                <Text style={styles.description}>
                    {description}
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => { detailsNavigate(id) }}>
                    <Text style={styles.buttonText}>{alreadyApplied ? 'Details' : 'Apply'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 30,
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
        width: '100%',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});

