import React, { Fragment } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";

import styles from "./style";
import ItensCotacao from "./itensCotacao";

export default function ListaCotacao(props) {
    const queryDias = props.filtroDia;
    const listaTransacoes = props.listaTransacoes;

    console.log("Lista de transações:", listaTransacoes);

    return (
        <Fragment>
        <Text style={styles.selectOpcao}>Selecione a opção de filtragem que deseja ver</Text>
        <View style={styles.filtros}>
            <TouchableOpacity style={styles.botaoFiltro} onPress={() => {
            console.log("Filtro 7 dias clicado");
            queryDias(7);
            }}>
            <Text style={styles.textoBotaoFiltro}>7 dias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoFiltro} onPress={() => {
            console.log("Filtro 15 dias clicado");
            queryDias(15);
            }}>
            <Text style={styles.textoBotaoFiltro}>15 dias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoFiltro} onPress={() => {
            console.log("Filtro 30 dias clicado");
            queryDias(30);
            }}>
            <Text style={styles.textoBotaoFiltro}>1 mês</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <FlatList
            data={listaTransacoes}  
            keyExtractor={(item) => item.data}  
            renderItem={({ item }) => {
                return <ItensCotacao valor={item.valor} data={item.data} />;
            }}
            />
        </ScrollView>
        </Fragment>
    );
    }
