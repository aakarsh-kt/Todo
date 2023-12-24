import React,{useEffect} from "react";

import Nav2 from "./nav2";
import Button from "./button";
import Side from "./sidebar";
import Split from "react-split";
// import {nanoid} from "nanoid";
import { onSnapshot , addDoc,doc,deleteDoc,setDoc } from "firebase/firestore"
import { taskCollection , db} from "./firebase"
// import Callback from './gpt_Callback';
export default function () {
  const [tasks, setTasks] = React.useState(
    // JSON.parse(localStorage.getItem("tasks")) ||
     []
  );
    const [markAsImportant,setMarkAsImportant]=React.useState({
      important:false,
      movingUp:false,
      movingDown:false,
      isComplete:false
    });
  async function handleClick() {
    // console.log("App")
    const tasking = prompt("Write down your task here");
    const task={
      task:tasking,
      isDone:false,
      isImportant:false
    }
    const newNoteRef = await addDoc(taskCollection, task)
    // if (tasking) {
   
    //   setTasks([
    //     ...tasks,
    //     {
    //       id:nanoid(),
    //       task: tasking,
    //       isDone: false,
    //       isImportant: false,
    //     },
    //   ]);
    // }
  }

  function toggles(index) {
    
      console.log("Toggles function");
      // console.log(index);
    
    setTasks((prev) => {
      const updatedTasks = prev.map((task) => {
        if (task.id === index) {
          return {
            ...task,
            isDone: !task.isDone,
          };
        }
        return task;
      });

      return updatedTasks;
    });
  }
  async function deleteTask(id) {
    // setTasks((prev) => {
    //   const updatedTasks = prev.filter((task, i) => task.id !== id);
    //   return updatedTasks;
    // });
    const docRef = doc(db, "tasks", id)
    await deleteDoc(docRef)
  }
   React.useEffect(()=>{
    console.log("changing into useEffect")
   
      console.log("Changning")
      for(let i=0;i<tasks.length;i++){
      const docRef = doc(db, "tasks",tasks[i].id)
         setDoc(docRef, { task: tasks[i].task ,isDone:tasks[i].isDone,isImportant:tasks[i].isImportant }, { merge: true })
      
    }
  },[tasks])
  React.useEffect(() => {
    // localStorage.setItem("tasks", JSON.stringify(tasks));

    const unsubscribe= onSnapshot(taskCollection, function(snapshot) {
      // Sync up our local notes array with the snapshot data

      const tasksArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    setTasks(tasksArr)
  })
  return unsubscribe
    // taskcollection.get().then((snapshot)=>{
    //   const data=snapshot.docs.map((doc)=>({
    //     id:doc.id,
    //     ...doc.data()
    //   }))
    //   setTasks(data);
    // }
    // )
  }, []);



  function toggleImportant(){
    setMarkAsImportant(pre=>({
      ...pre,
      important:!pre.important
    }));
  }

  function toggleTaskImportance(taskId)  {
    if (markAsImportant.important) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
        )
      );
      setMarkAsImportant(pre=>({
        ...pre,
        important:!pre.important
      })); // Reset marking state after marking a task
    }
  };
  function movingUpfunc(id){
    if(markAsImportant.movingUp){
      goUp(id);
      setMarkAsImportant(pre=>({
        ...pre,
        movingUp:!pre.movingUp
      }));
    }
  }
  function movingDownfunc(id){
    if(markAsImportant.movingDown){
      goDown(id);
      setMarkAsImportant(pre=>({
        ...pre,
        movingDown:!pre.movingDown
      }));
    }
  }
  function goUp(id){
    console.log("UPPPPP");
    console.log(id);

    setTasks(prev=>{
      const update=[...prev];
      console.log(update.length)
      let index=0;
      for(let i=0;i<prev.length;i++){
        if(update[i].id==id)
        {
          index=i;
          break;
        }
      }
      if(index!==0)
      [update[index],update[index-1]]=  [update[index-1],update[index]]
      return update;
    }
      )
   
  }
  function goDown(id){
    console.log("DOWW   NNN");
    console.log(id);

    setTasks(prev=>{
      const update=[...prev];
      // console.log(update.length)
      let index=0;
      for(let i=0;i<prev.length;i++){
        if(update[i].id==id)
        {
          index=i;
          break;
        }
      }
      if(index!==prev.length-1)
      [update[index],update[index+1]]=  [update[index+1],update[index]]
      return update;
    }
      )
   
  }
  function moveUp(){
    setMarkAsImportant(pre=>({
      ...pre,
      movingUp:!pre.movingUp
    }));
  }
  function moveDown(){
    setMarkAsImportant(pre=>({
      ...pre,
      movingDown:!pre.movingDown
    }));
  }
 function completed(){
  console.log("Completed Function Inside")
    setMarkAsImportant(pre=>({
      ...pre,
      isComplete:!pre.isComplete
    }));
 }
 function completedfunc(id){
  console.log("Completed Function func")
  //  console.log(id)
  // console.log(markAsImportant.isComplete)
    if(markAsImportant.isComplete){
      setTasks((prev) => {
        const updatedTasks = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isDone: !task.isDone,
            };
          }
          return task;
        });
  
        return updatedTasks;
      });
      // setTasks(prev=>{
      //   const update=prev;
      //   let index=0;
      //   for(let i=0;i<prev.length;i++){
      //     if(update[i].id==id)
      //     {
      //       index=i;
      //       break;
      //     }
      //   }
      //   // update[index]={
      //   //   ...update[index],
      //   //   isDone:!isDone
      //   // };
      //   // console.log(update[index].isDone)
      //   return update;
      // })
      setMarkAsImportant(pre=>({
        ...pre,
        isComplete:!pre.isComplete
      }));
    }
 }
  return (
    <div className="home--screen">
      <Nav2 />
      <div className="main--content">
        <Split sizes={[25, 75]} direction="horizontal" className="split">
          <Side tasks={tasks}
           
            toggleImportant={toggleImportant}
            moveUp={moveUp}
            moveDown={moveDown}
            completed={completed}
          />
          {/* <Callback/> */}
          <Button
            tasks={tasks}
            handleClick={handleClick}
            toggles={() => toggles}
            deleteTask={() => deleteTask}
            toggleTaskImportance={toggleTaskImportance}
            goUp={goUp}
            goDown={goDown}
            movingUp={movingUpfunc}
            movingDown={movingDownfunc}
            completed={completedfunc}
            
          />

        </Split>
      </div>
    </div>
  );
}
