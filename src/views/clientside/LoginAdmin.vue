<template>
<section class="h-screen">
  <div class="container h-full px-6 py-24">
    <div
      class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <!-- Left column container with background-->
      <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image" />
      </div>

      <!-- Right column container with form -->
      <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
        <form @submit.prevent="login">

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Full Name
                </label>
              </div>

              <div class="md:w-2/3">
                <input v-model="name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text">
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                  Password
                </label>
              </div>

              <div class="md:w-2/3">
                <input v-model="password" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="******">
              </div>
            </div>
            <div v-if="error" class="error" >{{ error }}</div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <label class="md:w-2/3 block text-gray-500 font-bold">
                <input class="mr-2 leading-tight" type="checkbox">
                <span class="text-sm">
                  Send me your newsletter!
                </span>
              </label>
            </div>
            <div class="md:flex md:items-center">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                  Log in
                </button>
              </div>
            </div>

        </form>
      </div>
    </div>
  </div>
</section>

</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        password: '',
        error: null
      }
    },
    methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/login', {
        name: this.name,
        password: this.password
      })
      .then(response => {
        console.log(response);
        // Menyimpan token akses dalam penyimpanan lokal
        const token = response.data;
        localStorage.setItem('access_token', token);
        // Mengarahkan pengguna ke halaman yang memiliki middleware
        this.$router.push({ name: 'ShowProduk' });
      })
      .catch(error => {
        this.error = error.response.data.message;
        //redirect ke halaman login
        //this.$router.push({ name: 'clientside.login' });
      });
    }
  }
  }
  </script>
  
  <style scoped>
    .divider:after,
  .divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
  }
  .h-custom {
  height: calc(100% - 73px);
  }
  @media (max-width: 450px) {
  .h-custom {
  height: 100%;
  }
  }
  </style>