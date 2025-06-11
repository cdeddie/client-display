<script setup lang="ts">
interface Props {
  imageSrc: string;
  isVisible: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="image-slide">
    <img :src="imageSrc" alt="Story image" />
  </div>
</template>

<style scoped>
.image-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.image-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style> 