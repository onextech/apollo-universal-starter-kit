import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import translate from '../../../i18n'
import Field from '../../../utils/FieldAdapter'
import { Form, RenderField, RenderUpload, Button } from '../../common/components/web'
import { minLength, required, validateForm } from '../../../../../common/validation'

const postFormSchema = {
  title: [required],
  image: [],
  content: [required, minLength(10)],
}

const validate = (values) => validateForm(values, postFormSchema)

const PostForm = (props) => {
  const { values, handleSubmit, submitting, t } = props
  return (
    <Form name='post' onSubmit={handleSubmit}>
      <Field name='image' component={RenderUpload} label={t('post.field.image')} value={values.image} />
      <Field name='title' component={RenderField} type='text' label={t('post.field.title')} value={values.title} />
      <Field name='content' component={RenderField} type='text' label={t('post.field.content')} value={values.content} />
      <Button color='primary' type='submit' disabled={submitting}>{t('post.btn.submit')}</Button>
    </Form>
  )
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  post: PropTypes.object,
  t: PropTypes.func,
}

const PostFormWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    title: props.post && props.post.title,
    content: props.post && props.post.content,
  }),
  validate: (values) => validate(values),
  handleSubmit(values, { props: { onSubmit } }) {
    console.log('values at handleSubmit', values)
    onSubmit(values)
  },
  enableReinitialize: true,
  displayName: 'PostForm', // helps with React DevTools
})

export default translate('post')(PostFormWithFormik(PostForm))
