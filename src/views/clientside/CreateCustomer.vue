<template>
    <div>
        <NavbarSamping/>
    </div>
    <div class=" create w-[30rem] h-[50rem] p-6 ml-60 hover:drop-shadow-lg rounded-md border-blue-800 border mb-30 text-center">
                <div class="mt-1 ">
                <p class="text-center text-xl font-medium m-auto"> Tambah Customer</p>
                <div>
                    <form @submit.prevent="create" enctype="multipart/form-data">
                        <div class="mb-14 flex flex-col max-w-5xl space-y-3 text-left">
                            <div class="form-group mt-4">
                                <p><label>Nama Customer</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" type="text" placeholder="Nama Customer" v-model="nama" required></p>
                            </div>

                            <div class="form-group">
                                <p><label>No. Telp</label></p>
                                <p><input rows="5" class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="No. Telp Customer" v-model="no_telp" required></p>
                            </div>

                            <div class="form-group mt-4">
                                <p><label>Alamat</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" type="text" placeholder="Alamat Customer" v-model="alamat" required></p>
                            </div>

                            <div class="form-group mt-4">
                                <p><label>Email</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" type="text" placeholder="Email Customer" v-model="email" required></p>
                            </div>

                            
                            <button class="border -mt-6 bg-green-500 focus:border-black h-10 rounded-lg text-white font-semibold" type="submit">Tambah Customer</button>
                        </div>
                        
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
import NavbarSamping from '@/components/NavbarSamping.vue';

import axios from 'axios'; 

export default {
    data() {
        return {
            nama: '',
            no_telp: '',
            alamat: '',
            email: '',
            errors: {},
        }
    },
    
    methods :{
        create() {
            const token = localStorage.getItem('access_token');
            // console.log(token);
            // console.log(this.gambar);
            if(token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            try{
                        
                            axios.post('http://127.0.0.1:8000/api/customer', 
                            {
                                nama: this.nama,
                                no_telp: this.no_telp,
                                alamat: this.alamat,
                                email: this.email,
                            }
                                )
                                .then((response) => {
                                    console.log(response);
                                    this.$router.push({name: 'ShowCustomer'});
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