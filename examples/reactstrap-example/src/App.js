import React, { useState, useEffect, useRef} from 'react';
import logo from './logo.svg';

import { RXForm, rootReducer, injectDataToComponent } from 'rx-forms';
import { setValueAction, useFocus } from 'rx-forms';

import { Col, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './App.css';


const model = {
  groups: [
    {name: "surname", type: "text", label: "Cognome:"},
    {name: "name", type: "text", label: "Nome:"},
  ],
  buttons: [
    {name: "submit", type: "submit", label: "Invia"}
  ]
}

const validators = [];

const BasicLayout = (props) => {
  return (
    <div>

        {/* <Form> */}
          {props.model.groups.map((input, index)=> {
          
          const Component = props.components[input.type];

          return (
            <FormGroup row key={`${index}`}>
              <Label style={{textAlign: 'left'}} sm={2} for={`${input.name}`}>{input.label}</Label>
              <Col sm={10}>
                {props.components[input.type] !== undefined ? (
                    <Component model={input} store={props.store} />
                ):(
                  <Input type={`${input.type}`} name={`${input.name}`} id={`${input.name}`}></Input>
                )}
              </Col>
            </FormGroup>
            
          )})}

        {/* </Form> */}
    </div>
  )
}

const ReactStrapForm = (props) => {
  return (
    <React.Fragment>

      <span style={{color: 'darkgray', marginTop: 40, marginBottom: 40, display: 'block'}}>RXForm Reactstrap</span>

      <div style={{backgroundColor: "#eeeeee", padding:10}}>
        <Form>
          {props.children}
        </Form>

      </div>

    </React.Fragment>
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
        <Input innerRef={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => componentSetValue(e.target.value)}></Input>
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
    <Container className="App">
      <RXForm
        formComponent={ReactStrapForm}
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
    </Container>
  );
}
