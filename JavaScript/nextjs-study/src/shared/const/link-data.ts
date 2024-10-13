import { Apps, AttachFile, BarChart, DataUsage, Home, Psychology, TableView } from '@mui/icons-material';

export const LinkData = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Form', href: '/form', icon: Apps },
    { name: 'Table', href: '/table', icon: TableView },
    { name: 'File', href: '/file', icon: AttachFile },
    { name: 'Chart', href: '/chart', icon: BarChart },
    { name: 'Mermaid', href: '/mermaid', icon: DataUsage },
    { name: 'Mindmap', href: '/mindmap', icon: Psychology }
] as const;
