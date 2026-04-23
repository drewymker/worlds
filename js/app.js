// Match data
const matchesData = {
  videos: [
    {
      id: "q1-001",
      title: "Qualification Match Q1-001",
      // Example using Google Drive video:
      // thumbnail: "https://drive.google.com/thumbnail?id=YOUR_FILE_ID&sz=w400-h300",
      // videoUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/preview",
      // driveUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-23T09:00:00AM",
      day: 1,
      matchType: "Qualification",
      redTeams: ["1234A", "5678B"],
      blueTeams: ["36620B", "3456D"]
    },
    {
      id: "q1-002",
      title: "Qualification Match Q1-002",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-23T09:30:00Z",
      day: 1,
      matchType: "Qualification",
      redTeams: ["2468A", "1357B"],
      blueTeams: ["36620B", "6913D"]
    },
    {
      id: "q1-003",
      title: "Practice Match P1-003",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-23T08:30:00Z",
      day: 1,
      matchType: "Practice",
      redTeams: ["7890A", "4321B"],
      blueTeams: ["36620B", "9876D"]
    },
    {
      id: "q2-001",
      title: "Qualification Match Q2-001",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-24T09:00:00Z",
      day: 2,
      matchType: "Qualification",
      redTeams: ["36620B", "2222B"],
      blueTeams: ["3333C", "4444D"]
    },
    {
      id: "q2-002",
      title: "Qualification Match Q2-002",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-24T10:30:00Z",
      day: 2,
      matchType: "Qualification",
      redTeams: ["5555A", "6666B"],
      blueTeams: ["36620B", "8888D"]
    },
    {
      id: "e3-001",
      title: "Round of 16 - Match E3-001",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-25T09:00:00Z",
      day: 3,
      matchType: "Elimination",
      redTeams: ["1234A", "2468A"],
      blueTeams: ["36620B", "8024C"]
    },
    {
      id: "e3-002",
      title: "Quarterfinals - Match QF-001",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-25T14:00:00Z",
      day: 3,
      matchType: "Quarterfinal",
      redTeams: ["1234A", "5678B"],
      blueTeams: ["36620B", "3456D"]
    },
    {
      id: "sf-001",
      title: "Semifinals - Match SF-001",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-26T10:00:00Z",
      day: 4,
      matchType: "Semifinal",
      redTeams: ["1234A", "2468A"],
      blueTeams: ["36620B", "6666B"]
    },
    {
      id: "finals-001",
      title: "Championship Finals - Match F-001",
      thumbnail: "images/match-placeholder.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      dateAdded: "2025-04-26T15:00:00Z",
      day: 4,
      matchType: "Finals",
      redTeams: ["1234A", "2468A"],
      blueTeams: ["36620B", "8888D"]
    }
  ]
};

// Day information
const daysInfo = [
  {
    day: 1,
    date: "April 23, 2025",
    title: "Day 1",
    description: "Practice Matches & Opening Qualifications",
    icon: "users",
    matchCount: 3
  },
  {
    day: 2,
    date: "April 24, 2025",
    title: "Day 2",
    description: "Qualification Rounds Continue",
    icon: "play",
    matchCount: 2
  },
  {
    day: 3,
    date: "April 25, 2025",
    title: "Day 3",
    description: "Elimination Rounds & Quarterfinals",
    icon: "calendar",
    matchCount: 2
  },
  {
    day: 4,
    date: "April 26, 2025",
    title: "Day 4",
    description: "Semifinals & Championship Finals",
    icon: "trophy",
    matchCount: 2
  }
];

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
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
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
  const matches = matchesData.videos.filter(v => v.day === dayNumber);

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
  const matchInfo = document.querySelector('.match-info');

  if (!match) {
    notFound.classList.remove('hidden');
    videoContainer.classList.add('hidden');
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
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = getEmbedUrl(match.videoUrl);
  videoPlayer.title = match.title;

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
  document.getElementById('moreDayMatches').href = `day.html?day=${match.day}`;
  document.getElementById('moreDayMatches').innerHTML = `
    ${icons.play}
    More Day ${match.day} Matches
  `;
}
