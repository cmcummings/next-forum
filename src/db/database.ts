import { Forum, Post, Thread, Topic, User } from "@/types/app-types";
import type { forum, post, thread, topic, users } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const prisma = new PrismaClient()

function resolveForum(forum: forum & { topic: topic[] }): Forum {
  return {
    id: forum.forum_id,
    name: forum.forum_name,
    description: forum.forum_description,
    dateCreated: forum.date_created.valueOf(),
    topics: forum.topic.map(resolveTopic)
  }
}

function resolveTopic(topic: topic): Topic {
  return {
    id: topic.topic_id,
    name: topic.topic_name,
    description: topic.topic_description
  }
}

type PrismaPostWithUser = post & { users: { user_id: number, user_name: string } }

function resolveThread(thread: thread & { post?: PrismaPostWithUser[] }): Thread {
  let res: Thread = {
    id: thread.thread_id,
    title: thread.title,
  }

  if (thread.post) {
    res.posts = thread.post.map(resolvePost)
  }

  return res
}

function resolvePost(post: PrismaPostWithUser): Post {
  return {
    id: post.post_id,
    content: post.content,
    author: {
      id: post.users.user_id,
      name: post.users.user_name
    },
    timestampPosted: post.timestamp_posted.valueOf()
  }
}

function resolveUser(user: users): User {
  return {
    id: user.user_id,
    name: user.user_name,
    email: user.email,
    dateRegistered: user.date_registered.valueOf()
  }
}

export async function registerUser(creds: { username: string, email: string, password: string }): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (creds.password.length > 72) {
      reject("Password is too long.")
      return
    }

    bcrypt.hash(creds.password, SALT_ROUNDS).then((hashedPassword: string) => {
      prisma.users.create({
        data: {
          user_name: creds.username,
          email: creds.email,
          password: hashedPassword
        }
      }).then((user: users) => {
        if (user) {
          resolve(true)
        } else {
          reject()
        }
      }).catch(reject)
    }).catch(reject)
  })
}

export async function authorizeUser(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    prisma.users.findFirst({
      where: {
        user_name: username
      }
    }).then((user: users | null) => {
      if (!user) {
        reject("The user does not exist.")
        return
      }

      bcrypt.compare(password, user.password).then((matches: boolean) => {
        if (matches) {
          resolve(resolveUser(user))
        } else {
          reject("Could not authorize user.")
        }
      })
    })
  })
}

export async function getForum(forumName: string): Promise<Forum> {
  return new Promise((resolve, reject) => {
    prisma.forum.findUnique({
      where: {
        forum_name: forumName
      },
      include: {
        topic: true
      }
    }).then(forum => {
      if (forum) {
        resolve(resolveForum(forum))
      } else {
        reject("Could not find forum.")
      }
    }).catch(reject)
  })
}

export async function getTopic(topicId: number): Promise<Topic> {
  return new Promise((resolve, reject) => {
    prisma.topic.findUnique({
      where: {
        topic_id: topicId
      },
    }).then(topic => {
      if (!topic) {
        reject("Topic not found.")
        return
      }

      resolve(resolveTopic(topic))
    })
  })
}

export async function getTopicThreads(topicId: number): Promise<Thread[]> {
  return new Promise((resolve, reject) => {
    prisma.thread.findMany({
      where: {
        topic_id: topicId
      },
      include: {
        post: {
          include: {
            users: {
              select: {
                user_id: true,
                user_name: true
              }
            }
          },
          where: {
            original_post: true
          },
          take: 1
        }
      },
      take: 10
    }).then(threads => {
      resolve(threads.map(resolveThread))
    }).catch(reject)
  })
}

export async function getThread(threadId: number): Promise<Thread> {
  return new Promise((resolve, reject) => {
    prisma.thread.findUnique({
      where: {
        thread_id: threadId
      },
      include: {
        post: {
          include: {
            users: {
              select: {
                user_id: true,
                user_name: true
              }
            }
          },
          orderBy: {
            timestamp_posted: 'asc'
          },
          take: 10
        },
      }
    }).then(thread => {
      if(!thread) {
        reject()
        return
      }

      resolve(resolveThread(thread))
    }).catch(reject)
  })
}

export async function createReply(threadId: number, userId: number, content: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    prisma.post.create({
      data: {
        thread_id: threadId,
        user_id: userId,
        content: content
      }
    }).then((post: post) => {
      if (post) {
        resolve(true)
      } else {
        reject()
      }
    }).catch(reject)
  })
}

export async function createThread(forumId: number, topicId: number, userId: number, title: string, content: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    prisma.thread.create({
      data: {
        forum_id: forumId,
        topic_id: topicId,
        title: title,
        post: {
          create: {
            user_id: userId,
            content: content
          }
        }
      },
    }).then((thread: thread) => {
      if (thread) {
        resolve(true)
      } else {
        reject()
      }
    }).catch(reject)
  })
}