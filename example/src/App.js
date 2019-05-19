import React, { useState, useEffect} from 'react';

import { RXForm, setValueAction } from 'rx-core';

const BasicLayout = (props) => {
  return (
    <div>
      <span style={{color: 'lightgray'}}>RXForm placeholder</span>

      <div style={{backgroundColor: "#eeeeee", margin: 20, padding: 20, width: "calc(100% - 20)"}}>
        <form>
          {props.model.groups.map((input, index)=> {
          
          const Component = props.components[input.type];

          return (
            <fieldset key={`${index}`}>
              <label htmlFor={`${input.name}`}>{input.label}</label>
              {props.components[input.type] !== undefined ? (
                <div>
                  {/* {props.components[input.type]({model: input, store: props.store})} */}
                  <Component model={input} store={props.store} />
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
  return (
    <div>CustomTextComponent</div>
  )
}

class ClassTextComponent extends React.Component {

  componentDidMount = () => {
    console.log(`in componentDidMount`)
    const unsub = this.props.store.subscribe(()=>{

      console.log(`receive event`);
    });
    console.log(`unsub `, unsub);
  }

  render(){
    return (
      <React.Fragment>
        <div>Basic: </div> 
        <input type={`${this.props.model.type}`} name={`${this.props.model.name}`} id={`${this.props.model.name}`} value={"xx"} onChange={(e) => {}}></input>
      </React.Fragment>
    )
  }
}

const BasicTextComponent = (props) => {

  const [value, setValue] = useState("");

  // const [sub, setSub] = useState(null);

  useEffect(()=>{

      // console.log(`in useEffect with store `, props.store);
      const unsubscribe = props.store.subscribe(()=>{
  
        const state = props.store.getState();
        console.log(`receive event effect`, state);
        setValue(state.values[props.model.name])
      });
      // console.log('after sub', unsubscribe);

    return ()=>{
      unsubscribe();
      console.log(`after unsubscribe`);
    }
  }, [])

  const componentSetValue = (value) => {
    console.log(`in component set value`)
    setValue(value);
    props.store.dispatch(setValueAction(props.model.name, value));
  }

  console.log(`in render for `, props.model.name);
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
  text: BasicTextComponent,
  classText: ClassTextComponent
}

const model = {
  groups: [
    {name: "name", type: "text", label: "Nome:"},
    {name: "surname", type: "text", label: "Cognome:"},
    {name: "email", type: "text", label: "Email Address:"},
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
          data={{
            name: "Francesco",
            surname: "Cabras",
            email: "francesco.cabras@gmail.com"
          }}
        />
      </div>
      
    );
};
