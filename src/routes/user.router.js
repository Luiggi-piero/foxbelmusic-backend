import { Router } from 'express';
import { login, register, update } from '../controllers/user.controller.js';
import handler from 'express-async-handler' // manejar los errores de peticiones async
import auth from '../middleware/auth.mid.js';

// Número de veces que se aplicará el hash/encriptación
const PASSWORD_HASH_SALT_ROUNDS = 10;

const router = Router();

router.post('/login', handler(login));

router.post('/register', handler(register));

router.put('/update', auth, handler(update));

export default router;