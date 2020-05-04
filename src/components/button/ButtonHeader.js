import React from 'react';
import {Button} from 'react-bootstrap';

function ButtonHeader(props){
        return(
        <Button 
        onClick={props.handleClick}
        >
            {props.text}
        </Button>)
}

export default ButtonHeader;