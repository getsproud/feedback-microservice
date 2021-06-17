import Feedback from '../models/feedback'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query, options, useResolve } = call

  const message = {
    domain: 'feedback',
    i18n: 'FEEDBACK_ERROR',
    data: [],
    code: 500,
    stack: null,
    error: null
  }

  const opts = {
    page: options.page || 1,
    limit: options.limit || 12,
    pagination: options.pagination || true,
    populate: options.populate || 'learnings'
  }

  Feedback.paginate(query, opts).then(feedbacks => {
    message.data = feedbacks

    if (!feedbacks.docs || !feedbacks.docs.length) {
      message.i18n = 'FEEDBACK_NOT_FOUND'
      message.code = 404

      return !useResolve ? reject(message) : resolve(message)
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
