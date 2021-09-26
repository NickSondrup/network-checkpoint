import { api } from './AxiosService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { convertToQuery } from '../utils/Query.js'
import { Post } from '../models/Post.js'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    AppState.currentPage = 1
    logger.log('query', query)
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log('posts res', res.data.posts)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.postsData = res.data
    logger.log('postsData', AppState.postsData)
  }

  async findPostByQuery(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    logger.log('findPostByQuery', res)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.postsData = res.data
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log('created res', res)
    AppState.posts.unshift(new Post(res.data))
  }

  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
    logger.log('like res', res)
  }

  async getOlderPage() {
    AppState.posts = []
    AppState.postsData = {}
    AppState.currentPage++
    const res = await api.get(`api/posts?page=${AppState.currentPage}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getNewerPage() {
    AppState.posts = []
    AppState.postsData = {}
    AppState.currentPage--
    const res = await api.get(`api/posts?page=${AppState.currentPage}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('delorte', res)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
  }
}

export const postsService = new PostsService()
