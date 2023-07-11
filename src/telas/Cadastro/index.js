import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");

  async function realizarCadastro() {
    if (email == "") {
      setMensagemError("Insira um email válido");
      setStatusError("email");
    } else if (senha == "") {
      setMensagemError("Insira uma senha válida");
      setStatusError("senha");
    } else if (confirmaSenha == "") {
      setMensagemError("Insira uma senha válida");
      setStatusError("confirmaSenha");
    } else if (senha !== confirmaSenha) {
      setMensagemError("As senhas não conferem");
      setStatusError("confirmaSenha");
    } else {
      const resultado = await cadastrar(email, senha);

      if (resultado == "sucesso") {
        Alert.alert("Usuário cadastrado com sucesso");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
        setMensagemError("");
        setStatusError("");
      } else {
        setStatusError("firebase");
        setMensagemError(resultado);
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        error={statusError == "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={(texto) => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError == "confirmaSenha"}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == "firebase"}
        setError={setStatusError}
      />

      <Botao
        onPress={() => {
          realizarCadastro();
        }}
      >
        CADASTRAR
      </Botao>
    </View>
  );
}
