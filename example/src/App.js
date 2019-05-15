import React from 'react';

import { RXForm } from 'rx-core';

const BasicLayout = (props) => {
  return (
    <div>
      <span style={{color: 'lightgray'}}>RXForm placeholder</span>

      <div style={{backgroundColor: "#eeeeee", margin: 20, padding: 20, width: "calc(100% - 20)"}}>
        <form>
          {props.model.groups.map((input, index)=>(
            <fieldset key={`${index}`}>
              <label htmlFor={`${input.name}`}>{input.label}</label>
              <input type={`${input.type}`} name={`${input.name}`} id={`${input.name}`}></input>
            </fieldset>
          ))}
        </form>
      </div>
    </div>
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
  customText: CustomTextComponent
}

const model = {
  groups: [
    {name: "name", type: "text", label: "Nome:"},
    {name: "surname", type: "text", label: "Cognome:"},
    {name: "email", type: "customText", label: "Email Address:"},
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
