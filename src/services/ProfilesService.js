import { AppState } from '../AppState.js'
import { Profile } from '../models/Profile.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class ProfilesService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('profile res', res)
    AppState.profile = new Profile(res.data)
    logger.log(AppState.profile)
    // may need to dig deeper here?
  }
}

export const profilesService = new ProfilesService()
