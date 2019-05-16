import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { RXForm, RXFormContext } from 'rx-core';
import {CustomInput} from 'reactstrap';

const BasicLayout = (props) => {
  return (
    <div>
      <span style={{color: 'lightgray'}}>RXForm placeholder</span>

      <div style={{backgroundColor: "#eeeeee", margin: 20, padding: 20, width: "calc(100% - 20)"}}>
        <form>
          {props.model.groups.map((input, index)=>{
            let Component = props.components[input.type];
            return (
            <fieldset key={`${index}`}>
              <label htmlFor={`${input.name}`}>{input.label}</label>
              {/* <input type={`${input.type}`} name={`${input.name}`} id={`${input.name}`}></input> */}
              <Component type={input.type} name={input.name} id={input.name}/>
            </fieldset>
          )}
          )} 
        </form>
      </div>
    </div>
  )
}



const  RXFormSwitch = (props) => {
  const [state, setState] = React.useContext(RXFormContext);
  if(undefined === state[props.id]) {
      state[props.id] = false;
  }
  return (
      <CustomInput onChange={() => {
      
          setState(state => {
             
              return ({ ...state, [props.id]: !state[props.id]});
      })
      }} {...props } />
  )
}
const CustomTextComponent = (props) => {
  return (
    <div>CustomTextComponent</div>
  )
}

const layouts = {
  default: BasicLayout
}

const components = {
  customText: CustomTextComponent,
  switch: RXFormSwitch
}

const model = {
  groups: [
    {name: "name", type: "switch", label: "Nome:"},
    // {name: "surname", type: "text", label: "Cognome:"},
    // {name: "email", type: "customText", label: "Email Address:"},
  ],
  buttons: [
    {name: "submit", type: "submit", label: "Invia"}
  ]
}

export const App = () => {
    return (
      <div className="App">
        <RXForm 
          layouts={layouts} 
          components={components} 
          model={model}
        />
      </div>
    );
};
