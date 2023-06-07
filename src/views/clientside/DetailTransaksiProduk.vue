<template>
    <div>
      <NavbarSamping />
  
      <div class="create w-fixed h-fixed p-6 ml-60 hover:drop-shadow-lg rounded-md border-blue-800 border mb-30 text-left">
        <p class="text-center text-xl font-medium m-auto">Detail Transaksi Baru</p>

        
        <form @submit.prevent="create">
          <div v-for="(item, index) in items" :key="index">
          <div class="form-group">
                <p><label :for="'id_produk_' + index">Produk </label></p>
                <select v-model="item.id_produk" :id="'id_produk_' + index" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="">Pilih Produk</option>
                    <option v-for="(produk, produkIndex) in produks" :value="produk.id_produk" :key="produkIndex">
                        {{ produk.id_produk }} - {{ produk.nama_produk }} - {{ produk.harga }} - {{ produk.ukuran }} - {{ produk.kategori_produk }}
                    </option>
                </select>
                <span class="text-red-500" v-if="errors && errors[index] && errors[index].id_produk">Pilihan produk tidak valid</span>
            </div>
  
            <div class="form-group">
              <p><label :for="'jumlah_' + index">Jumlah</label></p>
              <p><input rows="5" :id="'jumlah_' + index" class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="jumlah Produk" v-model="item.jumlah" required></p>
            </div>
          </div>
          <br><br>
          <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" type="button" @click="addItem">Tambah Produk</button>
              <br><br>
  
          <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" type="submit">Tambah Transaksi</button>
        </form>
    </div>
  
    </div>
  </template>
  

<script>
import NavbarSamping from '@/components/NavbarSamping.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router';


export default {
    props: ['id_transaksi'],
  data(){
    return{
        items: [{ id_produk: "", jumlah: "" }],
        // id_produk: [],
        // jumlah: [],
      errors: null
    };
  },
  setup(){
        const produks = ref([]);
        onMounted(async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/dropdown-produk');
            produks.value = response.data.data;
            // console.log(produks);
            
        });

        return {
            produks
        };
  },
methods: {
    addItem() {
      this.items.push({ id_produk: "", jumlah: "" });
      },
    create() {

      const data = {
        id_produk: this.items.map((item) => item.id_produk),
        jumlah: this.items.map((item) => item.jumlah),
      };

      const token = localStorage.getItem('access_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        try{
        axios.post('http://127.0.0.1:8000/api/detail-transaksi/' + this.id_transaksi, data)
          .then(response => {
            console.log(response);
            // this.id_produk = [];
            // this.jumlah = [];
            alert('Transaksi Berhasil Ditambahkan');
            this.$router.push({ name: 'Transaksi' });
          })
          .catch(error => {
            if (error.response && error.response.data && error.response.data.errors) {
                this.errors = error.response.data.errors;
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
      
    },
    // selesai() {
    //   this.$router.push({ name: 'Transaksi' });
    // },
  },
components: {
        NavbarSamping
    }
}
</script>

<style scoped>
.create{
    
    margin:auto;
    margin-bottom: 50px;
    margin-left: 17rem;
    margin-right: 2rem;
}
.transaksi {
    margin-left: 17rem;
}
</style>

