import React from "react"
import { View, Text } from "react-native"
import styles from "./style"

export default function PrecoAtual(props) {
    return (
        <View style={styles.cabecalhoPreco}>
            <Text style={styles.textoPreco}>Última cotação</Text>
            <Text style={styles.precoAtual}>USD {props.ultimaCotacao}</Text>
        </View>
    )
}
