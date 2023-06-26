<template>
  <PageContainer>
    <BaseInput />
  </PageContainer>
</template>

<script>
import PageContainer from "@/components/UI/PageContainer.vue";
import BaseInput from "@/components/Form/BaseInput.vue";
export default {
  name: "UserList",
  components: {
    PageContainer,
    BaseInput,
  },
};
</script>

<style lang="scss" scoped></style>
