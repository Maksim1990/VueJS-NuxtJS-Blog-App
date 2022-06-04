<template>
  <div class="footer d-none d-md-block text-center pt-1" style="line-height: 30px;height: 30px;">
    <LegalContent />
  </div>
</template>
<script>
import LegalContent from "~/components/PageComponents/Footer/LegalContent";

export default {
  components: {LegalContent}
}
</script>

<style>
.footer{
  position: fixed;
  color: #F5F5F5;
  bottom: 0;
  width: 100%;
  background: #0b495e;
  z-index: 1000;
}
</style>
