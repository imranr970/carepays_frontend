
import * as validations from "@/plugins/validations";


export function validate(store, data) {

  //default errors to empty
  var errors = {};

  var fields = ['email', 'password'];

  //iterate to mandatory fields and check if empty
  fields.forEach((field) => {

    let field_string = formatField(field);

    if(validations.empty(data[field])) {
      errors[field] = [`${field_string} is required`];
    }

  });

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }
  return true;

}

export function formatField(field) {
  let field_string = field.charAt(0).toUpperCase() + field.slice(1)
  return field_string.split('_').join(' ');
}
