import Feedback from '../models/feedback'

const deleteFeedback = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'feedback',
    i18n: 'FEEDBACK_DELETION_FAILURE',
    data: null,
    code: 500,
    stack: null,
    error: null
  }

  Feedback.findOneAndDelete(query)
    .then(feedback => {
      if (!feedback) {
        message.i18n = 'FEEDBACK_NOT_FOUND'
        message.code = 404

        return reject(message)
      }

      message.i18n = 'FEEDBACK_DELETION_SUCCESS'
      message.code = 204

      return resolve(message)
    }).catch(e => {
      message.stack = e.stack
      message.err = e.message

      return reject(message)
    })
})

export default deleteFeedback
