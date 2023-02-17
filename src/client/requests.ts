import { Post, UserForumDetails } from "@/types/app-types"
import { Session } from "next-auth"

export function canDelete(session: Session | null, post: Post, user?: UserForumDetails) {
  return (session && parseInt(session.user.id) === post.author.id) || (user && user.rank && user.rank >= 200)
}

export function deleteRequest(postId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch('/api/forum/post', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: postId
        })
      }).then(res => {
        if (res.status === 200) {
          resolve(true)
        } else {
          reject("Post could not be deleted.")
        }
      }).catch(reject)
    } else {
      reject()
    }
  })
}


export async function createThreadRequest(forumId: number, topicId: number, title: string, content: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fetch('/api/forum/thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        forumId: forumId,
        topicId: topicId,
        title: title,
        content: content
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        reject()
      }
    }).then(res => {
      resolve(res.threadId)
    }).catch(reject)
  })
}

export async function replyRequest(threadId: number, content: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch('/api/forum/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        threadId: threadId,
        content: content
      })
    }).then(res => {
      if (res.status === 200) {
        resolve(true)
      } else {
        reject()
      }
    }).catch(reject)
  })
}

export async function signUpRequest(credentials: { username: string, email: string, password: string }): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch("/api/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status === 200) {
        resolve(true)
      } else {
        res.json().then(body => {
          reject(body.message)
        })
      }
    }).catch(reject)
  })
}

export async function followRequest(forumId: number, follow: boolean): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fetch("/api/forum/follow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        forumId: forumId,
        follow: follow
      })
    }).then(res => {
      if (res.status === 200) {
        res.json().then(body => {
          resolve(body.following)
        }).catch(reject)
      } else {
        reject()
      }
    }).catch(reject)
  })
}