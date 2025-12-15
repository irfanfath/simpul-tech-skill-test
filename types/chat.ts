export type Message = {
  id: number
  postId: string
  name: string
  email: string
  body: string
  time: string
  isMine: boolean
  unread: boolean
  replyTo?: {
    id: number
    name: string
    body: string
  }
}