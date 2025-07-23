<template>
  <div class="flex column justify-center items-center text-primary q-pa-md">
    <div style="max-width:500px" class="" v-if="rating">
      <div class="text-center text-h6">Рейтинг</div>
      <div class="q-mb-md">
        <strong> Загрузка фотографий по новымs клиентам за месяц: </strong>
        {{ rating.newClientMonth.value }}
        <div><strong>Ранг:</strong> {{ rating.newClientMonth.rank }}</div>
      </div>
      <div class="q-mb-md">
        <strong>По всем клиентам за месяц:</strong>
        {{ rating.clientMonth.value }}
        <div><strong>Ранг:</strong> {{ rating.clientMonth.rank }}</div>
      </div>

      <div class="q-mb-md">
        <strong>Общее количество фотографий:</strong>
        {{ rating.clientTotal.value }}
        <div><strong>Ранг:</strong> {{ rating.clientTotal.rank }}</div>
      </div>
      <div class="q-mb-md">
        <strong>Средний чек:</strong>
        {{ rating.avg.value }}
        <div><strong>Ранг:</strong> {{ rating.avg.rank }}</div>
      </div>
    </div>
    <div v-else>
      <q-spinner color="primary" size="3em" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Rating",
  computed: {
    rating() {
      return this.$store.state.Profile.rating;
    }
  },
  created() {
    this.$store.dispatch("Profile/getRating");
  }
};
</script>

<style scoped></style>
