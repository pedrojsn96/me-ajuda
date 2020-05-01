import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';

import Api from '../services/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeReduxCity, changeReduxState }  from "../reducers/region/action";

const Help_func = (props) => {
    const [people, setPeople] = useState([]);
    const [ref, setRef] = useState(false)

    const getPeople = async () => {
        setRef(true)
        setPeople([])
        var response;
        if(props.regionState.state!="" && props.regionState.city !=""){
            response = await Api.get(`/ajuda/regiao/${props.regionState.state}/${props.regionState.city}`);
        }else{
            response = await Api.get(`/ajuda`);
        }
        setPeople(response.data);
        setRef(false)
    }

    const handleHelp = (person) => {
        const text = `Olá ${person.nome}, encontrei você no aplicativo MeAjude.`
        const phoneNumber = `+55 ${person.contato}`;
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
                    <View>
                        <Card title={`${item.nome}, ${item.contato}`}  titleStyle={styles.cardTitleStyle} style={styles.card}>
                            <Text style={styles.subtitle}>{item.cidade} - {item.estado}</Text>
                            <Text style={{marginBottom: 10}}>{item.descricao}</Text>
                            <Button
                                buttonStyle={styles.button}
                                onPress={() => handleHelp(item)}
                                icon={<Icon name={"hands-helping"} color={"white"} size={25} style={{paddingLeft:5,paddingRight:5}}/>}
                                title='Eu Ajudo!' />
                        </Card>
                    </View>
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