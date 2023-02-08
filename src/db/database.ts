import { Forum, Topic } from "@/types/app-types";
import type { forum, topic } from "@prisma/client";
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


 
export { getForum }