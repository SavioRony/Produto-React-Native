import { getActionFromState } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, Text, FlatList, Alert } from 'react-native'
import { Button, Icon, ListItem } from "react-native-elements";
import ProdutoContext from "../context/ProdutoContext"

export default props => {

    const { state, dispatch } = useContext(ProdutoContext)

    function confirmUserDeletion(produto) {
        Alert.alert('Excluir Produto', 'Deseja excluir o produto ' + produto.nome + '?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteProduto',
                        payload: produto,
                    })
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
                data={state.produtos}
                renderItem={getProdutoItem}
            />
        </View>
    )
}