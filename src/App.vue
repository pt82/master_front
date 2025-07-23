<template>
  <q-layout class="relative-position" id="q-app">
    <Update></Update>
    <q-page-container>
      <router-view />
      <PWAPrompt
        :copyClosePrompt="`Закрыть`"
        :copyShareButtonLabel="`Нажмите кнопку &quot;Поделиться&quot;`"
        :copyAddHomeButtonLabel="
          `Нажмите &quot;Добавить на главный экран&quot;.`
        "
        :copyBody="
          `Этот веб-сайт имеет функции приложения. Добавьте его на главный экран, чтобы использовать его в полноэкранном режиме и в автономном режиме.`
        "
        :copyTitle="`Добавить на домашний экран.`"
        :debug="false"
      />
      <q-dialog v-model="confirm">
        <q-card v-if="showInstallBanner">
          <q-banner
            dark
            rounded
            class="bg-secondary text-primary flex column flex-center"
            style="border: 2px solid #4FD8DB"
          >
            <template v-slot:avatar>
              <q-img
                width="220px"
                class="transparent q-mb-md"
                src="./assets/images/logo-banner.svg"
              />
            </template>
            <div class="q-mb-md">
              Установить приложение Мастер?
            </div>
            <template v-slot:action>
              <q-btn
                @click="installApp"
                class="bg-secondary text-primary"
                flat
                label="Да"
              />
              <q-btn
                @click="letterShowAppInstallBanner"
                class="bg-secondary text-primary"
                flat
                label="Позже"
              />
              <q-btn
                @click="neverShowAppInstallBanner"
                class="bg-secondary text-primary"
                flat
                label="Никогда"
              />
            </template>
          </q-banner>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>
<script>
import { Cookies, SessionStorage } from "quasar";
import { apiClient } from "src/services/api";
import PWAPrompt from "vue2-ios-pwa-prompt";
import Update from "components/Update";

let deferredPrompt;
export default {
  name: "App",
  data() {
    return {
      showInstallBanner: false,
      confirm: false,
      sound: null
    };
  },
  created() {
    const loggedIn = Cookies.get("jwt-master") && Cookies.get("user-master");
    const loggedInSession =
      SessionStorage.getItem("jwt-master") &&
      SessionStorage.getItem("user-master");
    if (loggedIn) {
      this.$store.commit("Authorization/SET_USER_DATA", loggedIn);
    } else if (loggedInSession) {
      this.$store.commit(
        "Authorization/SET_SESSION_USER_DATA",
        loggedInSession
      );
    }
    apiClient.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch("Authorization/logout");
          this.$router.push("/login");
        }
        return Promise.reject(error);
      }
    );
    this.sound = new Audio('https://messages.20x80.one/files/notify.mp3')
  },
  mounted() {
    let neverShowAppInstallBanner = this.$q.localStorage.getItem(
      "neverShowAppInstallBanner"
    );
    if (!neverShowAppInstallBanner) {
      window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        deferredPrompt = e;
        this.showInstallBanner = true;
        setTimeout(() => {
          this.confirm = true;
        }, 1000);
      });
    }

    this.notifications()
    setInterval(() => {
      this.notifications()
    }, 5000)
  },
  components: {
    Update,
    PWAPrompt
  },
  watch: {},
  methods: {
    closeConfrim() {
      this.confirm = false;
    },
    async installApp() {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      this.showInstallBanner = false;
      this.closeConfrim();
    },
    neverShowAppInstallBanner() {
      this.showInstallBanner = false;
      this.$q.localStorage.set("neverShowAppInstallBanner", true);
      this.closeConfrim();
    },
    letterShowAppInstallBanner() {
      this.showInstallBanner = false;
      this.closeConfrim();
    },
    notifications () {
      const eventSource = this.$store.getters["Authorization/notifyConnection"]
      const token = this.$store.getters["Authorization/token"]
      if ((eventSource && eventSource.readyState < 2) || !token) {
        return
      }
      if (eventSource) {
        eventSource.removeEventListener('message', this.notifyMessage)
        eventSource.removeEventListener('logged_in', this.notifyLoggedIn)
      }
      const es = new EventSource('https://messages.20x80.one:62101/stream/?token=' + token)
      es.addEventListener('logged_in', this.notifyLoggedIn)
      this.$store.commit('Authorization/SET_NOTIFY_CONNECTION', es)
    },
    notifyLoggedIn () {
      console.log("%cПодключился к оповещениям", "color: orange");
      this.$store.getters["Authorization/notifyConnection"].addEventListener('message', this.notifyMessage)
    },
    notifyMessage (event) {
      this.sound.play()
      this.$q.notify({
        message: JSON.parse(event.data),
        color: 'purple',
        timeout: 3600000,
        closeBtn: 'X'
      })
    }
  }
};
</script>
<style lang="scss">
.main-font-300 {
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.main-font {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.main-font-500 {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.main-font-600 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.second-font {
  font-family: "Ki", sans-serif;
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-BoldItalic.woff") format("woff");
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: "Ki Extra";
  src: url("assets/fonts/Ki-ExtraLight.woff") format("woff");
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-Italic.woff") format("woff");
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-MediumItalic.woff") format("woff");
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-Bold.woff") format("woff");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Ki Extra";
  src: url("assets/fonts/Ki-ExtraLightItalic.woff") format("woff");
  font-weight: 200;
  font-style: italic;
}

@font-face {
  font-family: "Ki Extra";
  src: url("assets/fonts/Ki-ExtraBoldItalic.woff") format("woff");
  font-weight: 800;
  font-style: italic;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-LightItalic.woff") format("woff");
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-Medium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Ki Extra";
  src: url("assets/fonts/Ki-ExtraBold.woff") format("woff");
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-Light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-ThinItalic.woff") format("woff");
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-Thin.woff") format("woff");
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: "Ki";
  src: url("assets/fonts/Ki-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
