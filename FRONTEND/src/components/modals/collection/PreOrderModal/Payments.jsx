import bre_b_logo from "@assets/logos/logo-bre-b.svg"
import qr_logo from "@assets/logos/qr-logo.svg"
import cash_logo from "@assets/logos/cash.svg"
const Payments = () => {

    return (
        <>
            <div className="flex flex-col mt-4">
                <span className="mx-auto text-xl text-gray-500 font-semibold"> Medios de pago disponibles</span>
                <div className="divider divider-secondary"></div>
                <div className="mt-3 inline-flex justify-items-center justify-between">
                    {/* bre-b */}
                    <PaymentOption width={50} height={50} image={bre_b_logo} options={{ description: "Llaves de Bre-B", classTag: "mt-2 py-3", showDescription: false }} />
                    {/* QR */}
                    <PaymentOption width={50} height={50} image={qr_logo} options={{ description :"Transanccion QR",showDescription: false }} />
                    {/* EFECTIVO */}
                    <PaymentOption width={50} height={50} image={cash_logo} options={{ description: "Dinero Efectivo",showDescription: false }} />

                </div>
            </div>
        </>
    )
}

const PaymentOption = ({ width, height, image, options }) => {
    return (
        <>
            <div class="lg:tooltip" data-tip={options.description}>
                {/* <button class="btn">Hover me</button> */}

                <div className="hover:bg-gray-300 p-3 hover:scale-110 hover:transform hover:duration-300  shadow-md rounded-xl bg-slate-200">
                    <img className={options.classTag} src={image} width={width + "px"} height={height + "px"} alt="" />
                    {/* <span className=" font-semibold text-black underline">efectivo</span> */}
                </div>
            </div>


        </>
    )
}

export default Payments