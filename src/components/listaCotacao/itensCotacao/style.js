import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conteudoPrincipal: {
        width: "95%",
        height: "auto",
        backgroundColor: "#292929",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    conteudoEsquerda: {
        width: "36%",
        height: "100%",
        alignItems: "flex-start"
    },
    conteudoDireita: {
        width: "60%",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    boxLogo: {
        flexDirection: "row",
        alignItems: "center"
    },
    dataCotacao: {
        fontSize: 16,
        paddingLeft: 2,
        color: "#fff"
    },
    imagemLogo: {
        width: 30,
        height: 30,
        marginLeft: 2,
    },
    preco: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        alignContent: "center",
        marginBottom: -1
    },
    precoConvertido: {
        color: "#fff",
        fontSize: 12
    },
    dolar: {
        color: "#2B73F0"
    }
})

export default styles