import * as React from 'react'
import { renderLayout} from './layouts'

interface RXFormsProps {
  layouts:{String: any},
  components: {String: any},
  model: any
}

export const RXForm: React.FC<RXFormsProps> = (props) => {

  const layouts = props.layouts;
  const components = props.components;
  const model = props.model;
  // const [layouts] = React.useState(props.layouts);
  // const [model] = React.useState(props.model);

  return (
    <>
      {renderLayout({layouts, components, model})}
    </>
  );
}
