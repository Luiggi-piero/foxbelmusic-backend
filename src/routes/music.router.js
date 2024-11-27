import { Router } from 'express';
import handler from 'express-async-handler'; // manejar los errores de peticiones async
import { getFavorites, getMusic, saveMusic } from '../controllers/music.controller.js';
import auth from '../middleware/auth.mid.js';

const router = Router();

router.get('/search/:searchTerm?', handler(getMusic));

router.post('/', auth, handler(saveMusic));

router.get('/favorites', auth, handler(getFavorites));

export default router;