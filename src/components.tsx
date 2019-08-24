import React, {useState, useEffect, useRef} from 'react';
// import { useFocus } from './RXForm'
import {setValue as setValueAction } from './actions'
export const renderComponents = (model:any, components:{String:any}) => {

    return model.groups.map((component:any)=>{
        return components[component.type]
    });
}

export const BasicInputComponent : React.SFC<any> = (props) => {

    const [value, setValue] = useState("");
  
    const ref = useRef<any>();
    // const focused = useFocus(ref, props.model.name, props.store, props.model.validators ? props.model.validators : []);
  
    useEffect(()=>{
  
        const unsubscribe = props.store.subscribe(()=>{
    
          const state = props.store.getState();
          console.log(`receive event effect`, state);
          setValue(state.values[props.model.name])
        });
  
      return ()=>{
        unsubscribe();
        console.log(`after unsubscribe`);
      } 
    }, [])
  
    const componentSetValue = (value: any) => {
      console.log(`in component set value with ${value}`)
      setValue(value);
      props.store.dispatch(setValueAction(props.model.name, value));
    } 
  
    return (
      <React.Fragment>
          <input ref={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => componentSetValue(e.target.value)}></input>
      </React.Fragment>
    )
  }