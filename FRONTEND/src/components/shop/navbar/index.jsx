import Logo from "@components/Logo";
import { SearchBar } from "./components/SearchBar";
import { UserSection } from "./components/UserSection";
import { MobileSearchModal } from "@components/shop/navbar/components/MobileProductSearch"
export const Navbar = () => {

    return (
        <>
            <nav id="header" className="w-full sticky z-40 top-0 py-1 md:py-0 bg-white ">
                <div className="w-full container flex flex-nowrap items-center  mt-0 px-2  py-5">
                    <div className=" hidden md:flex items-center pr-0 md:pr-0">
                        {/*md:hidden  */}
                        <Logo auxiliar={true} QuantOfPixels={{ width: 400, height: 240 }} />

                    </div>
                    <div className=" md:hidden flex items-center pr-0 md:pr-25">
                        {/*md:hidden  */}
                        <Logo auxiliar={true} QuantOfPixels={{ width: 200, height: 200 }} />

                        {/* la verga */}
                    </div>
                    <div className="md:ml-30   ">
                        {/* <SearchBar /> */}
                        <UserSection />

                    </div>

                    {/* aca es el modal de busqueda */}
                    <MobileSearchModal />
                </div>

            </nav>

        </>
    )
}

