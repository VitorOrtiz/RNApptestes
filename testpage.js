import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';

export class testpage extends Component
{
    constructor()
    {
        super();

        this.state = {
            username: '',
            email:'',
            password: '',
            loading: false, 
            disabled: false,
            generalpoints:0,
        },
        this.fill={
            emailFilled:true,
            usernameFilled:true,
            passwordFilled:true
        }

    }
    getResponse = async()=>{
        const response = await fetch('http://192.168.100.159:4545/register',{
        method:'POST', 
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body:JSON.stringify
        (
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                generalpoints: this.state.generalpoints
            }
        )
    })
        const users = response.json();
        console.log(users);
    }

    saveData = () =>
    {
        if(!this.state.email|| !this.state.password|| !this.state.username)
        {
            return;
        }
        console.log(this.state.email + '' + this.state.password + ''+ this.state.username);

        this.setState({ loading: true, disabled: true }, () =>
        {

            fetch('http://192.168.1.159:4545/users',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    generalpoints: this.state.generalpoints
                })

            }).then((response) => response.json()).then((responseJson) =>
            {
                alert(responseJson);
                this.setState({ loading: false, disabled: false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ loading: false, disabled: false });
            });
        });
    }

    render()
    {
        return(
            <View style = { styles.container }>
                <TextInput underlineColorAndroid = "transparent" placeholder = "Seu Nome" style = { styles.textInput } onChangeText = {(text) => this.setState({ username: text })}/>
                {
                    (!this.fill.emailFilled)
                    ?
                    <Text>Preencha seu nome.</Text>
                    :
                    null
                }
                <TextInput underlineColorAndroid = "transparent" placeholder = "Email" style = { styles.textInput } onChangeText = {(text) => this.setState({ email: text })}/>
                
                <TextInput underlineColorAndroid = "transparent" placeholder = "Senha" style = { styles.textInput } onChangeText = {(text) => this.setState({ password: text })}/>

                <TouchableOpacity disabled = { this.state.disabled } activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.getResponse }>
                    <Text style = { styles.btnText }>Insert</Text>
                </TouchableOpacity>

                {
                    (this.state.loading)
                    ?
                        (<ActivityIndicator size = "large" />)
                    :
                        null
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 25,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    textInput:
    {
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 16
    },

    Btn:
    {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 25
    },

    btnText:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
});