'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LinkData } from '../const/linkData';
import { Site } from '../const/site';

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
            <p>{Site.title}</p>
        </div>
    );
};

const Links = () => {
    const pathname = usePathname();

    return (
        <>
            {LinkData.map((link) => {
                const LinkIcon = link.icon;

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}`}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden text-sm font-medium md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
};

export default SideNavigation;
