<template>
  <q-page class="profile flex column flex-center">
    <div class="profile__menu">
      <div class="menu flex flex-center">
        <div class="menu__block flex flex-center">
          <div
            class="menu__item flex flex-center column text-primary main-font"
          >
            <q-btn class="text-primary" size="4rem" dense flat>
              <img :src="notificationSvg" alt="icon" />
              <q-badge color="red" floating>
                1
              </q-badge>
            </q-btn>
            Уведомления
          </div>

          <div
            class="menu__item flex flex-center column text-primary main-font"
          >
            <q-btn class="text-primary" size="4rem" dense flat>
              <img :src="moneySvg" alt="icon" />
            </q-btn>
            Начисления
          </div>
        </div>
      </div>

      <div class="menu flex flex-center">
        <div class="menu__block flex flex-center">
          <div
            class="menu__item flex flex-center column text-primary main-font"
          >
            <q-btn
              @click="$router.push('/profile/rating')"
              class="text-primary"
              size="4rem"
              dense
              flat
            >
              <img :src="ratingSvg" alt="icon" />
            </q-btn>
            Рейтинг
          </div>

          <div
            @click="$router.push('/profile/reviews')"
            class="flex column flex-center text-primary main-font"
          >
            <q-btn class="text-primary" size="4rem" dense flat>
              <img :src="reviewsSvg" alt="icon" />
              <q-badge color="red" floating>
                5
              </q-badge>
            </q-btn>
            Отзывы
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import moneySvg from "../assets/images/money.svg";
import notificationSvg from "../assets/images/notification.svg";
import ratingSvg from "../assets/images/rating.svg";
import reviewsSvg from "../assets/images/reviews.svg";

export default {
  name: "Profile",
  data() {
    return {
      moneySvg: moneySvg,
      notificationSvg: notificationSvg,
      ratingSvg: ratingSvg,
      reviewsSvg: reviewsSvg
    };
  }
};
</script>
<style lang="scss"></style>
