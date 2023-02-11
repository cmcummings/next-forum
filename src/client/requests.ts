

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
    fetch('/api/forum/reply', {
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