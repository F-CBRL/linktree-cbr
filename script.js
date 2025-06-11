// Fungsi untuk memuat tombol copy ke dalam kontainer tertentu
function loadCopyButton(targetId, linkToCopy) {
  fetch('copy_link/copy.html') // Ganti dengan path folder yang sesuai
      .then(response => response.text())
      .then(data => {
          document.getElementById(targetId).innerHTML = data;

          // Tunggu elemen selesai dimuat, lalu pasang event listener
          const copyBtn = document.querySelector(`#${targetId} .copy`);
          if (copyBtn) {
              copyBtn.setAttribute('data-link', linkToCopy);

              copyBtn.addEventListener("click", (event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  const tooltip = copyBtn.querySelector(".tooltip");
                  const clipboardIcon = copyBtn.querySelector(".clipboard");
                  const checkmarkIcon = copyBtn.querySelector(".checkmark");

                  navigator.clipboard.writeText(linkToCopy).then(() => {
                      tooltip.textContent = tooltip.getAttribute("data-text-end");
                      clipboardIcon.style.display = "none";
                      checkmarkIcon.style.display = "inline";

                      setTimeout(() => {
                          tooltip.textContent = tooltip.getAttribute("data-text-initial");
                          clipboardIcon.style.display = "inline";
                          checkmarkIcon.style.display = "none";
                      }, 2000);
                  });
              });
          }
      })
      .catch(error => console.error(`Gagal memuat tombol copy ke #${targetId}:`, error));
}

// Panggil fungsi untuk Spotify
loadCopyButton("copy-container", "https://open.spotify.com/user/31dgkznpfplpcezehoaaekec76ce?si=eecb4fa56e6a4531");

// Panggil fungsi untuk GitHub
loadCopyButton("copy-container-github", "https://github.com/F-CBRL");

// Memuat icon.html ke dalam elemen dengan ID 'icon-container'
fetch('sosmed_icon/icon.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('icon-container').innerHTML = data;
  })
  .catch(error => console.error('Gagal memuat icon.html:', error));
