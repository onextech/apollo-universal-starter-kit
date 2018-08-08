/*eslint-disable no-unused-vars*/
import shell from 'shelljs'
import fs from 'fs'
import mkdirp from 'mkdirp'
import shortid from 'shortid'

import FieldError from '../../../../common/FieldError'

const UPLOAD_DIR = 'public'

const storeFS = ({ stream, filename }) => {
  // Check if UPLOAD_DIR exists, create one if not
  if (!fs.existsSync(UPLOAD_DIR)) {
    mkdirp(UPLOAD_DIR, (err) => {
      if (err) throw new Error(err)
    })
  }

  const id = shortid.generate()
  const path = `${UPLOAD_DIR}/${id}-${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => {
        if (stream.truncated) {
          // Delete the truncated file
          fs.unlinkSync(path)
        }
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve({ id, path, size: fs.statSync(path).size })))
}

const processUpload = async (uploadPromise) => {
  const { stream, filename, mimetype, encoding } = await uploadPromise
  const { id, path, size } = await storeFS({ stream, filename })
  return { name: filename, type: mimetype, path, size }
}

export default (pubsub) => ({
  Query: {
    files(obj, args, { Upload }) {
      return Upload.files()
    },
  },
  Mutation: {
    uploadFiles: async (obj, { files }, { Upload }) => {
      const uploadedFiles = await Promise.all(files.map(processUpload))
      // console.log('result at uploadFiles', results)
      // const results = [
      //   {
      //     name: 'mojave.jpg',
      //     type: 'image/jpeg',
      //     path: 'public/SJh2WXOHm-mojave.jpg',
      //     size: 275058,
      //   },
      // ]
      // TODO: Move save action to downstream-consuming module
      const mapPathToSrc = (file) => {
        const { path } = file
        return { ...file, src: `${__WEBSITE_URL__}/${path}` }
      }
      const result = uploadedFiles.map(mapPathToSrc)
      return { files: result }
      // return Upload.saveFiles(files)
    },
    removeFile: async (obj, { id }, { Upload }) => {
      const file = await Upload.file(id)
      if (!file) {
        throw new Error('File not found.')
      }

      const ok = await Upload.deleteFile(id)
      if (ok) {
        const filePath = `${file.path}`
        const res = shell.rm(filePath)
        if (res.code > 0) {
          throw new Error('Unable to delete file.')
        }
      }
      return ok
    },
  },
  Subscription: {},
})
