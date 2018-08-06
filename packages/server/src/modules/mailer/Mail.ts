import mailgen from './mailgen'
import sendMail from './sendMail'

const Mail = () => {
  return {
    send: sendMail,
    generate: mailgen.generate.bind(mailgen),
  }
}

export default Mail()
