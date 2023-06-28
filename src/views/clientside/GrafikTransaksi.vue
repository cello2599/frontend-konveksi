<template>
    <div>
        <NavbarSamping/>
    </div>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1>Grafik Transaksi per bulan</h1>
                    <div class="card">
                        <div class="card-body">
                            <canvas id="line-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>

import { Chart, LinearScale, Title, LineController, LineElement, CategoryScale, PointElement } from 'chart.js';
import NavbarSamping from '@/components/NavbarSamping.vue'
import dayjs from 'dayjs';
import axios from 'axios';
import { ref, onMounted } from 'vue';

Chart.register(LinearScale, Title, LineController, LineElement, CategoryScale, PointElement);
  
  export default {
    setup(){
        const total_transaksi = ref([]);
        const jumTransaksi = ref([]);
        const lineChart = ref(null);
        
        const token = localStorage.getItem('access_token');

        const databulan = () => {
        const bulanArray = total_transaksi.value.map((total_transaksi) => {
            return dayjs(total_transaksi.tanggal, 'DD-MM-YYYY HH:mm:ss').format('MMM');
        });

        const bulanTransaksi = [...new Set(bulanArray)]; // Menghapus duplikat bulan

        for(let i=0; i<bulanTransaksi.length; i++){
            let count = 0;
            for(let j=0; j<total_transaksi.value.length; j++){
                if(bulanTransaksi[i] == dayjs(total_transaksi.value[j].tanggal, 'DD-MM-YYYY HH:mm:ss').format('MMM')){
                    count += total_transaksi.value[j].totalTransaksi;
                }
            }
            jumTransaksi.value.push(count);
        }

        console.log(jumTransaksi.value);
        initializeLineChart(bulanTransaksi, jumTransaksi.value);
        };
        
        const initializeLineChart = (bulanTransaksi, jumTransaksi) => {
        const data = {
            labels: bulanTransaksi,
            datasets: [
            {
                label: 'Total Transaksi per Bulan',
                data: jumTransaksi,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            },
            ],
        };

      const options = {
        responsive: true,
        scales: {
          y: {
            // type: 'linear',
            beginAtZero: true,
          },
          x: {
            type: 'category',
            grid: {
              display: false,
            },
            ticks: {
                 display: true, // Aktifkan tampilan label pada sumbu x
             },
          },
        },
      };

      const config = {
        type: 'line',
        data: data,
        options: options,
      };

      lineChart.value = new Chart(document.getElementById('line-chart'), config);
    //   this.lineChart.update();
    };

        onMounted(async () => {
            if(token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                try {
                  const response = await axios.get('http://127.0.0.1:8000/api/transaksi/grafik');
                  total_transaksi.value = response.data.data;
                //   console.log(total_transaksi.value);
                  databulan();
                }
                catch(error) {
                    console.log(error);
                }
            }
        });
        return {
            total_transaksi,
            lineChart,
        };
  },
    
    components: {
        NavbarSamping
    }
  }
  </script>

 <style scoped>
    .container {
        margin-left: 19rem;
    }


</style>
  