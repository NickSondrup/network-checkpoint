import { api } from './AxiosService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { convertToQuery } from '../utils/Query.js'
import { Post } from '../models/Post.js'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    logger.log('query', query)
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log('posts res', res.data.posts)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async findPostByQuery(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    logger.log('findPostByQuery', res)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  // modal.hide() in create
}

export const postsService = new PostsService()
