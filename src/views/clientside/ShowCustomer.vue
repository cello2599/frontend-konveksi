<template>
    <div>
        <NavbarSamping/>
    </div>
    
    <RouterLink :to="{name : 'CreateCustomer'}" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" style="text-transform: uppercase; margin-left: 20rem; margin-right:70%;">Create</RouterLink>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <input v-model="searchQuery" type="text" placeholder="Cari nama customer" class="border px-4 py-2 rounded-md w-[40rem]" @input="search" />
    <table class="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100" style="margin-left: 21%; margin-top: 2%;">
        <thead class="text-xs text-white uppercase bg-blue-600 dark:text-color-blue">
            <tr>
                <th scope="col" class="px-6 py-3" style="text-align: center;">
                    Nama Customer
                </th>
                <th scope="col" class="px-6 py-3">
                    Alamat
                </th>
                <th scope="col" class="px-6 py-3">
                    No telepon
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody ref="customerTable">
            <tr class="bg-blue-500 border-b border-blue-400" v-for="(customer,index) in paginatedData" :key="index">
                <td scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                    {{ customer.nama }}
                </td>
                <td class="px-6 py-4 ">
                    {{ customer.alamat }}
                </td>
                <td class="px-6 py-4">
                    {{ customer.no_telp }}
                </td>
                <td class="px-6 py-4">
                    {{ customer.email }}
                </td>
                <td class="px-6 py-4">
                    <RouterLink :to="{name : 'EditCustomer', params:{id_customer : customer.id_customer}}">
                        <i class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</i>
                    </RouterLink>

                    <button @click="deleteCustomer(customer.id_customer, index)" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
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
import axios from 'axios'
import { ref, onMounted } from 'vue'
import NavbarSamping from '@/components/NavbarSamping.vue'

export default {
    data(){
        return {
            currentPage: 1,
            perPage: 5,
            searchQuery: '',
        }
    }, 
    computed: {
        totalPages() {
            return Math.ceil(this.customers.length / this.perPage)
        },
        paginatedData() {

            //jika ada pencarian
            if(this.searchQuery){
                return this.customers.filter((customer) => {
                    return customer.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
                })
            }
            else{
            const start = (this.currentPage - 1) * this.perPage
            const end = this.currentPage * this.perPage
            return this.customers.slice(start, end)
            }
            
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        prevPage() {
                if (this.currentPage > 1) this.currentPage--;
            },
        search(){
                this.currentPage = 1;
                let filter = this.searchQuery.toUpperCase();
                let tr = this.$refs.customerTable.getElementsByTagName("tr");
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
            }
    },
    setup(){
        const customers = ref([]);
        //get token
        const token = localStorage.getItem('access_token');
        
        //image path
        //const imagepath = ref('src/assets/images/');

        onMounted( async() => {
            if(token){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            //get data from endpoint api
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/customer');
                customers.value = response.data.data;
                console.log("Token Found", customers.value);
            }catch(err){
                console.log(err);
            }
            }else{
                console.log("Token Not Found");
            }
        });

        //delete customer function
        const deleteCustomer = async(id, index) => {
            if(!confirm('Are you sure?')) return;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            try{
                const response = await axios.delete('http://127.0.0.1:8000/api/customer/' + id);
                customers.value.splice(index, 1);
                console.log(response.data.message);
            }catch(err){
                console.log(err);
            }
        }


        return {
            customers
            ,deleteCustomer
        }
    },
    components: {
        NavbarSamping
    }
}

</script>

<style scoped>
.transaksi {
    margin-left: 10rem;
}
.pagination {
    margin-left: 21%;
    margin-top: 2%;
}

.pagination button {
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
}
</style>