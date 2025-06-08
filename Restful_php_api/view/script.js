const submitBtn = document.getElementById('submit');
const cautraloi = document.querySelectorAll('.cautraloi');
const quiz = document.getElementById('question');

let socaudung = 0;
let cauhoi_hientai = 0;
let data_cauhoi = [];

// Tải dữ liệu câu hỏi từ API
fetch('http://localhost/Restful_php_api/api/question/read.php')
    .then(res => res.json())
    .then(data => {
        data_cauhoi = data.question;
        const totalInput = document.getElementById('tongsocauhoi');
        if (totalInput) totalInput.value = data_cauhoi.length;
        showCauHoi();
    })
    .catch(console.error);

// Hiển thị câu hỏi hiện tại
function showCauHoi() {
    if (cauhoi_hientai >= data_cauhoi.length) {
        const diem = socaudung;
        const tong = data_cauhoi.length;

        quiz.innerHTML = `
            <h2>Bạn đã làm xong</h2>
            <p>Bạn làm được <strong>${diem}/${tong}</strong> câu đúng.</p>
            <p>Bạn làm được: <strong>${((diem / tong) * 10)} / 10 điểm</strong></p>
            <button onclick="location.reload()">Làm lại bài</button>
        `;
        return;
    }

    const q = data_cauhoi[cauhoi_hientai];
    document.getElementById('title').innerText = q.title;

    document.getElementById('a_cautraloi').innerText = q.cau_a;
    document.getElementById('b_cautraloi').innerText = q.cau_b;

    showOrHideAnswer('c', q.cau_c);
    showOrHideAnswer('d', q.cau_d);

    document.getElementById('caudung').value = normalizeAnswer(q.cau_dung);
    removeAnswer();
}

// Hiện hoặc ẩn câu C/D
function showOrHideAnswer(id, content) {
    const li = document.getElementById(`cau_${id}`);
    const label = document.getElementById(`${id}_cautraloi`);
    if (content && content.trim() !== "") {
        li.classList.remove('hienthicautraloi');
        label.innerText = content;
    } else {
        li.classList.add('hienthicautraloi');
    }
}

// Lấy đáp án người chọn
function getAnswer() {
    for (const input of cautraloi) {
        if (input.checked) return input.id;
    }
    return null;
}

// Xóa lựa chọn
function removeAnswer() {
    cautraloi.forEach(input => input.checked = false);
}

// Chuẩn hóa đáp án đúng
function normalizeAnswer(text) {
    text = text.trim().toLowerCase(); // "cau_b"

    // Lấy ký tự cuối cùng (nếu đúng format "cau_x")
    const lastChar = text.charAt(text.length - 1);
    
    if (['a', 'b', 'c', 'd'].includes(lastChar)) {
        return lastChar;
    }
    return '';
}


// Xử lý khi nhấn nút
submitBtn.addEventListener("click", () => {
    const answer = getAnswer();
    const caudung = document.getElementById('caudung').value;

    if (!answer) {
        alert("⚠️ Vui lòng chọn một đáp án!");
        return;
    }

    console.log("Đáp án chọn:", answer, "| Đáp án đúng:", caudung);

    if (answer === caudung) {
        socaudung++;
        console.log('Số câu đúng:', socaudung);
    }

    cauhoi_hientai++;

    showCauHoi();
});
