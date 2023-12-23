import React from "react";

export default function Card(props) {
 
 
  return (
    <div>
      <div >
   
        {props.tasks.map((taski, index) => (
          <div className="card" key={index} 
          onClick={() => {props.toggleTaskImportance(taski.id),props.movingUp(taski.id),props.movingDown(taski.id),props.completed(taski.id)}}
          >
       
      
          <input className="check--box"
                type="checkbox" 
                onClick={()=>  props.onDone(taski.id)}
              
            />
           {taski.isImportant && <img src="../assets/star.png" className='star--image' onClick={()=>props.onimportancy(index)}/>}
          <h4  className={taski.isDone? "card--text--strike":"card--text"}>
          {taski.task}
       
          </h4>

          {/* <h5>{taski.isImportant?"true":"false"}</h5> */}
          <div className="arrow--buttons">
          <img src="../assets/up.png" alt="up" className="arrow" onClick={()=>props.goUp(taski.id)} />
          <img src="../assets/down.png" alt="up" className="arrow" onClick={()=>props.goDown(taski.id)} />
          </div>
          <img src="../assets/bin3.png"  alt="Delete" className="pic" onClick={()=>   props.onDelete(taski.id)}/>
         
          </div>
        ))}
      </div>
    </div>
  );
}
