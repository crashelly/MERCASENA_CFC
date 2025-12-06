import "./billReport.css";
import SenaLogo from "@assets/logos/logoSena_2.png"
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const BillReport = () => {
    const [bill, setData] = useState({});
    const [date, setDate] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("bill"));
        setData(data);
        setDate(extractDateComponents(data.fecha));
    }, []);

    const addPuntuaction = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    if (Object.keys(bill).length == 0) {
        return null
    }
    return (
        <>
            <div id="page_pdf">
                <table id="factura_head">
                    <tbody>
                        <tr className="tr_bill">

                            <td className="logo_factura td_bill" height="70">
                                <div>
                                    <img width="100" height="100" src={SenaLogo} alt="Sena Logo" />
                                </div>
                            </td>
                            <td className="info_empresa">

                                <div>
                                    <strong className="h2">COMERCIALIZADORA DIDÁCTICA </strong>
                                    <hr className="hr_bill" />
                                    <p className="h2-desc">SERVICIO NACIONAL DE APRENDIZAJE-SENA</p>
                                    <p className="h2-desc">REGIONAL CALDAS</p>
                                    <p className="h2-desc">COMPROBANTE MERCASENA</p>

                                </div>

                            </td>

                        </tr>
                    </tbody>

                </table>
                {/* <!-- parte de la informacion del cliente --> */}
                <div className="comprobante">
                    <div className="fila-superior">
                        {/* <!-- Fecha --> */}


                        {/* <!-- Número de factura --> */}

                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <span id="fechaTexto">FECHA</span>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <table className="fecha">
                                            <tbody>
                                                <tr>

                                                    <td className="fecha_bold">DIA</td>
                                                    <td className="fecha_bold">MES</td>
                                                    <td className="fecha_bold">AÑO</td>
                                                </tr>
                                                <tr>
                                                    <td>{date.day}</td>
                                                    <td>{date.month}</td>
                                                    <td>{date.year}</td>
                                                </tr>
                                            </tbody>

                                        </table>

                                    </div>
                                </td>
                                <td>
                                    <b
                                        className="espacioBlanco">...............................................................</b>
                                </td>
                                <td>
                                    <b>COMPROBANTE DE VENTA</b>
                                </td>
                                <td>
                                    <div className="numero">

                                        <span>N°{bill.id}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    {/* <!-- Datos del cliente --> */}
                    <table className="info">
                        <tbody>
                            <tr>
                                <td className="label-bill">CLIENTE:</td>
                                <td> {bill.Usuario}</td>
                                <td className="label-bill">C.C. / Nit.:</td>
                                <td> {bill.nit}</td>
                            </tr>
                            <tr>
                                <td className="label-bill">DIRECCIÓN:</td>
                                <td>{bill.direccion}</td>
                                <td className="label-bill">TELEFONO/CELULAR:</td>

                                <td>{bill.telefono}</td>
                            </tr>
                        </tbody>

                    </table>

                    <table className="info">
                        <tbody>
                            <tr>
                                <td className=" thead textcenter cant">CANT:</td>
                                <td className=" thead textcenter descripcion">DESCRIPCION</td>
                                <td className=" thead textcenter">Vr.UNIT</td>
                                <td className=" thead textcenter ">vr.TOTAL</td>
                            </tr>
                            {/* // bucle de los productos */}
                            {bill.productos.map(producto => {

                                return (
                                    <tr>
                                        <td className="textcenter">{producto.cantidad}</td>
                                        <td className="textcenter">{producto.name} </td>
                                        <td className="textcenter">{addPuntuaction(producto.precioUnitario)}</td>
                                        <td className="textcenter">{addPuntuaction(producto.precio)}</td>
                                    </tr>
                                )

                            })}

                        </tbody>

                    </table>
                    <table id="info-foot" className="info">
                        <tr>
                            <td className="textleft" colspan="4">Recibido {bill.encargadoPuntoVenta} : Encargado del  punto de venta SENA</td>
                            <td className="textleft" colspan="4">Total {addPuntuaction(bill.precioTotal)} </td>
                        </tr>
                    </table>

                </div>


                <div className="agredecimientos_div">
                    <p className="nota">Si usted tiene preguntas sobre este comprobante de venta, <br />pongase en contacto con nombre, teléfono y
                        Email</p>
                    <h4 className="label_gracias">¡Gracias por su compra!</h4>
                    <h4 className="qrClass_label">Codigo QR de validacion</h4>
                    <div className="qrClass">
                        <QRCode value="https://zensoftwares.website/mercasena/V1/" size={150} />

                    </div>
                </div>

            </div>
        </>

    )
}

function extractDateComponents(dateString) {
    // Dividir la cadena de fecha en componentes
    const [year, month, day] = dateString.split('-');

    // Convertir los componentes a números (opcional)
    const yearNumber = parseInt(year, 10);
    const monthNumber = parseInt(month, 10);
    const dayNumber = parseInt(day, 10);

    // Retornar los componentes
    return {
        year: yearNumber,
        month: monthNumber,
        day: dayNumber
    };
}
export default BillReport