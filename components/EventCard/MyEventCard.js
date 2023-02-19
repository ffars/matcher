import { StyleSheet, Text, View, TouchableOpacity} from "react-native";

export default function MyEventCard({ sport, city, dateTime, cost,  description, id, detailsNavigate, count, infoNavigate }) {
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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ ...styles.button, marginRight: 5,  }} onPress={() => { detailsNavigate(id) }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.buttonText}>Manage</Text>
                            {count > 0 && <View style={{ width: 25, height: 25, marginLeft: 5, backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    {count}
                                </Text>
                            </View>}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, marginLeft: 5, }} onPress={() => { infoNavigate(id) }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.buttonText}>Details</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        flex: 1
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});

