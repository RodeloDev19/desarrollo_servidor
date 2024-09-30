import { Request, Response, RequestHandler } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

// Registro de usuario
export const registerUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, email, role, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'El usuario ya existe' });
    return;
  }

  // Crear un nuevo usuario
  const user = new User({ name, email, role, password });
  await user.save();

  res.status(201).json({
    message: 'Usuario registrado exitosamente',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  });
};

// Inicio de sesión de usuario
export const loginUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)) || user.status !== 'active') {
    res.status(400).json({ message: 'Credenciales incorrectas o usuario bloqueado' });
    return;
  }

  // Generar el token
  const token = generateToken(user._id.toString());
  res.json({ token });
};