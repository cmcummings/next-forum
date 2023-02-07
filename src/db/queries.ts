const fs = require('fs')
const path = require('path')

/**
 * Loads an SQL file.
 * @param filepath - The path to the SQL file
 */
function loadSQL(name: string): string {
  return fs.readFileSync(path.resolve("src/db/sql", name + ".sql")).toString()
}

const queries = {
  auth: loadSQL("auth"),
  getForum: loadSQL("getForum"),
  getForumTopics: loadSQL("getForumTopics")
}

export default queries