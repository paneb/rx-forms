import * as React from 'react';
import { combineReducers, createStore, AnyAction } from 'redux'
// import { Provider } from 'react-redux'
import { renderLayout} from './layouts';
import { setValue} from './actions';
import update from 'immutability-helper';

interface RXFormsProps {
  layouts:{String: any},
  components: {String: any},
  model: any,
  data: {String: any},
}

export const firstNamedReducer = (state = 1) => state
export const initialValuesReducer = (state: any = {}, action: AnyAction) => {
  console.log(`in state: `, state, ` with action: `, action);
  if(action.type == "INITIAL_VALUE"){
    return update(state ? state : {}, {[action.key]: {$set: action.value}})
  }
  return state;
}
export const currentValuesReducer = (state: any = {}, action: AnyAction) => {
  console.log(`in state: `, state, ` with action: `, action);
  if(action.type == "SET_VALUE"){
    return update(state ? state : {}, {[action.key]: {$set: action.value}})
  }
  return state;
}

const rootReducer = combineReducers({
  values: currentValuesReducer,
  initialValues: initialValuesReducer
});

const store = createStore(rootReducer)

export const RXForm: React.FC<RXFormsProps> = (props) => {

  const layouts = props.layouts;
  const components = props.components;
  const model = props.model;

  React.useEffect(()=>{

    console.log('check initial values: ', props.data);
    Object.keys(props.data).map((key)=>{
      store.dispatch(setValue(key, props.data[key]));
    });
    

  }, [])

  // const renderedComponents:{String: any} = renderComponents(model, components);
  // const [layouts] = React.useState(props.layouts);
  // const [model] = React.useState(props.model);

  return (
    <>
      {renderLayout({layouts, components, model, store})}
    </>
  );
}
