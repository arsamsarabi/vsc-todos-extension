import { Schema, Model, model, Document } from 'mongoose'

export interface UserInterface {
  name?: string
  githubId: string
  avatar?: string
  todos: string[]
}
export interface UserDocument extends UserInterface, Document {
  createdAt: string
  updatedAt: string
}

export interface UserModel extends Model<UserDocument> {}

const userSchema: Schema<UserDocument, UserModel> = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    githubId: {
      type: Number,
      required: true,
      unique: true,
    },
    avatar: String,
    todos: [
      {
        type: String,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  },
)

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
