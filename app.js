// ==========================================================================
// L'ÉLIXIR AMBRÉ — Interactive Moodboard Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Student Name Editing & LocalStorage Persistence
  const studentNameEl = document.getElementById('student-name');
  const savedName = localStorage.getItem('perfume_student_name');
  if (savedName) {
    studentNameEl.textContent = savedName;
  }

  studentNameEl.addEventListener('blur', () => {
    const newName = studentNameEl.textContent.trim() || 'Alex Morgan';
    studentNameEl.textContent = newName;
    localStorage.setItem('perfume_student_name', newName);
    showToast(`Updated student name to "${newName}"`);
  });

  studentNameEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      studentNameEl.blur();
    }
  });

  // 2. Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.reference-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Color Swatch Copy to Clipboard
  const swatches = document.querySelectorAll('.swatch-card');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-color');
      const name = swatch.querySelector('.swatch-name').textContent;
      navigator.clipboard.writeText(hex).then(() => {
        showToast(`Copied ${name} (${hex}) to clipboard!`);
      });
    });
  });

  // 4. Lightbox Modal Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  document.querySelectorAll('.zoom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.reference-card');
      const img = card.querySelector('img');
      const title = card.querySelector('.card-title').textContent;

      lightboxImg.src = img.src;
      lightboxCaption.textContent = title;
      lightbox.classList.add('active');
    });
  });

  document.querySelectorAll('.card-image-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const card = wrap.closest('.reference-card');
      const img = card.querySelector('img');
      const title = card.querySelector('.card-title').textContent;

      lightboxImg.src = img.src;
      lightboxCaption.textContent = title;
      lightbox.classList.add('active');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. Print to PDF Action
  const btnPrint = document.getElementById('btn-print');
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // 6. Copy Project Brief Text Action
  const btnCopyBrief = document.getElementById('btn-copy-brief');
  btnCopyBrief.addEventListener('click', () => {
    const studentName = studentNameEl.textContent.trim();
    const pitchText = 
`FINAL PROJECT MOODBOARD SUBMISSION
----------------------------------
Student Name: ${studentName}
Project/Industry: Cosmetics (Luxury Fragrance)
Project Title: L'ÉLIXIR AMBRÉ — 10s 3D Perfume Commercial
Software: Blender (Cycles Engine)

Concept & Brief:
A high-end 10-second commercial showcasing an artisanal fluted glass perfume bottle filled with warm glowing amber fragrance. The piece emphasizes tactile micro-details—knurled brushed brass, light refractions and caustics, and volumetric golden mist—culminating in a dramatic reveal on a dark marble stage.

Planned Shots:
- Shot 1 (0:00–0:03): Macro pan across knurled gold atomizer with sweeping rim light (85mm Macro, f/2.4).
- Shot 2 (0:03–0:07): Nozzle spray releasing golden backlit mist with refractive caustics flares.
- Shot 3 (0:07–0:10): Cinematic dolly-out revealing the full bottle on a dark marble pedestal with gold debossed title overlay.

Moodboard Link: [Your Shareable Link Here]`;

    navigator.clipboard.writeText(pitchText).then(() => {
      showToast('Project pitch & summary copied to clipboard!');
    });
  });

  // Toast Helper
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
});
