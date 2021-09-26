import { AppState } from '../AppState.js'
import { Post } from '../models/Post.js'
import { Profile } from '../models/Profile.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class ProfilesService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('profile res', res)
    AppState.profile = new Profile(res.data)
    logger.log(AppState.profile)
  }

  async editProfile(editable) {
    const res = await api.put('account', editable)
    logger.log('editProfile', res)
    AppState.account = res.data
    this.getProfileById(res.data.id)
  }

  async getOlderProfilePage(id) {
    AppState.posts = []
    AppState.postsData = {}
    AppState.currentPage++
    const res = await api.get(`api/posts/?creatorId=${id}&page=${AppState.currentPage}`)
    logger.log('older profile', res)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getNewerProfilePage(id) {
    AppState.posts = []
    AppState.postsData = {}
    AppState.currentPage--
    const res = await api.get(`api/posts/?creatorId=${id}&page=${AppState.currentPage}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const profilesService = new ProfilesService()
