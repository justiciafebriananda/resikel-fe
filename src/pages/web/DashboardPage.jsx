import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "@iconscout/unicons/css/line.css";
// import Navbar from "@/components/Navbar/Navbar_Admin";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Get Data from database
  const [tb_area_transaksi_wilayah, settb_area_transaksi_wilayah] = useState(
    []
  );
  const [users, setUsers] = useState([]);
  const [totalusers, setTotalusers] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tb_area_transaksi_wilayah")
      .then((response) => settb_area_transaksi_wilayah(response.data))
      .catch((error) =>
        console.error("Error fetching tb_area_transaksi_wilayah:", error)
      );
    // Fetch data untuk users
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
    axios
      .get("http://localhost:5000/users/count")
      .then((response) => {
        setTotalusers(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching total count:", error);
      });
  }, []);

  // Data untuk Bar Chart
  const dataBar = {
    labels: users.map((users) => users.nama), // Label untuk sumbu X
    datasets: [
      {
        label: ".", // Label dataset
        data: users.map((users) => users.point), // Data untuk Bar Chart
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna latar belakang bar
        borderColor: "rgba(75, 192, 192, 1)", // Warna border bar
        borderWidth: 1, // Ketebalan border bar
      },
    ],
  };

  // Opsi konfigurasi untuk Bar Chart
  const optionsBar = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Point", // Judul grafik
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1, // Menyusun ulang agar ukuran chart lebih kecil
  };

  // Data untuk Doughnut Chart
  const dataDoughnut = {
    labels: ["Direct", "Organic", "Paid", "Social"], // Label untuk Doughnut chart
    datasets: [
      {
        data: [3200, 1800, 280, 2000], // Data untuk Doughnut Chart
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0", "#4BD1A1"], // Warna untuk setiap bagian
        hoverOffset: 4,
      },
    ],
  };

  // Opsi konfigurasi untuk Doughnut Chart
  const optionsDoughnut = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Pengunjung Website", // Judul grafik Doughnut
      },
      legend: {
        position: "bottom", // Pindahkan legenda ke bawah chart
        labels: {
          boxWidth: 20, // Ukuran kotak warna di legenda
          padding: 15, // Padding antar item legenda
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1, // Ukuran Doughnut chart lebih kecil
  };

  return (
    <>
      {/* <Navbar /> */}
      <div>
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-3 items-start">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-blue-200 rounded-lg">
              <i className="uil uil-analytics text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Uang Hari Ini
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">2000</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-orange-500 rounded-lg">
              <i className="uil uil-user-circle text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Pelanggan
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">
                {" "}
                {totalusers} Users
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-red-500 rounded-lg">
              <i className="uil uil-user-plus text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Pengepul
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">1800</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-green-500 rounded-lg">
              <i className="uil uil-bed text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Pick Up
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">280</p>
            </div>
          </div>
        </div>

        {/* Grid untuk menampilkan Bar Chart dan Doughnut Chart */}
        <div className="grid grid-cols-6 gap-6 mb-3">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 col-span-4">
            <Bar data={dataBar} options={optionsBar} height={200} />
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 col-span-2">
            <Doughnut
              data={dataDoughnut}
              options={optionsDoughnut}
              height={200}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 mb-3">
          {/* Tabel Utama (4 kolom) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 col-span-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Area Transaksi Sampah
            </h2>
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nama Wilayah
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Jumlah User
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Jumlah Transaksi
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Total Sampah /kg
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Total Reward
                  </th>
                </tr>
              </thead>
              <tbody>
                {tb_area_transaksi_wilayah.map((tb_area_transaksi_wilayah) => (
                  <tr key={tb_area_transaksi_wilayah.id}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {tb_area_transaksi_wilayah.nama_wilayah}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {tb_area_transaksi_wilayah.jumlah_user}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {tb_area_transaksi_wilayah.jumlah_transaksi}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {tb_area_transaksi_wilayah.total_sampah}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {tb_area_transaksi_wilayah.total_reward.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Pesan dari Admin
            </h2>
            <div className="space-y-4">
              {/* Item Pesan */}
              <div className="flex items-center">
                {/* Foto Profil */}
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="uil uil-user text-xl text-white"></i>
                </div>
                {/* Informasi Pesan */}
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Roselle Ehrman
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hai, kak ini gima...
                  </div>
                </div>
                {/* Ikon Pesan */}
                <div>
                  <i className="uil uil-envelope text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>

              {/* Tambahkan item pesan lain di sini */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="uil uil-user text-xl text-white"></i>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Jone Smith
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hai kak izin tanya
                  </div>
                </div>
                <div>
                  <i className="uil uil-envelope text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="uil uil-user text-xl text-white"></i>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Ahzelan
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hai kak mau nanya...
                  </div>
                </div>
                <div>
                  <i className="uil uil-envelope text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="uil uil-user text-xl text-white"></i>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Jone Smith
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hai kak izin tanya
                  </div>
                </div>
                <div>
                  <i className="uil uil-envelope text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="uil uil-user text-xl text-white"></i>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Ahzelan
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hai kak mau nanya...
                  </div>
                </div>
                <div>
                  <i className="uil uil-envelope text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-3 items-start">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-orange-500 rounded-lg">
              <i className="uil uil-user-circle text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Reward Claimed
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">
                $230.220
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-red-500 rounded-lg">
              <i className="uil uil-user-plus text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Point Exchange
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">35k</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center">
            <div className="mr-4 p-3 bg-green-500 rounded-lg">
              <i className="uil uil-bed text-white text-4xl"></i>
            </div>
            <div>
              <p className="text-l font-bold text-gray-900 dark:text-gray-100">
                Sampah Hari ini
              </p>
              <p className="text-m text-gray-900 dark:text-gray-100">3500kg</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 mb-3">
          {/* Tabel Utama (4 kolom) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 col-span-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Permintaan Transaksi Sampah
            </h2>
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Nama
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Sampah
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Harga
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Poin
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Contoh Data */}
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center">
                    {/* Foto Profil */}
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="uil uil-user text-xl text-white"></i>
                    </div>
                    {/* Informasi Pesan */}
                    <div className="ml-4">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        Aldama 123
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Running Shoes
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">8000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$130</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$9500</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center">
                    {/* Foto Profil */}
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="uil uil-user text-xl text-white"></i>
                    </div>
                    {/* Informasi Pesan */}
                    <div className="ml-4">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        Aldama 123
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Running Shoes
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">8000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$130</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$9500</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center">
                    {/* Foto Profil */}
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="uil uil-user text-xl text-white"></i>
                    </div>
                    {/* Informasi Pesan */}
                    <div className="ml-4">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        Aldama 123
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Running Shoes
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">8000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$130</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$9500</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center">
                    {/* Foto Profil */}
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <i className="uil uil-user text-xl text-white"></i>
                    </div>
                    {/* Informasi Pesan */}
                    <div className="ml-4">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        Aldama 123
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Running Shoes
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">8000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$130</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">$9500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Jenis Sampah
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="mr-4 ml-4 p-3 bg-green-500 rounded-lg">
                    <i className="uil uil-bed text-white text-xl"></i>
                  </div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Plastik
                  </div>
                </div>
                <div>
                  <i className="uil uil-edit text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="mr-4 ml-4 p-3 bg-green-500 rounded-lg">
                    <i className="uil uil-bed text-white text-xl"></i>
                  </div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Botol Kaca
                  </div>
                </div>
                <div>
                  <i className="uil uil-edit text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="mr-4 ml-4 p-3 bg-green-500 rounded-lg">
                    <i className="uil uil-bed text-white text-xl"></i>
                  </div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Kertas
                  </div>
                </div>
                <div>
                  <i className="uil uil-edit text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <div className="mr-4 ml-4 p-3 bg-green-500 rounded-lg">
                    <i className="uil uil-bed text-white text-xl"></i>
                  </div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    Besi
                  </div>
                </div>
                <div>
                  <i className="uil uil-edit text-gray-400 dark:text-gray-500 text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
