const container = document.getElementById("container")
const start = document.getElementById("start")
const analyze = document.getElementById("analyze")
const question = document.getElementById("question")
const choices = document.getElementById("choices")
const analyzeTitel = document.getElementById("analyze-title")

//!!--SOAL--!!
/*
question: pertanyaan
numberOfChoices: jumlah pilihan jawaban
text: pilihan jawaban
value: nilai pilihan jawaban
*/

const pengetahuans = [
    "harus belajar dan mencoba investasi",
    "perbanyak literasi",
    "menambah dan menerapkan pengetahuan agar menambah pengalaman",
    "menambah informasi investasi dan belajar dari pengalaman",
];

const modals = [
    "<30%",
    "30-50%",
    ">50%",
];

const cases1 = [
    "Sell (jual)",
    "Hold (dipertahankan)",
    "Buy (membeli)",
];

const cases2 = [
    "<5%",
    "5-10%",
    ">10%",
];

const questions = [
    {
        question: "Pengetahuan dan pengalaman investasi",
        numberOfChoices: 4,
        questionType: 'pengetahuan',
        choices: [
            {
                text: "Sedikit pengetahuan sedikit pengalaman",
                value: 0,
            },
            {
                text: "Sedikit pengetahuan tinggi pengalaman",
                value: 1,
            },
            {
                text: "Banyak pengetahuan rendah pengalaman",
                value: 2,
            },
            {
                text: "Banyak pengetahuan tinggi pengalaman",
                value: 3,
            },
        ],
    },
    {
        question: "Tujuan investasi",
        numberOfChoices: 3,
        questionType: 'tujuan',
        choices: [
            {
                text: "Jangka panjang",
                value: 10,
            },
            {
                text: "Jangka menengah",
                value: 20,
            },
            {
                text: "Jangka pendek",
                value: 30,
            },
        ],
    },
    {
        question: "Presentase modal yang diinvestasikan",
        numberOfChoices: 3,
        questionType: 'modal',
        choices: [
            {
                text: "<30%",
                value: 0,
            },
            {
                text: "30-50%",
                value: 1,
            },
            {
                text: ">50%",
                value: 2,
            },
        ],
    },
    {
        question: "Resiko investasi",
        numberOfChoices: 3,
        questionType: 'resiko',
        choices: [
            {
                text: "Rendah",
                value: 10,
            },
            {
                text: "Sedang",
                value: 20,
            },
            {
                text: "Tinggi",
                value: 30,
            },
        ],
    },
    {
        question: "Return yang diharapkan",
        numberOfChoices: 3,
        questionType: 'kembalian',
        choices: [
            {
                text: "Rendah",
                value: 10,
            },
            {
                text: "Sedang",
                value: 20,
            },
            {
                text: "Tinggi",
                value: 30,
            },
        ],
    },
    {
        question: "Ketika terjadi penurunan harga saham secara signifikan, apa yang Anda lakukan?",
        numberOfChoices: 3,
        questionType: 'case1',
        choices: [
            {
                text: "Sell (jual)",
                value: 0,
            },
            {
                text: "Hold (dipertahankan)",
                value: 1,
            },
            {
                text: "Buy (membeli)",
                value: 2,
            },
        ],
    },
    {
        question: "Berapa presentase kerugian yang bisa Anda terima terhadap investasi di pasar modal?",
        numberOfChoices: 3,
        questionType: 'case2',
        choices: [
            {
                text: "<5%",
                value: 0,
            },
            {
                text: "5-10%",
                value: 1,
            },
            {
                text: ">10%",
                value: 2,
            },
        ],
    },
];

const jenisInvestasi = [
    "Reksadana", "Obligasi", "Saham",
];

const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let pengetahuan = "";
let tujuan = 0;
let modal = "";
let resiko = 0;
let kembalian = 0;
let case1 = "";
let case2 = "";
let poin = 0;
let res = 0;

function renderQuestion() {
    let q = questions[currentQuestion];

    question.innerHTML = `<p>${q.question}</p>`;
    choices.innerHTML = "";
    for (let i = 0; i < q.numberOfChoices; i++) {
        choices.innerHTML += `<div class="btn btn-outline-success mb-2" onclick="getValue(${q.choices[i].value})">${q.choices[i].text}</div>`;
    }
}

start.addEventListener("click", startAnalyze);

//start analyze
function startAnalyze() {
    start.style.display = "none";
    renderQuestion();
    analyze.style.display = "block";
    container.setAttribute("class", "container card border-danger p-5 mt-5 mb-5");
}

//get value
function getValue(value) {
    q = questions[currentQuestion];
    if (q.questionType === "pengetahuan") {
        pengetahuan = pengetahuans[value];
    } else if (q.questionType === "tujuan") {
        poin += value;
    } else if (q.questionType === "modal") {
        modal = modals[value];
    } else if (q.questionType === "resiko") {
        poin += value;
    } else if (q.questionType === "kembalian") {
        poin += value;
    } else if (q.questionType === "case1") {
        case1 = cases1[value];
    } else if (q.questionType === "case2") {
        case2 = cases2[value];
    }

    console.log(q.questionType);
    console.log(value);

    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        renderQuestion();
    } else {
        resultRender();
    }
}

//result render
function resultRender() {
    let kesimpulan = "Anda termasuk investor yang bertipe ";
    let rekomendasi = ", direkomendasikan untuk memilih instrumen ";
    let tipe = "";
    let instrumen = "";
    let saran = "";
    if (poin < 50) {
        tipe = "Konservatif";
        instrumen = "Reksadana ";
        saran = "dengan perdalam pada analisis fundamental";
        kesimpulan += tipe + rekomendasi + instrumen + saran;
    } else if (poin < 70) {
        tipe = "Moderat";
        instrumen = "Obligasi";
        kesimpulan += tipe + rekomendasi + instrumen;
    } else {
        tipe = "Agresif";
        instrumen = "Saham ";
        saran = "dengan perdalam di teknikal apabila akan melakukan trading/scalping";
        kesimpulan += tipe + rekomendasi + instrumen + saran;
    }

    kesimpulan += `, serta ${pengetahuan}`;


    container.setAttribute("class", "container p-5 mt-5 mb-5");
    container.innerHTML = `<div class="text-center"><h3>${kesimpulan}</h3></div>`;
}