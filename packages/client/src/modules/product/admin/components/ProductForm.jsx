import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import translate from '../../../../i18n/index'
import Field from '../../../../utils/FieldAdapter'
import { Form, RenderField, RenderUpload, Button } from '../../../common/components/web/index'
import { minLength, required, validateForm } from '../../../../../../common/validation'

const productFormSchema = {
  title: [required],
  description: [minLength(10)],
  image: [],
}

const validate = (values) => validateForm(values, productFormSchema)

const ProductForm = ({ values, handleSubmit, submitting, t }) => {
  return (
    <Form name='product' onSubmit={handleSubmit}>
      <Field name='image' component={RenderUpload} label={t('product.field.image')} value={values.image} />
      <Field name='title' component={RenderField} type='text' label={t('product.field.title')} value={values.title} />
      <Field name='description' component={RenderField} type='text' label={t('product.field.description')} value={values.description} />
      <Button color='primary' type='submit' disabled={submitting}>{t('product.btn.submit')}</Button>
    </Form>
  )
}

ProductForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  product: PropTypes.object,
  t: PropTypes.func,
}

const ProductFormWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    title: props.product && props.product.title,
    description: props.product && props.product.description,
    image: props.product && props.product.image,
  }),
  validate: (values) => validate(values),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('product form submitted', values)
    onSubmit(values)
  },
  enableReinitialize: true,
  displayName: 'ProductForm', // helps with React DevTools
})

export default translate('product')(ProductFormWithFormik(ProductForm))
