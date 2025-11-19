import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db } from "../config/firebase";

export default function OfferDetailScreen({ route, navigation }) {
  const { offerId } = route.params;
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      const docRef = doc(db, "offers", offerId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setOffer({ id: snapshot.id, ...snapshot.data() });
      }
    };
    fetchOffer();
  }, [offerId]);

  const handleReserve = async () => {
    if (!auth.currentUser) return navigation.navigate("Login");
    try {
      await addDoc(collection(db, "reservations"), {
        offerId: offer.id,
        userId: auth.currentUser.uid,
        quantity: 1,
        type: offer.isDonation ? "donationRequest" : "purchase",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      await updateDoc(doc(db, "offers", offer.id), { status: "reserved" });
      Alert.alert(
        "Éxito",
        "Reserva enviada. Espera la confirmación del comercio."
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo completar la reserva.");
    }
  };

  if (!offer) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {offer.imageUrl && (
        <Image source={{ uri: offer.imageUrl }} style={styles.image} />
      )}
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.description}>{offer.description}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.value}>
          {offer.isDonation ? "Donación" : `$${offer.price}`}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Cantidad:</Text>
        <Text style={styles.value}>
          {offer.quantity} {offer.unit}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Retiro:</Text>
        <Text style={styles.value}>
          {new Date(offer.pickupWindowStart).toLocaleString()} -{" "}
          {new Date(offer.pickupWindowEnd).toLocaleTimeString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleReserve}>
        <Text style={styles.buttonText}>
          {offer.isDonation ? "Solicitar donación" : "Reservar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#fff" },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: "700", color: "#2E7D32", marginBottom: 8 },
  description: { fontSize: 16, color: "#555", marginBottom: 16 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontWeight: "600", color: "#444" },
  value: { color: "#333" },
  button: {
    backgroundColor: "#FBC02D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontWeight: "bold", fontSize: 16 },
});
