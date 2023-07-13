import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { logar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";
import estilos from "./estilos";
import { auth } from "../../config/firebase";
import animacaoCarregando from "../../../assets/animacaoCarregando.gif";
import { alteraDados } from "../../utils/comuns";
import { entradas } from "./entradas";

export default function Login({ navigation }) {
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });

    return () => estadoUsuario();
  }, []);

  async function relizarlogin() {
    if (dados.email == "") {
      setMensagemError("Email obrigatorio");
      setStatusError("email");
    } else if (dados.senha == "") {
      setMensagemError("A senha é obrigatoria");
      setStatusError("senha");
    } else {
      const resultado = await logar(dados.email, dados.senha);
      console.log(resultado);
      if (resultado == "erro") {
        setStatusError("firebase");
        setMensagemError("Email ou senha não conferem");
      } else {
        navigation.replace("Principal");
      }
    }
  }

  if (carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={animacaoCarregando} style={estilos.imagem} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      {entradas.map((entrada, index) => {
        return (
          <EntradaTexto
            key={index}
            {...entrada}
            value={dados[entrada.name]}
            onChangeText={(valor) =>
              alteraDados(entrada.name, valor, dados, setDados)
            }
            error={statusError == entrada.name}
          />
        );
      })}

      <Alerta
        mensagem={mensagemError}
        error={statusError == "firebase"}
        setError={setStatusError}
      />

      <Botao onPress={() => relizarlogin()}>LOGAR</Botao>
      <Botao
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
