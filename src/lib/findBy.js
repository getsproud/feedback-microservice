import Feedback from '../models/feedback'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'feedback',
    i18n: 'FEEDBACK_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Feedback.findOne(query).exec().then(feedback => {
    message.data = feedback

    if (!feedback) {
      message.i18n = 'FEEDBACK_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'FEEDBACK_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy
