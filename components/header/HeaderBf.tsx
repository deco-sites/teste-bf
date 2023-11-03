import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from '../ui/Icon.tsx'
import type { ComponentChildren } from "preact";

export interface Props {
    /**
     * @title Navigation items
     * @description Navigation items used both on mobile and desktop menus
     */
    navItems?: SiteNavigationElement[] | null;

    /** @title Logo */
    logo?: { src: ImageWidget; alt: string };
}


function Drawer({ children }: { children: ComponentChildren }) {
    return (
        <div className="drawer h-screen lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn bg-base-100 hover:bg-base-100 border-none drawer-button hover:scale-95">
                    <Icon id="HamburguerMenu" class="text-primary" width={32} height={21} />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                {children}
            </div>
        </div>
    )
}
export default function HeaderBf({
    navItems,
    logo,
}: Props) {

    const items = navItems ?? [];

    return (
        <>
            <div id="header-container" className="w-full bg-base-100 flex justify-center items-center h-16 lg:h-20 z-30  fixed">
                <div className="navbar items-center justify-between p-0 lg:px-4 max-w-[1216px] lg:border-solid lg:border-primary lg:border-b-[1px]">
                    <Drawer>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <label htmlFor="my-drawer" aria-label="close sidebar" class="flex justify-end cursor-pointer">
                                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" >
                                    <path class="fill-primary" id="Vector" d="M10 1.00714L8.99286 0L5 3.99286L1.00714 0L0 1.00714L3.99286 5L0 8.99286L1.00714 10L5 6.00714L8.99286 10L10 8.99286L6.00714 5L10 1.00714Z" />
                                </svg>
                            </label>
                            {
                                items.map((item) => {
                                    return (
                                        <li><a href={item.url} class="text-primary font-normal text-lg">{item.name}</a></li>
                                    )
                                })
                            }
                        </ul>
                    </Drawer>

                    <div className="w-full flex items-center justify-end pr-4 lg:pr-0 lg:justify-between">
                        <h1>
                            <a className="normal-case text-xl" href="/#"><span class="hidden">{logo?.alt}</span><img className="w-[82] h-[26] lg:w-24 lg:h-8"  src={logo?.src} alt={logo?.alt} title={logo?.alt} preload="true" width={100} height={30}/></a>
                        </h1>
                        <nav class="hidden lg:navbar lg:justify-end">
                        <ul className="flex justify-end gap-10 p-4 w-full min-h-full text-base-content bg-base-100">
                            {
                                items.map((item) => {
                                    return (
                                        <li><a href={item.url} class="text-primary font-normal text-lg hover:text-primary-focus transition-colors duration-500 font-['Roboto_Flex']">{item.name}</a></li>
                                    )
                                })
                            }
                        </ul>
                        </nav>
                    </div>
                </div>
            </div>
             {/* span is necessary to remove overrided nav/banner and display full the banner  */}
            <span id="spacementBanner" class="block w-full h-16 lg:h-20" />
        </>

    )
}
