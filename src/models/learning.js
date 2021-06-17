import { Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: Schema.Types.String
  },
  description: {
    type: Schema.Types.String
  }
})

export default schema
