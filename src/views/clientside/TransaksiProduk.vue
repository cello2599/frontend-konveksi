<template>
    <div>
        <NavbarSamping/>
    </div>

    <div class="create w-[40rem] h-fixed p-6 ml-60 hover:drop-shadow-lg rounded-md border-blue-800 border mb-30 text-center">
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


          <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" style="margin-top: 10px;" type="submit">Tambah</button>
        </form>
      </div>

    </div>
   
<!-- component -->
<div class="transaksi align-middle inline-block min-w-40 shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
  <input v-model="searchQuery" type="text" placeholder="Cari nama customer" class="border px-4 py-2 rounded-md w-full" @input="search" />
            <table class="min-w-40">
                <thead>
                  <tr>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Nama Customer</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Alamat Customer</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Nomor Hp</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Admin</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Tanggal</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Total Transaksi</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Aksi</th>
                  </tr>
                </thead>
                
                <tbody class="bg-white" ref="transaksiTable">
                  <tr v-for="(transaksi , indexTransaksi) in displayedPosts" :key="indexTransaksi">
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{ transaksi.nama_customer }} </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{transaksi.alamat_customer}}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{transaksi.no_telp}}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{transaksi.admin}}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{transaksi.tanggal}}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">Rp. {{ formatrupiah(transaksi.totalTransaksi) }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"> 
                        <RouterLink :to="{name : 'ShowDetailTransaksi', params:{id_transaksi : transaksi.id_transaksi}}"><i class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"> detail</i></RouterLink>
                        
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                </div>
        </div>
</template>

<script>
import NavbarSamping from '@/components/NavbarSamping.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
// import { RouterLink } from 'vue-router'


export default {
  data(){
    return{
      id_customer: '',
      id_transaksi: null,
      errors: null,
      searchQuery: '',
      currentPage: 1,
      perPage: 5,
    }
  },
  setup(){
        const customers = ref([]);
        const total_transaksi = ref([]);
        const token = localStorage.getItem('access_token');
        onMounted(async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/dropdown-customer');
            customers.value = response.data.data;
        });

        onMounted(async () => {
            if(token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                try {
                  const response = await axios.get('http://127.0.0.1:8000/api/transaksi');
                  total_transaksi.value = response.data.data;

                }
                catch(error) {
                    console.log(error);
                }
            }
        });
        return {
            customers,
            total_transaksi,
        };
  },
  computed: {
        totalPages() {
            return Math.ceil(this.total_transaksi.length / this.perPage)
        },
        displayedPosts() {
            let filterTransaksi = this.total_transaksi;
            if (this.searchQuery) {
                return filterTransaksi.filter((transaksi) => {
                    return transaksi.nama_customer.toLowerCase().includes(this.searchQuery.toLowerCase())
                }
                );
            }
            return this.total_transaksi.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
        }
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
    },
    formatrupiah(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."
      )
    },
  //make mehod for search
    search(){
      this.currentPage = 1;
      let filter = this.searchQuery.toUpperCase();
      let tr = this.$refs.transaksiTable.getElementsByTagName("tr");
      let td, i, txtValue;
      for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
          txtValue = td.textContent || td.innerText;
          if(txtValue.toUpperCase().indexOf(filter) > -1){
            tr[i].style.display = "";
          }else{
            tr[i].style.display = "none";
          }
        }
      }
    },
    nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
    prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
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
  margin-left: 17rem;
}
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-left: 50rem;
    margin-bottom: 20px;
}

.pagination button{
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background: #fff;
    margin-left: 5px;
    outline: none;
    transition: duration-300;
    --tw-bg-opacity: 1;
    background-color: rgb(29 78 216 / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-duration: 300ms;
}
</style>
