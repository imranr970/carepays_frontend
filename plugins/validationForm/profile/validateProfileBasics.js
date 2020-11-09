
import * as validations from "@/plugins/validations";


export function validateProfileBasics(store) {

  //default errors to empty
  var errors = {};
  var select_elements = ['gender', 'day', 'month', 'year'];
  var fields = ['first_name', 'last_name', 'gender', 'phone', 'day', 'month', 'year'];

  var profile = store.getters['auth/profile'];

  //iterate to mandatory fields and check if empty
  fields.forEach((field) => {

    let field_string = formatField(field);

    if(validations.empty(profile[field])) {
      errors[field] = [`${field_string} is required`];
    }

    if(validations.notIn(profile[field]) && select_elements.indexOf(field) != -1) {
      errors[field] = [`${field_string} is required`];
    }

  });

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }


  if(!validations.isNumber(profile.phone)) {
    let field_string = formatField('phone');
    errors['phone'] = [`Please enter valid ${field_string}`];
  }

  if(!validations.isNumber(profile.alt_phone) && !validations.empty(profile.alt_phone)) {
    let field_string = formatField('alt_phone');
    errors['alt_phone'] = [`Please enter valid ${field_string}`];
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
