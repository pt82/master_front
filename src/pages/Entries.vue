<template>
  <q-page class="q-pt-md" padding>
    <q-header class="entries-header bg-secondary flex column flex-center q-pt-md relative-position" elevated>
      <q-img class="entries-header__logo" src="../assets/images/logo.svg" alt="logo"/>
      <div>
        <q-chip size="sm" :label="date"
                text-color="text-primary"
                class="entries-header__date bg-secondary main-font-500 text-primary">
        </q-chip>
        <q-btn icon="event" round text-color="primary" color="secondary">
          <q-popup-proxy @before-show="updateProxy" transition-show="scale"
                         transition-hide="scale">
            <q-date color="secondary"
                    text-color="primary" v-model="proxyDate">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup/>
                <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>
    </q-header>

    <q-list v-if="entries && entries.length > 0 " class="entries-list flex flex-center column" separator>
      <q-item v-for="(entry,index) in entries" :key="index"
              @click="getEntry(entry.record_id,entry.user_id)"
              class="entries-list__card entry-card flex items-center" clickable
              v-ripple>
        <div class="entry-card__time second-font text-primary">{{ entry.time }}</div>
        <div class="entry-card__inner flex column">
          <div class="entry-card__client-name main-font-500 text-primary">{{ entry.client_name }}</div>
          <div class="entry-card__service-name main-font text-primary">{{ entry.services_title }}</div>
          <div class="entry-card__coupon main-font text-primary"></div>
        </div>
      </q-item>
    </q-list>

    <div class="flex flex-center text-primary" v-else>
      Записей на сегодня нет
    </div>
  </q-page>
</template>

<script>


export default {
  name: 'Entries',
  data() {
    return {
      date: '',
      proxyDate: '',
      setDate: false
    }
  },


  created() {
    if (!this.dateOfEntries) {
      this.$store.dispatch('EntriesHaircut/getEntries')
    }
  },
  mounted() {
    if (!this.$store.getters["EntriesHaircut/dateOfEntries"]) {
      this.todayDate()
    } else {
      this.setDateOfEntries()
    }
  },
  methods: {
    updateProxy() {
      this.proxyDate = this.date
    },
    save() {
      this.date = this.proxyDate
      this.$store.dispatch('EntriesHaircut/getDateHaircut', this.date)
      this.sendDateOfEntries()
    },
    sendDateOfEntries() {
      this.$store.commit('EntriesHaircut/SET_DATE_OF_ENTRIES', this.date)
    },
    setDateOfEntries() {
      this.date = this.dateOfEntries
    },
    getEntry(record_id, user_id) {
      this.$store.dispatch('EntriesHaircut/getPastHaircutsClient', user_id)
      this.$store.dispatch('EntriesHaircut/getCurrentEntryHaircut', record_id)
      this.$router.push('/history-visits')
    },
    todayDate() {
      let d = new Date()
      let ye = new Intl.DateTimeFormat('ru', {year: 'numeric'}).format(d)
      let mo = new Intl.DateTimeFormat('ru', {month: '2-digit'}).format(d)
      let moShort = new Intl.DateTimeFormat('ru', {month: 'short'}).format(d)
      let da = new Intl.DateTimeFormat('ru', {day: '2-digit'}).format(d)
      this.date = `${ye}/${mo}/${da}`
    },
  },
  computed: {
    entries() {
      return this.$store.getters['EntriesHaircut/entries']
    },
    dateOfEntries() {
      return this.$store.getters["EntriesHaircut/dateOfEntries"]
    },
  }
}
</script>
<style lang="scss">
.entries-header {
  height: 104px;

  &__logo {
    width: 100%;
    max-width: 200px;
  }

  &__date {
    font-size: 18px !important;
    line-height: 22px;
  }

  &__date-picker {
    top: 110px;
  }
}

.q-date__view {
  color: black;
}

.entry-card {
  border: 1px solid #4FD8DB !important;
  width: 100%;
  max-width: 350px;
  background-color: rgba(50, 149, 162, 0.1);

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__coupon {
    font-size: 14px;
    line-height: 17px;
    opacity: 0.6;
    padding-bottom: 10px;
  }

  &__time {
    font-size: 28px;
    line-height: 100%;
    margin-right: 23px;
  }

  &__client-name {
    font-size: 21px;
    line-height: 26px;
    margin-bottom: 8px;
  }

  &__service-name {
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
