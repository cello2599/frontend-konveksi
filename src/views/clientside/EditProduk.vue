<template>
    <div>
        <NavbarSamping/> 
    </div>
    <div class="edit w-[30rem] h-fixed p-6 ml-60 hover:drop-shadow-lg rounded-md border-purple-800 border mb-5 text-center">
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
                                <select v-model="produk.id_ukuran" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled value="">Pilih Ukuran</option>
                                        <option v-for="(ukuran, index) in ukurans" :value="ukuran.id_ukuran" :key="index">
                                            {{ ukuran.id_ukuran }} - {{ ukuran.ukuran }}
                                        </option>
                                 </select>
                                <span class="text-red-500" v-if="errors && errors.id_ukuran">Pilihan : {{ id_ukuran }}</span>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">ID Kategori</label></p>
                                <select v-model="produk.id_kategori" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled value="">Pilih Kategori</option>
                                        <option v-for="(kategori, index) in kategoris" :value="kategori.id_kategori" :key="index">
                                            {{ kategori.id_kategori }} - {{ kategori.kategori_produk }}
                                        </option>
                                 </select>
                            </div>

                            <div class="form-group">
                                <p><label for="gambar">Gambar</label></p>
                                <img :src="produk.previewimage" v-if="produk.previewimage"/>
                                <p><input class="w-full mx-auto outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500  h-9" type="file" v-on:change="image" accept=".jpeg,.jpg,.png"></p>
                            </div>
                            <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" type="submit">Edit Produk</button>
                        </div>
                        
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
import NavbarSamping from '@/components/NavbarSamping.vue';
import axios from 'axios';
import {reactive, onMounted, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default {
    setup() {
        let produk = reactive( {
            nama_produk: '',
            harga: '',
            id_ukuran: '',
            id_kategori: '',
            gambar: '',
            previewimage: '',
            isGambar: true,
        });

        const router = useRouter();
        const urlimage = 'http://127.0.0.1:8000/storage/images/'
        const route = useRoute();
        const token = localStorage.getItem('access_token');
        const ukurans = ref([]);
        const kategoris = ref([]);


        onMounted(async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/ukuran');
            ukurans.value = response.data;
            
            const response2 = await axios.get('http://127.0.0.1:8000/api/kategori');
            kategoris.value = response2.data;

            
        });

        onMounted(() => {
            if(!token){
                router.push({name: 'login'});
            }
            else{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                try{
                    axios.get('http://127.0.0.1:8000/api/produk/' + route.params.id)
                        .then((result) => {
                            produk.nama_produk = result.data.data.nama_produk;
                            produk.harga = result.data.data.harga;
                            produk.id_ukuran = result.data.data.id_ukuran;
                            produk.id_kategori = result.data.data.id_kategori;
                            produk.gambar = result.data.data.gambar;
                            produk.previewimage = urlimage + result.data.data.gambar;
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
            produk.isGambar = false;
        }

        function update(){
            if(!token){
                router.push({name: 'login'});
            }
            else{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                // console.log(image);
                try{    
                        
                        if (produk.isGambar){ // Periksa apakah ada gambar yang dipilih
                            console.log('tidak ada gambar yang dipilih');
                        axios.post('http://127.0.0.1:8000/api/produk/update/' + route.params.id, {
                            nama_produk: produk.nama_produk,
                            harga: produk.harga,
                            id_ukuran: produk.id_ukuran,
                            id_kategori: produk.id_kategori
                        })
                        .then((result) => {
                            console.log(result.data);
                            router.push({ name: 'ShowProduk' });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                        }
                        else{
                        const formData = new FormData();
                        formData.append('file', produk.gambar);
                        formData.append('nama_produk', produk.nama_produk);
                        formData.append('harga', produk.harga);
                        formData.append('id_ukuran', produk.id_ukuran);
                        formData.append('id_kategori', produk.id_kategori);
                        axios.post('http://127.0.0.1:8000/api/produk/update/' + route.params.id,formData)
                        .then((result) => {
                            console.log(result.data);
                            router.push({ name: 'ShowProduk' });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                }
                catch(error){
                    console.log(error);
                }
            }

        }

        return {
            produk,
            update,
            router,
            route,
            image,
            ukurans,
            kategoris
        }
    },
    components:{
        NavbarSamping
    }
}
</script>

<style scoped>
.edit{
    
    margin:auto;
    margin-bottom: 10px;
}
</style>