import { Button, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { View, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import Api from '../services/Api';

const Estados_cidade = require('../assets/others/estados-cidades.json')

const RequestHelp = () => {
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [street, setStreet] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    
    useEffect(() => {
        setStates(Estados_cidade.estados)
    }, []);

    const handleSubmit = () => {
        if(fullName!="" && city!="" && state!="" && phoneNumber!="" && description!=""){
            const data = {
                nome: fullName,
                cidade: city,
                estado: state,
                contato: phoneNumber,
                logradouro: street,
                descricao: description,
            };

            Api.post('/ajuda', data).catch(() => {});
        }else{
            Alert.alert("Campos Vazios", "Preencha todos os campos requeridos para realizar o pedido de ajuda.")
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <ScrollView styles={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../assets/img/g3925.png')}
                />
                <Input
                    placeholder="Nome Completo"
                    onChangeText={setFullName}
                />
                <View style={{flexDirection:'row'}}>
                    <Picker
                        selectedValue={state}
                        style={{flex:1}}
                        onValueChange={(itemValue, itemIndex) =>{
                            setState(itemValue)
                            setCities(states[itemIndex-1].cidades)
                        }}
                    >
                        <Picker.Item label={"Escolha um estado"} value={""} color="grey" />
                        {states.map(estado =>
                            <Picker.Item label={estado.nome} value={estado.sigla} />
                        )}
                    </Picker>
                    <Picker
                        selectedValue={city}
                        style={{flex:1}}
                        enabled={state!=""}
                        onValueChange={(itemValue, itemIndex) =>{
                            setCity(itemValue)
                        }}
                    >
                        <Picker.Item label={"Escolha uma cidade"} value={""} color="grey" />
                        {cities.map(cidade =>
                            <Picker.Item label={cidade} value={cidade} />
                        )}
                    </Picker>
                </View>
                <Input
                    placeholder="Rua (opcional)"
                    onChangeText={setStreet}
                />
                <Input
                    placeholder="Telefone pra contato"
                    onChangeText={setPhoneNumber}
                />
                <Input
                    multiline={true}
                    numberOfLines={2}
                    placeholder="Como preciso ser ajudado..."
                    onChangeText={setDescription}
                />
                <TouchableOpacity >
                    <Button title="Me Ajuda" onPress={handleSubmit} buttonStyle={styles.button} />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    content: {
        flex: 1,
        padding: 50,
    },
    logo: {
        width: 120,
        height: 122,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor:"#6cd9ca",
    }
});


export default RequestHelp;