<template>
  <b-row>
    <b-col md="6" sm="12" class="b-left-auth">
      <b-row style="padding-top: 5em">
        <SendConfirmationCodeForReset/>
      </b-row>
    </b-col>
    <b-col md="6" sm="12" class="d-none d-lg-block">
      <AuthImage :src="require('~/assets/images/design/auth/forgotpassword.png')" />
    </b-col>
  </b-row>
</template>

<script>
import AuthImage from "~/components/PageComponents/AuthImage";
import SendConfirmationCodeForReset from "~/components/ForgetPassword/SendConfirmationCodeForReset";

export default {
  layout: 'auth',
  components: {SendConfirmationCodeForReset, AuthImage},
}
</script>
