import logoIcon from "@assets/logos/mercasena_cerezos_icon.png"
const Logo = ({ width, height, auxiliar, QuantOfPixels }) => {
    if (auxiliar) {
        console.log("exito")
        return (
            <img src={logoIcon} width={`${QuantOfPixels.width}px`} height={`${QuantOfPixels.height}`} alt="" />
        )
    }
    return (
        <img src={logoIcon} className={`w-${width} h-${height}`} alt="" />
    )
}

export default Logo