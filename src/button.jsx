import React, { useState } from "react";
import Card from "./card";

export default function Button(props) {
 

  return (
    <div className="maix">
    <div >
        <Card tasks={props.tasks}
       
      
        onDone={props.toggles()}
        onDelete={props.deleteTask()}
        onimportancy={()=>props.isImportant()}
        toggleTaskImportance={props.toggleTaskImportance}
        goUp={props.goUp}
        goDown={props.goDown}
        movingUp={props.movingUp}
        movingDown={props.movingDown}
        completed={props.completed}
        />
 
        </div>
      <div className="button--container">
      <button type="button" onClick={()=>{
        props.handleClick()
        // console.log("hi")
        }} className="button-main">
        Add a Task
      </button>
    </div>
    </div>
  );
}
