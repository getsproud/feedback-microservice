import Feedback from '../models/feedback'

const createFeedback = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'feedback',
    i18n: 'FEEDBACK_CREATION_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Feedback.create(query).then(feedback => {
    message.i18n = 'FEEDBACK_CREATION_SUCCESS'
    message.code = 200
    message.data = feedback

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.err = e.message

    return reject(message)
  })
})

export default createFeedback
