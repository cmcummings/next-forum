import { Forum, Topic } from "@/types/app-types";

/**
 * This module serializes common types
 * Mainly converts Date objects to timestamps
 */



function serializeForum(forum: Forum) {
  forum.date_created = forum.date_created.valueOf()
  return forum
}


export { serializeForum }