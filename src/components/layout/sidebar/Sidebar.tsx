import Link from "next/link";
import Image from "next/image";
import {CiLogout} from "react-icons/ci";
import { LuListTodo } from "react-icons/lu";
import React from "react";
import SidebarItem from "@/components/layout/sidebar/SidebarItem";
import {MdSpaceDashboard} from "react-icons/md";
import AvatarPedro from "../../../../public/IMG-AVATAR.jpg"
import {IoListOutline} from "react-icons/io5";

export default function SidebarComponents() {

    const itemsMenu= [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icons: <MdSpaceDashboard size={30} />
        },
        {
            label: 'rest todo',
            href: '/dashboard/rest-todos',
            icons: <LuListTodo size={30} />
        },
        {
            label: 'Server Actions',
            href: '/dashboard/server-todos',
            icons: <IoListOutline size={30} />
        }
    ]

    return (
        <>
            <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r border-slate-200 bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                <div>
                    <div className="-mx-6 px-6 py-4">
                        <Link href="/dashboard" title="home">
                            <Image
                                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                                alt="tailus logo"
                                width={150}
                                height={150}
                                className="w-32"
                            />
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        {/* Next/Image */}
                        <Image
                            src={AvatarPedro}
                            alt=""
                            width={150}
                            height={150}
                            className="w-full h-full m-auto rounded-full object-cover lg:w-28 lg:h-28"
                        />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
                        <span className="hidden text-gray-400 lg:block">Admin</span>
                    </div>

                    <ul className="space-y-2 tracking-wide mt-8">
                        {
                            itemsMenu.map((item, index) => (
                              <SidebarItem key={item.label} label={item.label} href={item.href} icons={item.icons} />
                            ))
                        }
                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-slate-200">
                    <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <CiLogout />
                        <span className="group-hover:text-gray-700">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
