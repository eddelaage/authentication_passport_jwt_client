import validator from 'validator'

class FormValidator {
  constructor (validations) {
    this.validations = validations
  }

  validate (state) {
    let validation = this.valid()

    this.validations.forEach(rule => {
      if (!validation[rule.field].isInvalid) {
        const FieldValue = state[rule.field].toString()
        const args = rule.args || []
        const ValidationMethod =
              typeof rule.method === 'string'
                ? validator[rule.method]
                : rule.method
        if (ValidationMethod(FieldValue, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message }
          validation.isValid = false
        }
      }
    })

    return validation
  }

  valid () {
    const validation = {}

    this.validations.map(rule => (
      validation[rule.field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation }
  }
}

export default FormValidator