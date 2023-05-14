import isRouterPathnameMatched from '@/utils/isRouterPathnameMatched';
import { Avatar, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const navItems = [
    {
        name: 'Dashbaord',
        href: '/dashboard',
        exact: true,
    },
    {
        name: 'Branch',
        href: '/branch',
        exact: false,
    },
    {
        name: 'Team',
        href: '/team',
        exact: false,
    },
    {
        name: 'Member',
        href: '/member',
        exact: false,
    },
    {
        name: 'Withdraw',
        href: '/withdraw',
        exact: false,
    },
];

const DashboardNavbar = () => {
    const {data:session, status} = useSession()
    console.log('session: ', session)
    console.log('status: ', status)
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    });

    //handling Logout
    const handleRedirectToLogin=()=>{
        signOut();
        router.push('/login')
    }

    return (
        <header className="flex h-16 items-center border-b bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex gap-12">
                    <Link className="no-underline!" href={'/dashboard'}>
                        <h1 className="text-3xl font-bold text-brand-600 no-underline">Qard al-Hasan</h1>
                    </Link>
                    <div className="flex">
                        {navItems.map((item) => {
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        color={'gray.700'}
                                        _hover={{ bg: '#EDF2F7' }}
                                        colorScheme={
                                            isRouterPathnameMatched(item.href, router.pathname, item.exact)
                                                ? 'gray'
                                                : 'whiteAlpha'
                                        }
                                    >
                                        {item.name}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div> 
                    <Avatar size={'md'} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                    <span className='cursor-pointer'
                        onClick={handleRedirectToLogin}
                    >
                        logout
                    </span>
                </div>

            </div>
        </header>
    );
};

export default DashboardNavbar;


