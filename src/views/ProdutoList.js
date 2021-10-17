import React, { useContext, useState } from "react";
import { View, Text, FlatList, Alert } from 'react-native'
import { Button, Icon, ListItem } from "react-native-elements";

async function getProdutos(jsonState) {
    await fetch('https://produtos-apirest.herokuapp.com/api/produtos')
        .then(response => {
            if (response.status === 200) {
                response.json().then(function (result) {
                    console.log(result);
                    jsonState(result)
                });
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

async function deleteProduto(produto, jsonState) {
    await fetch(
        'https://produtos-apirest.herokuapp.com/api/produto',
        {
            method: 'DELETE',
            headers:
            {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if (response.status === 200) {
                getProdutos(jsonState)
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

export default props => {
    const [produtos, setProdutos] = useState([])
    //getProdutos(setProdutos)

    function confirmUserDeletion(produto) {
        Alert.alert('Excluir Produto', 'Deseja excluir o produto?', [
            {
                text: 'Sim',
                onPress() {
                    deleteProduto(produto, setProdutos)
                }
            },
            {
                text: 'Não'
            }
        ])
    }


    function getProdutoItem({ item: produto }) {
        return (
            <ListItem.Swipeable
                leftContent={
                    <Button
                        title="Editar"
                        icon={{ name: 'edit', color: 'white' }}
                        buttonStyle={{ minHeight: '100%' }}
                        onPress={() => props.navigation.navigate('ProdutoForm', produto)}
                    />
                }
                rightContent={
                    <Button
                        title="Deletar"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        onPress={() => confirmUserDeletion(produto)}
                    />
                }
            >
                <ListItem.Content>
                    <ListItem.Title>{produto.nome}</ListItem.Title>
                    <ListItem.Subtitle>R${produto.valor}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>

        )
    }
    return (
        <View>
            <FlatList
                keyExtractor={produto => produto.id.toString()}
                data={produtos}
                renderItem={getProdutoItem}
            />
        </View>
    )
}