import React, { useState } from 'react';
import { connect } from 'react-redux'
import { RXForm, rootReducer, injectDataToComponent } from 'rx-core';
import { createStore } from 'redux'


const BasicLayout = (props) => {

  return (
    <div>
      <span style={{color: 'lightgray'}}>RXForm placeholder</span>

      <div style={{backgroundColor: "#eeeeee", margin: 20, padding: 20, width: "calc(100% - 20)"}}>
        <form>
          {props.model.groups.map((input, index)=>{

            var Component = injectDataToComponent(props.components[input.type])

            return (
          
            <fieldset key={`${index}`}>
              <label htmlFor={`${input.name}`}>{input.label}</label>
              {props.components[input.type] !== undefined ? (
                <div>
                  <Component model={input}/>
                </div>
              ):(
                <input type={`${input.type}`} name={`${input.name}`} id={`${input.name}`}></input>
              )}
            </fieldset>
          )})}
        </form>
      </div>
    </div>
  )
}

const CustomTextComponent = (props) => {

  console.log(`customText: `, props);
  return (
    <div>CustomTextComponent</div>
  )
}

const BasicTextComponent = (props) => {

  const [value, setValue] = useState("");

  const componentSetValue = (value) => {
    console.log(`in component set value`, value)
    setValue(value);
    props.setValue(props.model.name, value);
  }

  return (
    <React.Fragment>
      <div>Basic: </div> 
      <input type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => componentSetValue(e.target.value)}></input>
    </React.Fragment>
  )
}

const layouts = {
  default: BasicLayout
}

const components = {
  customText: CustomTextComponent,
  text: BasicTextComponent
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

const context = React.createContext();

const store = createStore(rootReducer)

export const App = () => {
    return (
      <div className="App">
        <RXForm 
          layouts={layouts} 
          components={components} 
          model={model}
          store={store}
        />
        <div 
          style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 24, width:200, height: 50, backgroundColor: 'black', color: 'white'}}
          onClick={()=>{
            console.log(`in onClick with store: `, store.getState("data"));
          }} 
        >SUBMIT</div>
      </div>
    );
};
