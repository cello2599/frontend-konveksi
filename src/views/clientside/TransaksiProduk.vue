<template>
    <div>
        <NavbarSamping/>
    </div>

    <div class="create w-[40rem] h-[30rem] p-6 ml-60 hover:drop-shadow-lg rounded-md border-blue-800 border mb-30 text-center">
      <p class="text-center text-xl font-medium m-auto"> Transaksi Baru</p>
      <div>
        <form @submit.prevent="create" enctype="multipart/form-data">

          <div class="form-group">
            <p><label for="genre">Customer</label></p>
                <select v-model="id_customer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled value="">Pilih Customer</option>
                          <option v-for="(customer, index) in customers" :value="customer.id_customer" :key="index">
                                            {{ customer.id_customer }} - {{ customer.nama }} - {{ customer.no_telp }}
                        </option>
                      </select>
                <span class="text-red-500" v-if="errors && errors.id_customer">Pilihan : {{ id_customer }}</span>
            </div>


          <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" type="submit">Tambah</button>
        </form>
      </div>

    </div>
   
<!-- component -->
<div class="transaksi text-center mb-4 -mt-3 table-auto p-10">
            <table class="table-fixed text-center border-collapse w-[80%] mx-auto">
                <thead>
                  <tr>
                    <th class="border-2 border-black w-16">Genre</th>
                    <th class="border-2 border-black w-36">Judul Buku</th>
                    <th class="border-2 border-black w-36">Judul Buku</th>
                    <th class="border-2 border-black w-36 ">Sinopsis</th>
                    <th class="border-2 border-black w-20">Gambar</th>
                    <th class="border-2 border-black w-16">Aksi</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td class="border-2 border-black">nama </td>
                    <td class="border-2 border-black">alamat</td>
                    <td class="border-2 border-black max-w-md text-left">nohp</td>
                    <td class="border-2 border-black max-w-md text-left">nohp</td>
                    <td class="border-2 border-black">
                        <img src="" alt="" class="w-20 h-20 mx-auto">
                    </td>
                    <td class="border-2 border-black"> 
                        <a href=""><i class="fa-solid fa-pen bg-green-600 text-white py-2 px-4 rounded-lg mt-2"> </i> </a>
                        <form action="" >
                            
                            
                            <button type="submit" class="bg-red-500 text-white py-2 px-4 rounded-lg inline-table mt-2 ">
                            <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </form>
                    </td>
                  </tr>
                </tbody>
                
              </table>
        </div>
</template>

<script>
import NavbarSamping from '@/components/NavbarSamping.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'


export default {
  data(){
    return{
      id_customer: '',
      id_transaksi: null,
      errors: null,
    }
  },
  setup(){
        const customers = ref([]);
        onMounted(async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/dropdown-customer');
            customers.value = response.data.data;
        });

        return {
            customers,
        };
  },
  methods: {
    create() {
      const token = localStorage.getItem('access_token');

      if(token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            try{
              axios.post('http://127.0.0.1:8000/api/transaksi', {
                      id_customer: this.id_customer,
                    })
                    .then(response => {
                      // this.id_customer = ''
                      // this.errors = null
                      console.log(response);
                      this.id_transaksi = response.data.data.id_transaksi
                      this.$router.push({ name: 'DetailTransaksi', params:{id_transaksi : this.id_transaksi} });
                      alert('Transaksi Berhasil Ditambahkan')
                    })
                    .catch(error => {
                      this.errors = error.response.data.errors
                    })
                  }
            catch(error){
                    alert('Transaksi Gagal Ditambahkan')
                  }
                }
    }
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
