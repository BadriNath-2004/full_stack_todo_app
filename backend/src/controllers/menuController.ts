import { Request, Response } from 'express';

export const getMenuItems = (req: Request, res: Response) => {
  const isAuthenticated = !!(req as any).userId;

  const menuItems = isAuthenticated
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Todos', path: '/todos' },
        { label: 'Profile', path: '/profile' },
        { label: 'Logout', path: '/logout' },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
      ];

  res.status(200).json(menuItems);
};
