import { Apps, AttachFile, Home } from '@mui/icons-material';

export const LinkData = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Form', href: '/form', icon: Apps },
    { name: 'File', href: '/file', icon: AttachFile }
] as const;
