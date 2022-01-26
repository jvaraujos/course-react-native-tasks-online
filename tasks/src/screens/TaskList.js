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
import {server,showError} from '../common'
import axios from 'axios'
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
        const savedState=JSON.parse(stateString)||initialState
        this.setState({showDoneTasks:savedState.showDoneTasks},this.filterTasks)
        this.loadTasks()
        }

    loadTasks = async () => {
        try{
            const maxDate = moment().add({days:this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks:res.data},this.filterTasks)
        }catch(e){
            showError(e)
        }
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
        AsyncStorage.setItem('tasksState',JSON.stringify(
            {
            showDoneTasks:this.state.showDoneTasks
            }))
    }

    addTask = async newTask=>{
        if(!newTask.desc||!newTask.desc.trim()){
            Alert.alert('Dados invalidos','Descricao nao informada')
            return
        }
        
        try{
            await axios.post(`${server}/tasks`,{
                desc:newTask.desc,
                estimateAt:newTask.date
            })
        }catch(e){
            showError(e)
        }

        this.setState({showAddTask:false},this.loadTasks)
    }

    toggleTask = async taskId =>{
        
        try{
            await axios.put(`${server}/tasks/${taskId}/toggle`)
         this.loadTasks()
        }catch(e){
            showError(e)
        }
    }

    deleteTask = async taskId =>{
      try{
        await axios.delete(`${server}/tasks/${taskId}`)
         this.loadTasks()
      }catch(e){
          showError(e)
      }

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
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                <Icon name='bars' size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleFilter}>
                <Icon name={this.state.showDoneTasks?'eye':'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleBar}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.subtitle}>{today}</Text>
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
     subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
     iconBar :{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'space-between',
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