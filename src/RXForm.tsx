import * as React from 'react';
import { useImperativeHandle} from 'react';

import { combineReducers, createStore, AnyAction } from 'redux'
// import { Provider } from 'react-redux'
import { renderLayout} from './layouts';
import { setValue} from './actions';
import update from 'immutability-helper';
import { useDispatch, Provider, useSelector } from 'react-redux'

interface RXFormsProps {
  layouts:{String: any},
  components: {String: any},
  model: any,
  data: {String: any},
  validators: {String: any},
  onValidation: (errors: any) => null,
  onValuesChange: (values: any) => null
}

interface ReactRef {
  current: any
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

const validatorReducerWithValidator = (validators: {String: any}) => {

  console.log(`set validatorReducer with`, validators);

  const validationReducer = (state: any = {}, action: AnyAction) => {
    console.log(`in validation reducer with `, JSON.stringify(action));
    if(action.type == "VALIDATION"){
      console.log(`in validation reducer with name: ${action.name}, value: ${action.value} and validators list: ${action.validators}`);

      var errors = [];
      for (const validator of action.validators){
        
        if(validators[validator] != undefined){
          const validationState = validators[validator](action.value, action.name);

          if(!validationState.result){
            console.log(`validation error`);
            errors.push(validationState.error);
          }else{
            console.log(`valid`);
          }
        }
      }
      if(errors.length>0){
        return update(state ? state: {}, {[action.name] : {$set : errors}});
      }else{
        return update(state ? state: {}, {});
      }
    }
    return state;
  }

  return validationReducer;
  
}


// const rootReducer = combineReducers({
//   values: currentValuesReducer,
//   initialValues: initialValuesReducer,
//   errors: validationReducer
// });

// const store = createStore(rootReducer)

export const useFocus = (ref: any, name: String, store:any, validators: [String], defaultState = false) => {
  const [state, setState] = React.useState(defaultState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // const onFocus = () => {
    //   console.log(`in onFocus`); setState(true);
    //   dispatch({ type: 'focus-event' });
    // }

    const onBlur = () => {
      console.log(`in onBlur`); setState(false);
      dispatch({ type: 'VALIDATION', name: name, value: store.getState().values[name.toString()], validators: validators });
    }
    // ref.current.addEventListener("focus", onFocus);
    ref.current.addEventListener("blur", onBlur);
 
    return () => {
      // ref.current.removeEventListener("focus", onFocus);
      ref.current.removeEventListener("blur", onBlur);
    };
  }, []);

  return state;
};

export const RXForm: React.FC<RXFormsProps> = React.forwardRef((props: RXFormsProps, ref: ReactRef) => {

  const layouts = props.layouts;
  const components = props.components;
  const model = props.model;
  var store: any = null;
  //Make store once
  // const ref = useRef();
  console.log(`ref current: `, ref.current);
  if (ref && !ref.current){
    ref.current = {};
  }
  if (ref && ref.current && !ref.current.store){

    const rootReducer = combineReducers({
      values: currentValuesReducer,
      initialValues: initialValuesReducer,
      errors: validatorReducerWithValidator(props.validators)
    });
    
    ref.current.store = createStore(rootReducer)
  }
  store = ref.current.store;
  console.log(`store: `, ref.current.store);

  // const test = useSelector((data: any)=>{
  //   console.log(`in useSelector with: `, data);
  //   return "pippo";
  // })
  // console.log(`withTest: `, test);

  useImperativeHandle(ref, () => ({
    test: () => {
      console.log(`called test`); 
      return {test: "pippo"}
    },
    submit: () => {
      console.log(`in submit call`);
      return {
        values: store.getState().values,
        errors: store.getState().errors
      }
    },
    store: store
  }));

  React.useEffect(()=>{

    console.log('check initial values: ', JSON.stringify(props));
    Object.keys(props.data).map((key)=>{
      store.dispatch(setValue(key, props.data[key]));
    });

    const unsubscribe = store.subscribe(()=>{

      console.log(`in store events with `, JSON.stringify(store.getState()));
      props.onValidation(store.getState().errors);
      props.onValuesChange(store.getState().values);
    });

    return () => {

      unsubscribe();
    }
    

  }, [])

  // const renderedComponents:{String: any} = renderComponents(model, components);
  // const [layouts] = React.useState(props.layouts);
  // const [model] = React.useState(props.model);

  return (
    <>
      <Provider store={ref.current.store}>
        {renderLayout({layouts, components, model, store})}
      </Provider>
    </>
  );
});
