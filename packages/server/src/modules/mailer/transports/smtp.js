import nodemailer from 'nodemailer'
import settings from '../../../../../../settings'

/**
 * SMTP, the main transport in Nodemailer for delivering messages
 * @link https://nodemailer.com/smtp
 */
const smtpTransport = nodemailer.createTransport(settings.mailer)

export default smtpTransport
