<template>
  <q-page class="history-visits flex column flex-center full-width" padding>
    <q-header class="history-visits__header bg-secondary flex column flex-center text-primary main-font-500" elevated>
      <q-img class="history-visits__logo logo" src="../assets/images/logo.svg" alt="logo"/>
      История визитов
    </q-header>
    <div class="history-visits__content flex full-width">
      <div v-if="currentEntryHaircut && !currentEntryHaircut.record_done"
           @click="$router.push('/current-visit')"
           class="visit-item visit-item--current full-width">
        <q-item class="history-visits__item visit-item" clickable v-ripple>
          <q-item-section v-if="currentEntryHaircut" class="text-red-5">
            <q-item-label class="visit-item__date main-font-500">{{
                currentEntryHaircut.date + ' ' + currentEntryHaircut.time
              }}
            </q-item-label>
            <q-item-label class="visit-item__master-name main-font-500">{{ currentEntryHaircut.firstname }}
            </q-item-label>
            <q-item-label caption lines="2" class="text-red-5 main-font visit-item__service-name">Стрижка</q-item-label>
          </q-item-section>

          <q-spinner
            v-else
            color="primary"
            size="3em"
          />
          <q-item-section side center>
            <q-icon size="3rem" color="primary" name="add_circle"/>
          </q-item-section>
        </q-item>

        <q-separator class="text-primary" color="dark" spaced inset/>
      </div>

      <div v-if="pastHaircutsClient"
           class="text-primary full-width">
        <div v-for="(haircuts, index) in pastHaircutsClient" :key="index"
             class="history-visits__lists full-width">
          <q-item
            @click="getCurrentHistory(haircuts.record_id)"
            class="history-visits__item visit-item  full-width" clickable v-ripple>
            <q-item-section class="full-width">
              <q-item-label class="visit-item__date main-font-500">{{ haircuts.date }}</q-item-label>
              <q-item-label class="visit-item__master-name main-font-500">{{ haircuts.firstname }}</q-item-label>
              <q-item-label caption lines="2" class="text-primary main-font visit-item__service-name">Стрижка
              </q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-icon name="visibility" size="lg" color="primary"/>
            </q-item-section>
          </q-item>

          <q-separator color="dark" spaced inset/>
        </div>
      </div>
      <div class="text-primary q-pl-lg absolute-center" v-else>Клиент стрижётся в первый раз</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "HistoryVisits",
  data() {
    return {}
  },
  methods: {
    async getCurrentHistory(record_id) {
      const res = await this.$store.dispatch('EntriesHaircut/getCurrentHistoryHaircut', record_id)
      if (res) {
        await this.$router.push('/history-visit')
      }
    }
  },
  computed: {
    pastHaircutsClient() {
      return this.$store.getters["EntriesHaircut/pastHaircutsClient"]
    },
    currentEntryHaircut() {
      return this.$store.getters["EntriesHaircut/currentEntryHaircut"]
    }
  }
}
</script>

<style lang="scss">

.visit-item {
  width: 100%;

  &__date {
    font-size: 21px;
    line-height: 26px;
  }

  &__master-name {
    font-size: 21px;
    line-height: 26px;
  }

  &__servece-name {
    font-size: 16px;
    line-height: 20px;
  }

  &--current {
    margin-bottom: 54px;
  }
}

.history-visits {
  &__logo {
    margin-bottom: 18px;
  }

  &__content {
    max-width: 800px
  }

  &__header {
    height: 100px;
    font-size: 18px;
    line-height: 22px;
  }
}
</style>
