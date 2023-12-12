import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity,Keyboard, Image } from 'react-native';


export default function App() {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<string[]>([]);

  //Function to put task into array and set input to nothing.
  const handleAddTask = (): void =>{
    if(task === ""){
      return;
    }
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask("");
  }

  //Function to delete task from array
  const deleteTask = (index:number) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy)
  }

  const empty = require("./assets/emptySquare.png")
  const check = require("./assets/checkSquare.png")


  //"Task" item to show same style of task list.
  const Task = (props: { text: string, key:number}) =>{
    
    const[checked,setCheck]=useState(true);
    const img = checked? empty: check;

    //Function to show check img or empty img
    const changeImg = () =>{
      setCheck(previousState => !previousState);
    }

     
    return(
            <View style={styles.itemLeft}>
              <TouchableOpacity onPress={()=>changeImg()}>
                <Image source={img} style={styles.square}></Image>
              </TouchableOpacity> 
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
    )
}

  return (
    <View style={styles.container}>

      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>To Do List</Text>

        <View style={styles.items}>
          {taskItems.map((item, index)=>{
           return(
            <View style={styles.itembox}>
            <Task key={index} text={item}/>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Image source={require("./assets/GarbageCan.png")} style={styles.garbage}></Image>
            </TouchableOpacity>   
            </View>
            )
          })
          }
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addBtn}>
              <Text style={styles.addText}>Add</Text>
            </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily:'sans-serif',
    textAlign:'center',
    color:'#3C4E92'
  },
  items:{
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderColor: '#3C4E92',
    borderWidth: 1,
    width: 280,
  },
  addBtn:{
    width: 70,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3C4E92',
    borderWidth: 1,
  },
  addText:{
    color:"#3C4E92",
    fontWeight:'bold'
  },
  itembox: {
    backgroundColor: '#fff',
    padding:15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  itemText: {
    maxWidth:'80%',
  },
  garbage: {
    width: 20,
    height: 24,
    opacity: 0.4
  },
});


