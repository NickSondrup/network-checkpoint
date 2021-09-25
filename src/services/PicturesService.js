import { AppState } from '../AppState.js'
import { Picture } from '../models/Picture.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class PicturesService {
  async getPictures() {
    const res = await api.get('api/ads')
    logger.log('ads response', res)
    AppState.pictures = res.data.map(p => new Picture(p))
    logger.log('pictures', AppState.pictures)
  }
}

export const picturesService = new PicturesService()
