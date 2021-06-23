import { Responder } from 'cote'
import { connect } from 'mongoose'

import findBy from './lib/findBy'
import findAllBy from './lib/findAllBy'
import createFeedback from './lib/createFeedback'
import updateFeedback from './lib/updateFeedback'
import deleteFeedback from './lib/deleteFeedback'

const PORT = 50051

try {
  const connectRetry = t => {
    let tries = t

    return connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@sproud-cluster${process.env.NODE_ENV !== 'production' ? '-dev' : ''}${process.env.MONGO_HOST}/sproud${process.env.NODE_ENV === 'development' ? '-dev' : ''}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .catch(e => {
        if (tries < 5) {
          tries += 1
          setTimeout(() => connectRetry(tries), 5000)
        }

        throw new Error(e)
      })
  }

  connectRetry(0)

  const responder = new Responder({
    name: 'Feedback Service', port: PORT, key: 'feedback'
  })

  responder.on('findBy', findBy)
  responder.on('findAllBy', findAllBy)
  responder.on('createFeedback', createFeedback)
  responder.on('updateFeedback', updateFeedback)
  responder.on('deleteFeedback', deleteFeedback)

  responder.on('liveness', () => new Promise(resolve => resolve(200)))
  responder.on('readiness', () => new Promise(resolve => resolve(200)))

  // eslint-disable-next-line
  console.log(`🤩 Feedback Microservice bound to port ${PORT}`)
} catch (e) {
  // eslint-disable-next-line
  console.error(`${e.message}`)
  throw new Error(e)
}
