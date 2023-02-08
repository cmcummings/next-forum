
interface User {
  id: number,
  name: string,
  email: string,
  dateRegistered: Date | number,
}

interface Forum {
  id: number,
  name: string,
  description?: string | null,
  dateCreated: Date | number,
  topics?: Topic[]
}

interface Topic {
  id: number,
  name: string,
  description?: string | null
}

interface Post {
  id: number,
  content: string,
  timestampPosted: Date | number,
  originalPost?: Post,
  replyPost?: Post
}


export type { User, Forum, Topic, Post }