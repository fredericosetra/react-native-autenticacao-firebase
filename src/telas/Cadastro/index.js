import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";
import { alteraDados } from "../../utils/comuns";

export default function Cadastro({ navigation }) {
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  async function realizarCadastro() {
    if (dados.email == "") {
      setMensagemError("Insira um email válido");
      setStatusError("email");
    } else if (dados.senha == "") {
      setMensagemError("Insira uma senha válida");
      setStatusError("senha");
    } else if (dados.confirmaSenha == "") {
      setMensagemError("Insira uma senha válida");
      setStatusError("confirmaSenha");
    } else if (dados.senha !== dados.confirmaSenha) {
      setMensagemError("As senhas não conferem");
      setStatusError("confirmaSenha");
    } else {
      const resultado = await cadastrar(dados.email, dados.senha);

      if (resultado == "sucesso") {
        Alert.alert("Usuário cadastrado com sucesso");

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
        value={dados.email}
        onChangeText={(valor) => alteraDados("email", valor, dados, setDados)}
        error={statusError == "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={(valor) => alteraDados("senha", valor, dados, setDados)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={(valor) =>
          alteraDados("confirmaSenha", valor, dados, setDados)
        }
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
