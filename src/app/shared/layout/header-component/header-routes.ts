import { Routes } from "@angular/router";
import { Home } from "../../../features/home/home";
import { Company } from "../../../features/company/company";
import { Products } from "../../../features/products/products";
import { Contact } from "../../../features/contact/contact";

export const  headerRoutes :Routes=[
    {
        path:'',
        component:Home
    },
    {
        path:'company',
        component:Company
    },
    {
        path:'products',
        component:Products
    },
    {
        path:'contact',
        component:Contact
    }
]