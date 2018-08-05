const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}

export default {
  SES: {
    ...credentials,
    region: 'us-west-2',
  },
}
