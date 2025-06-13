document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const productDetailSection = document.getElementById('product-detail-view');
    const backToProductsBtn = document.querySelector('.back-to-products-btn');
    const viewDetailBtns = document.querySelectorAll('.view-detail-btn');
    const buyNowBtn = document.querySelector('.add-to-cart-btn'); // Menggunakan kembali class ini untuk tombol "Beli Sekarang"

    const discountPercentage = 0.10; // 10% discount

    // Function to format price to Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, // No decimal places
            maximumFractionDigits: 0
        }).format(number);
    }

    // Product data (Original prices are now numeric)
    const productsData = {
        'sekar-jagad': {
            image: 'img/batik 1.jpg',
            title: 'Blus Batik Sekar Jagad',
            originalPriceNum: 400000, // Numeric original price
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
            originalPriceNum: 450000, // Numeric original price
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
            originalPriceNum: 480000, // Numeric original price
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
        }
    };

    // Calculate discounted prices and update WhatsApp links dynamically
    for (const productId in productsData) {
        const product = productsData[productId];
        product.discountedPriceNum = product.originalPriceNum * (1 - discountPercentage);
        product.originalPriceFormatted = formatRupiah(product.originalPriceNum);
        product.discountedPriceFormatted = formatRupiah(product.discountedPriceNum);

        // Update WhatsApp link to reflect discounted price
        const encodedProductName = encodeURIComponent(product.title);
        const encodedDiscountedPrice = encodeURIComponent(product.discountedPriceFormatted);
        product.whatsappLink = `https://wa.me/6285972994746?text=Halo%20Starsist%2C%20saya%20tertarik%20dengan%20${encodedProductName}%20(Harga%20Promo%3A%20${encodedDiscountedPrice}).%20Apakah%20masih%20tersedia%3F`;
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Check if target is not a product detail ID
            if (!targetId.startsWith('#product-detail-')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - (document.querySelector('header').offsetHeight), // Adjust for sticky header
                        behavior: 'smooth'
                    });
                }
            } else {
                // For product detail links, allow viewDetailBtns logic to handle
            }
        });
    });

    // Handle "Beli Sekarang" button clicks (from product grid)
    viewDetailBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.product;
            const product = productsData[productId];

            if (product) {
                // Populate product detail section
                document.getElementById('detail-product-image').src = product.image;
                document.getElementById('detail-product-image').alt = product.title;
                document.getElementById('detail-product-title').textContent = product.title;
                // Update price display with original and discounted
                document.getElementById('detail-product-price').innerHTML = `
                    <span class="original-price">${product.originalPriceFormatted}</span>
                    <span class="discounted-price">${product.discountedPriceFormatted}</span>
                `;
                document.getElementById('detail-product-description').innerHTML = product.description; // Use innerHTML for HTML content

                // Set WhatsApp link for "Beli Sekarang" button in detail view
                buyNowBtn.onclick = function() {
                    window.open(product.whatsappLink, '_blank');
                };

                // Show product detail section
                productDetailSection.style.display = 'block';

                // Scroll to product detail section
                window.scrollTo({
                    top: productDetailSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle "Kembali ke Produk" button click
    backToProductsBtn.addEventListener('click', function() {
        productDetailSection.style.display = 'none'; // Hide product detail section
        window.scrollTo({ // Scroll back to product grid or top of products section
            top: document.getElementById('produk').offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
        });
    });
});