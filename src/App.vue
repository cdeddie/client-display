<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation } from 'swiper/modules';
import ImageSlide from './components/ImageSlide.vue';
import VideoSlide from './components/VideoSlide.vue';

// Import all assets
import image1 from './assets/1.png';
import image2 from './assets/2.png';
import image3 from './assets/3.png';
import image4 from './assets/4.png';
import image5 from './assets/5.png';
import image6 from './assets/6.png';
import image7 from './assets/7.png';
import image8 from './assets/8.png';
import video9 from './assets/9.mp4';
import video10 from './assets/10.mp4';
import video11 from './assets/11.mp4';
import image12 from './assets/12.png';
import image13 from './assets/13.png';
import image14 from './assets/14.png';
import image15 from './assets/15.png';
import image16 from './assets/16.png';
import image17 from './assets/17.png';

const activeIndex = ref(0);
const swiperInstance = ref<any>(null);

const slides = [
  { id: 1, component: markRaw(ImageSlide), imageSrc: image1 },
  { id: 2, component: markRaw(ImageSlide), imageSrc: image2 },
  { id: 3, component: markRaw(ImageSlide), imageSrc: image3 },
  { id: 4, component: markRaw(ImageSlide), imageSrc: image4 },
  { id: 5, component: markRaw(ImageSlide), imageSrc: image5 },
  { id: 6, component: markRaw(ImageSlide), imageSrc: image6 },
  { id: 7, component: markRaw(ImageSlide), imageSrc: image7 },
  { id: 8, component: markRaw(ImageSlide), imageSrc: image8 },
  { id: 9, component: markRaw(VideoSlide), videoSrc: video9 },
  { id: 10, component: markRaw(VideoSlide), videoSrc: video10 },
  { id: 11, component: markRaw(VideoSlide), videoSrc: video11 },
  { id: 12, component: markRaw(ImageSlide), imageSrc: image12 },
  { id: 13, component: markRaw(ImageSlide), imageSrc: image13 },
  { id: 14, component: markRaw(ImageSlide), imageSrc: image14 },
  { id: 15, component: markRaw(ImageSlide), imageSrc: image15 },
  { id: 16, component: markRaw(ImageSlide), imageSrc: image16 },
  { id: 17, component: markRaw(ImageSlide), imageSrc: image17 },
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
            v-if="slide.imageSrc"
            :image-src="slide.imageSrc" 
            :is-visible="index === activeIndex" 
          />
          <component 
            :is="slide.component" 
            v-else-if="slide.videoSrc"
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
