import { Apps, AttachFile, BarChart, DataUsage, Home, Map, Psychology, Stream, TableView } from '@mui/icons-material';

export const LinkData = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Form', href: '/form', icon: Apps },
    { name: 'Table', href: '/table', icon: TableView },
    { name: 'File', href: '/file', icon: AttachFile },
    { name: 'Stream', href: '/stream', icon: Stream },
    { name: 'Chart', href: '/chart', icon: BarChart },
    { name: 'Mermaid', href: '/mermaid', icon: DataUsage },
    { name: 'Mindmap', href: '/mindmap', icon: Psychology },
    { name: 'Map', href: '/map', icon: Map }
] as const;
