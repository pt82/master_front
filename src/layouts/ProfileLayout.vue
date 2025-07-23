<template>
  <q-layout>
    <q-header
      reveal
      elevated
      class="bg-secondary flex column flex-center fixed full-width"
    >
      <div class="q-pa-md q-gutter-sm">
        <div class="profile__avatar avatar flex flex-center">
          <q-avatar
            v-if="profile"
            square
            size="120px"
            font-size="60px"
            class="avatar__inner bg-primary-dark"
          >
            <q-img
              @click="zoom = true"
              class="avatar__icon"
              width="100%"
              :src="profile.avatar"
            >
              <div
                class="avatar__name absolute-bottom main-font-600 text-subtitle text-center"
              >
                {{ profile.firstname }}
              </div>
            </q-img>
            <q-badge color="transparent" floating>
              <input class="upload-photo" type="file" @change="changePhoto" />
              <q-icon
                size="20px"
                color="primary"
                style="z-index: 50"
                name="add_photo_alternate"
              >
              </q-icon>
            </q-badge>
          </q-avatar>
          <q-spinner v-else color="primary" size="3em" />
        </div>
        <q-btn
          :dense="true"
          dark-percentage
          padding="10px 25px"
          unelevated
          no-caps
          class="bg-primary profile__btn btn center second-font"
          text-color="secondary"
          label="Выход"
          @click="logout"
        />
      </div>
    </q-header>
    <q-dialog v-model="zoom">
      <q-img
        @click="zoom = true"
        class="avatar__icon"
        width="100%"
        :src="profile.avatar"
      >
        <div
          class="avatar__name absolute-bottom main-font-600 text-subtitle text-center"
        >
          {{ profile.firstname }}
        </div>
      </q-img>
    </q-dialog>
    <q-page-container class="flex flex-center">
      <router-view> </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import avatarSvg from "../assets/images/profile-photo.png";

export default {
  name: "ProfileLayout",
  data() {
    return {
      profileIcon: avatarSvg,
      menu: false,
      zoom: false,
      photo: null
    };
  },
  watch: {},
  methods: {
    changePhoto(e) {
      const file = e.target.files[0];
      this.profile.avatar = URL.createObjectURL(file);
      this.$store.dispatch(
        "Profile/sendAvatar",
        this.getFormData("avatar", file)
      );
    },
    getFormData(target, file) {
      const formData = new FormData();
      formData.append(target, file);
      return formData;
    },
    logout() {
      this.$store.dispatch("Authorization/logout");
      this.$router.push("/login");
      this.$q.notify({
        type: "positive",
        message: "Вы вышли из системы"
      });
    }
  },
  computed: {
    profile() {
      return this.$store.getters["Authorization/loggedIn"];
    }
  },
  created() {
    this.menu = true;
  }
};
</script>

<style lang="scss">
.menu {
  padding-top: 15px;

  &__item {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

.profile {
  &__btn {
    font-size: 24px;
    line-height: 31px;
  }
}

.avatar {
  border: 1px solid #4fd8db;

  &__icon > div {
    padding-bottom: 105% !important;
  }

  &__name {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 5px;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
}

.profile__avatar {
  .upload-photo {
    opacity: 0;
    width: 24px;
    z-index: 3000;
    position: absolute;
  }
}
</style>
