<template>
  <b-row>
    <b-col md="6" sm="12" class="b-left-auth">
      <b-row style="padding-top: 5em">
        <ResetPassword/>
      </b-row>
    </b-col>
    <b-col md="6" sm="12" class="d-none d-lg-block">
      <AuthImage :src="require('~/assets/images/design/auth/reset.png')" />
    </b-col>
  </b-row>
</template>

<script>
import AuthImage from "~/components/PageComponents/AuthImage";
import ResetPassword from "~/components/ForgetPassword/ResetPassword";

export default {
  layout: 'auth',
  components: {ResetPassword,AuthImage},
}
</script>
