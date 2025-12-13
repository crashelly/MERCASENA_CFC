// import { register } from "module";

class Config {
    API: object = {};
    mainUrl: string;
    constructor() {
        // this.mainUrl = ""
        // this.mainUrl = "https://zensoftwares.website/mercasena/app/Controllers/",
        // this.mainUrl = "http://localhost/mercasena/app/Controllers/",
        this.mainUrl = "http://10.2.5.164/mercasena/app/Controllers/",
        // this.mainUrl = "http://localhost/app/Controllers/",
            this.API = {
                URL: {
                    endpoints: {
                        bannerImages: {
                            get: () => this.mainUrl + 'mercasena.php?action=getBannerImages'
                        },
                        products: {
                            getAll: () => this.mainUrl + 'Product.php?action=getInfoProductsForShop',
                            fetchByCategory: (categoryID: number) => this.mainUrl + 'Product.php?action=getProductsByCategory&categoryId=' + categoryID
                        },
                        categories: {
                            get: () => this.mainUrl + 'Product.php?action=getCategories'
                        },
                        measurements: {
                            get: () => this.mainUrl + 'mercasena.php?action=getMeasurementsInfo'
                        },
                        whatsapp: {
                            get: () => this.mainUrl + 'mercasena.php?action=getWhatsappNumber'
                        },
                        auth: {
                            Login: () => this.mainUrl + 'auth.php',
                            register: () => this.mainUrl + 'auth.php'
                        },
                        user: {
                            getInfo: () => this.mainUrl + 'user.php?action=getUserInfo',
                            save: () => this.mainUrl + 'user.php',
                            logOut: () => this.mainUrl + 'user.php'
                        },
                        orders: {
                            get: () => this.mainUrl + 'Order.php?action=getOrdersByUser',
                            delete: () => this.mainUrl + 'Order.php?action=deleteOrder',
                            create: () => this.mainUrl + 'Order.php'
                        },
                        bills: {
                            get: () => this.mainUrl + 'Bill.php?action=getMinimalBillInfoForUser',
                            getById: (id: number) => this.mainUrl + 'Bill.php?action=getBillByID&billID=' + id,
                            download: (id: number) => this.mainUrl + 'Bill.php?action=downloadBill&billId=' + id,
                        },

                    }
                }
            }
    }
}


export const CONFIG = new Config()