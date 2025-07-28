   // ===============================
    // Enhanced Variables
    // ===============================
    let timer;
    let seconds = 0;
    let totalSeconds = 0;
    let isRunning = false;
    let currentFile = null;
    let isFullscreen = false;

    // ===============================
    // Serene Affirmation Themes
    // ===============================
    const affirmationThemes = {
      serenity: [
        "Like calm ocean waves, I flow with grace through my day.",
        "My mind is as clear as a pristine blue sky.",
        "I breathe in peace, I breathe out stress.",
        "In stillness, I find my greatest strength.",
        "Each moment brings fresh clarity and calm.",
        "I am anchored in serenity, unshaken by storms.",
        "My thoughts drift like gentle clouds, peaceful and free.",
        "Deep within me lies an ocean of tranquility.",
        "I choose the path of peaceful presence.",
        "Serenity is not a destination, but my way of being."
      ],
         };

    // ===============================
    // Enhanced Initialization
    // ===============================
    document.addEventListener('DOMContentLoaded', () => {
      updateTimerDisplay();
      createSereneParticles();
      
      // Enhanced Enter key listeners
      document.getElementById("todoInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          addTask();
        }
      });
      
      // Popup event listeners
      document.getElementById("closePopup").addEventListener("click", () => {
        document.getElementById("popup").classList.remove("active");
      });
      
      document.getElementById("popup").addEventListener("click", (e) => {
        if (e.target === document.getElementById("popup")) {
          document.getElementById("popup").classList.remove("active");
        }
      });

      document.getElementById("filePopup").addEventListener("click", (e) => {
        if (e.target === document.getElementById("filePopup")) {
          closeFilePopup();
        }
      });

      // Enhanced keyboard shortcuts
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isFullscreen) {
          toggleFullscreen();
        }
        if (e.key === "Escape" && document.getElementById("popup").classList.contains("active")) {
          document.getElementById("popup").classList.remove("active");
        }
        if (e.key === "Escape" && document.getElementById("filePopup").classList.contains("active")) {
          closeFilePopup();
        }
      });

      // Affirmation button
      document.getElementById("showAffirmBtn").addEventListener("click", () => {
        const theme = document.getElementById("themeSelector").value;
        showPopup(randomAffirmation(theme));
      });
    });

    // ===============================
    // Enhanced Floating Particles
    // ===============================
    function createSereneParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 25;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (18 + Math.random() * 12) + 's';
        
        // Serene blue variations
        const blueShades = [
          'rgba(59, 130, 246, 0.15)',
          'rgba(147, 197, 253, 0.12)', 
          'rgba(191, 219, 254, 0.1)',
          'rgba(96, 165, 250, 0.13)'
        ];
        particle.style.background = blueShades[Math.floor(Math.random() * blueShades.length)];
        
        // Vary sizes for depth
        const size = 4 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
      }
    }

    // ===============================
    // Enhanced Affirmation Logic
    // ===============================
    function randomAffirmation(theme) {
      const affirmations = affirmationThemes[theme] || affirmationThemes.serenity;
      return affirmations[Math.floor(Math.random() * affirmations.length)];
    }

    // ===============================
    // Enhanced Timer Functions
    // ===============================
    function setCustomTime() {
      const input = document.getElementById("customTime");
      const minutes = parseInt(input.value);
      if (isNaN(minutes) || minutes <= 0) {
        showPopup("Please enter a valid positive number for minutes.");
        return;
      }
      
      seconds = minutes * 60;
      totalSeconds = seconds;
      updateTimerDisplay();
      input.value = "";
      pauseTimer();
      
    }

    function startTimer() {
      if (isRunning) return;
      if (seconds <= 0) {
        showPopup("Set your focus duration first");
        return;
      }
      isRunning = true;
      timer = setInterval(() => {
        if (seconds > 0) {
          seconds--;
          updateTimerDisplay();
        } else {
          clearInterval(timer);
          isRunning = false;
          updateTimerDisplay();
          showPopup(" Take a break and refresh.");
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timer);
      isRunning = false;
    }

    function resetTimer() {
      pauseTimer();
      seconds = totalSeconds;
      updateTimerDisplay();
    }

    function updateTimerDisplay() {
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;

      // Enhanced liquid animation
      const liquidFill = document.getElementById("liquidFill");
      const waveTop = document.getElementById("waveTop");
      
      if (totalSeconds > 0 && liquidFill) {
        const fillHeight = (seconds / totalSeconds) * 138;
        const yPosition = 21 + (138 - fillHeight);
        
        liquidFill.setAttribute("height", fillHeight);
        liquidFill.setAttribute("y", yPosition);
        
        if (waveTop && fillHeight > 5) {
          waveTop.setAttribute("d", `M21 ${yPosition} Q45 ${yPosition-2} 70 ${yPosition} T119 ${yPosition}`);
          waveTop.setAttribute("opacity", "0.8");
        }
      }
    }

    // ===============================
    // Enhanced To-Do Functions  
    // ===============================
    function addTask() {
      const input = document.getElementById("todoInput");
      const task = input.value.trim();
      if (!task) return;

      const li = document.createElement("li");
      li.textContent = task;

      const btn = document.createElement("button");
      btn.innerHTML = "✕";
      btn.title = "Complete this task";
      btn.onclick = () => {
        li.style.animation = "slideOutRight 0.4s ease-out forwards";
        setTimeout(() => li.remove(), 400);
      };

      li.appendChild(btn);
      document.getElementById("todoList").appendChild(li);
      input.value = "";
    }

    // ===============================
    // Enhanced File System
    // ===============================
    document.getElementById("fileUpload").addEventListener("change", (e) => {
      const fileList = document.getElementById("fileList");
      fileList.innerHTML = "";

      Array.from(e.target.files).forEach((file, index) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.textContent = file.name;
        a.href = "#";
        a.title = `Click to preview ${file.name}`;
        a.onclick = (e) => {
          e.preventDefault();
          openEnhancedFilePopup(file);
        };

        const actions = document.createElement("div");
        actions.className = "file-actions";

        const viewBtn = document.createElement("button");
        viewBtn.innerHTML = "👁";
        viewBtn.title = "Preview file";
        viewBtn.onclick = () => openEnhancedFilePopup(file);

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "✕";
        removeBtn.title = "Remove file";
        removeBtn.onclick = () => {
          li.style.animation = "slideOutRight 0.4s ease-out forwards";
          setTimeout(() => li.remove(), 400);
        };

        actions.appendChild(viewBtn);
        actions.appendChild(removeBtn);
        li.appendChild(a);
        li.appendChild(actions);
        fileList.appendChild(li);
      });
    });

    function openEnhancedFilePopup(file) {
      currentFile = file;
      const popup = document.getElementById("filePopup");
      const title = document.getElementById("filePopupTitle");
      const content = document.getElementById("fileContent");

      title.textContent = file.name;
      content.innerHTML = '<div class="loading">Loading file preview...</div>';

      const reader = new FileReader();
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      // Enhanced file type handling
      if (file.type.startsWith('image/')) {
        reader.onload = (e) => {
          content.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
        };
        reader.readAsDataURL(file);
        
      } else if (file.type === 'application/pdf') {
        reader.onload = (e) => {
          content.innerHTML = `
            <iframe class="document-viewer" src="${e.target.result}" type="application/pdf">
              <div class="file-info">
                <div class="file-info-icon">📄</div>
                <h3>PDF Preview</h3>
                <p>File: ${file.name}</p>
                <p>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button class="download-btn" onclick="downloadFile()">Download to View</button>
              </div>
            </iframe>
          `;
        };
        reader.readAsDataURL(file);
        
      } else if (['txt', 'md', 'js', 'html', 'css', 'json', 'xml', 'csv', 'py', 'java', 'cpp', 'c'].includes(fileExtension) || file.type.startsWith('text/')) {
        reader.onload = (e) => {
          content.innerHTML = `<pre style="white-space: pre-wrap; font-family: 'JetBrains Mono', monospace;">${escapeHtml(e.target.result)}</pre>`;
        };
        reader.readAsText(file);
        
      } else if (['doc', 'docx'].includes(fileExtension)) {
        content.innerHTML = `
          <div class="file-info">
            <div class="file-info-icon">📝</div>
            <h3>Word Document</h3>
            <p>File: ${file.name}</p>
            <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
            <p>Word documents require download to view properly</p>
            <button class="download-btn" onclick="downloadFile()">Download Document</button>
          </div>
        `;
        
      } else if (['xls', 'xlsx'].includes(fileExtension)) {
        content.innerHTML = `
          <div class="file-info">
            <div class="file-info-icon">📊</div>
            <h3>Excel Spreadsheet</h3>
            <p>File: ${file.name}</p>
            <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
            <p>Excel files require download to view properly</p>
            <button class="download-btn" onclick="downloadFile()">Download Spreadsheet</button>
          </div>
        `;
        
      } else if (['ppt', 'pptx'].includes(fileExtension)) {
        content.innerHTML = `
          <div class="file-info">
            <div class="file-info-icon">🎞️</div>
            <h3>PowerPoint Presentation</h3>
            <p>File: ${file.name}</p>
            <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
            <p>Presentation files require download to view properly</p>
            <button class="download-btn" onclick="downloadFile()">Download Presentation</button>
          </div>
        `;
        
      } else if (file.type.startsWith('video/')) {
        reader.onload = (e) => {
          content.innerHTML = `
            <video controls style="width: 100%; max-height: 400px; border-radius: 12px;">
              <source src="${e.target.result}" type="${file.type}">
              Your browser does not support video playback.
            </video>
          `;
        };
        reader.readAsDataURL(file);
        
      } else if (file.type.startsWith('audio/')) {
        reader.onload = (e) => {
          content.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
              <div class="file-info-icon">🎵</div>
              <h3 style="color: #1e40af; margin-bottom: 1rem;">${file.name}</h3>
              <audio controls style="width: 100%; max-width: 400px;">
                <source src="${e.target.result}" type="${file.type}">
                Your browser does not support audio playback.
              </audio>
            </div>
          `;
        };
        reader.readAsDataURL(file);
        
      } else {
        content.innerHTML = `
          <div class="file-info">
            <div class="file-info-icon">📄</div>
            <h3>File Preview</h3>
            <p><strong>Name:</strong> ${file.name}</p>
            <p><strong>Type:</strong> ${file.type || 'Unknown'}</p>
            <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
            <p style="margin-top: 1.5rem; opacity: 0.8;">This file type cannot be previewed directly in the browser.</p>
            <button class="download-btn" onclick="downloadFile()">Download File</button>
          </div>
        `;
      }

      popup.classList.add("active");
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function downloadFile() {
      if (!currentFile) return;
      
      const url = URL.createObjectURL(currentFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showPopup(`📥 ${currentFile.name} has been downloaded successfully!`);
    }

    function closeFilePopup() {
      if (isFullscreen) {
        toggleFullscreen();
      }
      document.getElementById("filePopup").classList.remove("active");
      currentFile = null;
    }

    function toggleFullscreen() {
      const popupContent = document.getElementById("filePopupContent");
      
      if (!isFullscreen) {
        popupContent.classList.add("fullscreen");
        isFullscreen = true;
      } else {
        popupContent.classList.remove("fullscreen");
        isFullscreen = false;
      }
    }

    // ===============================
    // Enhanced Popup System
    // ===============================
    function showPopup(text) {
      const popup = document.getElementById("popup");
      const popupText = document.getElementById("popupText");
      popupText.textContent = text;
      popup.classList.add("active");
      
      // Auto-close affirmations after 5 seconds
      if (affirmationThemes.serenity.includes(text) || 
          affirmationThemes.focus.includes(text) || 
          affirmationThemes.motivation.includes(text)) {
        setTimeout(() => {
          popup.classList.remove("active");
        }, 5000);
      }
    }
