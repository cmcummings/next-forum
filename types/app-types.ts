export interface ParentProps {
  children?: React.ReactNode | React.ReactNode[],
  className?: string,
  [key: string]: any,
}

/*  */

export interface UserForumDetails {
  rank: number | null,
  follows: boolean | null
}

export interface BasicUser {
  id: number,
  name: string
}

export interface User extends BasicUser {
  email: string,
  dateRegistered: Date | number,
}

export interface Forum {
  id: number,
  name: string,
  description?: string | null,
  dateCreated: Date | number,
  topics?: Topic[]
}

export interface Topic {
  id: number,
  name: string,
  description?: string | null
}

export interface Thread {
  id: number,
  title: string,
  posts?: Post[] // list of posts in order of timestamPosted
}

export interface Post {
  id: number,
  content: string,
  author: BasicUser,
  timestampPosted: Date | number,
  replyPost?: Post
}