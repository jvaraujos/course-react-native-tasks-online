import React,{Component} from 'react'
import { ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert } from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

export default class App extends Component{

    state ={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        stageNew:false
    }
    signinOrSignup = () => {
        if(this.state.stageNew){
            Alert.alert('Sucesso!','Criar Conta')
        }else{
            Alert.alert('Sucesso!','Logar')
        }
    }
    render (){
        return (
        <ImageBackground style={styles.background} source={backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
            <Text style={styles.subtitle}>
                {this.state.stageNew?'Crie a sua conta':'Informe seus dados'}
            </Text>
            {this.state.stageNew&&
            <TextInput 
            placeholder='Nome' 
            value={this.state.name}
            style={styles.input}
            onChangeText={name=>this.setState({name})}/>
            }
            <TextInput 
            placeholder='E-mail' 
            value={this.state.email}
            style={styles.input}
            onChangeText={email=>this.setState({email})}/>
            <TextInput 
            placeholder='Senha' 
            value={this.state.password}
            style={styles.input}
            secureTextEntry
            onChangeText={password=>this.setState({password})}/>
            {this.state.stageNew&&
            <TextInput 
            placeholder='Confirmacao de senha' 
            value={this.state.confirmPassword}
            style={styles.input}
            secureTextEntry
            onChangeText={confirmPassword=>this.setState({confirmPassword})}/>
            }
            <TouchableOpacity onPress={this.signinOrSignup}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew?'Registrar':'Entrar'}
                        </Text>
                </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding:10}}
            onPress={()=>this.setState({stageNew:!this.state.stageNew})}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew?'Ja possui conta?':'Entrar'}
                    </Text>       
            </TouchableOpacity>
        </ImageBackground>
     )
}
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        wid:'100%',
        alignItems:'center',
        justifyContent:'center',
     },
    title:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.secondary,
        fontSize:70,
        marginBottom:10,
    },
    formContainer:{
        backgroundColor:'rgba(0,0,0,0.7)',
        padding:20,
        width:'90%',
    },
    input:{
        marginTop:10,
        backgroundColor:'#FFF',
        padding:Platform.OS == 'ios'? 15:10
    },
    button:{
        backgroundColor:'#080',
        marginTop:10,
        padding:10,
        alignItems:'center',
    },
    buttonText:{
        fontFamily:commonStyles.fontFamily,
        color:'#FFF',
        fontSize:20
    },
    subtitle:{
        fontFamily:commonStyles.fontFamily,
        fontSize:20,
        color:'#FFF',
        textAlign:'center',
        marginBottom:10,
    }
    })