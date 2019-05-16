import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { RXForm, RXFormContext } from 'rx-core';
import { CustomInput, Input } from 'reactstrap';

const BasicLayout = (props) => {
  return (
    <div>
      <span style={{ color: 'lightgray' }}>RXForm placeholder</span>

      <div style={{ backgroundColor: "#eeeeee", margin: 20, padding: 20, width: "calc(100% - 20)" }}>
        <form>
          {props.model.groups.map((input, index) => {
            let Component = props.components[input.type];
            return (
              <fieldset key={`${index}`}>
                <label htmlFor={`${input.name}`}>{input.label}</label>
                {/* <input type={`${input.type}`} name={`${input.name}`} id={`${input.name}`}></input> */}
                <Component type={input.type} name={input.name} id={input.name} />
              </fieldset>
            )
          }
          )}
        </form>
      </div>
    </div>
  )
}


const RXFormTextInput = (props) => {
  const [state, setState] = React.useContext(RXFormContext);
  const [value, setValue] = React.useState("");
  if (undefined === state[props.id]) {
    state[props.id] = "";
  }
  React.useEffect(() => {
    // Update the document title using the browser API
     setState(state => {
        return ({ ...state, [props.id]: String(value) });
      })
  }, [value]);
  return (
    <Input onChange={(a) => {
      setValue(a.target.value);
    
    }} {...props} />
  )
}

const RXFormNumberInput = (props) => {
  const [state, setState] = React.useContext(RXFormContext);
  const [value, setValue] = React.useState(0);
  if (undefined === state[props.id]) {
    state[props.id] = 0;
  }
  React.useEffect(() => {
    // Update the document title using the browser API
     setState(state => {
        return ({ ...state, [props.id]: Number(value) });
      })
  }, [value]);
  return (
    <CustomInput type="number" value={value} onChange={(a) => {
      setValue(a.target.value);
    }} {...props} />
  )
}


const RXFormSwitch = (props) => {
  const [state, setState] = React.useContext(RXFormContext);
  if (undefined === state[props.id]) {
    state[props.id] = false;
  }
  return (
    <CustomInput onChange={() => {

      setState(state => {

        return ({ ...state, [props.id]: !state[props.id] });
      })
    }} {...props} />
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
  switch: RXFormSwitch,
  text: RXFormTextInput,
  number: RXFormNumberInput,
}

const model = {
  groups: [
    { name: "switch1", type: "switch", label: "Switch:" },
    { name: "text1", type: "text", label: "Text:" },
    { name: "num1", type: "number", label: "Number:" },
    // {name: "surname", type: "text", label: "Cognome:"},
    // {name: "email", type: "customText", label: "Email Address:"},
  ],
  buttons: [
    { name: "submit", type: "submit", label: "Invia" }
  ]
}

export const App = () => {
  let hC = (data) => {
    console.log(data)
  }
  return (
    <div className="App">

      <RXForm
        handleChange={hC}
        layouts={layouts}
        components={components}
        model={model}
      />
    </div>
  );
};
