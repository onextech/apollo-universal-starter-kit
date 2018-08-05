import nodemailer from 'nodemailer'
import SES from 'aws-sdk/clients/ses'
import settings from '../../../../../../settings'

/**
 * Send emails via Nodemiler + AWS SES Transport
 * @link https://nodemailer.com/transports/ses
 */
const sesTransport = nodemailer.createTransport({
  SES: new SES(settings.aws.SES),
})

export default sesTransport
