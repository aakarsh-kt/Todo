import React from 'react'

export default function (props){
 
    return(
        <div className='side--bar'>
            <ul className='side--list'>
            <li onClick={  props.toggleImportant} >Mark as important</li>
            <li onClick={props.completed}>Mark as complete</li>
            <li onClick={props.moveUp}>Move up</li>
            <li onClick={props.moveDown}>Move Down </li>
            </ul>
            <div className='footer--div'>
                <h3 className='footer'>
                    Made By Akarsh Katiyar
                </h3>
            </div>
        </div>
    )
}