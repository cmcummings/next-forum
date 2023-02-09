import { Forum, Post, Topic, User } from "@/types/app-types";
import type { forum, post, topic, users } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

function resolveForum(forum: forum & {topic: topic[]}): Forum {
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

function resolvePost(post: post & {users: {user_id: number, user_name: string}}): Post {
  return {
    id: post.post_id,
    content: post.content,
    author: {
      id: post.users.user_id,
      name: post.users.user_name,
    },
    timestampPosted: post.timestamp_posted.valueOf()
  }
}

async function authorizeUser(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    prisma.$queryRaw
      `SELECT user_id, user_name, email, date_registered
      FROM users 
      WHERE user_name=${username} AND (SELECT password=crypt(${password},password) FROM users WHERE user_name=${username});`
    .then(res => {
      if (Array.isArray(res)) {
        const row = res[0]
        resolve({
          id: row.user_id,
          name: row.user_name,
          email: row.email,
          dateRegistered: row.date_registered
        })
      } else {
        reject()
      }
    }).catch(reject)
  })
}

async function getForum(forumName: string): Promise<Forum> {
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

interface TopicPosts {
  topic: Topic,
  posts: Post[]
}

async function getTopicPosts(forumId: number, topicId: number): Promise<TopicPosts> {
  return new Promise((resolve, reject) => {
    prisma.topic.findUnique({
      where: {
        topic_id: topicId
      }
    }).then(topic => {
      if (topic) {
        prisma.post.findMany({
          where: {
            forum_id: forumId,
            topic_id: topicId
          },
          include: {
            users: {
              select: {
                user_id: true,
                user_name: true
              }
            }
          }
        }).then(posts => {
          if (posts) {
            resolve({
              topic: resolveTopic(topic),
              posts: posts.map(resolvePost)
            })
          } else {
            reject()
          }
        }).catch(reject)
      } else {
        reject()
      }
    }).catch(reject)
  })
}

export type { TopicPosts }
export { getForum, getTopicPosts, authorizeUser }