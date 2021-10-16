import React, { useState, useContext } from "react";
import { Text, TextInput, View, StyleSheet, Button } from 'react-native'
import ProdutoContext from "../context/ProdutoContext";

export default ({ route, navigation }) => {
    const [produto, setProduto] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(ProdutoContext)
    return (
        <View style={style.form}>
            <Text>Nome</Text>
            <TextInput
                style={style.input}
                onChangeText={nome => setProduto({ ...produto, nome })}
                placeholder="Informe o nome"
                value={produto.nome}
            />
            <Text>Quantidade</Text>
            <TextInput
                style={style.input}
                onChangeText={quantidade => setProduto({ ...produto, quantidade })}
                placeholder="Informe a quantidade"
                keyboardType="numeric"
                value={produto.quantidade ? produto.quantidade.toString() : ''}
            />
            <Text>Valor</Text>
            <TextInput
                style={style.input}
                onChangeText={valor => setProduto({ ...produto, valor })}
                placeholder="Informe o valor"
                keyboardType="numeric"
                value={produto.valor ? produto.valor.toString() : ''}
            />
            <Button
                title="Salvar"
                onPress={() => {
                    dispatch({
                        type: produto.id ? 'updateProduto' : 'createProduto',
                        payload: produto,
                    })
                    navigation.goBack()
                }}
            />

        </View>
    )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
})