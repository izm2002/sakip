/* =========================================================
   PRIMA - SCRIPT.JS
   Portal Rencana Implementasi dan Monitoring Akuntabilitas
========================================================= */


/* =========================================================
   1. API GOOGLE APPS SCRIPT
========================================================= */

const apiURL = {
    2026: {
        1: "https://script.google.com/macros/s/AKfycbxWqnAHMrMYJ7B1seIyE3x0hP5CWXQ4EMgYFU7uFaJCWqio8OvzcMb6jSUKf3z4eiCn/exec",
        2: "https://script.google.com/macros/s/AKfycbwqC9AaxWLDSUVtZImhvUX8Zv8H09PyvXCpLdCkQt2X4qhocFBRV5ALnwc_-um2rkYHaA/exec",
        3: "https://script.google.com/macros/s/AKfycbzmhFpQ_9Qi3jPH3JHco50ieBvko22LgA53csCBM3OYxl4AyjWUGvg_lw7kK5FviCbx/exec",
        4: "https://script.google.com/macros/s/AKfycbzS7SwSJT-2t44IXsTyKpE-KbHI34vDcIaN0hy7RcKyTE_y3OJdCjIAr4XCQmY6r1mi/exec"
    }
};


/* =========================================================
   2. DEADLINE
========================================================= */

const deadlineTriwulan = {
    2026: {
        1: "2026-04-15T23:59:59",
        2: "2026-07-15T23:59:59",
        3: "2026-10-15T23:59:59",
        4: "2027-01-15T23:59:59"
    }
};


/* =========================================================
   3. NAMA IKU
========================================================= */

const namaIKU = [
    "Persentase Publikasi/Laporan Statistik Kependudukan dan Ketenagakerjaan yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Kesejahteraan Rakyat yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Ketahanan Sosial yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Sumber Daya Mineral dan Konstruksi yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Sumber Daya Hayati yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Industri yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Distribusi yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Harga yang Berkualitas",
    "Persentase Publikasi/Laporan Statistik Jasa yang Berkualitas",
    "Persentase Publikasi/Laporan Neraca Produksi yang Berkualitas",
    "Persentase Publikasi/Laporan Neraca Pengeluaran yang Berkualitas",
    "Persentase Publikasi/Laporan Analisis Statistik dan Neraca Satelit yang Berkualitas",
    "Tingkat Penyelenggaraan Pembinaan Statistik Sektoral sesuai Standar",
    "Persentase Kumulatif Desa yang Berpredikat Desa Cinta Statistik",
    "Indeks Pelayanan Publik - Penilaian Mandiri",
    "Nilai SAKIP Oleh Inspektorat",
    "Nilai BerAKHLAK"
];


/* =========================================================
   4. IKON IKU
========================================================= */

const ikonIKU = [
    "👥",
    "🏠",
    "🤝",
    "🏗️",
    "🌿",
    "🏭",
    "🚚",
    "📈",
    "🧾",
    "🏢",
    "💰",
    "📊",
    "📋",
    "🏘️",
    "🏛️",
    "⭐",
    "🧩"
];


/* =========================================================
   5. PJ IKU
========================================================= */

function dapatkanPJ(nomorIKU) {

    if (nomorIKU >= 1 && nomorIKU <= 3) {
        return "Najla";
    }

    if (nomorIKU >= 4 && nomorIKU <= 6) {
        return "Desfira";
    }

    if (nomorIKU >= 7 && nomorIKU <= 9) {
        return "Made";
    }

    if (nomorIKU >= 10 && nomorIKU <= 12) {
        return "Diah";
    }

    if (nomorIKU >= 13 && nomorIKU <= 15) {
        return "Salsa";
    }

    return "Naura";
}


/* =========================================================
   6. DATA CAPAIAN BERANDA
========================================================= */

const dataRenstra = [
    100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100,
    16.07, 100, 3.33, 73, 62.50
];

const dataPK = [
    100, 100, 100, 100, 100, 100,
    100, 100, 100, 100, 100, 100,
    16.07, 102, 4.58, 72.55, 62.50
];


/* =========================================================
   7. DATA CAPAIAN KINERJA
   Belum diisi karena nilai belum diberikan
========================================================= */

const dataCapaianKinerja = {
    1: {
        triwulan: "-",
        tahunan: "-"
    },

    2: {
        triwulan: "-",
        tahunan: "-"
    },

    3: {
        triwulan: "-",
        tahunan: "-"
    },

    4: {
        triwulan: "-",
        tahunan: "-"
    }
};


/* =========================================================
   8. DOM ELEMENT
========================================================= */

const tahunSelect = document.getElementById("tahunSelect");

const triwulanButtons = document.querySelectorAll(".triwulan-button");

const periodeInfo = document.getElementById("periodeInfo");

const refreshButton = document.getElementById("refreshButton");

const statusProgress = document.getElementById("statusProgress");

const donutChart = document.getElementById("donutChart");

const persentaseDokumen = document.getElementById("persentaseDokumen");

const dokumenTersedia = document.getElementById("dokumenTersedia");

const totalDokumen = document.getElementById("totalDokumen");

const progressDokumen = document.getElementById("progressDokumen");

const ikuLengkap = document.getElementById("ikuLengkap");

const totalIKU = document.getElementById("totalIKU");

const persentaseIKU = document.getElementById("persentaseIKU");

const summaryLengkap = document.getElementById("summaryLengkap");

const summarySebagian = document.getElementById("summarySebagian");

const summaryKosong = document.getElementById("summaryKosong");

const indikatorList = document.getElementById("indikatorList");

const pjList = document.getElementById("pjList");


/* =========================================================
   9. STATE
========================================================= */

let tahunAktif = tahunSelect
    ? Number(tahunSelect.value)
    : 2026;

let triwulanAktif = 1;

let countdownInterval = null;


/* =========================================================
   10. NAMA TRIWULAN
========================================================= */

function namaTriwulan(nomor) {

    return "Triwulan " + nomor;

}


/* =========================================================
   11. TAMPILKAN PERIODE
========================================================= */

function tampilkanPeriode() {

    if (!periodeInfo) return;

    periodeInfo.textContent =
        "Pelaksanaan " +
        namaTriwulan(triwulanAktif) +
        " Tahun " +
        tahunAktif;

}


/* =========================================================
   12. CACHE
========================================================= */

function buatCacheKey() {

    return (
        "prima_akip_" +
        tahunAktif +
        "_tw_" +
        triwulanAktif
    );

}


function simpanCache(data) {

    try {

        localStorage.setItem(
            buatCacheKey(),
            JSON.stringify({
                waktu: new Date().toISOString(),
                data: data
            })
        );

    } catch (error) {

        console.log("Cache tidak dapat disimpan.");

    }

}


function ambilCache() {

    try {

        const cache = localStorage.getItem(
            buatCacheKey()
        );

        if (!cache) return null;

        const hasil = JSON.parse(cache);

        return hasil.data || null;

    } catch (error) {

        return null;

    }

}


/* =========================================================
   13. LOADING
========================================================= */

function tampilkanLoading() {

    if (indikatorList) {

        indikatorList.innerHTML = `
            <div class="loading">
                Memuat data...
            </div>
        `;

    }

}


/* =========================================================
   14. NORMALISASI DATA
========================================================= */

function normalisasiData(data) {

    if (!Array.isArray(data)) {

        return [];

    }

    return data.map(function(item, index) {

        const nomor =
            Number(item.nomor || item.iku || index + 1);

        const notula =
            Boolean(item.notula);

        const buktiKinerja =
            Boolean(item.buktiKinerja);

        const buktiTindakLanjut =
            Boolean(item.buktiTindakLanjut);

        const jumlahDokumen =
            Number(item.jumlahDokumen) ||
            Number(notula) +
            Number(buktiKinerja) +
            Number(buktiTindakLanjut);

        let status = "kosong";

        if (jumlahDokumen >= 3) {

            status = "lengkap";

        } else if (jumlahDokumen > 0) {

            status = "sebagian";

        }

        return {

            nomor: nomor,

            nama:
                item.nama ||
                namaIKU[nomor - 1] ||
                "IKU " + nomor,

            ikon:
                ikonIKU[nomor - 1] ||
                "📌",

            pj:
                item.pj ||
                dapatkanPJ(nomor),

            notula: notula,

            buktiKinerja: buktiKinerja,

            buktiTindakLanjut: buktiTindakLanjut,

            jumlahDokumen: jumlahDokumen,

            status: status,

            linkNotula:
                item.linkNotula || "",

            linkBuktiKinerja:
                item.linkBuktiKinerja || "",

            linkBuktiTindakLanjut:
                item.linkBuktiTindakLanjut || ""

        };

    });

}


/* =========================================================
   15. TOMBOL DRIVE
========================================================= */

function buatTombolDrive(nama, link) {

    if (!link) {

        return `
            <span class="drive-button disabled">
                ${nama}
            </span>
        `;

    }

    return `
        <a
            href="${link}"
            target="_blank"
            class="drive-button"
        >
            ${nama}
        </a>
    `;

}


/* =========================================================
   16. TAMPILKAN IKU
========================================================= */

function tampilkanIKU(daftarIKU) {

    if (!indikatorList) return;

    if (!daftarIKU.length) {

        indikatorList.innerHTML = `
            <div class="empty-state">
                Data IKU belum tersedia.
            </div>
        `;

        return;

    }


    indikatorList.innerHTML =
        daftarIKU.map(function(item) {

            let badgeClass = "";

            let badgeText = "";

            if (item.status === "lengkap") {

                badgeClass = "status-lengkap";

                badgeText = "Lengkap";

            } else if (item.status === "sebagian") {

                badgeClass = "status-sebagian";

                badgeText = "Sebagian";

            } else {

                badgeClass = "status-kosong";

                badgeText = "Kosong";

            }


            return `
                <div class="iku-card">

                    <div class="iku-card-header">

                        <div class="iku-number">

                            <span class="iku-icon">
                                ${item.ikon}
                            </span>

                            <span>
                                IKU ${item.nomor}
                            </span>

                        </div>

                        <span class="status-badge ${badgeClass}">
                            ${badgeText}
                        </span>

                    </div>


                    <div class="iku-name">
                        ${item.nama}
                    </div>


                    <div class="iku-pj">
                        PJ: ${item.pj}
                    </div>


                    <div class="iku-documents">

                        ${buatTombolDrive(
                            "Notula",
                            item.linkNotula
                        )}

                        ${buatTombolDrive(
                            "Bukti Dukung Kinerja",
                            item.linkBuktiKinerja
                        )}

                        ${buatTombolDrive(
                            "Bukti Dukung Tindak Lanjut",
                            item.linkBuktiTindakLanjut
                        )}

                    </div>

                </div>
            `;

        }).join("");

}


/* =========================================================
   17. TAMPILKAN PJ
========================================================= */

function tampilkanPJ(daftarIKU) {

    if (!pjList) return;

    const kelompok = {};

    daftarIKU.forEach(function(item) {

        if (!kelompok[item.pj]) {

            kelompok[item.pj] = [];

        }

        kelompok[item.pj].push(item.nomor);

    });


    pjList.innerHTML =
        Object.keys(kelompok)
            .map(function(nama) {

                return `
                    <div class="pj-item">

                        <span class="pj-name">
                            ${nama}
                        </span>

                        <span class="pj-iku">
                            IKU ${kelompok[nama].join(", ")}
                        </span>

                    </div>
                `;

            }).join("");

}


/* =========================================================
   18. DONUT CHART
========================================================= */

function ubahDonut(persentase) {

    if (!donutChart) return;

    const nilai =
        Math.max(
            0,
            Math.min(
                100,
                Number(persentase) || 0
            )
        );


    donutChart.style.background =
        `conic-gradient(
            var(--biru) ${nilai}%,
            #e8eef5 ${nilai}% 100%
        )`;

}


/* =========================================================
   19. RINGKASAN MONITORING / PELAKSANAAN
========================================================= */

function tampilkanRingkasan(daftarIKU) {

    let lengkap = 0;

    let sebagian = 0;

    let kosong = 0;

    let dokumen = 0;


    daftarIKU.forEach(function(item) {

        if (item.status === "lengkap") {

            lengkap++;

        } else if (item.status === "sebagian") {

            sebagian++;

        } else {

            kosong++;

        }

        dokumen += item.jumlahDokumen;

    });


    const total =
        daftarIKU.length;

    const totalDokumenSeharusnya =
        total * 3;


    const persenDokumen =
        totalDokumenSeharusnya > 0
            ? (dokumen / totalDokumenSeharusnya) * 100
            : 0;


    const persenIKU =
        total > 0
            ? (lengkap / total) * 100
            : 0;


    if (summaryLengkap) {

        summaryLengkap.textContent =
            lengkap;

    }


    if (summarySebagian) {

        summarySebagian.textContent =
            sebagian;

    }


    if (summaryKosong) {

        summaryKosong.textContent =
            kosong;

    }


    if (dokumenTersedia) {

        dokumenTersedia.textContent =
            dokumen;

    }


    if (totalDokumen) {

        totalDokumen.textContent =
            totalDokumenSeharusnya;

    }


    if (progressDokumen) {

        progressDokumen.textContent =
            persenDokumen.toFixed(1) + "%";

    }


    if (persentaseDokumen) {

        persentaseDokumen.textContent =
            persenDokumen.toFixed(1) + "%";

    }


    if (ikuLengkap) {

        ikuLengkap.textContent =
            lengkap;

    }


    if (totalIKU) {

        totalIKU.textContent =
            total;

    }


    if (persentaseIKU) {

        persentaseIKU.textContent =
            persenIKU.toFixed(1) + "%";

    }


    ubahDonut(persenDokumen);


    if (statusProgress) {

        if (persenDokumen >= 100) {

            statusProgress.textContent =
                "Seluruh dokumen telah lengkap.";

        } else if (persenDokumen > 0) {

            statusProgress.textContent =
                "Dokumen masih dalam proses pemenuhan.";

        } else {

            statusProgress.textContent =
                "Belum terdapat dokumen yang tersedia.";

        }

    }

}


/* =========================================================
   20. TAMPILKAN DATA
========================================================= */

function tampilkanData(data, dariCache = false) {

    const daftarIKU =
        normalisasiData(data);


    tampilkanIKU(daftarIKU);

    tampilkanPJ(daftarIKU);

    tampilkanRingkasan(daftarIKU);


    if (statusProgress && dariCache) {

        statusProgress.textContent +=
            " Menampilkan data terakhir yang tersimpan.";

    }

}


/* =========================================================
   21. AMBIL DATA
========================================================= */

async function ambilData() {

    tampilkanLoading();


    const url =
        apiURL[tahunAktif] &&
        apiURL[tahunAktif][triwulanAktif];


    if (!url) {

        const cache =
            ambilCache();

        if (cache) {

            tampilkanData(
                cache,
                true
            );

        }

        return;

    }


    let berhasil = false;


    for (
        let percobaan = 1;
        percobaan <= 3;
        percobaan++
    ) {

        try {

            const response =
                await fetch(
                    url +
                    "?t=" +
                    Date.now()
                );


            if (!response.ok) {

                throw new Error(
                    "HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            simpanCache(data);

            tampilkanData(data);

            berhasil = true;

            break;


        } catch (error) {

            console.log(
                "Percobaan " +
                percobaan +
                " gagal."
            );

        }

    }


    if (!berhasil) {

        const cache =
            ambilCache();


        if (cache) {

            tampilkanData(
                cache,
                true
            );

        } else if (indikatorList) {

            indikatorList.innerHTML = `
                <div class="empty-state">
                    Data belum dapat dimuat.
                    Silakan coba tekan tombol
                    perbarui kembali.
                </div>
            `;

        }

    }

}


/* =========================================================
   22. COUNTDOWN
========================================================= */

function mulaiCountdown() {

    if (countdownInterval) {

        clearInterval(
            countdownInterval
        );

    }


    function updateCountdown() {

        const deadlineString =
            deadlineTriwulan[tahunAktif] &&
            deadlineTriwulan[tahunAktif][triwulanAktif];


        if (!deadlineString) return;


        const deadline =
            new Date(deadlineString).getTime();


        const sekarang =
            new Date().getTime();


        let selisih =
            deadline - sekarang;


        if (selisih < 0) {

            selisih = 0;

        }


        const hari =
            Math.floor(
                selisih /
                (1000 * 60 * 60 * 24)
            );


        const jam =
            Math.floor(
                (selisih %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const menit =
            Math.floor(
                (selisih %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const detik =
            Math.floor(
                (selisih %
                    (1000 * 60)) /
                1000
            );


        const deadlineDate =
            document.getElementById(
                "deadlineDate"
            );


        const deadlineStatus =
            document.getElementById(
                "deadlineStatus"
            );


        const countdownDays =
            document.getElementById(
                "countdownDays"
            );


        const countdownHours =
            document.getElementById(
                "countdownHours"
            );


        const countdownMinutes =
            document.getElementById(
                "countdownMinutes"
            );


        const countdownSeconds =
            document.getElementById(
                "countdownSeconds"
            );


        if (deadlineDate) {

            deadlineDate.textContent =
                new Date(
                    deadlineString
                ).toLocaleDateString(
                    "id-ID",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );

        }


        if (deadlineStatus) {

            deadlineStatus.textContent =
                new Date(deadlineString) > new Date()
                    ? "Belum melewati batas waktu"
                    : "Batas waktu telah lewat";

        }


        if (countdownDays) {

            countdownDays.textContent =
                hari;

        }


        if (countdownHours) {

            countdownHours.textContent =
                jam;

        }


        if (countdownMinutes) {

            countdownMinutes.textContent =
                menit;

        }


        if (countdownSeconds) {

            countdownSeconds.textContent =
                detik;

        }

    }


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =========================================================
   23. MENU UTAMA
   BERANDA - PERENCANAAN - PELAKSANAAN - EVALUASI
========================================================= */

const menuButtons =
    document.querySelectorAll(
        ".menu-btn"
    );


const berandaSection =
    document.getElementById(
        "berandaSection"
    );


const perencanaanSection =
    document.getElementById(
        "perencanaanSection"
    );


const pelaksanaanSection =
    document.getElementById(
        "pelaksanaanSection"
    );


const evaluasiSection =
    document.getElementById(
        "evaluasiSection"
    );


function bukaMenu(namaMenu) {

    menuButtons.forEach(function(button) {

        button.classList.toggle(
            "active",
            button.dataset.menu === namaMenu
        );

    });


    if (berandaSection) {

        berandaSection.classList.toggle(
            "active",
            namaMenu === "beranda"
        );

    }


    if (perencanaanSection) {

        perencanaanSection.classList.toggle(
            "active",
            namaMenu === "perencanaan"
        );

    }


    if (pelaksanaanSection) {

        pelaksanaanSection.classList.toggle(
            "active",
            namaMenu === "pelaksanaan"
        );

    }


    if (evaluasiSection) {

        evaluasiSection.classList.toggle(
            "active",
            namaMenu === "evaluasi"
        );

    }

}


menuButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            bukaMenu(
                button.dataset.menu
            );

        }
    );

});


/* =========================================================
   24. SUBMENU EVALUASI
========================================================= */

const evaluasiTabs =
    document.querySelectorAll(
        ".evaluasi-tab"
    );


const evaluasiTindakLanjut =
    document.getElementById(
        "evaluasiTindakLanjut"
    );


const evaluasiTahun2025 =
    document.getElementById(
        "evaluasiTahun2025"
    );


function bukaEvaluasi(namaEvaluasi) {

    evaluasiTabs.forEach(function(tab) {

        tab.classList.toggle(
            "active",
            tab.dataset.evaluasi === namaEvaluasi
        );

    });


    if (evaluasiTindakLanjut) {

        evaluasiTindakLanjut.classList.toggle(
            "active",
            namaEvaluasi === "tindak-lanjut"
        );

    }


    if (evaluasiTahun2025) {

        evaluasiTahun2025.classList.toggle(
            "active",
            namaEvaluasi === "tahun-2025"
        );

    }

}


evaluasiTabs.forEach(function(tab) {

    tab.addEventListener(
        "click",
        function() {

            bukaEvaluasi(
                tab.dataset.evaluasi
            );

        }
    );

});


/* =========================================================
   25. BERANDA - CAPAIAN RENSTRA
========================================================= */

function tampilkanCapaianBeranda() {

    const renstraContainer =
        document.getElementById(
            "renstraList"
        );


    const pkContainer =
        document.getElementById(
            "pkList"
        );


    function buatList(
        container,
        data
    ) {

        if (!container) return;


        container.innerHTML =
            data.map(function(nilai, index) {

                return `
                    <div class="iku-capaian-item">

                        <div class="iku-capaian-left">

                            <span class="iku-icon">
                                ${ikonIKU[index]}
                            </span>

                            <div>
                                <strong>
                                    IKU ${index + 1}
                                </strong>

                                <small>
                                    ${namaIKU[index]}
                                </small>
                            </div>

                        </div>

                        <span class="capaian-value">
                            ${nilai}%
                        </span>

                    </div>
                `;

            }).join("");

    }


    buatList(
        renstraContainer,
        dataRenstra
    );


    buatList(
        pkContainer,
        dataPK
    );

}


/* =========================================================
   26. BERANDA - CAPAIAN KINERJA
========================================================= */

function tampilkanCapaianKinerja() {

    for (let i = 1; i <= 4; i++) {

        const card =
            document.querySelector(
                `[data-capaian-tw="${i}"]`
            );


        if (!card) continue;


        const data =
            dataCapaianKinerja[i];


        const triwulan =
            card.querySelector(
                ".capaian-triwulan"
            );


        const tahunan =
            card.querySelector(
                ".capaian-tahunan"
            );


        if (triwulan) {

            triwulan.textContent =
                data.triwulan === "-"
                    ? "Belum tersedia"
                    : data.triwulan + "%";

        }


        if (tahunan) {

            tahunan.textContent =
                data.tahunan === "-"
                    ? "Belum tersedia"
                    : data.tahunan + "%";

        }

    }

}


/* =========================================================
   27. BERANDA - EVALUASI
========================================================= */

/* =========================================================
   27. BERANDA - EVALUASI
========================================================= */

function tampilkanEvaluasiBeranda() {

    const pieCharts =
        document.querySelectorAll(".evaluasi-pie");

    pieCharts.forEach(function(pie) {

        pie.style.background =
            "conic-gradient(var(--biru) 0deg 360deg)";


        const angka =
            pie.querySelector(
                ".evaluasi-pie-center strong"
            );

        if (angka) {
            angka.textContent = "100%";
        }

    });

}

/* =========================================================
   28. EVENT TAHUN
========================================================= */

if (tahunSelect) {

    tahunSelect.addEventListener(
        "change",
        function() {

            tahunAktif =
                Number(
                    tahunSelect.value
                );


            tampilkanPeriode();

            mulaiCountdown();

            ambilData();

        }
    );

}


/* =========================================================
   29. EVENT TRIWULAN
========================================================= */

triwulanButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                triwulanButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                triwulanAktif =
                    Number(
                        button.dataset.triwulan
                    );


                tampilkanPeriode();

                mulaiCountdown();

                ambilData();

            }
        );

    }
);


/* =========================================================
   30. TOMBOL PERBARUI
========================================================= */

if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        function() {

            ambilData();

        }
    );

}


/* =========================================================
   31. INISIALISASI
========================================================= */

tampilkanPeriode();

mulaiCountdown();

ambilData();

tampilkanCapaianBeranda();

tampilkanCapaianKinerja();

tampilkanEvaluasiBeranda();


/* =========================================================
   32. DEFAULT MENU
========================================================= */

bukaMenu("beranda");

bukaEvaluasi("tindak-lanjut");
