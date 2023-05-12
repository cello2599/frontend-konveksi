<template>
    <div class="row">
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
    </div>
</template>

<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'

export default {
    name : 'ProdukServer',

    setup(){
        //reactive data
        const products = ref([]);
        //retrieve token from local storage
        const token = localStorage.getItem('access_token');

        onMounted( async () => {
            if(token){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                //get data from endpoint api
                try{
                    // make API request to get products
                    const response = await axios.get('http://127.0.0.1:8000/api/produk');
                    // set products value to the data returned by API
                    products.value = response.data.data;
                    console.log('Token Authenticated.');
                }catch(err){
                    console.log(err);
                }
            }
            else {
                console.log('Token Unauthenticated.');
            }
        });

        return {
            products
        }
    }

}
</script>

<style>
    .row{
        margin-top: 60px;
        margin-right: auto;
        margin-left: auto;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        column-gap: 3.5rem;
        row-gap: 3rem;
    }
    .box-c{
        max-width: fit-content;
    }
    .row g-0{
        display: flex;
        flex-wrap: wrap;
    }
    .card-body-profil{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        column-gap: 1rem;
        row-gap: 1rem;
    }
    .col{
        max-width: 100%;
    }
    .card-title font-pejabat{
        font-family: 'Roboto', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 0.8rem;
    }
</style>