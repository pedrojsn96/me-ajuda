import { Button, Input, Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { View, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, Alert, Text, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeReduxCity, changeReduxState }  from "../reducers/region/action";
import Api from '../services/Api';


const Estados_cidade = require('../assets/others/estados-cidades.json')

const HR = () =>{
    return(
        <View
        style={{
            margin:10,
            borderBottomColor: 'rgba(108, 217, 202, 0.3)',
            borderBottomWidth: 1,
        }}
    />
    )
}

const Setting_func = (props) => {
    const [chave, setChave] = useState('')
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [ajuda, setAjuda] = useState({});
    const [ableSearch, setAbleSearch] = useState(true)
    const [ableFinish, setAbleFinish] = useState(true)
    const [modalVisibleSearch, setModalVisibleSearch] = useState(false);
    const [modalVisibleAjuda, setModalVisibleAjuda] = useState(false);

    useEffect(() => {
        setStates(Estados_cidade.estados)
    }, []);

    const handleSearch = () =>{
        setAbleSearch(false)
        Api.get(`/ajuda/chave/${chave}`)
        .then(ajuda_response => {
            setAjuda(ajuda_response.data)
            setAbleSearch(true)
            setModalVisibleSearch(false)
            setModalVisibleAjuda(true)
        })
    }

    const handleFinishHelp = () =>{
        setAbleFinish(false)
        Api.put(`/ajuda/${ajuda._id}`,{concluido: true})
        .then(ajuda_response => {
            setModalVisibleAjuda(false)
            setAbleFinish(true)
        })
        .catch(()=>{})
    }

    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleSearch}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{flex:1, justifyContent:'center', backgroundColor:"rgba(0,0,0,0.3)"}}>
                    <Card title="CHAVE DE PEDIDO">
                        <Input
                            placeholder="Informe a chave do seu pedido"
                            onChangeText={setChave}
                        />
                        <Button disabled={!ableSearch} title="BUSCAR" buttonStyle={styles.button} onPress={()=>handleSearch()}/>
                    </Card>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleAjuda}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{flex:1, justifyContent:'center', backgroundColor:"rgba(0,0,0,0.3)"}}>
                    <Card title={`${ajuda.nome}, ${ajuda.contato}`}  titleStyle={styles.cardTitleStyle} style={styles.card}>
                        <Text style={styles.subtitle}>{ajuda.cidade} - {ajuda.estado}</Text>
                        <Text style={{marginBottom: 10}}>{ajuda.descricao}</Text>
                        <Button disabled={!ableFinish} title="CONCLUIR AJUDA" buttonStyle={styles.button} onPress={()=>handleFinishHelp()}/>
                    </Card>
                </View>
            </Modal>
            <ScrollView styles={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../assets/img/g3925.png')}
                />
                <Text style={{fontSize:18, color:"#6cd9ca", fontWeight:'bold', flexWrap:'wrap'}}>Informe a região que pretende oferecer ajuda:</Text>
                <View style={{flexDirection:'row'}}>
                    <Picker
                        selectedValue={props.regionState.state}
                        style={{flex:1}}
                        onValueChange={(itemValue, itemIndex) =>{
                            props.changeReduxState(itemValue);
                            if(itemIndex>0){
                                setCities(states[itemIndex-1].cidades);
                            }
                        }}
                    >
                        <Picker.Item label={"Escolha um estado"} value={""} color="grey" />
                        {states.map(estado =>
                            <Picker.Item label={estado.nome} value={estado.sigla} />
                        )}
                    </Picker>
                    <Picker
                        selectedValue={props.regionState.city}
                        style={{flex:1}}
                        enabled={props.regionState.state!=""}
                        onValueChange={(itemValue, itemIndex) =>{
                            props.changeReduxCity(itemValue);
                        }}
                    >
                        <Picker.Item label={"Escolha uma cidade"} value={""} color="grey" />
                        {cities.map(cidade =>
                            <Picker.Item label={cidade} value={cidade} />
                        )}
                    </Picker>
                </View>
                <HR/>
                <Text style={{fontSize:18, color:"#6cd9ca", fontWeight:'bold', flexWrap:'wrap'}}>Para acessar um pedido através de sua chave, pressione o botão a seguir:</Text>
                <Button title="CHAVE DE PEDIDO" buttonStyle={styles.button} onPress={() => setModalVisibleSearch(true)}/>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        alignItems: 'center',
    },
    cardTitleStyle: {
        alignSelf:'flex-start',
        color:'black',
        fontWeight:"bold"
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
        marginTop:10,
        backgroundColor:"#6cd9ca",
    }
});
const mapDispatchToProps = dispatch => bindActionCreators({
    changeReduxCity, changeReduxState
}, dispatch)
const mapStateToProps = state => ({
    regionState: state.regionState
});
const Setting = connect(mapStateToProps,mapDispatchToProps)(Setting_func);
export default Setting;