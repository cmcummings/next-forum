
interface User {
  id: string,
  name: string,
  email: string,
  date_registered: Date | number,
}

interface Forum {
  id: string,
  name: string,
  description?: string,
  date_created: Date | number,
  topics?: Topic[]
}

interface Topic {
  id: string,
  name: string,
  description: string
}

interface Post {
  id: string,
  content: string,
  timestamp_posted: Date | number,
  original_post?: Post,
  reply_post?: Post
}


export type { User, Forum, Topic, Post }