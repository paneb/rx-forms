import React  from 'react';
import { useRXInput } from './hooks'

export const renderComponents = (model:any, components:{String:any}) => {

    return model.groups.map((component:any)=>{
        return components[component.type]
    });
}

export const BasicInputComponent : React.SFC<any> = (props) => {

  const [value, setValue, ref] = useRXInput(props.store, props.model);

  return (
    <React.Fragment>
      <span>Basic</span>
        <input ref={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setValue(e.target.value)}></input>
    </React.Fragment>
  )
}

export const BasicNumberComponent : React.SFC<any> = (props) => {

  const [value, setValue, ref] = useRXInput(props.store, props.model);

  const setNumberValue = (value:any)=>setValue(parseInt(value));

  return (
    <React.Fragment>
      <span>Basic</span>
        <input ref={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setNumberValue(e.target.value)}></input>
    </React.Fragment>
  )
}