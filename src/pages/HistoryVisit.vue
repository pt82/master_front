<template>
  <q-layout class="history-visit flex column flex-center q-pt-md q-pl-md q-pt-xl" padding>
    <q-header reveal class="history-visit__header bg-secondary flex items-center  text-primary main-font-600"
              elevated>
      <q-btn @click="$router.push('/history-visits')" class="history-visit__back back" flat outline color="primary"
             dense icon="navigate_before">
      </q-btn>
      <q-item-label class="history-visit__client-name">
        {{ currentEntryHaircut.firstname }}
      </q-item-label>
      <div></div>
    </q-header>


    <q-timeline class="text-primary"
                color="primary">
      <template slot="loading">
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px"/>
        </div>
      </template>

      <q-timeline-entry
        v-for="(beforeRecord) in beforeRecords" :key="beforeRecord.record_id"
        :avatar="beforeRecord.avatar" class="text-primary">
        <template v-slot:title>
          {{ beforeRecord.staff }} {{ beforeRecord.department_name }}
      <p class="text-weight-light">    {{beforeRecord.comment}}</p>
          <div class="color-price" v-if="beforeRecord.goods.length > 0">
            <div v-for="(purchases,index) in beforeRecord.goods" :key="index">
              {{ purchases.title }}
              <div>
                Цена:{{ purchases.cost }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:subtitle>
          {{ beforeRecord.date }}
        </template>

        <div class="q-pa-md">
          <div v-if="beforeRecord.photos && beforeRecord.photos.length > 0">
            <q-img style="max-width: 600px" class="q-mb-md" spinner-color="primary"
                   v-for="(photo) in  beforeRecord.photos" :key="photo.path" :src="setPhoto(photo.path)">
            </q-img>
          </div>
          <div v-else class="text-primary">Фотографий нет</div>
        </div>
      </q-timeline-entry>


      <q-timeline-entry
        v-if="activeRecord"
        ref="activeRecord"
        :avatar="activeRecord.avatar" class="text-primary">
        <template v-slot:title>
          {{ activeRecord.staff }} {{ activeRecord.department_name }}
 <p  class="text-weight-light">         {{activeRecord.comment}}</p>
          <div class="color-price" v-if="activeRecord.goods.length > 0">
            <div v-for="(purchases,index) in activeRecord.goods" :key="index">
              {{ purchases.title }}
              <div>
                Цена:{{ purchases.cost }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:subtitle>
          {{ activeRecord.date }}
        </template>

        <div class="q-pa-md">
          <div v-if="activeRecord.photos && activeRecord.photos.length > 0">
            <q-img style="max-width: 600px" class="q-mb-md" spinner-color="primary"
                   v-for="(photo) in  activeRecord.photos" :key="photo.path" :src="photo.path">
            </q-img>
          </div>
          <div v-else class="text-primary">Фотографий нет</div>
        </div>
      </q-timeline-entry>


      <q-timeline-entry
        v-for="(afterRecord) in afterRecords" :key="afterRecord.record_id"
        :avatar="afterRecord.avatar" class="text-primary">

        <template v-slot:title>
          {{ afterRecord.staff }}
          {{ afterRecord.department_name }}
       <p  class="text-weight-light">   {{afterRecord.comment}}</p>
          <div class="color-price" v-if="afterRecord.goods.length > 0">
            <div v-for="(purchases,index) in afterRecord.goods" :key="index">
              {{ purchases.title }}
              <div>
                Цена:{{ purchases.cost }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:subtitle>
          {{ afterRecord.date }}
        </template>

        <div ref="afterScroll" class="q-pa-md">
          <div v-if="afterRecord.photos && afterRecord.photos.length > 0">
            <q-img style="max-width: 600px" class="q-mb-md" spinner-color="primary"
                   v-for="(photo) in  afterRecord.photos" :key="photo.path" :src="photo.path">
            </q-img>
          </div>
          <div v-else class="text-primary">Фотографий нет</div>
        </div>
      </q-timeline-entry>

    </q-timeline>
  </q-layout>
</template>

<script>
import photo from '../assets/images/client__photo.jpg'
import {scroll} from 'quasar'

const {getScrollTarget, setScrollPosition} = scroll

export default {
  name: "HistoryVisit",
  data() {
    return {
      photo: photo,
    }
  },
  mounted() {
    setTimeout(() => {
      this.scrollToElement(this.$refs.activeRecord.$el)
    }, 1000)
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;


      if (scrollTop === 0) {
        console.log('scrollTop')
        this.$store.dispatch('EntriesHaircut/getListRecordHistoryBefore', {
          record_id: this.currentEntryHaircut.record_id,
          user_id: this.currentEntryHaircut.user_id,
          length: this.beforeRecords.length
        })
      }
      if (bottomOfWindow) {
        console.log('bottomOfWindow')
        this.$store.dispatch('EntriesHaircut/getListRecordHistoryAfter', {
          record_id: this.currentEntryHaircut.record_id,
          user_id: this.currentEntryHaircut.user_id,
          length: this.afterRecords.length
        })
      }
    };

  },
  beforeDestroy() {
    window.onscroll = null
  },
  created() {
    this.$store.dispatch('EntriesHaircut/getListRecordHistory', {
      record_id: this.currentEntryHaircut.record_id,
      user_id: this.currentEntryHaircut.user_id
    })
  },
  methods: {
    scrollToElement(el) {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 1
      setScrollPosition(target, offset, duration)
    }
  },
  watch: {},
  computed: {
    currentEntryHaircut() {
      return this.$store.getters["EntriesHaircut/currentEntryHaircut"]
    },
    afterRecords() {
      return this.$store.getters["EntriesHaircut/afterRecords"]
    },
    activeRecord() {
      return this.$store.getters["EntriesHaircut/activeRecords"]
    },
    beforeRecords() {
      return this.$store.getters["EntriesHaircut/beforeRecords"]
    },
  },
}
</script>

<style lang="scss">
.q-carousel__slide {
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-color: $secondary;
}

.q-carousel {
  box-shadow: none;
}

.q-dialog__inner > div {
  box-shadow: none;
}

.history-visit {
  &__header {
    height: 73px;
    margin: 0 auto;
    justify-content: space-between;
  }

  &__inner {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  &__photos {
    padding-top: 15px;

    .q-item {
      padding: 0;
    }
  }

  &__add-photo {
    right: -8px;
    bottom: -20px;
  }


  &__photo {
    margin-bottom: 20px;
    margin-right: 15px;
  }


  &__client-name {

  }

  &__back {
  }
}

</style>
