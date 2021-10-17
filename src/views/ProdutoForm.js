import React, { useState, useContext } from "react";
import { Text, TextInput, View, StyleSheet, Button } from 'react-native'

async function updateProduto(produto) {
    await fetch(
        'https://produtos-apirest.herokuapp.com/api/produto',
        {
            method: 'PUT',
            headers:
            {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Alterado com sucesso')
            } else {
                throw new Error('Erro ao consumir a API!');
            }
        })
        .then(response => {
            console.debug(response);
        }).catch(error => {
            console.error(error);
        });
}

async function saveProduto(produto) {
    await fetch(
        'https://produtos-apirest.herokuapp.com/api/produto',
        {
            method: 'POST',
            headers:
            {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Salvo com sucesso')
            } else {
                throw new Error('Erro ao consumir a API!');
            }
        })
        .then(response => {
            console.debug(response);
        }).catch(error => {
            console.error(error);
        });
}

export default ({ route, navigation }) => {
    const [produto, setProduto] = useState(route.params ? route.params : {})
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
                    produto.id ? updateProduto(produto) : saveProduto(produto)
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