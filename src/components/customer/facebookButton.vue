<template>
  <q-btn bg="#4267B2 active:#4267B2/45" no-caps @click="logInWithFacebook">
    <div flex place="content-between items-center" space="x-2">
      <div class="i-bi-facebook" bg="white" />
      <div text="white">Login with Facebook</div>
    </div>
  </q-btn>
</template>
<script lang="ts" setup>
async function logInWithFacebook() {
  await loadFacebookSDK(document, 'script', 'facebook-jssdk');
  await initFacebook();
  window.FB.login((response) => {
    if (response) {
      // eslint-disable-next-line no-console
      console.log(response);
    } else {
      // eslint-disable-next-line no-console
      console.log('User cancelled login or did not fully authorize.');
    }
  });
  return false;
}

async function loadFacebookSDK(d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];

  if (d.getElementById(id)) {
    return;
  }

  const js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}
async function initFacebook() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: '1167921663397742',
      cookie: true,
      version: 'v13.0',
    });
  };
}
</script>
