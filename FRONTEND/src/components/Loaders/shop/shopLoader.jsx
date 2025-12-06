import sena_logo from "@assets/logos/logoSena_2.png"
const ShopLoader = () => {
    return (
        <>

            <dialog  id="loader_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn  hover:bg-red-500 btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <div className="text-center">
                            {/* <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto" /> */}
                            <div>
                                <div className="flex-col gap-4 w-full flex items-center justify-center">
                                    <div className="w-35  relative h-35 border-4 border-transparent text-green-400 text-4xl animate-spin flex items-center justify-center animate-duration-[2000ms] border-t-green-400 rounded-full">
                                        <div className="w-28 h-28 border-4 border-transparent text-red-400 text-2xl animate-infinite animate-duration-[3000ms] animate-delay-[34ms] animate-ease-linear  flex items-center justify-center animate-spin border-t-blue-400 rounded-full" >
                                            {/* <div className="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center ">
                                            </div> */}
                                        </div>
                                    </div>

                                    <img className=" absolute w-10 h-10 animate-ping animate-infinite animate-duration-[3000ms] animate-delay-[34ms] animate-ease-linear " src={sena_logo} alt="" />
                                </div>
                            </div>
                            <div className="inline-flex items-center space-x-2">
                                <h1 className="text-zinc-900  dark:text-white mt-4 text-2xl font-bold">Cargando
                                </h1>
                                <h2 className="animate-bounce animate-duration-1000 animate-ease-in-out text-2xl  font bold"> . </h2>
                                <h2 className="animate-bounce animate-duration-1500 animate-ease-in-out text-2xl  font bold"> . </h2>
                                <h2 className="animate-bounce animate-duration-1700 animate-ease-in-out text-2xl  font bold"> . </h2>

                            </div>


                            <p className="text-zinc-600 dark:text-zinc-400">
                                <span className="underline font-semibold" >Mercasena los 🍒🍒</span> trabajando por ti
                            </p>
                        </div>
                    </div>
                </div>
            </dialog >
        </>
    )
}
/**
 * este es el loader para la tienda 
 */
class Loader {


    /**
     * muesrtra el loader
     */
    static show() {
        document.getElementById('loader_modal').showModal()
    }

    
    /**
     * esconde el loader
     */
    static hide() {
        document.getElementById('loader_modal').close()
    }

}

export {
    Loader,
    ShopLoader,
    

} 