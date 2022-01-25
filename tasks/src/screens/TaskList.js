import React,{Component} from 'react'
import {  SafeAreaView,
    Text,
    StyleSheet,
    ImageBackground,
    View,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,LogBox} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import TodayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import AddTask from './AddTask'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const initialState={
    showDoneTasks:false,
        showAddTask:false,
        visibleTasks:[],
        tasks:[]
}
export default class TaskList extends Component{
    state={
        ...initialState
    }
    toggleFilter = ()=>{
        this.setState({showDoneTasks:!this.state.showDoneTasks},this.filterTasks)
    }
    componentDidMount = async () => { 
        const stateString= await AsyncStorage.getItem('tasksState')
        const state=JSON.parse(stateString)||initialState
        this.setState(state,this.filterTasks)
        }

    filterTasks=()=>{
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks=[...this.state.tasks]
        }else{
            const pending = task => task.doneAt===null
            visibleTasks=this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState',JSON.stringify(this.state))
    }

    addTask = newTask=>{
        if(!newTask.desc||!newTask.desc.trim()){
            Alert.alert('Dados invalidos','Descricao nao informada')
            return
        }

        const tasks = [...this.state.tasks]

        tasks.push({
            id:Math.random(),
            desc:newTask.desc,
            estimatedAt:newTask.date,
            doneAt:null
        })

        this.setState({tasks,showAddTask:false},this.filterTasks)
    }

    toggleTask = taskId =>{
        const tasks = [...this.state.tasks]
        tasks.forEach(task=>{
            if(task.id===taskId){
                task.doneAt=task.doneAt?null:new Date()
            }
        })
        this.setState({tasks})
    }

    deleteTask = id =>{
        const tasks = this.state.tasks.filter(task=>task.id!==id)
        this.setState({tasks},this.filterTasks)
    }

    render (){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
        <SafeAreaView style={styles.container}>
        <AddTask isVisible={this.state.showAddTask}
        onCancel={()=>this.setState({showAddTask:false})} 
        onSave={this.addTask}/>
        <ImageBackground source={TodayImage} style={styles.image}>
            <View style={styles.iconBar}>
                <TouchableOpacity onPress={this.toggleFilter}>
                <Icon name={this.state.showDoneTasks?'eye':'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Hoje</Text>
                <Text>{today}</Text>
            </View>
            </ImageBackground>       
        <View style={styles.taskList}>
            <FlatList data={this.state.visibleTasks}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item})=>
            <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask}/>}/>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={()=> this.setState({showAddTask:true})} activeOpacity={0.7}>
            <Icon name='plus' size={20} color={commonStyles.colors.secondary}></Icon>
        </TouchableOpacity>
        </SafeAreaView>
     )
}
}
const styles = StyleSheet.create({
    container:{
        flex:1
     },
     image: {
        flex: 3,
      },
     taskList:{
         flex:7
     },
     titleBar :{
         flex:1,
         justifyContent: 'flex-end',
     },
     title:{
         fontFamily:commonStyles.fontFamily,
         fontSize:50,
         color:commonStyles.colors.secondary,
         marginLeft:20,
         marginBottom:20         
     },
     iconBar :{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'flex-end',
        marginTop:Platform.OS==='ios'?30:10
     },
     addButton :{
         position:'absolute',
         right:30,
         bottom:30,
         width:50,
         height:50,
         borderRadius:25,
         backgroundColor:commonStyles.colors.today,
         justifyContent:'center',
         alignItems:'center',
     }
    })