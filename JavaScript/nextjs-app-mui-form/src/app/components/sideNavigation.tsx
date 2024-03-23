import { Home, Apps } from '@mui/icons-material';

import Link from 'next/link';

const SideNavigation = () => {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link href="/">
                <Title />
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <Links />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            </div>
        </div>
    );
};

const Title = () => {
    return (
        <div className="mb-2 flex h-20 flex-row items-center justify-center rounded-md bg-blue-600 p-4 text-5xl leading-snug text-white md:h-40">
            <p>Next.js Practice</p>
        </div>
    );
};

const Links = () => {
    const links = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Form', href: '/form', icon: Apps }
    ];

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
};

export default SideNavigation;
