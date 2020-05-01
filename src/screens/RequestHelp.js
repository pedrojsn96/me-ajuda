import { Button, Input } from 'react-native-elements';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import Api from '../services/Api';

const RequestHelp = () => {
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    
    const handleSubmit = () => {
        const data = {
            nome: fullName,
            cidade: city,
            estado: state,
            contato: phoneNumber,
            descricao: 'descricao',
        };

        Api.post('/ajuda', data).catch(() => {});
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
                <Input
                    placeholder="Cidade"
                    onChangeText={setCity}
                />
                <Input
                    placeholder="Estado"
                    onChangeText={setState}
                />
                <Input
                    placeholder="Telefone pra contato"
                    onChangeText={setPhoneNumber}
                />
                <TouchableOpacity >
                    <Button title="Me Ajuda" onPress={handleSubmit} />
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
});


export default RequestHelp;