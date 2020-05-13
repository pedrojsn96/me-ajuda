import { Button, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { View, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import TextInputMask from 'react-native-text-input-mask';

import Api from '../services/Api';
import Axios from 'axios';

const Estados_cidade = require('../assets/others/estados-cidades.json')

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const RequestHelp = () => {
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [street, setStreet] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [key, setKey] = useState('');
    const [etapa, setEtapa] = useState('');
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        setStates(Estados_cidade.estados)
    }, []);

    const handleSubmit = async() => {
        if(fullName!="" && city!="" && state!="" && phoneNumber!="" && description!=""){
            setEtapa("salvando")
            const key = await createKey()
            const data = {
                nome: fullName,
                cidade: city,
                estado: state,
                contato: phoneNumber,
                logradouro: street,
                descricao: description,
                chave: key
            };

            Api.post('/ajuda', data)
            .then(()=>{
                setEtapa("fim")
            })
            .catch(erro => {
                console.log(erro)
                setEtapa("fim")
            });
        }else{
            Alert.alert("Campos Vazios", "Preencha todos os campos requeridos para realizar o pedido de ajuda.")
        }
    }

    const clear = () =>{
        setCities([])
        setFullName("")
        setCity("")
        setDescription("")
        setEtapa("")
        setKey("")
        setPhoneNumber("")
        setState("")
        setStreet("")
    }
    const setDescription_lenght = (text) => {
        if(text.length < 250){
            setDescription(text)
        }
    }

    const createKey = async() =>{
        var key = "";
        var key_aux
        do{
            key_aux = makeid(6);
            await Api.get(`/ajuda/chave/${key_aux}`)
            .then(ajuda_response =>{
                console.log(ajuda_response)
                if(!ajuda_response.data){
                    key = key_aux
                }
            })
        }while(key=="")
        setKey(key)
        return key
    }

    screen = () => {
        switch (etapa) {
            case "salvando":
                return(
                    <View style={{flex:1, justifyContent:'center'}}>
                        <LottieView
                            style={{width:'80%', alignSelf:'center', justifyContent:'center'}}
                            resizeMode="cover"
                            source={require('../assets/lottie/waiting.json')} 
                            autoPlay
                            loop
                        />
                    </View>
                )
                break;
            case "fim":
                return(
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:"#f5f5f5"}}>
                        <Text style={styles.textoFinal}>Oi {fullName} esperamos que você encontre alento neste momento difícil no qual esta passando. Seu pedido de ajuda esta registrado em nosso sistema, guarde sua chave de acesso para voltar e ver quando tiver respostas de pessoas solidarias:</Text>
                        <Text style={styles.textoChave}>{key}</Text>
                        <Text style={styles.textoFinal}>Quando receber ajuda, pedimos que retorne com sua chave de acesso em configurações e finalize seu pedido. Desta forma você garantirá que outras pessoas que necessitam também terão chance de receber ajuda.</Text>
                        <Button title="CONCLUIR" buttonStyle={styles.button} onPress={() =>{clear()}}/>
                    </View>
                )
                break;
            default:
                return(
                <ScrollView styles={styles.content}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/img/g3925.png')}
                    />
                    <Input
                        placeholder="Nome Completo"
                        autoCapitalize
                        onChangeText={setFullName}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Picker
                            selectedValue={state}
                            style={{flex:1}}
                            onValueChange={(itemValue, itemIndex) =>{
                                setState(itemValue)
                                if(itemValue!=""){
                                    setCities(states[itemIndex-1].cidades)
                                }
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
                    <TextInputMask
                        placeholder="Telefone pra contato"
                        onChangeText={(formatted, extracted) => {setPhoneNumber(formatted)}}
                        mask={"+55 ([00]) [0] [0000] [0000]"}
                        style={{fontSize:18, borderBottomColor:"#D5D5D5",borderBottomWidth:2, marginLeft:10, marginRight:10}}
                    />
                    <Input
                        multiline={true}
                        numberOfLines={2}
                        placeholder="Como preciso ser ajudado..."
                        value={description}
                        onChangeText={setDescription_lenght}
                    />
                    <Text style={{fontSize:12, textAlign:'right', marginRight:10}}>{description.length}/250</Text>
                    <TouchableOpacity >
                        <Button title="Me Ajuda" onPress={handleSubmit} buttonStyle={styles.button} />
                    </TouchableOpacity>
                </ScrollView>
                )
                break;
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            {screen()}
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
    textoFinal: {
        width:"90%",
        fontSize:18,
        flexWrap: 'wrap',
        textAlign:'center'
    },
    textoChave:{
        fontSize:32,
        fontWeight:'bold',
        margin:15
    },
    button: {
        marginTop:10,
        backgroundColor:"#6cd9ca"
    }
});


export default RequestHelp;