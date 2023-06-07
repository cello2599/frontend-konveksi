<template>
    <div>
      <NavbarSamping />
  
      <div class="create w-[40rem] h-[30rem] p-6 ml-60 hover:drop-shadow-lg rounded-md border-blue-800 border mb-30 text-center">
        <p class="text-center text-xl font-medium m-auto">Detail Transaksi Baru</p>
        <form @submit.prevent="create" enctype="multipart/form-data">

          <div class="form-group">
                <p><label for="id_produk">Produk </label></p>
                <select v-model="id_produk" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled value="">Pilih Produk</option>
                    <option v-for="(produk, produkIndex) in produks" :value="produk.id_produk" :key="produkIndex">
                        {{ produk.id_produk }} - {{ produk.nama_produk }} - {{ produk.harga }} - {{ produk.ukuran }} - {{ produk.kategori_produk }}
                    </option>
                </select>
                <span class="text-red-500" v-if="errors && errors.id_produk">Pilihan produk tidak valid</span>
            </div>
            
  
          <div class="form-group">
            <p><label for="sinopsis">Jumlah</label></p>
            <p><input rows="5" class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="jumlah Produk" v-model="jumlah" required></p>
          </div>
  
          <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" style="margin-top: 10px;" type="submit">Tambah Keranjang</button>
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
    //   id_produk: '',
    //     jumlah: '',
        id_produk: [],
        jumlah: [],
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
    create() {
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.post('http://127.0.0.1:8000/api/detail-transaksi/' + this.id_transaksi, {
            id_produk : this.id_produk[0],
            jumlah : this.jumlah[0]
          })
          .then(response => {
            console.log(response);
            this.id_produk = [];
            this.jumlah = [];
            alert('Transaksi Berhasil Ditambahkan');
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
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
}
.transaksi {
    margin-left: 10rem;
}
</style>

