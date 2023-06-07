<template>
    <div>
        <NavbarSamping />
	<div class="transaksi container p-2 mx-auto sm:p-4 dark:text-gray-100" v-if="transaksi">
		<h2 class="mb-4 text-2xl font-semibold leading-tight">Nama</h2>
        <p> {{ transaksi.nama_customer }}</p>
        <h2 class="mb-4 text-2xl font-semibold leading-tight">Alamat</h2>
        <p> {{ transaksi.alamat_customer }}</p>
        <h2 class="mb-4 text-2xl font-semibold leading-tight">Tanggal Transaksi</h2>
        <p> {{ transaksi.tanggal }}</p>
        <h2 class="mb-4 text-2xl font-semibold leading-tight">Admin</h2>
        <p> {{ transaksi.admin }}</p>
        <h2 class="mb-4 text-2xl font-semibold leading-tight">Total Transaksi : {{ transaksi.totalTransaksi }}</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full text-xs">
				<thead class="dark:bg-gray-700">
					<tr class="text-left">
						<th class="p-3">Nama Produk</th>
						<th class="p-3">Harga</th>
						<th class="p-3">Jumlah</th>
						<th class="p-3 text-right">Total Harga</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900" v-for="(produk , indexTransaksi) in transaksi.produks" :key="indexTransaksi">
						<td class="p-3">
							<p>{{produk.nama_produk}}</p>
						</td>
						<td class="p-3">
							<p>{{ produk.harga }}</p>
						</td>
						<td class="p-3">
							<p>{{ produk.jumlah }}</p>
						</td>
						<td class="p-3 text-right">
							<p>{{produk.totalHarga}}</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
    <div v-else>
      <p>Loading...</p>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import NavbarSamping from '@/components/NavbarSamping.vue'
import { useRoute } from 'vue-router'

export default {
    // data(){
    //     return {
    //         transaksi: null
    //     }
    // },
    setup(){
        const transaksi = ref([]);
        const route = useRoute();
        //get token
        const token = localStorage.getItem('access_token');
        
        //image path
        //const imagepath = ref('src/assets/images/');

        onMounted( async() => {
            if(token){
                console.log(token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            //get data from endpoint api
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/transaksi/' + route.params.id_transaksi);
                transaksi.value = response.data.data;
                console.log("Token Found", transaksi.value);
            }catch(err){
                console.log(err);
            }
            }else{
                console.log("Token Not Found");
            }
        });

        return {
            transaksi
        }
    },
    components: {
        NavbarSamping
    }
}

</script>

<style scoped>
.transaksi {
    margin-left: 17rem;
}
</style>