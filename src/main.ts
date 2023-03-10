import { createApp, watch } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faNotesMedical, faUser } from "@fortawesome/free-solid-svg-icons";
import { Inkline, components } from "@inkline/inkline";
import { createAuth0, useAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import { createRouter } from "./router";

import "@inkline/inkline/inkline.scss";
import "./assets/main.scss";
// import "./assets/css/styles.css";

// Import the Auth0 configuration and plugin

library.add(faUserSecret);
library.add(faUser);
library.add(faNotesMedical);

// 5. Create and mount the root instance.
const app = createApp(App);

const router = createRouter(app);

app.use(router);
app.use(Inkline, {
    components,
});
// Install the authentication plugin

app.use(
    createAuth0({
        domain: process.env.VUE_APP_AUTH0_DOMAIN,
        clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: process.env.VUE_APP_AUTH0_REDIRECT_URI,
            audience: "https://health.timhunter.dev/api",
        },
    })
);

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
