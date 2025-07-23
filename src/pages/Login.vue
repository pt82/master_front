<template>
  <div>
    <q-img
      style="z-index: 0"
      class="fullscreen"
      src="../assets/images/bg.png"
    ></q-img>
    <div class="login flex column flex-center">
      <div
        style="padding-top: 165px;margin-bottom: 112px"
        class="flex justify-center"
      >
        <q-img width="224px" src="../assets/images/logo.svg"></q-img>
      </div>
      <q-form
        @submit="onSubmit"
        class="login__form main-font text-center q-gutter-y-md"
        style="min-width: 300px;"
      >
        <q-input
          style="margin-bottom: 42px"
          class="q-mb-md"
          :autofocus="true"
          input-class="text-primary"
          v-model="email"
          placeholder="Имя пользователя"
          dense="dense"
          ref="email"
          :rules="[val => !!val || 'Поле обязательно']"
        />
        <q-input
          filled
          :type="isPwd ? 'password' : 'text'"
          input-class="text-primary"
          v-model="password"
          placeholder="Пароль"
          :dense="'dense'"
          ref="password"
          :rules="[val => !!val || 'Поле обязательно']"
        >
          <template v-slot:append>
            <q-icon
              color="primary"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-checkbox
          class="text-primary "
          color="primary"
          keep-color
          label="Запомнить меня?"
          v-model="rememberMe"
        />

        <div class="flex justify-center">
          <q-btn
            :dense="true"
            :loading="loading3"
            :percentage="percentage3"
            dark-percentage
            padding="15px 50px"
            unelevated
            no-caps
            class="bg-primary login__btn btn center second-font"
            text-color="secondary"
            label="Войти"
            :disable="!email || !password"
            type="submit"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { Cookies, SessionStorage } from "quasar";

export default {
  name: "Login",
  data() {
    return {
      loading1: false,
      percentage1: 0,

      rememberMe: false,
      isPwd: true,

      loading2: false,
      percentage2: 0,

      loading3: false,
      percentage3: 0,
      email: "",
      password: ""
    };
  },
  mounted() {
    const loggedIn = Cookies.get("jwt-master") && Cookies.get("user-master");
    const loggedInSession =
      SessionStorage.getItem("jwt-master") &&
      SessionStorage.getItem("user-master");
    if (loggedIn || loggedInSession) {
      this.$router.push("/");
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$store.dispatch(
        "Authorization/login",
        this.getFormData()
      );
      if (res.type === "negative") {
        this.$q.notify({
          type: res.type,
          message: res.message
        });
      } else {
        await this.$router.push("/");
      }
    },
    getFormData() {
      return {
        rememberMe: this.rememberMe,
        app: true,
        email: this.email,
        password: this.password
      };
    }
  },

  reset() {
    this.$refs.email.resetValidation();
    this.$refs.password.resetValidation();
  }
};
</script>

<style lang="scss">
.q-field--standard .q-field__control:before {
  border-color: rgba(79, 216, 219, 0.8);
}

.login {
  &__form {
    font-size: 16px;
    line-height: 20px;
  }

  &__btn {
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 108px;
  }
}
</style>
