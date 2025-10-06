const form = document.getElementById('prompt-form');
const output = document.getElementById('output');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const historyList = document.getElementById('historyList');

const homeLink = document.getElementById('home-link');
const historyLink = document.getElementById('history-link');
const formSection = document.getElementById('form-section');
const historySection = document.getElementById('history-section');

homeLink.addEventListener('click', () => {
  formSection.classList.remove('hidden');
  historySection.classList.add('hidden');
});

historyLink.addEventListener('click', () => {
  formSection.classList.add('hidden');
  historySection.classList.remove('hidden');
  loadHistory();
});

generateBtn.addEventListener('click', () => {
  const data = {
    judul_scene: document.getElementById('judulScene').value,
    deskripsi_karakter_inti: document.getElementById('deskripsiKarakter').value,
    detail_suara_karakter: document.getElementById('suaraKarakter').value,
    aksi_karakter: document.getElementById('aksiKarakter').value,
    ekspresi_karakter: document.getElementById('ekspresiKarakter').value,
    latar_tempat_dan_waktu: document.getElementById('latar').value,
    detail_visual_tambahan: document.getElementById('detailVisual').value,
    gerakan_kamera: document.getElementById('gerakanKamera').value,
    suasana_keseluruhan: document.getElementById('suasana').value,
    suara_lingkungan: document.getElementById('ambience').value,
    dialog_karakter: document.getElementById('dialog').value,
    negative_prompt: document.getElementById('negative').value,
  };

  const jsonIndo = JSON.stringify(data, null, 2);
  const jsonEng = JSON.stringify(translateToEnglish(data), null, 2);

  const resultText = `=== Bahasa Indonesia ===\n${jsonIndo}\n\n=== English Version ===\n${jsonEng}`;
  output.textContent = resultText;

  saveToHistory(data.judul_scene, resultText);
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent);
  alert('Prompt berhasil disalin ke clipboard!');
});

function saveToHistory(title, content) {
  const history = JSON.parse(localStorage.getItem('promptHistory')) || [];
  const timestamp = new Date().toLocaleString();
  history.push({ title, content, timestamp });
  localStorage.setItem('promptHistory', JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem('promptHistory')) || [];
  historyList.innerHTML = '';
  history.reverse().forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong> - <small>${item.timestamp}</small>`;
    li.addEventListener('click', () => {
      output.textContent = item.content;
      formSection.classList.remove('hidden');
      historySection.classList.add('hidden');
    });
    historyList.appendChild(li);
  });
}

function translateToEnglish(data) {
  return {
    scene_title: data.judul_scene,
    main_character_description: data.deskripsi_karakter_inti,
    character_voice_detail: data.detail_suara_karakter,
    character_action: data.aksi_karakter,
    character_expression: data.ekspresi_karakter,
    setting_time_place: data.latar_tempat_dan_waktu,
    additional_visual_detail: data.detail_visual_tambahan,
    camera_movement: data.gerakan_kamera,
    overall_mood: data.suasana_keseluruhan,
    ambient_sound: data.suara_lingkungan,
    character_dialogue: data.dialog_karakter,
    negative_prompt: data.negative_prompt,
  };
}
