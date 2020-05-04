import React from 'react';
import {Row,Col} from 'react-bootstrap';

function ApersonalInfo(props){

    return(
        <Row>
            <Col sm={2} style={{display:"flex",flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h1><i className={`fas fa-${props.icon}`}></i></h1>
            </Col>
            <Col sm={10}>
                <div style={{display:"flex",flex:1,flexDirection:"column"}}>
                <div><small onClick={props.reqModalPwd}>{props.dataValue==="Password"?<strong style={{cursor:"pointer"}}>PASSWORD</strong>:props.dataValue}</small></div>
                <div><small className="text-muted">{props.dataName}</small></div>
                </div>
            </Col>
        </Row>
    )

}

export default ApersonalInfo;