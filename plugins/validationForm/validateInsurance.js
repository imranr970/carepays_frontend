
import * as validations from "@/plugins/validations";

export function validate(store) {

  //default errors to empty
  var errors = {};
  var select_elements = ['person', 'type', 'package'];

  var insurance_fields = store.getters['insurance/insurance'];
  var insured_fields = store.getters['insurance/insured'];

  var insurance_keys = Object.keys(insurance_fields);
  var insured_keys = Object.keys(insured_fields);

  //becuase financial guarantor will be handled serparately it should not come in loop
  delete insurance_keys[2];

  // deleting types {}
  delete insurance_keys[insurance_keys.length-1];

  //iterate to insurance fields and check if empty or selected option is 0 or none
  insurance_keys.forEach((field) => {

    let field_string = formatField(field);

    if(validations.empty(insurance_fields[field])) {
      errors[field] = [`${field_string} is required`];
    }

    if(validations.notIn(insurance_fields[field]) && select_elements.indexOf(field) != -1) {
      errors[field] = [`${field_string} is required`];
    }

  });

  // insured_keys.forEach((field) => {

  //   let field_string = formatField(field);
  //   if(validations.empty(insured_fields[field])) {
  //     errors[field] = [`${field_string} is required`];
  //   }

  //   if(validations.notIn(insured_fields[field]) && select_elements.indexOf(field) != -1) {
  //     errors[field] = [`${field_string} is required`];
  //   }

  // });

  if((
    (insurance_fields['person'] !== 'self' && insurance_fields['person'] != 0) && insurance_fields['financial_guarantor'] == null) ||
    insurance_fields['financial_guarantor'] == '') {
    errors['financial_guarantor'] = ['financial guarantor name is required'];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }


  // if(!validations.isNumber(profile.phone)) {
  //   let field_string = formatField('phone');
  //   errors['phone'] = [`Please enter valid ${field_string}`];
  // }

  // if(!validations.isNumber(profile.alt_phone) && !validations.empty(profile.alt_phone)) {
  //   let field_string = formatField('alt_phone');
  //   errors['alt_phone'] = [`Please enter valid ${field_string}`];
  // }

  // if(!validations.isNumber(profile.zipcode)) {
  //   let field_string = formatField('zipcode');
  //   errors['zipcode'] = [`Please enter valid ${field_string}`];
  // }

  // if(!validations.standardLength(profile.zipcode, 5)) {
  //   let field_string = formatField('zipcode');
  //   errors['zipcode'] = [`Please enter valid ${field_string}`];
  // }

  // //if not empty errors then fill global errors
  // if(Object.entries(errors).length > 0) {
  //   store.dispatch('validation/setErrors', errors);
  //   return false;
  // }

  if(!validations.standardLength(insured_fields.id_or_ssn, 9) || !validations.isNumber(insured_fields.id_or_ssn)) {
    let field_string = formatField('id_or_ssn');
    errors['id_or_ssn'] = [`Please enter valid ${field_string}`];
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

