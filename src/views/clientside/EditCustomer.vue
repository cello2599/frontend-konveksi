<template>
    <div>
        <NavbarSamping/>
    </div>

    <div class="edit w-[30rem] h-[53rem] p-6 ml-60 hover:drop-shadow-lg rounded-md border-purple-800 border mb-5 text-center">
                <div class="mt-1 ">
                <p class="text-center text-xl font-medium m-auto">Edit Customer</p>
                <div>
                    <form @submit.prevent="update()" enctype="multipart/form-data">
                        <div class="mb-14 flex flex-col max-w-5xl space-y-3 text-left">
                            <div class="form-group mt-4">
                                <p><label for=" judul_buku">Nama Customer</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" type="text" placeholder="Customer Baru" v-model="customer.nama" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="sinopsis">Alamat</label></p>
                                <p><input rows="5" class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="Masukkan Alamat" v-model="customer.alamat" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">No Telp</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="Masukkan No Telp" v-model="customer.no_telp" required></p>
                            </div>

                            <div class="form-group">
                                <p><label for="genre">Email</label></p>
                                <p><input class="w-full pl-3 border outline-none text-gray-500 focus:text-gray-700 duration-300 transition ease-in-out focus:border-gray-500 rounded-md h-9" placeholder="Masukkan Email" v-model="customer.email" required></p>
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
import {reactive, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default {
    
    setup() {
        let customer = reactive( {
            nama: '',
            alamat: '',
            no_telp: '',
            email: ''
            
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
                    axios.get('http://127.0.0.1:8000/api/customer/' + route.params.id_customer)
                        .then((result) => {
                            customer.nama = result.data.data.nama;
                            customer.alamat = result.data.data.alamat;
                            customer.no_telp = result.data.data.no_telp;
                            customer.email = result.data.data.email;
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

        function update(){
            if(!token){
                router.push({name: 'login'});
            }
            else{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                console.log(customer);
                try{
                    
                        axios.post('http://127.0.0.1:8000/api/customer/update/' + route.params.id_customer,{
                            nama: customer.nama,
                            alamat: customer.alamat,
                            no_telp: customer.no_telp,
                            email: customer.email
                        })
                        .then((result) => {
                            console.log(result.data);
                            router.push({ name: 'ShowCustomer' });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                catch(error){
                    console.log(error);
                }
            }

        }

        return {
            customer,
            update,
            router,
            route
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