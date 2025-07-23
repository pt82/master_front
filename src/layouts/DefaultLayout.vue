<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-img style="z-index: 0" class="fullscreen" src="../assets/images/bg.png"></q-img>
      <router-view></router-view>
    </q-page-container>


    <q-footer class="footer bg-secondary flex flex-center column" elevated>


      <q-tabs class="main-font footer__btn text-primary" switch-indicator>
        <div v-for="(menuItem, index) in menu"
             :key="index">
          <q-route-tab
            :to="menuItem.to"
            no-caps
            replace
            :label="menuItem.label"
            :icon="menuItem.icon"
            v-if="menuItem.show"
            :disable="menuItem.disable"
            @click="onClickSave(menuItem)"
          >
          </q-route-tab>
        </div>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>


  export default {
    name: "DefaultLayout",

    data() {
      return {
        leftDrawer: true,
        isDisabled: false,
        menu: [
          {
            label: "Записи",
            icon: "calendar_today",
            to: "/",
            show: true,
            showPages: []
          },
          {
            label: "Профиль",
            icon: "person",
            to: "/profile",
            show: true,
            showPages: []
          },
          {
            label: "Сохранить",
            icon: "done",
            to: "",
            show: false,
            disable: false,
            showPages: ['/current-visit']
          },
          {
            label: "Отмена",
            icon: "close",
            to: "/history-visits",
            show: false,
            showPages: ['/current-visit']
          }
        ]
      };
    },
    watch: {
      $route(to, form) {
        this.showAllItem()
        this.hideSaveAndCancel()
      }
    },
    created() {
      this.$root.$on('block-button', (event) => {
        console.log(event, 'block-button')
        this.menu.forEach(menuItem => {
          if (menuItem.label === 'Сохранить') {
            menuItem.disable = event
          }
        })
      })
      this.$root.$on('CurrentVisit', (event) => {
        this.menu.forEach(menuItem => {
          if (menuItem.label === 'Отмена') {
            menuItem.to = event.to
          }
        })
        this.hideAllItem()
        this.showSaveAndCancel()
      })
    },


    methods: {
      onClickSave(menuItem) {
        if (menuItem.label === 'Сохранить') {
          this.$root.$emit('save')
        }
      },
      hideAllItem() {
        this.menu.forEach(menuItem => menuItem.show = false)
      },
      showAllItem() {
        this.menu.forEach(menuItem => menuItem.show = true)
      },
      showSaveAndCancel() {
        this.menu.forEach(menuItem => {
          if (menuItem.label === 'Сохранить' || menuItem.label === 'Отмена') {
            menuItem.show = true
          }
        })
      },
      hideSaveAndCancel() {
        this.menu.forEach(menuItem => {
          if (menuItem.label === 'Сохранить' || menuItem.label === 'Отмена') {
            menuItem.show = false
          }
        })
      }
    },


  };
</script>

<style lang="scss">
  .footer {
    z-index: 1;

    &__btn {
      font-size: 14px;
      line-height: 17px;
    }
  }

  .q-tabs {
    height: 100%;
  }

  /*.q-tab--inactive {
    opacity: 0.4;
  }*/
</style>
