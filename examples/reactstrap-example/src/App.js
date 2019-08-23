import React, { useState, useEffect, useRef} from 'react';
import logo from './logo.svg';

import { RXForm, rootReducer, injectDataToComponent } from 'rx-forms';
import { setValueAction, useFocus } from 'rx-forms';

import './App.css';


const model = {
  groups: [
    {name: "surname", type: "text", label: "Cognome:"},
  ],
  buttons: [
    {name: "submit", type: "submit", label: "Invia"}
  ]
}

const validators = [];

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

const BasicTextComponent = (props) => {

  const [value, setValue] = useState("");

  const ref = useRef();
  const focused = useFocus(ref, props.model.name, props.store, props.model.validators ? props.model.validators : []);

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
    console.log(`in component set value with ${value}`)
    setValue(value);
    props.store.dispatch(setValueAction(props.model.name, value));
  } 

  console.log(`in render2 for `, props.model.name);
  return (
    <React.Fragment>
      <div>Basic: </div> 
      <input ref={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => componentSetValue(e.target.value)}></input>
    </React.Fragment>
  )
}

const layouts = {
  default: BasicLayout
}

const components = {
  text: BasicTextComponent,
}

export const  App = () => { 

  const form = useRef(null);
  const[store, setStore] = useState(null);
  const [errors, setErrors] = useState([]);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    console.log(`in click with: `, form.current.submit());
  };

  useEffect(()=>{

    console.log(`form current: `, form.current);
    setStore(form.current.store.getState().errors)

  }, []);

  // var form = null;
  useEffect(()=>{
    console.log(`with form: `, form);
  },[])
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <RXForm
        ref={form}
        layouts={layouts} 
        components={components} 
        model={model}
        data={{
          name: "Francesco",
          surname: "Cabras",
          email: "francesco.cabras@gmail.com"
        }}
        validators={validators}
        onValidation={(errors)=>{
          console.log(`in onValidation: `, JSON.stringify(errors));
          setErrors(errors);
        }}
        onValuesChange={(values)=>{
          console.log('in onValuesChange: ', values);
        }}
      />
    </div>
  );
}
