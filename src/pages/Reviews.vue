<template>
  <q-page class="reviews">
    <q-spinner
      v-if="loading"
      color="primary"
      size="3em"
    />
    <q-card v-for="review in reviews" :key="review.id" class="reviews__card transparent"  flat>
      <q-card-section horizontal class="block">
        <q-card-section style="max-width: 600px">
          <div class="reviews__date main-font text-primary q-pb-sm">{{ review.date }}</div>
          <div class="flex justify-between">
            <div class="reviews__client-name text-h5  q-pb-sm main-font-600 text-primary">{{ review.user_name }}</div>
            <q-rating
              v-model="review.rating"
              size="1em"
              color="primary"
              readonly
            />
          </div>
          <div class="reviews__text main-font-300 text-primary">
            {{ review.text }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator color="dark"/>
    </q-card>
    <div v-if="reviews && reviews.length === 0">Отзывов нет</div>
    <!--    <q-pagination
          v-model="current"
          color="purple"
          :max="Math.ceil(reviews.length/4)"
          :max-pages="4"
          boundary-numbers
        />-->
  </q-page>
</template>

<script>


export default {
  name: "Reviews",
  data() {
    return {
      current: 1,
      loading: false
    }
  },
  computed: {
    reviews() {
      return this.$store.getters["Reviews/ShowReviews"]
    }
  },
  mounted() {
    this.$q.loading.show({
      delay: 400
    })
    const res = this.$store.dispatch('Reviews/getReviews')
    console.log(res)
    if (res) {
      this.$q.loading.hide()
    }
  }
}
</script>

<style lang="scss">
.reviews {
  &__date {
    font-size: 14px;
    line-height: 14px;
  }

  &__client-name {
    font-size: 16px;
    line-height: 20px;
  }

  &__text {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
