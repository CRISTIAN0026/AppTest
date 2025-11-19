import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { auth, db } from "../config/firebase";

export default function CreateOfferScreen({ navigation }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    unit: "porciones",
    isDonation: false,
    pickupStart: "",
    pickupEnd: "",
  });

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.quantity ||
      !form.pickupStart ||
      !form.pickupEnd
    ) {
      return Alert.alert("Error", "Completa todos los campos obligatorios.");
    }
    try {
      await addDoc(collection(db, "offers"), {
        title: form.title,
        description: form.description,
        price: form.isDonation ? 0 : Number(form.price),
        quantity: Number(form.quantity),
        unit: form.unit,
        isDonation: form.isDonation,
        pickupWindowStart: new Date(form.pickupStart).toISOString(),
        pickupWindowEnd: new Date(form.pickupEnd).toISOString(),
        ownerId: auth.currentUser.uid,
        status: "active",
        createdAt: new Date().toISOString(),
      });
      Alert.alert("Éxito", "Oferta creada correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la oferta.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Nueva oferta</Text>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={form.title}
        onChangeText={(title) => setForm({ ...form, title })}
      />
      <TextInput
        placeholder="Descripción"
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={form.description}
        onChangeText={(description) => setForm({ ...form, description })}
      />
      {!form.isDonation && (
        <TextInput
          placeholder="Precio (MXN)"
          style={styles.input}
          keyboardType="decimal-pad"
          value={form.price}
          onChangeText={(price) => setForm({ ...form, price })}
        />
      )}
      <TextInput
        placeholder="Cantidad"
        style={styles.input}
        keyboardType="numeric"
        value={form.quantity}
        onChangeText={(quantity) => setForm({ ...form, quantity })}
      />
      <TextInput
        placeholder="Unidad (porciones, kg, etc.)"
        style={styles.input}
        value={form.unit}
        onChangeText={(unit) => setForm({ ...form, unit })}
      />
      <View style={styles.switchRow}>
        <Text>¿Es donación?</Text>
        <Switch
          value={form.isDonation}
          onValueChange={(isDonation) => setForm({ ...form, isDonation })}
        />
      </View>
      <TextInput
        placeholder="Inicio retiro (YYYY-MM-DD HH:mm)"
        style={styles.input}
        value={form.pickupStart}
        onChangeText={(pickupStart) => setForm({ ...form, pickupStart })}
      />
      <TextInput
        placeholder="Fin retiro (YYYY-MM-DD HH:mm)"
        style={styles.input}
        value={form.pickupEnd}
        onChangeText={(pickupEnd) => setForm({ ...form, pickupEnd })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#fff" },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2E7D32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
