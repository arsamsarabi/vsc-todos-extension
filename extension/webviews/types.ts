export type User = {
  _id: string
  name: string
  githubId: string
  avatar?: string
}

export type Todo = {
  _id?: string
  text: string
  completed: boolean
}
