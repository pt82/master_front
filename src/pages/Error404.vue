<template>
  <q-page padding class="fullscreen bg-secondary text-primary text-center q-pa-md flex flex-center">
    <q-page-container>
      <div>
        <div style="font-size: 30vh;">
          404
        </div>

        <div class="text-h2" style="opacity:.4">
          Такой страницы не существует
        </div>

        <q-btn
          class="q-mt-xl"
          color="primary"
          text-color="secondary"
          unelevated
          to="/"
          label="Go Home"
          no-caps
        />
      </div>
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
