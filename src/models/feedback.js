import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import Learning from './learning'

const schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  training: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  rating: {
    type: Schema.Types.Number,
    min: 0,
    default: 0
  },
  feedback: {
    type: Schema.Types.String
  },
  learnings: [Learning],
  recommended: {
    type: Schema.Types.Bool,
    default: false
  }
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Feedback = model('feedback', schema)

export default Feedback
