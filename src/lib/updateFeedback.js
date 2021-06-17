import Feedback from '../models/feedback'

const updateFeedback = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'feedback',
    i18n: 'FEEDBACKT_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Feedback.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(feedback => {
    if (!feedback) {
      message.i18n = 'FEEDBACK_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'FEEDBACK_UPDATE_SUCCESS'
    message.code = 200
    message.data = feedback

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateFeedback
