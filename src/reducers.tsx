import update from 'immutability-helper';
import { AnyAction } from 'redux'

// export const firstNamedReducer = (state = 1) => state
// export const initialValuesReducer = (state: any = {}, action: AnyAction) => {
//   console.log(`in state: `, state, ` with action: `, action);
//   if(action.type == "INITIAL_VALUE"){
//     return update(state ? state : {}, {[action.key]: {$set: action.value}})
//   }
//   return state;
// }


export const currentValuesReducer = (state: any = {}, action: AnyAction) => {
  console.log(`in state: `, state, ` with action: `, action);
  if(action.type == "SET_VALUE"){
    return update(state ? state : {}, {[action.key]: {$set: action.value}})
  }
  return state;
}

export const validationReducer = (state: any = {}, action: AnyAction) =>{

  if(action.type == "SINGLE_FIELD_VALIDATION"){
    console.log(`in validationReducer with `, action)
    if (action.errors.length > 0){
      return update(state ? state: {}, {[action.name] : {$set : action.errors}});
    }else{
      return update(state ? state: {}, {$unset: [action.name]});
    }
  }else if(action.type == "ALL_FIELD_VALIDATION"){
    return update(state ? state: {}, {$set: action.errors});
  }

  return state
}



// export const validatorReducerWithValidator = (validators: any) => {

//   console.log(`set validatorReducer with`, validators);

//   const validationReducer = (state: any = {}, action: AnyAction) => {
//     console.log(`in validation reducer with `, JSON.stringify(action));
//     if(action.type == "VALIDATION"){
//       console.log(`in validation reducer with name: ${action.name}, value: ${action.value} and validators list: ${JSON.stringify(action.validators)}`);

//       var errors = [];
//       for (const validator of action.validators){
        
//         if(validators[validator] != undefined){
//           const validationState = validators[validator](action.value, action.name);

//           if(!validationState.result){
//             console.log(`validation error`);
//             errors.push(validationState.error);
//           }else{
//             console.log(`valid`);
//           }
//         }
//       }
//       if(errors.length>0){
//         return update(state ? state: {}, {[action.name] : {$set : errors}});
//       }else{
//         return update(state ? state: {}, {$unset: [action.name]});
//         // return update(state ? state: {}, {});
//       }
//     }
//     return state;
//   }

//   return validationReducer;
  
// }