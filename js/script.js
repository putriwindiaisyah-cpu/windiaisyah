let keranjang = [];

// FORMAT HARGA RUPIAH
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// MENAMBAHKAN PRODUK KE KERANJANG
function tambahKeranjang(nama, harga) {
    let produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();

    alert(nama + " berhasil ditambahkan ke keranjang!");
}

// MENAMPILKAN ISI KERANJANG
function tampilkanKeranjang() {
    let daftar = document.getElementById("daftarKeranjang");
    let total = 0;

    if (keranjang.length === 0) {
        daftar.innerHTML = `
            <div class="keranjang-kosong">
                <span>🛍️</span>
                <h3>Keranjang Masih Kosong</h3>
                <p>Yuk, pilih produk favoritmu terlebih dahulu!</p>
                <a href="#produk">Lihat Produk</a>
            </div>
        `;

        document.getElementById("ringkasanBelanja").style.display = "none";

    } else {
        daftar.innerHTML = "";

        keranjang.forEach((item, index) => {
            let subtotal = item.harga * item.jumlah;
            total += subtotal;

            daftar.innerHTML += `
                <div class="item-keranjang">
                    <div>
                        <h3>${item.nama}</h3>
                        <p>${formatRupiah(item.harga)}</p>

                        <div class="kontrol-jumlah">
                            <button onclick="ubahJumlah(${index}, -1)">−</button>
                            <strong>${item.jumlah}</strong>
                            <button onclick="ubahJumlah(${index}, 1)">+</button>
                        </div>
                    </div>

                    <div>
                        <strong>${formatRupiah(subtotal)}</strong>
                        <br><br>
                        <button class="hapus-produk"
                            onclick="hapusProduk(${index})">
                            Hapus
                        </button>
                    </div>
                </div>
            `;
        });

        document.getElementById("ringkasanBelanja").style.display = "block";
    }

    document.getElementById("totalBelanja").innerText = formatRupiah(total);
}

// MENAMBAH ATAU MENGURANGI JUMLAH PRODUK
function ubahJumlah(index, perubahan) {
    keranjang[index].jumlah += perubahan;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

// MENGHAPUS PRODUK
function hapusProduk(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

// MENGHITUNG TOTAL BELANJA
function hitungTotal() {
    return keranjang.reduce((total, item) => {
        return total + (item.harga * item.jumlah);
    }, 0);
}

// MEMBUKA HALAMAN CHECKOUT
function bukaCheckout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    document.getElementById("checkout").style.display = "block";

    document.getElementById("totalCheckout").innerText =
        formatRupiah(hitungTotal());

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
}

// KEMBALI KE KERANJANG
function kembaliKeranjang() {
    document.getElementById("checkout").style.display = "none";

    document.getElementById("keranjang").scrollIntoView({
        behavior: "smooth"
    });
}

// KONFIRMASI PESANAN
document.getElementById("formCheckout").addEventListener("submit", function(event) {
    event.preventDefault();

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let nama = document.getElementById("namaPembeli").value;
    let telepon = document.getElementById("teleponPembeli").value;
    let alamat = document.getElementById("alamatPembeli").value;
    let pembayaran = document.getElementById("metodePembayaran").value;

    let total = hitungTotal();

    let nomor = "WS-" + Date.now().toString().slice(-6);

    let detail = `
        <h3>Rincian Pesanan</h3>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Telepon:</strong> ${telepon}</p>
        <p><strong>Alamat:</strong> ${alamat}</p>
        <p><strong>Pembayaran:</strong> ${pembayaran}</p>
        <hr>
        <h3>Produk yang Dipesan</h3>
    `;

    keranjang.forEach(item => {
        detail += `
            <p>${item.nama} (${item.jumlah} buah)</p>
            <p>${formatRupiah(item.harga * item.jumlah)}</p>
        `;
    });

    detail += `
        <hr>
        <h3>Total: ${formatRupiah(total)}</h3>
        <p><strong>Status:</strong> Pesanan berhasil dibuat (simulasi).</p>
    `;

    document.getElementById("nomorPesanan").innerText = nomor;
    document.getElementById("detailPesanan").innerHTML = detail;

    document.getElementById("checkout").style.display = "none";
    document.getElementById("keranjang").style.display = "none";
    document.getElementById("buktiPesanan").style.display = "block";

    document.getElementById("buktiPesanan").scrollIntoView({
        behavior: "smooth"
    });

    keranjang = [];
    tampilkanKeranjang();
});

// KEMBALI KE BERANDA
function selesaiBelanja() {
    document.getElementById("buktiPesanan").style.display = "none";
    document.getElementById("keranjang").style.display = "block";

    document.getElementById("formCheckout").reset();

    window.location.href = "index.html";
}

// PESAN WEBSITE BERHASIL DIMUAT
console.log("Website WindiStore berhasil dimuat!");


// ==========================================
// TAMBAHAN KHUSUS UNTUK TOMBOL "BELI SEKARANG"
// ==========================================
function beliSekarang(nama, harga) {
    let produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
    bukaCheckout();
}