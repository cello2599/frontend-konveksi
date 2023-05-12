<template>
    <div v-for="(produk,index) in products" :key="index" class="box-c">
        <div class="row g-0">
            <div class="col">
                <div class="card-body-profil">
                    <h3 class="card-title font-pejabat">{{ produk.nama_produk }}</h3>
                    <h4>harga :</h4>
                    <h5 >{{produk.harga}}</h5>
                    <h4>ukuran :</h4>
                    <h5 >{{produk.ukuran}}</h5>
                    <h4>kategori :</h4>
                    <h5 >{{produk.kategori}}</h5>
                    <h4 >Jenis :</h4>
                    <h5 >{{produk.jenis}}</h5>
                </div>
            </div>
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

        onMounted(() => {
            //get data from endpoint api
            axios.get('http://127.0.0.1:8000/api/produk/client')

            .then((result) => {
                products.value = result.data.data;
            }).catch((err) => {
                console.log(err);
            });

        });

        return {
            products
        }
    }

}

</script>