import Mailgen from 'mailgen'
import settings from '../../../../../settings'

export const FormatMail = {
  bold: (str: string) => `<b style='color: black;'>${str}</b>`,
  link: (title: string, href: string) => `<a href='${href}'>${title}</a>`,
}

/**
 * A Node.js package that generates clean, responsive HTML e-mails for sending transactional mail.
 * @link https://github.com/eladnava/mailgen
 * @type {Mailgen}
 */
const mailGenerator = new Mailgen(settings.mailgen)

export default mailGenerator
