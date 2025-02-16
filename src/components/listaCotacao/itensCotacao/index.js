import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./style";

export default function ItensCotacao(props) {
    return (
        <View style={styles.conteudoPrincipal}>
            <View style={styles.conteudoEsquerda}>
                <View style={styles.boxLogo}>
                    <Image style={styles.imagemLogo} source={require("../../../img/bitcoinLogo.png")}/>
                    <Text style={styles.dataCotacao}> {props.data}</Text>
                </View>
            </View>
            <View style={styles.conteudoDireita}>
                <Text style={styles.preco}> USD <Text style={styles.dolar}>{props.valor.toFixed(2)}</Text></Text>
            </View>
        </View>
    )
}