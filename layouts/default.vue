<template>
  <div class="flex flex-col h-screen">
    <TheHeader />
    <div class="flex-1">

      <slot></slot>
    </div>

    <TheFooter />
  </div>
</template>
