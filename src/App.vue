<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation } from 'swiper/modules';
import ImageSlide from './components/ImageSlide.vue';
import VideoSlide from './components/VideoSlide.vue';

const activeIndex = ref(0);
const swiperInstance = ref<any>(null);

const slides = [
  { id: 1, component: markRaw(ImageSlide), imageSrc: '/src/assets/1.png' },
  { id: 2, component: markRaw(ImageSlide), imageSrc: '/src/assets/2.png' },
  { id: 3, component: markRaw(ImageSlide), imageSrc: '/src/assets/3.png' },
  { id: 4, component: markRaw(ImageSlide), imageSrc: '/src/assets/4.png' },
  { id: 5, component: markRaw(ImageSlide), imageSrc: '/src/assets/5.png' },
  { id: 6, component: markRaw(ImageSlide), imageSrc: '/src/assets/6.png' },
  { id: 7, component: markRaw(ImageSlide), imageSrc: '/src/assets/7.png' },
  { id: 8, component: markRaw(ImageSlide), imageSrc: '/src/assets/8.png' },
  { id: 9, component: markRaw(VideoSlide), videoSrc: '/src/assets/9.mp4' },
  { id: 10, component: markRaw(VideoSlide), videoSrc: '/src/assets/10.mp4' },
  { id: 11, component: markRaw(VideoSlide), videoSrc: '/src/assets/11.mp4' },
  { id: 12, component: markRaw(ImageSlide), imageSrc: '/src/assets/12.png' },
  { id: 13, component: markRaw(ImageSlide), imageSrc: '/src/assets/13.png' },
  { id: 14, component: markRaw(ImageSlide), imageSrc: '/src/assets/14.png' },
  { id: 15, component: markRaw(ImageSlide), imageSrc: '/src/assets/15.png' },
  { id: 16, component: markRaw(ImageSlide), imageSrc: '/src/assets/16.png' },
  { id: 17, component: markRaw(ImageSlide), imageSrc: '/src/assets/17.png' },
];

const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.activeIndex;
};

const onSlideClick = (event: MouseEvent) => {
  if (!swiperInstance.value) return;

  const slideWidth = (event.currentTarget as HTMLElement).clientWidth;
  const clickX = event.offsetX;

  if (clickX > slideWidth / 2) {
    swiperInstance.value.slideNext();
  } else {
    swiperInstance.value.slidePrev();
  }
};

const introPressed = ref(false);
</script>

<template>
  <div class="intro" v-if="!introPressed">
    <span>To navigate through, swipe OR click on the left or right side of the card to navigate left and right</span>
    <button @click="introPressed = true">Start</button>
  </div>
  <div class="root" v-else>
    <div class="story-container">
      <div class="progress-bars">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="progress-bar"
          :class="{ active: index === activeIndex }"
        ></div>
      </div>
      <swiper
        :modules="[Pagination, Navigation]"
        :pagination="{ clickable: false }"
        :navigation="false"
        class="story-swiper"
        @swiper="(swiper) => (swiperInstance = swiper)"
        @slideChange="onSlideChange"
      >
        <swiper-slide 
          v-for="(slide, index) in slides" 
          :key="slide.id" 
          @click="onSlideClick"
        >
          <component 
            :is="slide.component" 
            :image-src="slide.imageSrc" 
            :video-src="slide.videoSrc"
            :is-visible="index === activeIndex" 
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.id {
  display: absolute;
  left: 0;
  top: 0;
  padding: 1rem;
}

.intro {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.intro span {
  margin-bottom: 1rem;
  font-size: 2.4rem;
}

.intro button {
  background: transparent; 
  border: 2px solid #333; 
  color: #333;
  padding: 1rem 2rem;
  font-size: 1.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 1rem;
}

.intro button:hover {
  background: #333;
  color: #fff;
  transform: translateY(-.2rem);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.intro button:active {
  transform: translateY(0);
  box-shadow: none;
}

.root {
  width: 100vw;
  height: calc(100vh - 2rem);
  display: flex;
  justify-content: center;
}

.story-container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  aspect-ratio: 9 / 16;
}

@media (min-width: 768px) {
  .story-container {
    height: calc(100vh - 2rem);
    margin: 1rem;
    width: auto;
    aspect-ratio: 9 / 16;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.progress-bars {
  pointer-events: none;   
  z-index: 2;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  width: 80%;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(206, 206, 206, 0.5);
  border-radius: 2px;
  transition: background 0.1s ease-in-out;
}

.progress-bar.active {
  background: white;
}

.story-swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
</style>
