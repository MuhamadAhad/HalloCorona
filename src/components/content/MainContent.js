import React from 'react';
//import {CardColumns} from 'react-bootstrap';
import CardProperty from '../card/CardProperty';
import Dummy from '../../json/Dummy';
function MainContent(props){
    const result = Dummy.map((rec,idx)=>{
        return <CardProperty data={rec} key={idx} />
    });
    
    return(
        <div className="mainHomeContent">
            {result}
        </div>
    )
}


export default MainContent;