export class Post {
  constructor(postData) {
    this.id = postData._id
    this.body = postData.body
    this.imgUrl = postData.imgUrl
    this.likes = postData.likes
    this.creatorId = postData.creatorId
    this.createdAt = postData.createdAt
    this.creator = postData.creator || {}
  }
}
