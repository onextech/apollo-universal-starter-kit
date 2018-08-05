import settings from '../../../../../settings'
import mailer from './nodemailer'

const sendMail = (subject: string, to: string, html: string, options?: object) => {
  return mailer.sendMail({
    to,
    from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
    subject,
    html,
    ...options
  })
}

export default sendMail
