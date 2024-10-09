import { Apps, AttachFile, BarChart, Home } from '@mui/icons-material';

export const LinkData = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Form', href: '/form', icon: Apps },
    { name: 'File', href: '/file', icon: AttachFile },
    { name: 'Diagram', href: '/diagram', icon: BarChart }
] as const;
