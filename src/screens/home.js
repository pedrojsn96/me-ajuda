import { Button, Input, Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { View, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, Alert, Text, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeReduxCity, changeReduxState }  from "../reducers/region/action";
import Api from '../services/Api';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home_func = (props) => {

    return(
        <KeyboardAvoidingView style={styles.container} enabled >
            <ScrollView styles={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../assets/img/g3925.png')}
                />
                <Text style={[styles.text_title]}>Bem vindo (a) ao ao MeAjuda App: uma ferramenta para dar suporte a quem mais precisa conectando-o com quem pode ajudar.</Text>
                <Text style={[styles.text_description]}>A seguir uma breve descrição sobre as abas no aplicativo:</Text>
                <View style={{alignItems:'center', width:100}}>
                    <Icon name="hand-holding-heart" color={"black"} size={30}/>
                    <Text>Ajude</Text>
                </View>
                <Text style={[styles.text_description,styles.box]}>Esta aba apresenta uma lista de pedidos de ajudas onde é possivel entrar em contato através do botão <Text style={{backgroundColor:"#6cd9ca", color:'white', fontSize:20}}> <Icon name="hands-helping" color={'white'} size={15}/> Eu ajudo! </Text> que redirecionará para o WhatsApp.</Text><View style={{alignItems:'center', width:100}}>
                    <Icon name="hands" color={"black"} size={30}/>
                    <Text>Me Ajuda</Text>
                </View>
                <Text style={[styles.text_description,styles.box]}>Através desta aba é possivel criar um pedido de ajudar informando um meio de contato, estado, cidade e uma breve descrição sobre o tipo de ajuda que precisar.</Text>

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
    text_title: {
        fontSize:18,
        color:"#6cd9ca",
        fontWeight:'bold',
        flexWrap:'wrap',
        textAlign:'center',
        margin:10
    },
    text_description: {
        fontSize:16,
        color:"black",
        flexWrap:'wrap',
        textAlign:'justify',
        margin:10
    },
    box:{
        backgroundColor:'white',
        borderWidth:2,
        borderColor:"#6cd9ca",
        padding:5
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
const Home = connect(mapStateToProps,mapDispatchToProps)(Home_func);
export default Home;