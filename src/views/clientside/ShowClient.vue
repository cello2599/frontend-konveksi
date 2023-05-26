<template>
    <div>
        <NavbarSamping/>
    </div>
    <div class="px-6 pt-4 pb-2">
            <RouterLink :to="{name : 'CreateProduk'}" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" style="text-transform: uppercase; margin-left: 20rem; margin-right:70%;">Create</RouterLink>
            
        
        
    <div class="card">
    <div v-for="(produk,index) in products" :key="index" class="max-w-sm rounded overflow-hidden shadow-lg card-produk" >
        
         <img :src="'http://127.0.0.1:8000/storage/images/' + produk.gambar" />
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2" style="text-transform: uppercase;">{{ produk.nama_produk }}</div>
                            <!-- <h4>Rp. </h4> -->
                            <h5>Rp. {{produk.harga}}</h5>
                            <!-- <h4>ukuran :</h4> -->
                            <!-- <h5 >{{produk.ukuran}}</h5> -->
                            <!-- <h4>kategori :</h4> -->
                            <!-- <h5 >{{produk.kategori}}</h5> -->
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" style="text-transform: uppercase;">{{produk.ukuran}}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" style="text-transform: capitalize;">{{produk.kategori}}</span>
        
        </div>
        <RouterLink :to="{name : 'EditProduk', params:{id : produk.id_produk}}">
            <i class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</i>

        </RouterLink>

        <button @click="deleteProduk(produk.id_produk, index)" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>

    </div>
    </div>
</div>
   
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import NavbarSamping from '@/components/NavbarSamping.vue'

export default {
    setup(){
        //reactive data
        const products = ref([]);
        //get token
        const token = localStorage.getItem('access_token');
        
        //image path
        //const imagepath = ref('src/assets/images/');

        onMounted( async() => {
            if(token){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            //get data from endpoint api
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/produk');
                products.value = response.data.data;
                console.log("Token Authenticated");
            }catch(err){
                console.log(err);
            }
            }else{
                console.log("Token Not Found");
            }
        });

        //delete produk function
        const deleteProduk = async(id, index) => {
            if(!confirm('Are you sure?')) return;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            try{
                const response = await axios.delete('http://127.0.0.1:8000/api/produk/' + id);
                products.value.splice(index, 1);
                console.log(response.data.message);
            }catch(err){
                console.log(err);
            }
        }


        return {
            products
            ,deleteProduk
        }
    },
    components:{
        NavbarSamping
    }

}
</script>

<style scoped>
    .card{
        padding-top: 10px;
        margin-left: 17rem;
        margin-bottom: 3rem;
        margin-top: 2rem;
        display:flex;
        justify-content: flex-start;
        flex-wrap: wrap;

    }
    .card-produk{
        margin-left: 2rem;
        margin-bottom: 2rem;
        height: 35rem;
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 10px;
    }

    .rounded{
        border-radius: 1.25rem;
    }
    .img{
        width: 50%;
        height: 50%;
    }
    .font-bold text-xl mb-2{
        text-transform: uppercase;
    }
    .inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2{
        text-transform: uppercase;
    }
</style>