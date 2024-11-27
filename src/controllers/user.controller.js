import { UserModel } from '../models/user.model.js';
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/httpStatus.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

// Número de veces que se aplicará el hash/encriptación
const PASSWORD_HASH_SALT_ROUNDS = 10;

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && await bcryptjs.compare(password, user.password)) {
        res.send(generateTokenResponse(user));
        return;
    }
    res.status(BAD_REQUEST).send('Correo o contraseña inválidos');
}

export const register = async (req, res) => {
    const { name, lastname, phone, gender, email, password } = req.body;

    // verifica si existe el usuario en la bd por email
    const user = await UserModel.findOne({ email });

    if (user) {
        res.status(BAD_REQUEST).send('El usuario existe, por favor inicie sesión');
        return;
    }

    // Encripta la constraseña
    const hashedPassword = await bcryptjs.hash(password, PASSWORD_HASH_SALT_ROUNDS);

    // Crea el usuario
    const newUser = {
        password: hashedPassword,
        email: email.toLowerCase(),
        name,
        lastname,
        phone,
        gender
    }

    // Crear el usuario en la bd
    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
};

export const update = async (req, res) => {
    const { currentPassword, ...dataUser } = req.body;

    const userDb = await UserModel.findById(req.user.id);

    if (!userDb) {
        res.status(BAD_REQUEST).send('Usuario no encontrado');
        return;
    }

    // Verificar si coinciden las contraseñas
    const equal = await bcryptjs.compare(currentPassword, userDb.password);
    if (!equal) {
        res.status(BAD_REQUEST).send('La constraseña actual es inválida');
        return;
    }

    // Encriptando la nueva contraseña y agregando al usuario
    const passwordHash = await bcryptjs.hash(dataUser.newPassword || currentPassword, PASSWORD_HASH_SALT_ROUNDS);

    const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        {
            ...dataUser,
            password: passwordHash
        },
        { new: true }
    );

    res.send(generateTokenResponse(updatedUser));
}

const generateTokenResponse = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        gender: user.gender,
        token
    }
};