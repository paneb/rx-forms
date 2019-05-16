import * as React from 'react'
import { renderLayout } from './layouts'

interface RXFormsProps {
  layouts: { String: any },
  components: { String: any },
  model: any,
  handleChange?(x: any): any
}

interface IRXFormState {

}

const RXFormContext = React.createContext([{}, () => { }]);

const RXForm: React.FC<RXFormsProps> = (props) => {

  const layouts = props.layouts;
  const components = props.components;
  const model = props.model;

  const [state, setState] = React.useState<IRXFormState>({});

  if (props.handleChange) {
    props.handleChange(state);
  }

  // const [layouts] = React.useState(props.layouts);
  // const [model] = React.useState(props.model);
  // console.log(state);
  return (
    <>
      <RXFormContext.Provider value={[state, setState]}>
        {renderLayout({ layouts, components, model })}
      </RXFormContext.Provider>
    </>
  );
}

export { RXForm, RXFormContext }