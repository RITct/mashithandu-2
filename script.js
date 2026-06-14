document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // --- Copy to Clipboard ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const commandText = btn.parentElement.querySelector('.command-text').innerText;
      
      navigator.clipboard.writeText(commandText).then(() => {
        btn.classList.add('copied');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHtml;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

  // --- Essentials Dashboard Panel Switcher ---
  const dashButtons = document.querySelectorAll('.dash-btn');
  const dashPanels = document.querySelectorAll('.dash-panel');

  if (dashButtons.length > 0 && dashPanels.length > 0) {
    dashButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Update active button
        dashButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active panel
        dashPanels.forEach(panel => {
          if (panel.id === targetTab) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // --- Git Lifecycle Simulator ---
  const simAddBtn = document.getElementById('sim-add');
  const simCommitBtn = document.getElementById('sim-commit');
  const simPushBtn = document.getElementById('sim-push');
  const simResetBtn = document.getElementById('sim-reset');
  
  const colWorking = document.getElementById('col-working');
  const colStaging = document.getElementById('col-staging');
  const colLocal = document.getElementById('col-local');
  const colRemote = document.getElementById('col-remote');
  const simLog = document.getElementById('sim-log');

  if (simAddBtn) {
    let simFile = document.createElement('div');
    simFile.className = 'sim-item';
    simFile.id = 'sim-file';
    simFile.innerText = 'index.html';
    colWorking.appendChild(simFile);

    // Initial State
    const updateSimUI = (state) => {
      if (state === 'working') {
        simAddBtn.disabled = false;
        simCommitBtn.disabled = true;
        simPushBtn.disabled = true;
        simResetBtn.disabled = true;
      } else if (state === 'staged') {
        simAddBtn.disabled = true;
        simCommitBtn.disabled = false;
        simPushBtn.disabled = true;
        simResetBtn.disabled = false;
      } else if (state === 'committed') {
        simAddBtn.disabled = true;
        simCommitBtn.disabled = true;
        simPushBtn.disabled = false;
        simResetBtn.disabled = false;
      } else if (state === 'pushed') {
        simAddBtn.disabled = true;
        simCommitBtn.disabled = true;
        simPushBtn.disabled = true;
        simResetBtn.disabled = false;
      }
    };

    updateSimUI('working');

    simAddBtn.addEventListener('click', () => {
      // Move file to Staging
      colStaging.appendChild(simFile);
      simLog.innerText = '$ git add index.html\n-> index.html successfully added to the Staging Area (Index).';
      updateSimUI('staged');
    });

    simCommitBtn.addEventListener('click', () => {
      // Remove file from staging (or keep it and add commit item)
      simFile.style.display = 'none';
      
      const commitNode = document.createElement('div');
      commitNode.className = 'sim-commit-item';
      commitNode.id = 'sim-commit-node';
      commitNode.innerHTML = 'Commit: a7f21c9<br><span>"Add main layout"</span>';
      colLocal.appendChild(commitNode);
      
      simLog.innerText = '$ git commit -m "Add main layout"\n-> Changes snapshot saved locally inside repository history.';
      updateSimUI('committed');
    });

    simPushBtn.addEventListener('click', () => {
      const commitNode = document.getElementById('sim-commit-node');
      if (commitNode) {
        colRemote.appendChild(commitNode);
        simLog.innerText = '$ git push origin main\n-> Sync complete! Commits pushed to GitHub remote repository.';
        updateSimUI('pushed');
      }
    });

    simResetBtn.addEventListener('click', () => {
      // Reset simulator
      const commitNode = document.getElementById('sim-commit-node');
      if (commitNode) {
        commitNode.remove();
      }
      simFile.style.display = 'flex';
      colWorking.appendChild(simFile);
      simLog.innerText = 'Simulator reset. File modified in Working Directory. Ready to git add.';
      updateSimUI('working');
    });
  }

  // --- Contributors Wall Loader & Search ---
  const contribGrid = document.getElementById('contributors-grid');
  const searchInput = document.getElementById('search-input');
  const statsCount = document.getElementById('contrib-count');

  if (contribGrid && typeof contributors !== 'undefined') {
    
    // Function to render contributors list
    const renderContributors = (list) => {
      contribGrid.innerHTML = '';
      
      if (list.length === 0) {
        contribGrid.innerHTML = `
          <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
            <p>No contributors found matching your search. Be the first to join!</p>
          </div>
        `;
        return;
      }

      list.forEach(c => {
        const card = document.createElement('div');
        card.className = 'contributor-card';
        
        // Safely extract names and quotes
        const name = c.name || c.username;
        const quote = c.quote || "Happy coding!";
        const username = c.username;
        const avatarUrl = `https://github.com/${username}.png`;
        
        card.innerHTML = `
          <div class="card-header-flex">
            <div class="avatar-wrapper">
              <img class="avatar-img" src="${avatarUrl}" alt="${name}'s avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <div class="avatar-placeholder" style="display: none;">${username.substring(0,2)}</div>
            </div>
            <div class="contributor-meta">
              <span class="contributor-name">${name}</span>
              <a href="https://github.com/${username}" target="_blank" class="contributor-username">@${username}</a>
            </div>
          </div>
          <p class="contributor-quote">"${quote}"</p>
          <a href="https://github.com/${username}" target="_blank" class="contributor-github-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        `;
        
        contribGrid.appendChild(card);
      });
    };

    // Initial render
    renderContributors(contributors);
    
    // Set statistics count
    if (statsCount) {
      statsCount.innerText = contributors.length;
    }

    // Live Search Filter
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = contributors.filter(c => {
          const nameMatch = (c.name || '').toLowerCase().includes(query);
          const usernameMatch = (c.username || '').toLowerCase().includes(query);
          const quoteMatch = (c.quote || '').toLowerCase().includes(query);
          return nameMatch || usernameMatch || quoteMatch;
        });
        renderContributors(filtered);
      });
    }
  }

  // --- Modal Toggle ---
  const openModalBtn = document.getElementById('open-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const guideModal = document.getElementById('guide-modal');

  if (openModalBtn && closeModalBtn && guideModal) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      guideModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
    });

    closeModalBtn.addEventListener('click', () => {
      guideModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Close on outside click
    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) {
        guideModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
});
