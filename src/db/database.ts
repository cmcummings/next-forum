import queries from "./queries"
import { User } from "next-auth";
import { Forum, Topic } from "@/types/app-types";
import { QueryResult } from "pg";

const { Pool } = require('pg')

const db_config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
}

const pool = new Pool(db_config)


/**
 * Authorizes the submitted user information.
 * @param username - The submitted username
 * @param password - The submitted password
 * @returns A Promise of User
 */
async function authorizeUser(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    pool.query({
      text: queries.auth,
      values: [username, password]
    }).then((res: QueryResult) => {
      if (res.rowCount > 0) {
        resolve(res.rows[0])
      } else {
        reject("Failed to authenticate user.")
      }
    }).catch(reject)
  })
}

/**
 * Gets all of a Forum's Topics
 * @param forumName - The name of the Forum
 * @returns A Promise of Topic[]
 */
async function getForumTopics(forumName: string): Promise<Topic[]> {
  return new Promise((resolve, reject) => {
    pool.query({
      text: queries.getForumTopics,
      values: [forumName]
    }).then((res: QueryResult) => {
      resolve(res.rows)
    }).catch(reject)
  })
}

/**
 * Gets Forum information
 * @param forumName - The name of the Forum
 * @returns A Promise of Forum
 */
async function getForum(forumName: string): Promise<Forum> {
  return new Promise((resolve, reject) => {
    pool.query({
      text: queries.getForum,
      values: [forumName]
    }).then((res: QueryResult) => {
      if (res.rowCount > 0) {
        getForumTopics(forumName).then(topics => {
          let forum: Forum = res.rows[0]
          forum.topics = topics
          resolve(forum)
        })
      } else {
        reject(`Could not find forum ${forumName}`)
      }
    }).catch(reject)
  })
}

export { authorizeUser, getForum }