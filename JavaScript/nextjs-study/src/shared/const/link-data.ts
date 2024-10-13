import { Apps, AttachFile, BarChart, DataUsage, Home, TableView } from '@mui/icons-material';

export const LinkData = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Form', href: '/form', icon: Apps },
    { name: 'Table', href: '/table', icon: TableView },
    { name: 'File', href: '/file', icon: AttachFile },
    { name: 'Chart', href: '/chart', icon: BarChart },
    { name: 'Diagram', href: '/diagram', icon: DataUsage }
] as const;
