// Fungsi untuk mendapatkan atau menyimpan tanggal target ke local storage
function getTargetDate() {
  const storedTargetDate = localStorage.getItem("targetDate");
  if (storedTargetDate) {
    // Jika ada tanggal target di local storage, gunakan itu
    return new Date(parseInt(storedTargetDate));
  } else {
    // Jika tidak ada, buat tanggal target baru (7 hari + 18 jam dari sekarang)
    const newTargetDate = new Date();
    newTargetDate.setDate(newTargetDate.getDate() + 7);    
    newTargetDate.setHours(newTargetDate.getHours() + 18); // Tambahkan 18 jam

    // Simpan tanggal target ke local storage sebagai timestamp (miliseconds)
    localStorage.setItem("targetDate", newTargetDate.getTime());
    return newTargetDate;
  }
}

// Dapatkan tanggal target dari local storage atau buat baru
const targetDate = getTargetDate();

// Fungsi untuk memperbarui hitungan mundur
function updateCountdown() {
  const now = new Date();
  const timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    // Jika waktu sudah habis, tampilkan pesan
    document.getElementById("countdown").innerHTML =
      "<h2>Hari Raya Telah Tiba! 🎉🎊</h2>";
    clearInterval(intervalId); // Hentikan interval
    localStorage.removeItem("targetDate"); // Hapus tanggal target dari local storage
    return;
  }

  // Hitung hari, jam, menit, dan detik
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update elemen HTML
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// Perbarui hitungan mundur setiap detik
const intervalId = setInterval(updateCountdown, 1000);

// Panggil fungsi pertama kali saat halaman dimuat
updateCountdown();