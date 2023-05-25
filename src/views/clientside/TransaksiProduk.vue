<template>
    <div>
        <NavbarSamping/>
    </div>
   
<!-- component -->
<div class="transaksi text-center mb-4 -mt-3 table-auto p-10">
            <table class="table-fixed text-center border-collapse w-[80%] mx-auto">
                <thead>
                  <tr>
                    <th class="border-2 border-black w-16">Genre</th>
                    <th class="border-2 border-black w-36">Judul Buku</th>
                    <th class="border-2 border-black w-36">Judul Buku</th>
                    <th class="border-2 border-black w-36 ">Sinopsis</th>
                    <th class="border-2 border-black w-20">Gambar</th>
                    <th class="border-2 border-black w-16">Aksi</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td class="border-2 border-black">nama </td>
                    <td class="border-2 border-black">alamat</td>
                    <td class="border-2 border-black max-w-md text-left">nohp</td>
                    <td class="border-2 border-black max-w-md text-left">nohp</td>
                    <td class="border-2 border-black">
                        <img src="" alt="" class="w-20 h-20 mx-auto">
                    </td>
                    <td class="border-2 border-black"> 
                        <a href=""><i class="fa-solid fa-pen bg-green-600 text-white py-2 px-4 rounded-lg mt-2"> </i> </a>
                        <form action="" >
                            
                            
                            <button type="submit" class="bg-red-500 text-white py-2 px-4 rounded-lg inline-table mt-2 ">
                            <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </form>
                    </td>
                  </tr>
                </tbody>
                
              </table>
        </div>
</template>

<script>
import NavbarSamping from '@/components/NavbarSamping.vue'

export default {
  name: 'App',
components: {
        NavbarSamping
    }
}

</script>
<style>
.transaksi {
    margin-left: 10rem;
}
</style>
