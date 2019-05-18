import * as React from 'react';
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { renderLayout} from './layouts';
import update from 'immutability-helper';

interface RXFormsProps {
  layouts:{String: any},
  components: {String: any},
  model: any,
  store: any
}

export const firstNamedReducer = (state = 1) => {
  console.log(`in first name reducer`);
  return state
}
export const setValueReducer = (state: any, action: any) => {
 
  console.log(`received action: `, action, ' for state: ', state);
  if(action.type == 'UPDATE_VALUE'){
    if(state){
      return update(state, {[action.key]: {$set: action.value}});
    }else{
      return {[action.key]: action.value}
    }
  }else{
    return null 
  }
  // return {
  //   [action.key]: action.value
  // }
}

export const rootReducer = combineReducers({
  firstNamedReducer,
  data: setValueReducer
});

// const store = createStore(rootReducer)

export const RXForm: React.FC<RXFormsProps> = (props) => {

  const layouts = props.layouts;
  const components = props.components;
  const model = props.model;
  const store = props.store;
  

  // const renderedComponents:{String: any} = renderComponents(model, components);
  // const [layouts] = React.useState(props.layouts);
  // const [model] = React.useState(props.model);

  return (
    <Provider store={store}>
      {renderLayout({layouts, components, model})}
    </Provider>
  );
}
