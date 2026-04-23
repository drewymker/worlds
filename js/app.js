const matchesData = { videos: window.siteData?.matches || [] };
const daysInfo = window.siteData?.daysInfo || [];

// Icon SVGs
const icons = {
  users: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>`,
  play: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>`,
  calendar: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>`,
  trophy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>`,
  arrow: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>`
};

// Utility functions
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getEmbedUrl(url) {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId;
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('embed')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    } else {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v');
    }
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1&fs=1`;
  }

  // Google Drive - already in preview format
  if (url.includes('drive.google.com') && url.includes('/preview')) {
    return url;
  }

  // Google Drive - convert to preview format
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/[-\w]{25,}/)?.[0];
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  return url;
}

function getDriveThumbnail(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h300`;
}

function getDriveViewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

function getDriveFileId(url) {
  return url?.match(/[-\w]{25,}/)?.[0] || null;
}

function getVideoSourceDetails(match) {
  const url = match.videoUrl || "";
  const driveUrl = match.driveUrl || "";
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isDrive = url.includes('drive.google.com') || driveUrl.includes('drive.google.com');
  const driveFileId = getDriveFileId(url) || getDriveFileId(driveUrl);
  const nativeVideoCandidates = driveFileId ? [
    `https://drive.google.com/uc?export=download&id=${driveFileId}`,
    `https://drive.google.com/uc?export=view&id=${driveFileId}`,
    `https://drive.usercontent.google.com/download?id=${driveFileId}&export=view&authuser=0`
  ] : [];

  return {
    isYouTube,
    isDrive,
    driveFileId,
    embedUrl: getEmbedUrl(url),
    nativeVideoCandidates,
    openPlayerUrl: driveUrl || url,
    externalUrl: driveUrl || url,
    useNativePlayer: Boolean(driveFileId)
  };
}

function clearNativeVideoState(video) {
  if (!video) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.classList.add('hidden');
  video.onerror = null;
  video.onloadedmetadata = null;
}

function showPlayerFallback(url) {
  const fallback = document.getElementById('playerFallback');
  const fallbackLink = document.getElementById('playerFallbackLink');
  if (!fallback || !fallbackLink) return;
  fallbackLink.href = url;
  fallback.classList.remove('hidden');
}

function hidePlayerFallback() {
  const fallback = document.getElementById('playerFallback');
  if (fallback) {
    fallback.classList.add('hidden');
  }
}

function useIframePlayer(videoPlayer, sourceDetails, matchTitle) {
  const nativeVideoPlayer = document.getElementById('nativeVideoPlayer');
  clearNativeVideoState(nativeVideoPlayer);
  hidePlayerFallback();
  videoPlayer.classList.remove('hidden');
  videoPlayer.src = sourceDetails.embedUrl;
  videoPlayer.title = matchTitle;
}

function attachNativeDrivePlayer(nativeVideoPlayer, videoPlayer, sourceDetails, match) {
  const candidates = [...sourceDetails.nativeVideoCandidates];
  let settled = false;
  let timeoutId = null;

  const tryNextSource = () => {
    if (!candidates.length) {
      useIframePlayer(videoPlayer, sourceDetails, match.title);
      if (sourceDetails.isDrive) {
        showPlayerFallback(sourceDetails.externalUrl);
      }
      return;
    }

    const nextSource = candidates.shift();
    nativeVideoPlayer.src = nextSource;
    nativeVideoPlayer.load();

    timeoutId = window.setTimeout(() => {
      if (!settled && nativeVideoPlayer.readyState < 2) {
        tryNextSource();
      }
    }, 4000);
  };

  nativeVideoPlayer.onloadedmetadata = () => {
    settled = true;
    if (timeoutId) window.clearTimeout(timeoutId);
    hidePlayerFallback();
  };

  nativeVideoPlayer.onerror = () => {
    if (timeoutId) window.clearTimeout(timeoutId);
    tryNextSource();
  };

  nativeVideoPlayer.classList.remove('hidden');
  nativeVideoPlayer.poster = match.thumbnail || "";
  nativeVideoPlayer.setAttribute('title', match.title);
  videoPlayer.classList.add('hidden');
  videoPlayer.src = "";
  hidePlayerFallback();
  tryNextSource();
}

function getSortedMatches(matches = matchesData.videos) {
  return [...matches].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
}

function getMatchSiblings(match) {
  const dayMatches = getSortedMatches(matchesData.videos.filter(v => v.day === match.day));
  const currentIndex = dayMatches.findIndex(v => v.id === match.id);

  return {
    dayMatches,
    currentIndex,
    previousMatch: currentIndex > 0 ? dayMatches[currentIndex - 1] : null,
    nextMatch: currentIndex < dayMatches.length - 1 ? dayMatches[currentIndex + 1] : null
  };
}

function setNavLinkState(link, match, labelPrefix) {
  if (!link) return;

  if (!match) {
    link.classList.add('is-disabled');
    link.setAttribute('aria-disabled', 'true');
    link.removeAttribute('href');
    const label = link.querySelector('.match-nav-link-label');
    const meta = link.querySelector('.match-nav-link-meta');
    if (label) label.textContent = labelPrefix;
    if (meta) meta.textContent = 'Unavailable';
    return;
  }

  link.classList.remove('is-disabled');
  link.removeAttribute('aria-disabled');
  link.href = `match.html?id=${match.id}`;
  const label = link.querySelector('.match-nav-link-label');
  const meta = link.querySelector('.match-nav-link-meta');
  if (label) label.textContent = labelPrefix;
  if (meta) meta.textContent = match.title;
}

// Render functions
function renderDaysGrid() {
  const grid = document.getElementById('daysGrid');
  if (!grid) return;

  grid.innerHTML = daysInfo.map((day, index) => `
    <a href="day.html?day=${day.day}" class="day-card fade-in fade-delay-${index + 1}">
      <div class="day-card-glow"></div>
      <div class="day-card-content">
        <div class="day-card-icon">
          ${icons[day.icon]}
        </div>
        <h2 class="day-card-title">${day.title}</h2>
        <p class="day-card-date">${day.date}</p>
        <p class="day-card-description">${day.description}</p>
        <div class="day-card-badge">
          ${icons.play}
          ${day.matchCount} matches
        </div>
        <div class="day-card-arrow">
          ${icons.arrow}
        </div>
      </div>
    </a>
  `).join('');
}

function renderDayPage() {
  const dayNumber = parseInt(getUrlParameter('day')) || 1;
  const dayInfo = daysInfo.find(d => d.day === dayNumber) || daysInfo[0];
  const matches = getSortedMatches(matchesData.videos.filter(v => v.day === dayNumber));

  // Update page title
  document.title = `Day ${dayNumber} - 36620B Blue Crew | VEX Worlds 2025`;

  // Update header
  document.getElementById('dayTitle').textContent = `Day ${dayNumber}`;
  document.getElementById('dayDate').textContent = dayInfo.date;

  // Update day info
  document.getElementById('dayDateDisplay').textContent = dayInfo.date;
  document.getElementById('dayDescription').textContent = dayInfo.description;
  document.getElementById('matchCount').textContent = `${matches.length} ${matches.length === 1 ? 'match' : 'matches'}`;

  const matchesGrid = document.getElementById('matchesGrid');
  const emptyState = document.getElementById('emptyState');

  if (matches.length === 0) {
    matchesGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  matchesGrid.innerHTML = matches.map((match, index) => `
    <a href="match.html?id=${match.id}" class="match-card fade-in fade-delay-${Math.min(index + 1, 5)}">
      <div class="match-card-thumbnail">
        <img src="${match.thumbnail}" alt="${match.title}">
        <div class="match-card-overlay"></div>
        <div class="match-card-play">
          <div class="play-button">
            ${icons.play}
          </div>
        </div>
        <span class="match-card-type">${match.matchType}</span>
      </div>
      <div class="match-card-body">
        <h3 class="match-card-title">${match.title}</h3>
        <div class="match-card-teams">
          <div class="team-row">
            <div class="team-indicator red"></div>
            <div class="team-badges">
              ${match.redTeams.map(team => `<span class="team-badge red">${team}</span>`).join('')}
            </div>
          </div>
          <div class="team-row">
            <div class="team-indicator blue"></div>
            <div class="team-badges">
              ${match.blueTeams.map(team => `<span class="team-badge blue">${team}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

function renderMatchPage() {
  const matchId = getUrlParameter('id');
  const match = matchesData.videos.find(v => v.id === matchId);

  const notFound = document.getElementById('notFound');
  const videoContainer = document.querySelector('.video-container');
  const mobilePlayerNav = document.querySelector('.mobile-player-nav');
  const matchInfo = document.querySelector('.match-info');

  if (!match) {
    notFound.classList.remove('hidden');
    videoContainer.classList.add('hidden');
    mobilePlayerNav.classList.add('hidden');
    matchInfo.classList.add('hidden');
    return;
  }

  // Update page title
  document.title = `${match.title} - 36620B Blue Crew | VEX Worlds 2025`;

  // Update back link
  const backLink = document.getElementById('backLink');
  backLink.href = `day.html?day=${match.day}`;
  backLink.querySelector('.back-text').textContent = `Back to Day ${match.day}`;

  // Update external link (use driveUrl if available, otherwise videoUrl)
  const externalLink = document.getElementById('externalLink');
  externalLink.href = match.driveUrl || match.videoUrl;

  // Update video player
  const sourceDetails = getVideoSourceDetails(match);
  const videoPlayer = document.getElementById('videoPlayer');
  const nativeVideoPlayer = document.getElementById('nativeVideoPlayer');

  if (sourceDetails.useNativePlayer) {
    attachNativeDrivePlayer(nativeVideoPlayer, videoPlayer, sourceDetails, match);
  } else {
    useIframePlayer(videoPlayer, sourceDetails, match.title);
  }

  // Update match info
  document.getElementById('matchType').textContent = match.matchType;
  document.getElementById('matchDay').textContent = `Day ${match.day}`;
  document.getElementById('matchTitle').textContent = match.title;
  document.getElementById('matchDateText').textContent = formatDate(match.dateAdded);

  // Update teams
  document.getElementById('redTeams').innerHTML = match.redTeams
    .map(team => `<div class="team-tag red">${team}</div>`)
    .join('');

  document.getElementById('blueTeams').innerHTML = match.blueTeams
    .map(team => `<div class="team-tag blue">${team}</div>`)
    .join('');

  // Update navigation
  const { dayMatches, currentIndex, previousMatch, nextMatch } = getMatchSiblings(match);
  const matchPosition = document.getElementById('matchPosition');
  if (matchPosition) {
    matchPosition.textContent = `${currentIndex + 1} of ${dayMatches.length} on Day ${match.day}`;
  }

  document.getElementById('moreDayMatches').href = `day.html?day=${match.day}`;
  document.getElementById('moreDayMatches').innerHTML = `
    ${icons.play}
    More Day ${match.day} Matches
  `;

  setNavLinkState(document.getElementById('previousMatchLink'), previousMatch, 'Previous Match');
  setNavLinkState(document.getElementById('nextMatchLink'), nextMatch, 'Next Match');
}
