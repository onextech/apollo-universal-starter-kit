import jwt from 'jsonwebtoken'
import settings from '../../../../../../settings'

const sendForgotPasswordEmail = (user, context) => {
  if (user && context.mailer) {
    // async email
    jwt.sign(
      { email: user.email, password: user.passwordHash },
      settings.user.secret,
      { expiresIn: '1d' },
      (err, emailToken) => {
        // encoded token since react router does not match dots in params
        const encodedToken = Buffer.from(emailToken).toString('base64')

        const { email, username } = user

        const content = {
          body: {
            name: username || email,
            intro: 'We heard you\'ve forgotten your password. No worries!',
            action: {
              instructions: 'To reset your password, please click here:',
              button: {
                text: 'Reset password',
                link: `${__WEBSITE_URL__}/reset-password/${encodedToken}`,
              },
            },
            outro: 'Thanks, have a good day!',
          },
        }

        const html = context.Mail.generate(content)

        return context.Mail.send('Reset Password', email, html)
      }
    )
  }
}

export default sendForgotPasswordEmail
