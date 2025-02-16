import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    filtros: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        paddingVertical: 15,
        justifyContent: "space-evenly",
        gap: -10
    },
    botaoFiltro: {
        width: 90,
        height: 30,
        backgroundColor: "#2B73F0",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    textoBotaoFiltro: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14
    },
    selectOpcao: {
        color: "#fff",
        textAlign: "center",
        margin: "10 0 5 0",
        padding: 10
    }
})

export default styles