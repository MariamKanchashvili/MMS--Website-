import { Routes } from "@angular/router";
import { Home } from "../../../features/home/home";
import { Company } from "../../../features/company/company";
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
        path:'contact',
        component:Contact
    }
]
