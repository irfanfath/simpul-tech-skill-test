export type Message = {
    id: number
    postId: string
    room_title: string
    name: string
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