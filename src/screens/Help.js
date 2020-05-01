import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';

import Api from '../services/Api';

const Help = () => {
    const [people, setPeople] = useState([]);

    const getPeople = async () => {
        const response = await Api.get('/ajuda');
        setPeople(response.data);
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
        alignSelf:'flex-start'
    },
    subtitle:{
        fontSize:16,
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

export default Help;