import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';

import Api from '../services/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeReduxCity, changeReduxState }  from "../reducers/region/action";

const month = (mes) => {
    switch(mes){
        case 0:
            return "Janeiro"
            break;
        case 1:
            return "Fevereiro"
            break;
        case 2:
            return "Março"
            break;
        case 3:
            return "Abril"
            break;
        case 4:
            return "Maio"
            break;
        case 5:
            return "Junho"
            break;
        case 6:
            return "Julho"
            break;
        case 7:
            return "Agosto"
            break;
        case 8:
            return "Setembro"
            break;
        case 9:
            return "Outubro"
            break;
        case 10:
            return "Novembro"
            break;
        case 11:
            return "Dezembro"
            break;
    }
}

const Help_func = (props) => {
    const [people, setPeople] = useState([]);
    const [ref, setRef] = useState(false)

    const formatDate = (date) =>{
        var dt = new Date(date)
        try{
            var dia = dt.getDate()
            var mes = month(dt.getMonth())
            var ano = dt.getFullYear()
            var hora = dt.getHours()<10?`0${dt.getHours()}`:`${dt.getHours()}`
            var minutos = dt.getMinutes()<10?`0${dt.getMinutes()}`:`${dt.getMinutes()}`

            return `${dia} de ${mes} de ${ano}, ${hora}:${minutos}`
        }catch{ return ""}
    }

    const getPeople = async () => {
        setRef(true)
        setPeople([])
        var response;
        if(props.regionState.state!="" && props.regionState.city !=""){
            response = await Api.get(`/ajuda/regiao/${props.regionState.state}/${props.regionState.city}`);
        }else{
            response = await Api.get(`/ajuda`);
        }
        var lista_final =[];
        response.data.map(ajd => {
            if(!ajd.concluido){
                lista_final.push(ajd)
            }
        })
        lista_final.reverse()
        setPeople(lista_final);
        setRef(false)
    }

    const handleHelp = (person) => {
        const text = `Olá ${person.nome}, encontrei você no aplicativo MeAjude.`
        const phoneNumber = `${person.contato}`;
        Linking.openURL(`whatsapp://send?text=${text}&phone=${phoneNumber}`)
         .catch(Linking.openURL('https://www.whatsapp.com/'));
    }

    useEffect(() => {
        getPeople();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={people}
                renderItem={({ item }) =>
                    <Card title={`${item.nome}`}  titleStyle={styles.cardTitleStyle} style={styles.card}>
                        <Text style={styles.subtitle}>{item.cidade} - {item.estado}</Text>
                        <Text style={{marginBottom: 10}}>{item.descricao}</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={{fontSize:12}}>{formatDate(item.createdAt)}</Text>
                            <Button
                                buttonStyle={styles.button}
                                onPress={() => handleHelp(item)}
                                icon={<Icon name={"hands-helping"} color={"white"} size={25} style={{paddingLeft:5,paddingRight:5}}/>}
                                title='Eu Ajudo!' />
                        </View>
                    </Card>
                }
                onRefresh={()=>{getPeople()}}
                refreshing={ref}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        alignItems: 'center',
    },
    cardTitleStyle: {
        alignSelf:'flex-start',
        color:'black',
        fontWeight:"bold"
    },
    subtitle:{
        fontSize:16,
        color:'black',
        marginBottom:5
    },
    button: {
        backgroundColor:"#6cd9ca",
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        alignSelf:'flex-end'
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeReduxCity, changeReduxState
}, dispatch)
const mapStateToProps = state => ({
    regionState: state.regionState
});
const Help = connect(mapStateToProps,mapDispatchToProps)(Help_func);

export default Help;