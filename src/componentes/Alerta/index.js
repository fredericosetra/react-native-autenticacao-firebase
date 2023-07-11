import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, error = false, setError }) {
  return (
    <Snackbar
      style={{ backgroundColor: "grey" }}
      visible={error}
      onDismiss={() => setError(false)}
      duration={15500}
      action={{
        label: "OK",
        onPress: () => setError(false),
      }}
    >
      {mensagem}
    </Snackbar>
  );
}
