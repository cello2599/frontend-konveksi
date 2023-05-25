<template>
    <div>
        <NavbarSamping/>
    </div>
    <div class="w-[22rem] h-[32rem] p-6 ml-60 hover:drop-shadow-lg rounded-md border-purple-800 border mb-5 text-center">
                <div class="mt-1 ">
                <p class="text-center text-xl font-medium m-auto">Edit Produk</p>
                <div>
                    <form @submit.prevent="update()" enctype="multipart/form-data">
                        <div class="mb-14 flex flex-col max-w-5xl space-y-3 text-left">
                            <div class="form-group mt-4">
                                <p><label for=" judul_buku">Nama Produk</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" type="text" placeholder="Produk baru" v-model="produk.nama_produk" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="sinopsis">Harga</label></p>
                                <p><input rows="5" class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="Harga Produk" v-model="produk.harga" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">ID Ukuran</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" v-model="produk.ukuran" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">ID Kategori</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" v-model="produk.kategori" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="gambar">Gambar</label></p>
                                <img :src="produk.previewimage" v-if="produk.previewimage"/>
                                <p><input class="w-full mx-auto outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500  h-9" type="file" v-on:change="image" accept=".jpeg,.jpg,.png"></p>
                            </div>
                            <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" type="submit">Tambah Produk</button>
                        </div>
                        
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
import NavbarSamping from '@/components/NavbarSamping.vue';
import axios from 'axios';
import {reactive, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default {
    setup() {
        let produk = reactive( {
            nama_produk: '',
            harga: '',
            ukuran: '',
            kategori: '',
            gambar: '',
            previewimage: '',
            urlimage:'http://127.0.0.1:8000/storage/images/'
        });

        const router = useRouter();
        const route = useRoute();
        const token = localStorage.getItem('access_token');

        onMounted(() => {
            if(!token){
                router.push({name: 'login'});
            }
            else{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                try{
                    console.log(route.params.id);
                    console.log(produk);
                    axios.get('http://127.0.0.1:8000/api/produk/' + route.params.id)
                        .then((result) => {
                            produk.nama_produk = result.data.data.nama_produk;
                            produk.harga = result.data.data.harga;
                            produk.ukuran = result.data.data.id_ukuran;
                            produk.kategori = result.data.data.id_kategori;
                            produk.gambar = result.data.data.gambar;
                            console.log(produk.gambar);
                            produk.previewimage = produk.urlimage + result.data.data.gambar;
                            console.log(produk.previewimage);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                catch(error){
                    console.log(error);
                }
            }

        });

        function image(e){
            const file = e.target.files[0];
            produk.gambar = file;
            produk.previewimage = URL.createObjectURL(e.target.files[0]);
        }

        function update(){
            axios.post('http://127.0.0.1:8000/api/produk/update/' + route.params.id,
            produk
            )
            .then((result) => {
                console.log(result.data);
                router.push({name: 'ShowProduk'});
            })
            .catch((error) => {
                console.log(error);
            });

        }

        return {
            produk,
            update,
            router,
            route,
            image
        }
    },
    components:{
        NavbarSamping
    }
}
</script>