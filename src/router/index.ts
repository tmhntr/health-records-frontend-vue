import {
    createRouter as createVueRouter,
    createWebHistory,
    Router,
} from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import EditRecordPage from "../views/EditRecordPage.vue";
import RecordsListPage from "../views/RecordsListPage.vue";
import RecordPage from "../views/RecordPage.vue";
import NotFoundPage from "../views/NotFoundPAge.vue";
import LoginPage from "../views/LoginPage.vue";

import { createAuthGuard } from "@auth0/auth0-vue";

import { App } from "vue";

export function createRouter(app: App): Router {
    return createVueRouter({
        routes: [
            {
                path: "/",
                name: "home",
                component: HomePage,
                beforeEnter: createAuthGuard(app),
            },
            {
                path: "/about",
                name: "about",
                component: AboutPage,
                beforeEnter: createAuthGuard(app),
            },
            {
                path: "/add",
                name: "add record",
                component: EditRecordPage,
                beforeEnter: createAuthGuard(app),
            },
            {
                path: "/edit/:id",
                name: "edit record",
                component: EditRecordPage,
                props: true,
                beforeEnter: createAuthGuard(app),
            },
            {
                path: "/records",
                name: "view records",
                component: RecordsListPage,
                beforeEnter: createAuthGuard(app),
            },
            {
                path: "/records/:id",
                name: "view record",
                component: RecordPage,
                props: true,
                beforeEnter: createAuthGuard(app),
            },
            { path: "/login", name: "login", component: LoginPage },
            {
                path: "/:notFound(.*)",
                name: "not found",
                component: NotFoundPage,
            },
        ],
        history: createWebHistory(),
    });
}
