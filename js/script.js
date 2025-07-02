document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const productDetailSection = document.getElementById('product-detail-view');
    const backToProductsBtn = document.querySelector('.back-to-products-btn');
    const viewDetailBtns = document.querySelectorAll('.view-detail-btn');
    const buyNowBtn = document.querySelector('.add-to-cart-btn');
    const starsistVideo = document.getElementById('starsistVideo'); // NEW: Get the video element

    const discountPercentage = 0.10; // Diskon 10%

    // Fungsi untuk memformat harga ke Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    }

    // Data produk (harga asli sekarang berupa angka)
    const productsData = {
        'sekar-jagad': {
            image: 'img/batik 1.jpg',
            title: 'Blus Batik Sekar Jagad',
            originalPriceNum: 400000,
            description: `
                "Blus Batik Sekar Jagad" adalah perwujudan keindahan klasik dengan sentuhan modern.
                Motif Sekar Jagad, yang berarti 'bunga dunia' atau 'peta dunia', melambangkan keanekaragaman dan keindahan alam semesta.
                Setiap detail pada blus ini dibuat dengan pewarnaan canting tradisional dan bahan katun primissima pilihan,
                menjamin kenyamanan maksimal dan keawetan warna. Desainnya yang elegan dan potongan yang modern
                sangat cocok untuk gaya semi-formal hingga kasual, membuat Anda tampil menawan di setiap kesempatan.
                Kenakan warisan budaya yang tak lekang oleh waktu dengan bangga!
                <br><br>
                <strong>Bahan:</strong> Katun Primissima<br>
                <strong>Teknik:</strong> Batik Canting Tulis<br>
                <strong>Ukuran Tersedia:</strong> S, M, L, XL<br>
                <strong>Perawatan:</strong> Cuci tangan dengan sabun lembut, jemur di tempat teduh.
            `
        },
        'sekar-kencana': {
            image: 'img/batik 2.jpg',
            title: 'Blus Batik Sekar Kencana',
            originalPriceNum: 450000,
            description: `
                Rasakan pesona feminin dengan "Blus Batik Sekar Kencana".
                Motif Sekar Kencana, yang berarti 'bunga emas', memancarkan aura kemewahan dan keanggunan.
                Blus ini menampilkan kombinasi warna yang lembut namun berani, dicetak dengan teknik batik cap berkualitas tinggi
                pada kain rayon premium yang jatuh dan adem di kulit. Potongan asimetris dan detail kerah unik menambah kesan modern
                tanpa menghilangkan esensi tradisionalnya. Ideal untuk acara kantor, pertemuan sosial, atau bahkan sebagai busana
                sehari-hari yang stylish. Tambahkan sentuhan kemilau emas pada penampilan Anda!
                <br><br>
                <strong>Bahan:</strong> Rayon Premium<br>
                <strong>Teknik:</strong> Batik Cap<br>
                <strong>Ukuran Tersedia:</strong> S, M, L, XL<br>
                <strong>Perawatan:</strong> Cuci mesin dengan air dingin, setrika suhu sedang.
            `
        },
        'mega-mendung': {
            image: 'img/batik 3.jpg',
            title: 'Tunik Batik Mega Mendung',
            originalPriceNum: 480000,
            description: `
                "Tunik Batik Mega Mendung" adalah pernyataan gaya yang kuat, terinspirasi dari keindahan awan mendung Cirebon yang legendaris.
                Motif Mega Mendung yang ikonik ini melambangkan ketenangan, kesabaran, dan harapan. Tunik longgar ini dibuat dari bahan
                katun supernova yang ringan dan tidak menerawang, sangat nyaman dipakai seharian penuh. Potongannya yang modis dengan
                detail belahan samping memberikan siluet yang modern dan versatile, cocok dipadukan dengan celana panjang atau legging.
                Hadirkan nuansa seni tinggi dan filosofi mendalam dalam setiap langkah Anda.
                <br><br>
                <strong>Bahan:</strong> Katun Supernova<br>
                <strong>Teknik:</strong> Batik Print<br>
                <strong>Ukuran Tersedia:</strong> All Size (fit to XL)<br>
                <strong>Perawatan:</strong> Cuci terpisah, hindari pemutih, setrika suhu rendah.
            `
        },
        'parang-rusak': {
            image: 'img/batik 4.jpg',
            title: 'Kemeja Batik Parang Rusak',
            originalPriceNum: 520000,
            description: `
                "Kemeja Batik Parang Rusak" menghadirkan keanggunan dan kekuatan motif klasik Parang Rusak.
                Motif ini, yang melambangkan kekuasaan dan kebesaran, telah menjadi simbol keberanian dan pantang menyerah.
                Kemeja ini dibuat dari bahan katun premium yang lembut dan nyaman, menjadikannya pilihan sempurna
                untuk acara formal maupun semi-formal. Desain potongan yang modern dan jahitan rapi memastikan
                tampilan yang berkelas dan profesional. Padukan dengan celana bahan atau chino untuk kesan yang tak terlupakan.
                Kenakan kekuatan warisan Jawa dengan bangga!
                <br><br>
                <strong>Bahan:</strong> Katun Premium<br>
                <strong>Teknik:</strong> Batik Tulis Halus<br>
                <strong>Ukuran Tersedia:</strong> M, L, XL, XXL<br>
                <strong>Perawatan:</strong> Cuci kering atau cuci tangan dengan deterjen khusus batik.
            `
        },
        'truntum': {
            image: 'img/batik 5.jpg',
            title: 'Dress Batik Truntum',
            originalPriceNum: 550000,
            description: `
                "Dress Batik Truntum" memancarkan keindahan cinta dan kesetiaan abadi.
                Motif Truntum, yang berarti 'tumbuh kembali' atau 'bersemi', melambangkan cinta yang selalu bersemi
                dan tidak pernah padam. Dress ini didesain dengan potongan elegan yang jatuh sempurna di tubuh,
                terbuat dari kain sutra blend yang mewah dan nyaman. Detail kerah V-neck dan lengan lonceng
                menambah sentuhan femininitas dan keanggunan. Ideal untuk pesta, acara formal, atau momen spesial lainnya.
                Biarkan motif Truntum menceritakan kisah cinta Anda.
                <br><br>
                <strong>Bahan:</strong> Sutra Blend<br>
                <strong>Teknik:</strong> Batik Cap kombinasi Tulis<br>
                <strong>Ukuran Tersedia:</strong> All Size (fit to L), Custom Size Available<br>
                <strong>Perawatan:</strong> Dry clean only.
            `
        }
    };

    // Hitung harga diskon dan perbarui tautan WhatsApp secara dinamis
    for (const productId in productsData) {
        const product = productsData[productId];
        product.discountedPriceNum = product.originalPriceNum * (1 - discountPercentage);
        product.originalPriceFormatted = formatRupiah(product.originalPriceNum);
        product.discountedPriceFormatted = formatRupiah(product.discountedPriceNum);

        // Perbarui tautan WhatsApp untuk mencerminkan harga diskon
        const encodedProductName = encodeURIComponent(product.title);
        const encodedDiscountedPrice = encodeURIComponent(product.discountedPriceFormatted);
        product.whatsappLink = `https://wa.me/6285972994746?text=Halo%20Starsist%2C%20saya%20tertarik%20dengan%20${encodedProductName}%20(Harga%20Promo%3A%20${encodedDiscountedPrice}).%20Apakah%20masih%20tersedia%3F`;
    }

    // Smooth scrolling untuk tautan navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Cek jika target bukan ID detail produk
            if (!targetId.startsWith('#product-detail-')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - (document.querySelector('header').offsetHeight), // Sesuaikan untuk header tetap
                        behavior: 'smooth'
                    });
                }
            } else {
                // Untuk tautan detail produk, biarkan logika viewDetailBtns yang menangani
            }
        });
    });

    // Tangani klik tombol "Beli Sekarang" (dari grid produk)
    viewDetailBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.product;
            const product = productsData[productId];

            if (product) {
                // Isi bagian detail produk
                document.getElementById('detail-product-image').src = product.image;
                document.getElementById('detail-product-image').alt = product.title;
                document.getElementById('detail-product-title').textContent = product.title;
                // Perbarui tampilan harga dengan harga asli dan diskon
                document.getElementById('detail-product-price').innerHTML = `
                    <span class="original-price">${product.originalPriceFormatted}</span>
                    <span class="discounted-price">${product.discountedPriceFormatted}</span>
                `;
                document.getElementById('detail-product-description').innerHTML = product.description; // Gunakan innerHTML untuk konten HTML

                // Atur tautan WhatsApp untuk tombol "Beli Sekarang" di tampilan detail
                buyNowBtn.onclick = function() {
                    window.open(product.whatsappLink, '_blank');
                };

                // Tampilkan bagian detail produk
                productDetailSection.style.display = 'block';

                // Gulir ke bagian detail produk
                window.scrollTo({
                    top: productDetailSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tangani klik tombol "Kembali ke Produk"
    backToProductsBtn.addEventListener('click', function() {
        productDetailSection.style.display = 'none'; // Sembunyikan bagian detail produk
        window.scrollTo({ // Gulir kembali ke grid produk atau bagian atas bagian produk
            top: document.getElementById('produk').offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    });

    // Optional: Pause video if it's playing when scrolling away
    let videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (starsistVideo) {
                if (entry.target === starsistVideo && !entry.isIntersecting) {
                    starsistVideo.pause();
                }
            }
        });
    }, { threshold: 0.1 }); // Pause if 90% of the video is out of view

    if (starsistVideo) {
        videoObserver.observe(starsistVideo);
    }
});