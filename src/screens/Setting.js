import { Button, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { View, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeReduxCity, changeReduxState }  from "../reducers/region/action";


const Estados_cidade = require('../assets/others/estados-cidades.json')

const Setting_func = (props) => {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        setStates(Estados_cidade.estados)
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} enabled >
            <ScrollView styles={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../assets/img/g3925.png')}
                />
                <Text style={{fontSize:18, color:"#6cd9ca", fontWeight:'bold'}}>Informe a região que pretende oferecer ajuda:</Text>
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
const mapDispatchToProps = dispatch => bindActionCreators({
    changeReduxCity, changeReduxState
}, dispatch)
const mapStateToProps = state => ({
    regionState: state.regionState
});
const Setting = connect(mapStateToProps,mapDispatchToProps)(Setting_func);
export default Setting;