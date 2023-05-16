<template>
    <div v-for="(produk,index) in products" :key="index" class="max-w-sm rounded overflow-hidden shadow-lg" style="padding-top: 2rem;">
        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimgsrv2.voi.id%2Fj1O7BU5uNKkhJE_7P9sELHxI4w1W0owv-VPETQOvRPM%2Fauto%2F1200%2F675%2Fsm%2F1%2FbG9jYWw6Ly8vcHVibGlzaGVycy8yMTc3MzIvMjAyMjEwMTIxMTAzLW1vYmlsZS5jcm9wcGVkXzE2NjU2MjA3MjAuanBn.jpg&tbnid=5yOaKAJrOmREBM&vet=12ahUKEwjw_oDk2ff-AhWDKbcAHSI4D0wQMygHegUIARDPAQ..i&imgrefurl=https%3A%2F%2Fvoi.id%2Fberita%2F217732%2Faturan-seragam-sekolah-terbaru-orang-tua-tak-harus-dibebankan-seragam-khusus-sekolah&docid=75e5ZElaX65BBM&w=1200&h=675&q=Seragam%20Sekolah&ved=2ahUKEwjw_oDk2ff-AhWDKbcAHSI4D0wQMygHegUIARDPAQ" />
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2" style="text-transform: uppercase;">{{ produk.nama_produk }}</div>
                            <!-- <h4>Rp. </h4> -->
                            <h5>Rp. {{produk.harga}}</h5>
                            <!-- <h4>ukuran :</h4> -->
                            <!-- <h5 >{{produk.ukuran}}</h5> -->
                            <!-- <h4>kategori :</h4> -->
                            <!-- <h5 >{{produk.kategori}}</h5> -->
                            <h5 >{{produk.jenis}}</h5>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" style="text-transform: uppercase;">{{produk.ukuran}}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" style="text-transform: capitalize;">{{produk.kategori}}</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'

export default {
    setup(){
        //reactive data
        const products = ref([]);
        //get token
        const token = localStorage.getItem('access_token');

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
        }
    }

}
</script>