let data = [];

const audioSuccess = new Audio('success.mp3');
const audioFail = new Audio('fail.mp3');

fetch('kelulusan.json')
  .then(response => response.json())
  .then(json => data = json)
  .catch(error => console.error('Gagal memuat data:', error));

function cekKelulusan() {
  const nisn = document.getElementById('nisn').value.trim();
  const password = document.getElementById('password').value.trim();
  const hasilDiv = document.getElementById('hasil');
  const card = document.querySelector('.card-container');

  const result = data.find(item => item.NISN === nisn && item.PASSWORD === password);

  if (result) {
    if (result["STATUS KELULUSAN"].toLowerCase() === "lulus") {
      audioSuccess.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      hasilDiv.innerHTML = ` 
        <div class="success">
          <i class="fas fa-check-circle"></i>
          Selamat, <strong>${result["NAMA LENGKAP"]}</strong>!<br>
          Anda <strong>${result["STATUS KELULUSAN"]}</strong> PPDBM MAN TANJUNGBALAI
        </div>
        <a href="${result["LINK PDF"]}" target="_blank">
          <i class="fas fa-file-alt"></i> Cetak Surat Kelulusan
        </a>
      `;
    } else {
      audioFail.play();
      hasilDiv.innerHTML = `
        <div class="fail">
          <i class="fas fa-times-circle"></i>
          Mohon maaf, <strong>${result["NAMA LENGKAP"]}</strong>.<br>
          Anda <strong>${result["STATUS KELULUSAN"]}</strong> PPDBM MAN TANJUNGBALAI
        </div>
        <a href="${result["LINK PDF"]}" target="_blank">
          <i class="fas fa-file-alt"></i> Cetak Surat 
        </a>
      `;
    }
  } else {
    audioFail.play();
    hasilDiv.innerHTML = `
      <div class="fail">
        <i class="fas fa-times-circle"></i> NISN atau Password salah.
      </div>
    `;
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") cekKelulusan();
});


document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this;

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", !isPassword);
  icon.classList.toggle("fa-eye-slash", isPassword);
});