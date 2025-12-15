export type Message = {
  id: number
  postId: number
  name: string
  email: string
  body: string
  time: string
  isMine: boolean
  unread?: boolean
}
