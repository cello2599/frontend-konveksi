<template>
    <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" style="text-transform: uppercase; margin-left: 20rem;">Create</span>
            
        
        
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

        </RouterLink>
    </div>
    </div>
</div>
   
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

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

        return {
            products
            //imagepath
        }
    }

}
</script>

<style scoped>
    .card{
        padding-top: 10px;
        margin-left: 17rem;
        margin-bottom: 3rem;
        display:flex;

    }
    .card-produk{
        margin-left: 2rem;
        margin-bottom: 2rem;
        width: 18rem;
        height: 30rem;
    }

    .rounded{
        border-radius: 1.25rem;
    }
    .img{
        width: 100%;
        height: 100%;
    }
    .font-bold text-xl mb-2{
        text-transform: uppercase;
    }
    .inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2{
        text-transform: uppercase;
    }
</style>