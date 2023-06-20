<template>
    <div>
        <NavbarSamping />
	<div class="container p-2 mx-auto sm:p-4 dark:text-gray-100" v-if="transaksi">
        <div class="transaksi block rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div class="border-b-2 border-neutral-300 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 hurufbesar">
                    {{ transaksi.admin }}
                </div>
                <div class="p-6"> 
                    <div class="row">
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 kolom">Nama</h3>
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 kolom">: {{ transaksi.nama_customer }}</h3>
                        
                    </div>

                    <div class="row">
                        
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 kolom">Alamat</h3>
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 kolom">: {{ transaksi.alamat_customer }}</h3>
                        
                    </div>

                    <div class="row">
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 kolom">No Telp</h3>
                        <h3 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 kolom">: {{ transaksi.no_telp }}</h3>
                    </div>
                    
                </div>
                <div class="border-t-2 border-neutral-300 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                    Tanggal Transaksi :  {{ transaksi.tanggal }}
                </div>
                
                
            </div>
            <div class="align-middle inline-block w-9/12 shadow overflow-hidden bg-white shadow-dashboard px-3 pt-3 rounded-bl-lg rounded-br-lg transaksi">

        <div>

        </div>
			<h2 class="mb-4 text-2xl font-semibold leading-tight text-right">Total Transaksi : Rp. {{ formatrupiah(transaksi.totalTransaksi) }}</h2>
            <table class="w-full" style="margin-top: 2rem;">
				<thead class="dark:bg-gray-700">
					<tr class="text-center">
						<th class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">Nama Produk</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">Harga</th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider"> </th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">Jumlah</th>
						<th class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">Total Harga</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900" v-for="(produk , indexTransaksi) in transaksi.produks" :key="indexTransaksi">
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
							<p>{{produk.nama_produk}}</p>
						</td>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
							<p>{{ formatrupiah(produk.harga) }}</p>
						</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
							<p>x</p>
						</td>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
							<p>{{ produk.jumlah }}</p>
						</td>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
							<p>Rp. {{ formatrupiah(produk.totalHarga) }}</p>
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
        

        onMounted( async() => {
            if(token){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            //get data from endpoint api
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/transaksi/' + route.params.id_transaksi);
                transaksi.value = response.data.data;
                // console.log("Token Found", transaksi.value);
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
    methods :{
                formatrupiah(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."
            )
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
    border:3px ridge #c2c2c2;
    box-sizing: content-box;
    margin-top: 15px; 
    margin-right: auto;
}

.hurufbesar {
    text-transform: uppercase;
    font-weight: 600;
    color: #3b82f6;
}

.kolom {
  float: left;
  width: 30%;
  padding: 10px;
  height: 50px;
  color: none;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

</style>