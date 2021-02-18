import { Schema, Model, model, Document } from 'mongoose'

export interface TodoInterface {
  text: string
  completed: boolean
  creatorId: string
}
export interface TodoDocument extends TodoInterface, Document {
  createdAt: string
  updatedAt: string
}

export interface TodoModel extends Model<TodoDocument> {}

const todoSchema: Schema<TodoDocument, TodoModel> = new Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    creatorId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Todo = model<TodoDocument, TodoModel>('Todo', todoSchema)

export default Todo
