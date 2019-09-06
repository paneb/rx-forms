import { useState, useRef, useEffect } from 'react';
import { setValue as setValueAction, validateAction} from './actions';
import { useDispatch } from 'react-redux';

export const useRXInput = (store: any, model: any, validators?: any, validateOnChange: boolean = false)=>{

    const ref:any = useRef();
    console.log("ref hook: ", ref);

    const [value, setValue] = useState("");
    const [errors, setErrors] = useState([]);
    const [onValidation, setOnValidation] = useState(false);
  
    console.log(`after create errors: `, errors, ` for `, model.name);
    const verifiedValidators = model.validators ? model.validators : [];
  
    useEffect(()=>{

      const unsubscribe = store.subscribe(()=>{
  
        const state = store.getState();
        console.log(`receive store state`, state);
        setValue(state.values[model.name]);
        setErrors(state.errors[model.name]);
      });
      const onBlur = () => {
        console.log(`in onBlur with `, store.getState().values[model.name], ` for `, model.name);
        store.dispatch(validateAction(model.name, store.getState().values[model.name], verifiedValidators, validators, setOnValidation))

      }

      if (ref.current && ref.current.addEventListener){
        ref.current.addEventListener("blur", onBlur);
      }
  
      return ()=>{
        unsubscribe();
        ref.current.removeEventListener("blur", onBlur);
        console.log(`after unsubscribe`);
      } 
    }, [])
  
    const componentSetValue = (value:any) => {
      console.log(`in component set value with ${value}`)
      setValue(value);
      store.dispatch(setValueAction(model.name, value));
      if(validateOnChange){
        store.dispatch(validateAction(model.name, value, verifiedValidators))
      }
  
    }
  
    console.log(`before return errors: `, errors)
    // return [value, componentSetValue, ref, errors ? errors : [], onValidation]
    return [value, componentSetValue, ref, errors, onValidation]
  }
  
  export const useFocus = (ref: any, name: String, store:any, validators: [String], defaultState = false) => {
    const [state, setState] = useState(defaultState);
    const dispatch = useDispatch();
  
    console.log(`with ref: `, ref);
  
    useEffect(() => {
  
      const onBlur = () => {
        console.log(`in onBlur`); setState(false);
        dispatch({ type: 'VALIDATION', name: name, value: store.getState().values[name.toString()], validators: validators });
      }
      ref.current.addEventListener("blur", onBlur);
   
      return () => {
        ref.current.removeEventListener("blur", onBlur);
      };
    }, []);
  
    return state;
  };