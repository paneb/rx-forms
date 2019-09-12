import * as React from 'react';
import { useImperativeHandle} from 'react';

import { renderLayout, BasicForm, BasicButtons} from './layouts';
import { setValueAction, willValidateAllAction} from './actions';
import {validationReducer, currentValuesReducer, globalValidationReducer} from './reducers';

import update from 'immutability-helper';

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { baseLayouts, baseComponents, baseValidators, baseEvents } from "./default"

var lo = require('lodash');

interface RXFormsProps {
  layouts: any,
  formComponent: any,
  components: any,
  buttonsComponent: any,
  events: any,
  model: any,
  data: {String: any},
  validators: any,
  formParams: any
}

interface ReactRef {
  current: any
}

export const RXForm: React.FC<RXFormsProps> = React.forwardRef((props: RXFormsProps, ref: ReactRef) => {

  const layouts = props.layouts ? update(baseLayouts, {$merge: props.layouts}) : baseLayouts;
  const components = props.components ? update(baseComponents, {$merge: props.components}) : baseComponents;
  const model = props.model;
  const formComponent = props.formComponent ? props.formComponent : BasicForm;
  const validators = props.validators ? update(baseValidators, {$merge: props.validators}) : baseValidators;
  const buttonsComponent = props.buttonsComponent ? props.buttonsComponent : BasicButtons;
  const formParams = props.formParams ? props.formParams : {}

  const events = props.events ? update(baseEvents, {$merge: props.events}) : baseEvents;

  var store: any = null;
  //Make store once
  // const ref = useRef();

  var ref = ref;
  console.log(`ref: `, ref);
  if (!ref){
    ref = React.createRef();
  }

  if (ref && !ref.current){

    ref.current = {};
  }

  console.log(`ref current: `, ref.current);

  if (ref && ref.current && !ref.current.store){

    const rootReducer = combineReducers({
      values: currentValuesReducer,
      // initialValues: initialValuesReducer,
      errors: validationReducer,
      validation: globalValidationReducer
    });
    
    ref.current.store = createStore(rootReducer, applyMiddleware(thunk))
  }
  store = ref.current.store;
  console.log(`store: `, ref.current.store);

  useImperativeHandle(ref, () => ({
    test: () => {
      console.log(`called test`); 
      return {test: "pippo"}
    },
    submit: async (validate = false) => {
      console.log(`in submit call`);

      if(validate){
        const [values, errors] =  await store.dispatch(willValidateAllAction(model, validators, store.getState().values))
        console.log(`with validate result: `, values, errors);
        console.log(`with errors after validate: `, store.getState().errors);

      }
      return {
        values: store.getState().values,
        errors: store.getState().errors
      }
    },
    store: store
  }));

  React.useEffect(()=>{

    console.log('check initial values: ', JSON.stringify(props));

    //Extract field from model
    const baseFieldNames = props.model.groups.map((field: any, _index:number)=>{
      return [field.name, ""]
    })
    console.log(`baseFieldNames: `, baseFieldNames);
    const baseFields = lo.fromPairs(baseFieldNames);
    const fields = update(baseFields, {$merge: props.data});

    console.log(`found initial fields: `, fields);

    Object.keys(fields).map((key)=>{
      store.dispatch(setValueAction(key, fields[key]));
    });

    const unsubscribe = store.subscribe(()=>{

      console.log(`in store events with `, JSON.stringify(store.getState()));
      events.onValidation(store.getState().errors);
      events.onValuesChange(store.getState().values);
    });

    return () => {

      unsubscribe();
    }
    

  }, [])

  return (
    <>
      <Provider store={ref.current.store}>
        {renderLayout({layouts, formComponent, components, model, buttonsComponent, events, validators, store, formParams})}
      </Provider>
    </>
  );
});
