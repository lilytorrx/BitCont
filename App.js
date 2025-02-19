import { React, useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Modal, TextInput, TouchableOpacity } from "react-native";

import PrecoAtual from "./src/components/precoAtual";
import HistoricoGrafico from "./src/components/historicoGrafico";
import ListaCotacao from "./src/components/listaCotacao";

function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

function url(qtdDias) {
  const data = new Date();
  data.setDate(data.getDate() - qtdDias);
  return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${qtdDias}&interval=daily`;
}

async function getPrecoMoedas(url) {
  try {
    let response = await fetch(url);
    let returnAPI = await response.json();

  
    if (!returnAPI.prices || !Array.isArray(returnAPI.prices)) {
      throw new Error("A API não retornou dados válidos de 'prices'.");
    }

    let selecionarListaCotacoes = returnAPI.prices;
    const queryListaMoedas = selecionarListaCotacoes.map((item) => {
      let date = new Date(item[0]);
      let formattedDate = `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;
      return {
        data: formattedDate,
        valor: item[1],
      };
    });

    let data = queryListaMoedas.reverse();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return [];
  }
}

async function getPrecoMoedasGrafico(url) {
  try {
    let respondeGrafico = await fetch(url);
    let returnAPIGrafico = await respondeGrafico.json();

    if (!returnAPIGrafico.prices || !Array.isArray(returnAPIGrafico.prices)) {
      throw new Error("A API não retornou dados válidos de 'prices' para o gráfico.");
    }

    let selecionarListaCotacoesGrafico = returnAPIGrafico.prices;
    const queryListaMoedasGrafico = selecionarListaCotacoesGrafico.map((item) => item[1]);

    let dataGrafico = queryListaMoedasGrafico;
    return dataGrafico;
  } catch (error) {
    console.error("Erro ao buscar dados para o gráfico:", error);
    return [];
  }
}

export default function App() {
  const [listaMoedas, setListaMoedas] = useState([]);
  const [listaGraficoMoedas, setListaGraficoMoedas] = useState([0]);
  const [dias, setDias] = useState(30);
  const [atualizarData, setAtualizarData] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeInput, setNomeInput] = useState("");

  useEffect(() => {
    if (nomeUsuario === "") {
      setModalVisible(true); // Exibe o modal para o nome
    }

    const fetchData = async () => {
      console.log("Requisitando dados com filtro de dias:", dias);

      try {
        const data = await getPrecoMoedas(url(dias));
        console.log("Dados da API (Cotações):", data);
        setListaMoedas(data);

        const dataGrafico = await getPrecoMoedasGrafico(url(dias));
        console.log("Dados da API (Gráfico):", dataGrafico);
        setListaGraficoMoedas(dataGrafico);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [atualizarData, nomeUsuario, dias]); // Faz a requisição apenas se 'dias' mudar ou se 'atualizarData' for alterado.

  const ultimaCotacao = listaMoedas.length > 0 ? listaMoedas[0].valor : "Carregando...";

  const handleConfirmarNome = () => {
    setNomeUsuario(nomeInput);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="#2B73F0" barStyle="light-content" />
      <Text style={styles.bitCont}>
        Olá, <Text style={styles.nomeUsuario}>{nomeUsuario || "Carregando..."}!</Text>
        <Text> Bem-vinde ao BitCont</Text>
      </Text>
      <PrecoAtual ultimaCotacao={ultimaCotacao} />
      <Text style={styles.historico}>Histórico e gráfico de cotações</Text>
      <HistoricoGrafico infoDataGrafico={listaGraficoMoedas} />
      <Text styles={styles.historico}>Desenvolvido por lilytorrx</Text>
      <ListaCotacao filtroDia={setDias} listaTransacoes={listaMoedas} />

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Qual é o seu nome?</Text>
            <TextInput
              placeholder="Digite seu nome"
              value={nomeInput}
              onChangeText={setNomeInput}
              style={styles.modalInput}
            />
            <View style={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
              <TouchableOpacity style={styles.botaoNomeConfirmar} title="Confirmar" onPress={handleConfirmarNome}>
                <Text style={styles.textoBotao}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: Platform.OS === "Android" ? 40 : 0,
  },
  bitCont: {
    color: "#FFF",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  nomeUsuario: {
    color: "#2B73F0",
  },
  historico: {
    color: "#2B73F0",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botaoNome: {
    width: 120,
    flexDirection: "row",
    backgroundColor: "#2B73F0",
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10
  },
  textoBotao:  {
    color: "#fff"
  },
  botaoNomeConfirmar: {
    width: 120,
    backgroundColor: "#37D33F",
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10
  },
});
