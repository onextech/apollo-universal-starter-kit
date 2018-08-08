import React from 'react'
import { Formik } from 'formik'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { Mutation } from 'react-apollo'
import UPLOAD_FILES from '../../../../../upload/graphql/UploadFiles.graphql'

interface RenderUploadProps {
  name: string,
  input: { value: string },
  label: string,
  meta: { touched: boolean, error: string },
  placeholder: string,
  formik: Formik,
  children: React.ReactNode,
}

interface UploadData {
  uploadFiles: {
    files: {
      name: string,
      type: string,
      path: string,
      size: string,
      src: string,
    },
  }
}

interface UploadVariables {
  files: File[],
}

class UploadMutation extends Mutation<UploadData, UploadVariables> {}

const RenderUpload = (props: RenderUploadProps) => {
  const { name, formik, input, label, meta: { touched, error }, children, placeholder } = props
  const { setFieldValue } = formik
  let valid = true
  if (touched && error) {
    valid = false
  }
  if (input.value) {
    return (
      <img src={input.value} style={{ maxWidth: '100%' }} />
    )
  }
  return (
    <UploadMutation mutation={UPLOAD_FILES}>
      {(mutate) => {
        const handleFileChange = async (e: any) => {
          try {
            const { files } = e.target
            const result = await mutate({ variables: { files: files[0] }})
            if (result) {
              const { data: { uploadFiles: { files: uploadedFiles } } } = result
              const uploadedFile = uploadedFiles[0]
              const { src } = uploadedFile
              setFieldValue(name, src)
            }
          } catch (e) {
            return { error: e.graphQLErrors[0].message }
          }
        }

        return (
          <FormGroup>
            {label && <Label>{label}</Label>}
            <React.Fragment>
              <Input
                {...input}
                placeholder={label || placeholder}
                invalid={!valid}
                type='file'
                onChange={handleFileChange}
              >
                {children}
              </Input>
              {touched && (error && <FormFeedback>{error}</FormFeedback>)}
            </React.Fragment>
          </FormGroup>
        )
      }
      }
    </UploadMutation>
  )
}

export default RenderUpload
