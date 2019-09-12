// var lo = require('lodash');

const doSingleFieldValidation: any = async (name: String, value: any, values: any, validators: any, validatorsList: any, setOnValidation: any) => {

  console.log(`in async validate`);

  var errors: any = [];
  for (const validator of validators){

    console.log(`in validator: `, validator)
        
    if(validatorsList[validator] != undefined){

      
      const result = validatorsList[validator](value, name, values);
      var validationState = null;

      if(result instanceof Promise){
        console.log(`validator `, validator, ` is promise`);
        setOnValidation(true);
        validationState = await result;
        setOnValidation(false);
      }else{
        console.log(`validator `, validator, ` is sync`);
        validationState = result;
      }

      console.log(`with validationState: `, validationState);

      if(!validationState.valid){
        console.log(`validation error`, validationState.valid);
        errors.push(validationState.error);
      }else{
        console.log(`valid`);
      }
    }
  }
  return errors;

}

export const setValueAction: any = (key: String, value: any) => {
  return {
    type: "SET_VALUE",
    key,
    value
  }
}

const didValidateAction: any = (name: String, value: any, errors:any) => {

  console.log(`in validation action with errors: `, errors);

  return {
    type: "SINGLE_FIELD_VALIDATION",
    name,
    value,
    errors
  }
}

export const willValidateAction: any = (name: String, value: any, values: any, validators:any, validatorsList: any, setOnValidation: any) => {

  console.log(`in validateAction with thunk with validators: `, validators, ' and globals: ', validatorsList);

    return (dispatch: any) => {

      doSingleFieldValidation(name, value, values, validators, validatorsList, setOnValidation)
      .then((errors:any)=>{
    
        console.log(`in return`)
        dispatch(didValidateAction(name, value, errors))
      })
    }

}

const doValidateAllFields: any = async (model: any, validatorsList: any, values: any) => {

  var errors = {};

  for(var i: number = 0; i < model.groups.length; i++){
    const field = model.groups[i];
    const fieldValidator = field.validators ? field.validators : [];
    const fieldErrors =  await doSingleFieldValidation(field.name, values[field.name], values, fieldValidator, validatorsList, ()=>{})
    console.log(`after fieldError with `, field.name, ` `, fieldErrors);
    errors[field.name] = fieldErrors;
  }
  console.log(`end of doValidateAllFields`);
  return errors;

}

export const willValidateAllAction: any = (model: any, validatorsList: any, values: any) => {

  console.log(`in willValidateAllAction with model `, model);

  return (dispatch: any) => {

    const resultPromise = new Promise((resolve, _reject)=>{

      doValidateAllFields(model, validatorsList, values)
      .then((errors: any)=>{

        console.log(`before dispatch with errors: `, errors);
        dispatch(didValidateAllAction(values, errors));
        resolve([values, errors]);
      });
    })

    return resultPromise
  
  }

}

const didValidateAllAction: any = (values: any, errors: any) => {

  return { type: "ALL_FIELD_VALIDATION", values, errors}
}
