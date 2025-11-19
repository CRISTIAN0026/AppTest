import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db } from "../config/firebase";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "consumer",
  });

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.name) {
      return Alert.alert("Error", "Todos los campos son obligatorios.");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );
      const { uid } = userCredential.user;
      await setDoc(doc(db, "users", uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const setRole = (role) => setForm((prev) => ({ ...prev, role }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={form.name}
        onChangeText={(name) => setForm({ ...form, name })}
      />
      <TextInput
        placeholder="Correo"
        style={styles.input}
        value={form.email}
        onChangeText={(email) => setForm({ ...form, email })}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(password) => setForm({ ...form, password })}
      />

      <View style={styles.rolesContainer}>
        {["consumer", "commerce", "ngo"].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleChip,
              form.role === role && styles.roleChipActive,
            ]}
            onPress={() => setRole(role)}
          >
            <Text style={styles.roleText}>
              {role === "consumer"
                ? "Consumidor"
                : role === "commerce"
                ? "Comercio"
                : "ONG"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  rolesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleChip: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  roleChipActive: { backgroundColor: "#FBC02D", borderColor: "#FBC02D" },
  roleText: { fontWeight: "600", color: "#333" },
  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#2E7D32", marginTop: 18, textAlign: "center" },
});
