import React from 'react'
import {View,Text,StyleSheet,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import Swipeable from 'react-native-gesture-handler/Swipeable'
export default props => {
    const doneOrNotStyle = props.doneAt!=null ? {
        textDecorationLine: 'line-through'
    }:{}
    const date = props.doneAt? props.doneAt :  props.estimatedAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    const getRightContent =  () =>{
        return(
            <TouchableOpacity style={styles.right} onPress={()=>props.onDelete&& props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='#FFF'></Icon>
            </TouchableOpacity>
        )
    }

    const getLeftContent =  () =>{
        return(
            <View style={styles.left}>
                <Icon style={styles.excludeIcon} name='trash' size={20} color='#FFF'></Icon>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
    return (
        <Swipeable 
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}
        onSwipeableLeftOpen={()=>props.onDelete&&props.onDelete(props.id)}>
        <View style={styles.container}>
            <TouchableWithoutFeedback 
            onPress={()=>props.onToggleTask&&props.onToggleTask(props.id)}>
            <View style={styles.checkContainer}>  
                {getCheckView(props.doneAt)}
            </View>
            </TouchableWithoutFeedback>   
            <View>
            <Text style={[styles.desc,doneOrNotStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
        </Swipeable>

     )
}

function getCheckView(doneAt){
    if(doneAt!=null){
        return(
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    }else{
        return(
            <View style={styles.pending}>
            </View>
        )
    }
   
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor:'#AAA',
        borderBottomWidth:1,
        alignItems:'center',
        paddingVertical:10,
        backgroundColor:'#FFF',
     },
     checkContainer:{
        width:'20%',
        alignItems:'center',
     },
     pending:{
         height:25,
         width:25,
         borderRadius:13,
         borderWidth:1,
         borderColor:'#555',
         alignItems:'center',
         justifyContent:'center',

     },
     done:{
         height:25,
         width:25,
         borderRadius:13,
         borderWidth:1,
         backgroundColor:'#4d7031',
         alignItems:'center',
         justifyContent:'center',
     },
     desc:{
         fontFamily:commonStyles.fontFamily,
         color:commonStyles.colors.mainText
     },
     date:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.subText,
        fontSize:12
     },
     right:{
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingHorizontal:20,
     },
     left:{
         flex:1,
        flexDirection:'row',
        backgroundColor:'red',
        alignItems:'center',
     },
     excludeText:{
        fontFamily:commonStyles.fontFamily,
        color:'#FFF',
        fontSize:20,
        margin:10,
     },
     excludeIcon:{
         marginLeft:10,
     }
    })