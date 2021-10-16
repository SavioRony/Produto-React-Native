import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProdutoList from "./src/views/ProdutoList";
import ProdutoForm from "./src/views/ProdutoForm";
import { Button, Icon } from "react-native-elements";
import { ProdutosProvider } from "./src/context/ProdutoContext";

const Stack = createNativeStackNavigator()

export default props => {
  return (
    <ProdutosProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProdutoList"
          screenOptions={screenOptions}>
          <Stack.Screen
            name="ProdutoList"
            component={ProdutoList}
            options={({ navigation }) => {
              return {
                title: "Lista de Produtos",
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate("ProdutoForm")}
                    type="clear"
                    icon={<Icon name="add" size={25} color="white" />}
                  />
                )
              }
            }} />
          <Stack.Screen
            name="ProdutoForm"
            component={ProdutoForm}
            options={{
              title: "Formulário de Produtos"
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProdutosProvider>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#FF8C00'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }

}