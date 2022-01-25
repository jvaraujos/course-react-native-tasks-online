import React,{Component} from 'react'
import { ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert } from 'react-native'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'
export default class App extends Component{

    state ={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        stageNew:true
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
            <AuthInput 
            icon='user'
            placeholder='Nome' 
            value={this.state.name}
            style={styles.input}
            onChangeText={name=>this.setState({name})}/>
            }
            <AuthInput 
            icon='at'
            placeholder='E-mail' 
            value={this.state.email}
            style={styles.input}
            onChangeText={email=>this.setState({email})}/>
            <AuthInput 
            icon='lock'
            placeholder='Senha' 
            value={this.state.password}
            style={styles.input}
            secureTextEntry
            onChangeText={password=>this.setState({password})}/>
            {this.state.stageNew&&
            <AuthInput
            icon='asterisk' 
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
    },
    button:{
        backgroundColor:'#080',
        marginTop:10,
        padding:10,
        alignItems:'center',
        borderRadius:7,
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