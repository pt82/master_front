<template>
  <q-page padding class="current-visit overflow-hidden">
    <q-header
      style="z-index:auto"
      class="current-visit__header bg-secondary flex flex-center  text-primary main-font-600"
      elevated
      reveal
    >
      <q-btn
        @click="$router.push('/history-visits')"
        class="history-visit__back back"
        flat
        outline
        color="primary"
        dense
        icon="navigate_before"
      >
      </q-btn>
      <q-item-label
        v-if="currentEntryHaircut"
        class="history-visit__client-name q-pa-md"
      >
        {{ currentEntryHaircut.firstname }}
      </q-item-label>
      <div></div>
    </q-header>

    <q-form @submit="onSubmit" action="">
      <div
        class="photo-before-haircuts flex column flex-center q-mb-md q-pt-md"
      >
        <q-item-label class="text-white main-font-500 q-pl-lg q-mb-md">
          Фото клиента до стрижки
        </q-item-label>

        <div class="flex q-mb-sm flex-center">
          <div
            class="upload-photo upload-photo--before q-mr-sm"
            @click="onUploadPhotoAndroid($event, 'ivideonFirst')"
          >
            <q-img
              spinner-color="primary"
              class="upload-photo__photo"
              :src="photos.ivideonFirst"
            ></q-img>
            <input
              v-if="!$q.platform.is.android"
              class="upload-photo__input"
              type="file"
              @change.stop="onUploadPhoto($event, 'ivideonFirst')"
            />
          </div>
          <div
            class="upload-photo upload-photo--left q-mr-sm"
            @click="onUploadPhotoAndroid($event, 'ivideonSecond')"
          >
            <q-img
              spinner-color="primary"
              class="upload-photo__photo"
              :src="photos.ivideonSecond"
            ></q-img>
            <input
              v-if="!$q.platform.is.android"
              class="upload-photo__input"
              type="file"
              @change.stop="onUploadPhoto($event, 'ivideonSecond')"
            />
          </div>
          <div
            class="upload-photo upload-photo--rights q-mr-sm"
            @click="onUploadPhotoAndroid($event, 'ivideonThird')"
          >
            <q-img
              spinner-color="primary"
              class="upload-photo__photo"
              :src="photos.ivideonThird"
            ></q-img>
            <input
              v-if="!$q.platform.is.android"
              class="upload-photo__input"
              type="file"
              @change.stop="onUploadPhoto($event, 'ivideonThird')"
            />
          </div>
        </div>
      </div>
      <div class="current-visit__content flex flex-center">
        <div class="current-visit__visible q-pa-md">
          <q-item-label class="text-white main-font-500 q-pb-md">
            Комментарий к стрижке (видит клиент)
          </q-item-label>
          <q-input
            class="current-visit__comment primary text-primary main-font q-mb-md"
            label="Комментарий"
            color="primary"
            label-color="primary"
            v-model="commentVisible"
            filled
            input-style="color:#4FD8DB;"
            autogrow
          />
        </div>

        <div class="photo-haircuts flex column flex-center q-mb-md">
          <q-item-label class="text-white main-font-500 q-pl-lg q-mb-md">
            Фото стрижки
          </q-item-label>

          <div class="flex q-mb-sm flex-center">
            <div
              class="upload-photo upload-photo--before q-mr-sm"
              @click="onUploadPhotoAndroid($event, 'photoBefore')"
            >
              <img
                id="photoBefore"
                class="upload-photo__photo"
                :src="photos.photoBefore"
                alt=""
              />
              <input
                v-if="!$q.platform.is.android"
                ref="load"
                class="upload-photo__input"
                type="file"
                @change.stop="onUploadPhoto($event, 'photoBefore')"
              />
            </div>
            <div
              class="upload-photo upload-photo--left"
              @click="onUploadPhotoAndroid($event, 'photoLeft')"
            >
              <img
                id="photoLeft"
                alt=""
                class="upload-photo__photo"
                :src="photos.photoLeft"
              />
              <input
                class="upload-photo__input"
                v-if="!$q.platform.is.android"
                type="file"
                @change.stop="onUploadPhoto($event, 'photoLeft')"
              />
            </div>
          </div>
          <div class="flex flex-center q-mb-md">
            <div
              class="upload-photo upload-photo--rights q-mr-sm"
              @click="onUploadPhotoAndroid($event, 'photoBehind')"
            >
              <img
                id="photoBehind"
                alt=""
                class="upload-photo__photo"
                :src="photos.photoBehind"
              />
              <input
                class="upload-photo__input"
                type="file"
                v-if="!$q.platform.is.android"
                @change.stop="onUploadPhoto($event, 'photoBehind')"
              />
            </div>
            <div
              class="upload-photo upload-photo--behind"
              @click="onUploadPhotoAndroid($event, 'photoRights')"
            >
              <img
                id="photoRights"
                alt=""
                class="upload-photo__photo"
                :src="photos.photoRights"
              />
              <input
                class="upload-photo__input"
                v-if="!$q.platform.is.android"
                type="file"
                @change.stop="onUploadPhoto($event, 'photoRights')"
              />
            </div>
          </div>
        </div>

        <div class="current-visit__not-visible q-pa-md">
          <q-item-label class="text-white main-font-500 q-pb-md">
            О клиенте (НЕ видит клиент)
          </q-item-label>
          <q-input
            class="current-visit__comment primary text-primary main-font q-mb-md"
            label="Комментарий"
            color="primary"
            label-color="primary"
            v-model="commentNotVisible"
            filled
            input-style="color:#4FD8DB;"
            autogrow
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import photoBefore from "../assets/images/new-haircut_1.png";
import photoLeft from "../assets/images/new-haircut_2.png";
import photoRights from "../assets/images/new-haircut_4.png";
import photoBehind from "../assets/images/new-haircut_3.png";
import imageCompression from "browser-image-compression";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default {
  name: "CurrentVisit",
  data() {
    return {
      dataToSand: {},
      file: null,
      submitEmpty: false,
      submitResult: [],
      getUrl: "",
      imageSrc: "",
      formData: new FormData(),
      photos: {
        photoBefore: photoBefore,
        photoLeft: photoLeft,
        photoRights: photoRights,
        photoBehind: photoBehind,
        ivideonFirst: photoBefore,
        ivideonSecond: photoLeft,
        ivideonThird: photoRights
      },
      commentVisible: "",
      commentNotVisible: "",
      onSubmitEvent: false
    };
  },
  computed: {
    currentEntryHaircut() {
      return this.$store.getters["EntriesHaircut/currentEntryHaircut"];
    }
  },
  async created() {
    this.$root.$emit("CurrentVisit", { to: "/history-visits" });
    this.$root.$on("save", this.onSubmit);
  },
  beforeDestroy() {
    this.$root.$off("save", this.onSubmit);
    this.$root.$emit("block-button", false);
    this.reset();
  },
  watch:{
    commentVisible(value){
      if(value){
        this.getFormData('comment',value)
      }
    }
  },
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    async compressImg(file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(file, options);
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        return compressedFile;
      } catch (error) {
        console.log(error);
      }
    },
    async onUploadPhoto(e, target) {
      this.onSubmitEvent = true;
      const file = e.target.files[0];
      const img = await this.compressImg(file);
      this.photos[target] = URL.createObjectURL(img);
      this.getFormData(target, img);
    },
    async onUploadPhotoAndroid(e, target) {
      if (this.$q.platform.is.android) {
        this.onSubmitEvent = true;
        const image = await Camera.getPhoto({
          quality: 100,
          width: 240,
          height: 320,
          allowEditing: true,
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          promptLabelHeader: "Фото",
          promptLabelPhoto: "Выбрать из галереи",
          promptLabelPicture: "Сделать фото"
        });
        this.photos[target] = image.webPath;
        let blob = await fetch(image.webPath).then(r => r.blob());
        const file = await this.compressImg(blob);
        this.getFormData(target, file);
      }
    },
    getFormData(target, img) {
      this.formData.set(target, img);
    },
    async onSubmit() {
      try {
        this.formData.append("user_id", this.currentEntryHaircut.user_id);
        if (this.onSubmitEvent) {
          this.$root.$emit("block-button", true);
          await this.$store.dispatch("EntriesHaircut/setDataCurrentHaircut", {
            formData: this.formData,
            record_id: this.currentEntryHaircut.record_id
          });
          this.$q.notify({
            type: "positive",
            message: "Фото сохранены"
          });
          this.reset();
          await this.$router.push("/");
        } else {
          this.$q.notify({
            type: "negative",
            message: "Вы не загрузили ни одной фотографий"
          });
        }
      } catch (e) {
        this.reset();
        this.$q.notify({
          type: "negative",
          message: "Фото не сохранены"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.photo-before-haircuts {
  .upload-photo {
    width: 87px;
    height: 88px;

    &__photo {
      max-width: 83px;
      max-height: 84px;
    }
  }
}

.q-layout-padding {
  padding: 0;
}

.photo-haircuts {
  background: rgba(50, 149, 162, 0.1);
  width: 100%;
  height: 400px;
}

.upload-photo {
  border: 2px dashed #4fd8db;
  width: 155px;
  height: 155px;
  cursor: pointer;
  position: relative;

  &__photo {
    width: 151px;
    height: 151px;
  }

  &__input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 151px;
    height: 151px;
    opacity: 0;
  }
}

.current-visit {
  position: relative;

  &__comment {
    border: 0.5px solid #4fd8db;
    width: 100%;
    min-width: 325px;
    font-size: 14px;
    line-height: 17px;
  }

  &__header {
    height: 71px;
    margin: 0 auto;
    justify-content: space-between;
  }
}
</style>
