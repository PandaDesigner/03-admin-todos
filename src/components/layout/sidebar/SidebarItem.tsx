'use client';
import Link from "next/link";
import {CiBookmarkCheck} from "react-icons/ci";
import React, {FC, useEffect} from "react";
import {usePathname} from "next/navigation";

interface LinkValidation {
    label:  string;
    href: string;
    icons?: React.ReactNode;
}

const SidebarItem:FC<LinkValidation> = ({label="label", href = "#", icons = <CiBookmarkCheck size={30} />}) => {
    const pathname = usePathname();


    const activePath = {
        inactive:'px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600 group hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white transition duration-300',
        active: 'relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400',
    }
    return (
        <li>
            <Link href={href} className={ pathname === href ? activePath.active : activePath.inactive }>
                {icons}
                <span className="-mr-1 font-medium capitalize">{label}</span>
            </Link>
        </li>
    );
};

export default SidebarItem;
