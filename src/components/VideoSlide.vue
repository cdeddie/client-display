<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface Props {
  videoSrc: string;
  isVisible: boolean;
}

const props = defineProps<Props>();
const videoRef = ref<HTMLVideoElement>();

watch(() => props.isVisible, (isVisible) => {
  if (!videoRef.value) return;
  
  if (isVisible) {
    videoRef.value.currentTime = 0;
    videoRef.value.play().catch(() => {
      alert('Video autoplay failed');
    });
  } else {
    videoRef.value.pause();
  }
});

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.muted = true;
    videoRef.value.loop = false;
    videoRef.value.playsInline = true;
  }
});
</script>

<template>
  <div class="video-slide">
    <video 
      ref="videoRef"
      :src="videoSrc" 
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>
.video-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.video-slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style> 