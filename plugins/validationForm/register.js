
import * as validations from "@/plugins/validations";


export function validate(store, data) {

  //default errors to empty
  var errors = {};
  var select_elements = ['gender', 'day', 'month', 'year'];
  var fields = ['first_name', 'last_name', 'email', 'address', 'password', 'confirm_password', 'day', 'month', 'year'];

  //iterate to mandatory fields and check if empty
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

  if(data.password.length < 8) {
    errors['password'] = [`Password cannot be less than 8 characters`];
  }

  if(data.confirm_password.length < 8) {
    errors['confirm_password'] = [`Password cannot be less than 8 characters`];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }


  if(!validations.passwordsMatch(data.password, data.confirm_password)) {
    errors['password'] = [`Passwords do not match`];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }

  // if(validations.notIn(data.dob.day)) {
  //   errors['dob.day'] = [`${field_string} is required`];
  // }

  // if(validations.notIn(data.dob.month)) {
  //   errors['dob.month'] = [`${field_string} is required`];
  // }

  // if(validations.notIn(data.dob.year)) {
  //   errors['dob.year'] = [`${field_string} is required`];
  // }

  // //if not empty errors then fill global errors
  // if(Object.entries(errors).length > 0) {
  //   store.dispatch('validation/setErrors', errors);
  //   return false;
  // }

  return true;

}

export function formatField(field) {
  let field_string = field.charAt(0).toUpperCase() + field.slice(1)
  return field_string.replace('_', ' ');
}
