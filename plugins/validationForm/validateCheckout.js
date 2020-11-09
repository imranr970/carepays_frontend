
import * as validations from "@/plugins/validations";


export function validate(store, data) {

  //default errors to empty
  var errors = {};
  var select_elements = ['city', 'state'];
  var fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state'];


  fields.forEach((field) => {

    let field_string = formatField(field);

    if(validations.empty(data[field])) {
      errors[field] = [`${field_string} is required`];
    }

    if(validations.notIn(data[field]) && select_elements.indexOf(field) != -1) {
      errors[field] = [`${field_string} is required`];
    }

  });

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }

  if(!validations.isNumber(data.phone)) {
    let field_string = formatField('phone');
    errors['phone'] = [`Please enter valid ${field_string}`];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }

  return true;

}

export function formatField(field) {
  let field_string = field.charAt(0).toUpperCase() + field.slice(1)
  return field_string.replace('_', ' ');
}
