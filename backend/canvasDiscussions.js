const canvasAPI = require('node-canvas-api')

const flatten = arr => arr.reduce((acc, cur) =>
  Array.isArray(cur)
    ? [...acc, ...cur]
    : [...acc, cur]
, [])

//reduce discussion information
const flattenTopicAndReplies = discussions => {
  return discussions.reduce((acc, discussion) => {
    const timestamp = discussion.timestamp
    const authorId = discussion.authorId
    const discussionId = discussion.id
    const topicTitle = discussion.topicTitle
    const topicMessage = discussion.topicMessage
    const replies = discussion.replies

    acc.push({
      type: 'topic',
      timestamp,
      authorId,
      discussionId,
      topicTitle,
      topicMessage
    })

    flatten(replies).forEach(reply => {
      acc.push({
        type: 'reply',
        timestamp: reply.timestamp,
        parentId: reply.parentId,
        authorId: reply.authorId,
        message: reply.message
      })
    })

    return acc
  }, [])
}

//fetches topicID for discussion
const getDiscussionTopicIds = async courseId => {
  const discussionTopics = await canvasAPI.getDiscussionTopics(courseId)
  return discussionTopics.map(discussionTopic => discussionTopic.id)
}

//fetches replies within discussions
const getNestedReplies = (replyObj, topicId) => {
  const replies = replyObj.hasOwnProperty('replies')
    ? flatten(
      replyObj.replies.map(replyObj => getNestedReplies(replyObj, topicId))
    ) : []
  return [{
    authorId: replyObj.user_id,
    message: replyObj.message,
    likes: replyObj.rating_sum,
    timestamp: replyObj.created_at,
    parentId: replyObj.parent_id || topicId,
    id: replyObj.id
  }, ...replies]
}

//fetches discussions using courseId
const getDiscussions = async courseId => {
  const discussionTopicIds = await getDiscussionTopicIds(courseId)
  const discussionAndTopic = await Promise.all(
    discussionTopicIds
      .map(topicId => Promise.all([
        canvasAPI.getFullDiscussion(courseId, topicId),
        canvasAPI.getDiscussionTopic(courseId, topicId)
      ]))
  )
  return discussionAndTopic.map(([discussion, topic]) => {
    const topicTitle = topic.title
    const topicMessage = topic.message
    const author = topic.author
    const timestamp = topic.created_at
    const topicId = topic.id
    const replies = discussion.view.length > 0
      ? discussion.view
        .filter(x => !x.deleted)
        .map(reply => getNestedReplies(reply, topicId))
      : []
    return {
      topicTitle,
      topicMessage,
      id: topicId,
      authorId: author.id || '',
      timestamp,
      replies
    }
  })
}

module.exports = {
  getDiscussions,
  flattenTopicAndReplies
}
