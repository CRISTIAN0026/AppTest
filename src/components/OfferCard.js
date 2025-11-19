import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OfferCard({ offer, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {offer.imageUrl ? (
        <Image source={{ uri: offer.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={{ color: "#666" }}>Sin foto</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.subtitle}>{offer.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {offer.isDonation ? "Donación" : `$${offer.price}`}
          </Text>
          <Text style={styles.quantity}>
            Disponible: {offer.quantity} {offer.unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: 100, height: 100 },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  content: { flex: 1, padding: 12 },
  title: { fontSize: 18, fontWeight: "600", color: "#2E7D32" },
  subtitle: { color: "#555", marginVertical: 4 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontWeight: "bold", color: "#FBC02D" },
  quantity: { color: "#555" },
});
