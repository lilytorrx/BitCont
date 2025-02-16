import React from "react"
import { View, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import styles from "./style"

export default function HistoricoGrafico(props) {
    return (
        <View>
            <LineChart style={styles.grafico} data={{
                datasets: [{
                    data: props.infoDataGrafico
                }]
            }
            }
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            withVerticalLines={false}
            yLabelsOffset={1}
            withVerticalLabels={false}
            chartConfig={{
                backgroundColor: "#000",
                backgroundGradientFrom: "#232323",
                backgroundGradientTo: "#3F3F3F",
                decimalPlaces: 0,
                color: (opacity = 1 ) => `rgba(255,255,255, 0.890)`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                    r: "1",
                    strokeWidth: "1",
                    stroke: "#2B73F0",
                }
            }} bezier/>
        </View>
    )
}