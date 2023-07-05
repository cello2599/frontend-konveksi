<template>
    <div>
        <NavbarSamping/> 
    </div>
    <div class=" create w-[30rem] h-[50rem] p-6 ml-60 hover:drop-shadow-lg rounded-md border-blue-800 border mb-30 text-center">
                <div class="mt-1 ">
                <p class="text-center text-xl font-medium m-auto"> Tambah Produk</p>
                <div>
                    <form @submit.prevent="create" enctype="multipart/form-data">
                        <div class="mb-14 flex flex-col max-w-5xl space-y-3 text-left">
                            <div class="form-group mt-4">
                                <p><label for=" judul_buku">Nama Produk</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" type="text" placeholder="Produk baru" v-model="nama_produk" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="sinopsis">Harga</label></p>
                                <p><input rows="5" class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="Harga Produk" v-model="harga" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">ID Ukuran</label></p>
                                <select v-model="id_ukuran" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled value="">Pilih Ukuran</option>
                                        <option v-for="(ukuran, index) in ukurans" :value="ukuran.id_ukuran" :key="index">
                                            {{ ukuran.id_ukuran }} - {{ ukuran.ukuran }}
                                        </option>
                                 </select>
                                <span class="text-red-500" v-if="errors && errors.id_ukuran">Pilihan : {{ id_ukuran }}</span>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">ID Kategori</label></p>
                                <select v-model="id_kategori" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled value="">Pilih Kategori</option>
                                        <option v-for="(kategori, index) in kategoris" :value="kategori.id_kategori" :key="index">
                                            {{ kategori.id_kategori }} - {{ kategori.kategori_produk }}
                                        </option>
                                 </select>
                            </div>

                            <div class="form-group">
                                <p><label for="gambar">Gambar</label></p>
                                <img :src="previewimage" v-if="previewimage"/>
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
import { ref, onMounted } from 'vue'
import axios from 'axios';

export default {
    data() {
        return {
            nama_produk: '',
            harga: '',
            id_ukuran: '',
            id_kategori: '',
            gambar: null,
            previewimage: '',
            errors: {},
        }
    },
    setup(){
        const ukurans = ref([]);
        const kategoris = ref([]);
        onMounted(async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/ukuran');
            ukurans.value = response.data;
            
            const response2 = await axios.get('http://127.0.0.1:8000/api/kategori');
            kategoris.value = response2.data;
            
        });

        return {
            ukurans,
            kategoris,
        };
    },
    methods :{
        create() {
            const token = localStorage.getItem('access_token');
            console.log(token);
            console.log(this.gambar);
            if(token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            try{
                        const formData = new FormData();
                        formData.append('file', this.gambar);
                        formData.append('nama_produk', this.nama_produk);
                        formData.append('harga', this.harga);
                        formData.append('id_ukuran', this.id_ukuran);
                        formData.append('id_kategori', this.id_kategori);
                            axios.post('http://127.0.0.1:8000/api/produk', formData)
                                .then((response) => {
                                    console.log(response);
                                    this.$router.push({name: 'ShowProduk'});
                                })
                                .catch((error) => {
                                console.log(error);
                            });
                        }
            catch(error){
                        console.log(error);
                    }
                }
            else {
                console.log('Token Tidak Ada');
                }
            },
    image(e) {
            const namagambar = e.target.files[0];
            this.gambar = namagambar;
            this.previewimage = URL.createObjectURL(e.target.files[0]);
        },
    },
    components:{
        NavbarSamping
    }
}
</script>

<style scoped>
.create{
    
    margin:auto;
    margin-bottom: 50px;
}
</style>