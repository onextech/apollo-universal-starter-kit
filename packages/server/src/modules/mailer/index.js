import mailer from './nodemailer'
import Mail from './Mail'
import Feature from '../connector'

export default new Feature({
  createContextFunc: () => ({ mailer, Mail }),
})
