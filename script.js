const USERS_KEY = 'portalUfuUsers';
const SESSION_KEY = 'portalUfuSession';
const COURSES_KEY = 'portalUfuCourses';
const PROFILE_KEY_PREFIX = 'portalUfuProfile:';
const DEPT_OPTIONS = [
	'Agronomia - ICIAG',
	'Engenharia de Agrimensura e Cartográfica - IG',
	'Engenharia Florestal - ICIAG',
	'Geologia - IG',
	'Sistemas de Informação - FACOM',
	'Diretoria de Extensão e Cultura (DIRC)',
];
const PREREQ_OPTIONS = [
	'Mínimo 2º período',
	'Conhecimento em Java',
	'Algoritmos e Estruturas de Dados',
	'Banco de Dados básico',
	'Inglês técnico',
	'Experiência em pesquisa',
	'Disponibilidade noturna',
];
let adminPrereqSelected = new Set();

function getSeedUsers() {
	if (Array.isArray(window.USERS_SEED)) {
		return window.USERS_SEED.map((u) => ({ ...u }));
	}
	return [];
}

function mergeSeedUsers(users) {
	const seed = getSeedUsers();
	if (!seed.length) return users;
	const existing = users || [];
	const byEmail = new Map(
		existing.map((u) => [(u.email || '').toLowerCase(), { ...u }]),
	);
	seed.forEach((s) => {
		const key = (s.email || '').toLowerCase();
		if (!byEmail.has(key)) {
			byEmail.set(key, { ...s });
		}
	});
	return Array.from(byEmail.values());
}

function nextUserId(list) {
	return list.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}

const seedCourses = [
	{
		id: 1,
		title: 'Introdução à Ciência de Dados',
		category: 'Tecnologia',
		description:
		'Aprenda os fundamentos de Python, Pandas e visualização de dados para análise exploratória.',
		date: '12/08/2024',
		time: '19:00 - 22:00',
		location: 'Lab 03 - Bloco C',
		type: 'Presencial',
		typeClass: 'type-presencial',
		hours: '40h',
		prerequisites: ['Lógica de Programação', 'Estatística Básica'],
		enrolled: false,
	},
	{
		id: 2,
		title: 'Redação Acadêmica e ABNT',
		category: 'Pesquisa',
		description:
		'Domine a estruturação de artigos científicos, citações e referências conforme normas vigentes.',
		date: '14/08/2024',
		time: '14:00 - 18:00',
		location: 'Google Meet',
		type: 'Remoto',
		typeClass: 'type-remoto',
		hours: '20h',
		prerequisites: [],
		enrolled: false,
	},
	{
		id: 3,
		title: 'Gestão Ágil com Scrum',
		category: 'Gestão',
		description:
		'Workshop prático sobre frameworks ágeis para gestão de projetos e equipes multidisciplinares.',
		date: '20/08/2024',
		time: '08:00 - 12:00',
		location: 'Auditório Central',
		type: 'Presencial',
		typeClass: 'type-presencial',
		hours: '12h',
		prerequisites: ['Fundamentos de Engenharia de Software'],
		enrolled: false,
	},
	{
		id: 4,
		title: 'Inovação e Startups',
		category: 'Empreendedorismo',
		description:
		'Do zero ao MVP: metodologias para tirar sua ideia do papel e validar modelos de negócio.',
		date: '25/08/2024',
		time: '19:00 - 21:00',
		location: 'Sala Multimídia',
		type: 'Híbrido',
		typeClass: 'type-hibrido',
		hours: '30h',
		prerequisites: [],
		enrolled: false,
	},
	{
		id: 5,
		title: 'Oratória e Comunicação',
		category: 'Soft Skills',
		description:
		'Técnicas para falar em público, montar apresentações impactantes e defender teses.',
		date: '01/09/2024',
		time: '09:00 - 17:00',
		location: 'Anfiteatro B',
		type: 'Presencial',
		typeClass: 'type-presencial',
		hours: '8h',
		prerequisites: [],
		enrolled: false,
	},
];

let coursesData = [];
let currentCourseId = null;
let deleteCourseId = null;
let cancelCourseId = null;
let editCourseId = null;

function loadCourses() {
	try {
		const stored = localStorage.getItem(COURSES_KEY);
		if (stored) {
			coursesData = JSON.parse(stored);
			return;
		}
	} catch (_) {
		// ignore parse errors
	}
	coursesData = seedCourses.map((c) => ({ ...c }));
}

function saveCourses() {
	localStorage.setItem(COURSES_KEY, JSON.stringify(coursesData));
}

function getUsers() {
	try {
		const stored = localStorage.getItem(USERS_KEY);
		if (stored) {
			const list = JSON.parse(stored);
			if (Array.isArray(list) && list.length) {
				return mergeSeedUsers(list).map((u) => ({ ...u }));
			}
		}
	} catch (_) {
		// ignore
	}
	const seeded = getSeedUsers();
	if (seeded.length) {
		const merged = mergeSeedUsers(seeded);
		saveUsers(merged);
		return merged;
	}
	return [];
}

function saveUsers(users) {
	let maxId = (users || []).reduce((max, u) => Math.max(max, u.id || 0), 0);
	const withIds = [];
	(users || []).forEach((u) => {
		const copy = { ...u };
		if (!copy.id) {
			maxId += 1;
			copy.id = maxId;
		}
		withIds.push(copy);
	});
	localStorage.setItem(USERS_KEY, JSON.stringify(withIds));
}

function ensureDefaultUsers() {
	let users = getUsers();
	users = mergeSeedUsers(users);
	const hasAdmin = users.some(
		(u) => (u.email || '').toLowerCase() === 'admin@ufu.br',
	);
	if (!hasAdmin) {
		users.push({
			id: 1,
			email: 'admin@ufu.br',
			password: 'tms-melhor-disciplina',
			name: 'Administrador',
			role: 'admin',
			phone: '(34) 0000-0000',
			department: 'Diretoria de Extensão e Cultura (DIRC)',
		});
	} else {
		users.forEach((u) => {
			if ((u.email || '').toLowerCase() === 'admin@ufu.br' && !u.id) {
				u.id = 1;
			}
		});
	}
	// Ensure all users have ids and persist
	saveUsers(users);
}

function profileKey(email) {
	return `${PROFILE_KEY_PREFIX}${email || 'anon'}`;
}

function loadSession() {
	try {
		const stored = localStorage.getItem(SESSION_KEY);
		if (stored) return JSON.parse(stored);
	} catch (_) {
		// ignore
	}
	return null;
}

function saveSession(session) {
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
	localStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
	return loadSession();
}

function updateNavUser() {
	const session = getCurrentUser();
	const profile = session ? loadProfileData(session.email) : null;
	const nameEl = document.querySelector('.user-name');
	const emailHeader = document.querySelector(
		'#user-email-text .user-email-value',
	);
	const authCta = document.getElementById('nav-auth-cta');
	const userDropdown = document.getElementById('nav-user-dropdown');
	const headerAvatar = document.querySelector('.user-avatar');
	
	const formatName = (full) => {
		const parts = (full || '').trim().split(' ').filter(Boolean);
		if (parts.length === 0) return 'Aluno';
		if (parts.length === 1) return parts[0];
		return `${parts[0]} ${parts[1][0]}.`;
	};
	
	const displayName = profile?.name || session?.name || '';
	
	if (nameEl) nameEl.textContent = formatName(displayName);
	if (emailHeader)
		emailHeader.textContent = session?.email || 'estudante@ufu.br';
	if (headerAvatar) {
		headerAvatar.src = buildInitialsImage(displayName || 'Aluno');
	}
	
	if (authCta && userDropdown) {
		if (session) {
			authCta.classList.add('hidden');
			userDropdown.classList.remove('hidden');
		} else {
			authCta.classList.remove('hidden');
			userDropdown.classList.add('hidden');
		}
	}
}

function loadProfileData(email) {
	try {
		const stored = localStorage.getItem(profileKey(email));
		if (stored) return JSON.parse(stored);
	} catch (_) {
		// ignore
	}
	return null;
}

function saveProfileData(email, data) {
	localStorage.setItem(profileKey(email), JSON.stringify(data));
}

function mapTypeClass(type) {
	const normalized = (type || '').toLowerCase();
	if (normalized.includes('remoto') || normalized.includes('online')) return 'type-remoto';
	if (normalized.includes('híbrido') || normalized.includes('hibrido'))
		return 'type-hibrido';
	return 'type-presencial';
}

function renderPrereqChips() {
	const container = document.getElementById('admin-prereq-chips');
	if (!container) return;
	container.innerHTML = '';
	adminPrereqSelected.forEach((value) => {
		const chip = document.createElement('span');
		chip.className = 'admin-chip';
		chip.textContent = value;
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'chip-remove';
		btn.textContent = '×';
		btn.addEventListener('click', () => {
			adminPrereqSelected.delete(value);
			renderPrereqChips();
		});
		chip.appendChild(btn);
		container.appendChild(chip);
	});
}

function initPrereqSelect() {
	const select = document.getElementById('admin-prereq-select');
	if (!select) return;
	select.addEventListener('change', () => {
		const val = select.value;
		if (!val) return;
		if (adminPrereqSelected.has(val)) {
			adminPrereqSelected.delete(val);
		} else {
			adminPrereqSelected.add(val);
		}
		renderPrereqChips();
	});
}

function getCurrentEnrollments() {
	const session = getCurrentUser();
	if (!session) return [];
	const profile = loadProfileData(session.email) || {};
	return profile.enrollments || [];
}

function applyEnrollmentsToCourses() {
	const enrolledSet = new Set(getCurrentEnrollments());
	coursesData = coursesData.map((c) => ({
		...c,
		enrolled: enrolledSet.has(c.id),
	}));
}

function formatPhone(value) {
	const digits = (value || '').replace(/\D/g, '').slice(0, 11);
	if (!digits) return '';
	if (digits.length <= 2) return `(${digits}`;
	if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	if (digits.length <= 10)
		return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildInitialsImage(name) {
	const parts = (name || 'UFU')
	.split(' ')
	.map((p) => p.trim())
	.filter(Boolean);
	const initials = parts
	.map((p, idx) => (idx < 2 ? p[0] : ''))
	.join('')
	.slice(0, 2)
	.toUpperCase() || 'UF';
	
	const canvas = document.createElement('canvas');
	const size = 120;
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d');
	const gradient = ctx.createLinearGradient(0, 0, size, size);
	gradient.addColorStop(0, '#0ea5e9');
	gradient.addColorStop(1, '#0284c7');
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = '#fff';
	ctx.font = 'bold 48px Inter, sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(initials, size / 2, size / 2);
	return canvas.toDataURL('image/png');
}

function renderCourses() {
	const grid = document.getElementById('courses-grid');
	if (!grid) return;
	applyEnrollmentsToCourses();
	grid.innerHTML = '';
	
	coursesData.forEach((course) => {
		const card = document.createElement('div');
		card.className = 'course-card';
		const isAdmin = getCurrentUser()?.role === 'admin';
		
		let prereqHtml = '';
		if (course.prerequisites && course.prerequisites.length > 0) {
			prereqHtml = `
        <div class="course-prereq">
          <span class="prereq-tag">
            <span class="prereq-label">Pré-requisito:</span> ${
			course.prerequisites[0]
		}${
			course.prerequisites.length > 1
			? ' + ' + (course.prerequisites.length - 1) + ' outro(s)'
			: ''
		}
          </span>
        </div>
      `;
	} else {
		prereqHtml = `<div class="course-prereq"><span class="course-free">Livre / Sem pré-requisitos</span></div>`;
	}
	
	card.innerHTML = `
      <div class="course-card-header">
        <div class="badge-group">
          <span class="badge category-badge">
              ${course.category || 'Geral'}
          </span>
          <span class="badge type-badge ${ 
	course.typeClass || mapTypeClass(course.type)
}">
              ${course.type || 'Presencial'}
          </span>
        </div>
        ${
isAdmin
? `<div class="card-actions">
                 <button class="card-icon-btn card-edit-btn" onclick="openEditModal(${course.id})" title="Editar evento">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M12 20h9"></path>
                     <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                   </svg>
                 </button>
                 <button class="card-icon-btn" onclick="openDeleteModal(${course.id})" title="Excluir evento">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path>
                   </svg>
                 </button>
               </div>`
: ''
}
      </div>

      <h3 class="course-title">${course.title}</h3>
      <p class="course-desc">${course.description || ''}</p>

      ${prereqHtml}

      <div class="course-meta">
        <div class="course-meta-item">
            <svg class="course-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ${course.date} • ${course.time}
        </div>
        <div class="course-meta-item">
            <svg class="course-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            ${course.location}
        </div>
      </div>

      <div class="course-actions">
        <button onclick="openDetails(${course.id})" class="btn btn-secondary" id="btn-more-info">
            Saiba Mais
        </button>
        ${
course.enrolled
? `<button disabled class="btn btn-success">Inscrito</button>`
: `<button onclick="openEnrollment(${course.id})" class="btn btn-primary">Inscrever-se</button>`
}
      </div>
    `;
grid.appendChild(card);
});
}

function renderMyCourses() {
	const container = document.getElementById('enrolled-container');
	const emptyState = document.getElementById('empty-state');
	if (!container || !emptyState) return;
	
	applyEnrollmentsToCourses();
	const oldList = container.querySelectorAll('.enrolled-item');
	oldList.forEach((el) => el.remove());
	
	const myCourses = coursesData.filter((c) => c.enrolled);
	const countBadge = document.getElementById('enrollment-count');
	
	if (myCourses.length > 0) {
		emptyState.classList.add('hidden');
		if (countBadge) {
			countBadge.innerText = myCourses.length;
			countBadge.classList.remove('hidden');
		}
		
		myCourses.forEach((course) => {
			const item = document.createElement('div');
			item.className = 'enrolled-item';
			item.innerHTML = `
        <div class="enrolled-info">
          <div class="enrolled-title-row">
            <h4 class="enrolled-title">${course.title}</h4>
            <span class="status-badge">Confirmado</span>
          </div>
          <div class="enrolled-meta">
            <span class="enrolled-meta-item">
              <svg class="course-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              ${course.date}
            </span>
            <span class="enrolled-meta-item">
              <svg class="course-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ${course.hours} certificadas
            </span>
          </div>
        </div>
        <div class="enrolled-actions">
          <button class="link-button">Emitir Comprovante</button>
          <button onclick="openCancelModal(${course.id})" class="link-danger">Cancelar</button>
        </div>
      `;
			container.appendChild(item);
		});
	} else {
		emptyState.classList.remove('hidden');
		if (countBadge) countBadge.classList.add('hidden');
	}
}

function switchTab(tabName) {
	const btnAvailable = document.getElementById('tab-available');
	const btnMy = document.getElementById('tab-my-courses');
	const viewAvailable = document.getElementById('view-available');
	const viewMy = document.getElementById('view-my-courses');
	
	if (!btnAvailable || !btnMy || !viewAvailable || !viewMy) return;
	
	if (tabName === 'available') {
		btnAvailable.classList.add('tab-active');
		btnAvailable.classList.remove('tab-inactive');
		
		btnMy.classList.remove('tab-active');
		btnMy.classList.add('tab-inactive');
		
		viewAvailable.classList.remove('hidden');
		viewMy.classList.add('hidden');
		renderCourses();
	} else {
		btnMy.classList.add('tab-active');
		btnMy.classList.remove('tab-inactive');
		
		btnAvailable.classList.remove('tab-active');
		btnAvailable.classList.add('tab-inactive');
		
		viewMy.classList.remove('hidden');
		viewAvailable.classList.add('hidden');
		renderMyCourses();
	}
}

function openEnrollment(id) {
	const session = getCurrentUser();
	if (!session) {
		alert('Faça login para se inscrever.');
		window.location.href = 'login.html';
		return;
	}
	
	currentCourseId = id;
	const course = coursesData.find((c) => c.id === id);
	if (!course) return;
	
	const modalTitle = document.getElementById('modal-course-name');
	if (modalTitle) modalTitle.innerText = course.title;
	
	const warningEl = document.getElementById('modal-prereq-warning');
	if (warningEl) {
		if (course.prerequisites && course.prerequisites.length > 0) {
			warningEl.innerHTML = `<svg class="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span><strong>Requer Pré-requisitos:</strong> ${course.prerequisites.join(
			', ',
		)}.</span>`;
		warningEl.classList.remove('hidden');
	} else {
		warningEl.classList.add('hidden');
	}
}

const modal = document.getElementById('enrollment-modal');
if (modal) modal.classList.remove('hidden');
}

function closeModal() {
	const modal = document.getElementById('enrollment-modal');
	const form = document.getElementById('enrollment-form');
	if (modal) modal.classList.add('hidden');
	if (form) form.reset();
	currentCourseId = null;
}

function cancelEnrollment(id) {
	const session = getCurrentUser();
	const enrollments = getCurrentEnrollments().filter((cid) => cid !== id);
	const profile = loadProfileData(session?.email) || {};
	profile.enrollments = enrollments;
	if (session) saveProfileData(session.email, profile);
	applyEnrollmentsToCourses();
	renderMyCourses();
}

function openDeleteModal(courseId) {
	const session = getCurrentUser();
	if (!session || session.role !== 'admin') {
		alert('Apenas administradores podem excluir eventos.');
		return;
	}
	deleteCourseId = courseId;
	const course = coursesData.find((c) => c.id === courseId);
	const titleEl = document.getElementById('delete-course-title');
	if (titleEl && course) titleEl.textContent = course.title;
	const modal = document.getElementById('delete-modal');
	if (modal) modal.classList.remove('hidden');
}

function openEditModal(courseId) {
	const session = getCurrentUser();
	if (!session || session.role !== 'admin') {
		alert('Apenas administradores podem editar eventos.');
		return;
	}
	const course = coursesData.find((c) => c.id === courseId);
	const modal = document.getElementById('admin-modal');
	const form = document.getElementById('admin-form');
	if (!course || !modal || !form) return;
	editCourseId = courseId;
	
	const titleEl = document.querySelector('.admin-modal-title');
	const subtitleEl = document.querySelector('.admin-modal-subtitle');
	const submitBtn = document.querySelector('.admin-submit');
	
	if (titleEl) titleEl.textContent = 'Editar Evento';
	if (subtitleEl) subtitleEl.textContent = 'Atualize e salve para todos os usuários.';
	if (submitBtn) submitBtn.textContent = 'Salvar alterações';
	
	form.querySelector('#admin-title').value = course.title || '';
	form.querySelector('#admin-category').value = course.category || '';
	form.querySelector('#admin-type').value = course.type || 'Presencial';
	form.querySelector('#admin-description').value = course.description || '';
	form.querySelector('#admin-date').value = course.date || '';
	form.querySelector('#admin-time').value = course.time || '';
	form.querySelector('#admin-location').value = course.location || '';
	form.querySelector('#admin-hours').value = course.hours || '';
	const audios = document.querySelectorAll('input[name="admin-audience"]');
	audios.forEach((el) => {
		el.checked = (course.audience || 'todos') === el.value;
	});
	
	adminPrereqSelected = new Set(course.prerequisites || []);
	renderPrereqChips();
	
	modal.classList.remove('hidden');
}

function closeDeleteModal() {
	const modal = document.getElementById('delete-modal');
	if (modal) modal.classList.add('hidden');
	deleteCourseId = null;
}

function openCancelModal(id) {
	const course = coursesData.find((c) => c.id === id);
	cancelCourseId = id;
	const titleEl = document.getElementById('cancel-course-title');
	if (titleEl && course) titleEl.textContent = course.title;
	const modal = document.getElementById('cancel-enrollment-modal');
	if (modal) modal.classList.remove('hidden');
}

function closeCancelModal() {
	const modal = document.getElementById('cancel-enrollment-modal');
	if (modal) modal.classList.add('hidden');
	cancelCourseId = null;
}

function confirmCancelEnrollment() {
	if (!cancelCourseId) return;
	cancelEnrollment(cancelCourseId);
	closeCancelModal();
}

function confirmDeleteCourse() {
	if (!deleteCourseId) return;
	coursesData = coursesData.filter((c) => c.id !== deleteCourseId);
	saveCourses();
	renderCourses();
	renderMyCourses();
	closeDeleteModal();
}

function openDetails(id) {
	const course = coursesData.find((c) => c.id === id);
	const content = document.getElementById('details-content');
	if (!content || !course) return;
	
	let prereqList = '';
	if (course.prerequisites && course.prerequisites.length > 0) {
		prereqList = `
            <div class="prereq-block">
                <span class="prereq-heading">PRÉ-REQUISITOS OBRIGATÓRIOS</span>
                <ul class="prereq-list">
                    ${course.prerequisites.map((p) => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
	} else {
		prereqList = `
            <div class="prereq-block green">
                <p class="details-text">
                    <svg class="course-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Não há pré-requisitos para este curso. Aberto a todos os períodos.
                </p>
            </div>
        `;
	}
	
	content.innerHTML = `
        <span class="details-category">${course.category}</span>
        <h2 class="details-title">${course.title}</h2>
        <div class="details-grid">
            <div class="details-item">
                <span>Data</span>
                <strong>${course.date}</strong>
            </div>
            <div class="details-item">
                <span>Carga Horária</span>
                <strong>${course.hours}</strong>
            </div>
            <div class="details-item">
                <span>Local</span>
                <strong>${course.location}</strong>
            </div>
            <div class="details-item">
                <span>Formato</span>
                <strong>${course.type}</strong>
            </div>
        </div>
  
        <h4 class="details-heading">Sobre a atividade</h4>
        <p class="details-text">
            ${course.description}
        </p>
        <p class="details-text">
            Este curso foi desenhado para alunos que desejam aprofundar conhecimentos práticos. Contará com instrutores convidados e material de apoio digital.
        </p>
  
        ${prereqList}
  
        <div class="details-footer">
            <p>
                <strong>Certificação:</strong> A emissão do certificado está condicionada a 75% de presença e entrega da atividade final.
            </p>
        </div>
    `;
	
	const modal = document.getElementById('details-modal');
	if (modal) modal.classList.remove('hidden');
}

function closeDetails() {
	const modal = document.getElementById('details-modal');
	if (modal) modal.classList.add('hidden');
}

function initUserMenu() {
	const toggle = document.getElementById('user-toggle');
	const menu = document.getElementById('user-menu');
	const gotoProfile = document.getElementById('menu-perfil');
	const gotoEnrollments = document.getElementById('menu-inscricoes');
	const gotoLogout = document.getElementById('menu-sair');
	if (!toggle || !menu) return;
	
	const closeMenu = () => {
		menu.classList.add('hidden');
		toggle.setAttribute('aria-expanded', 'false');
	};
	
	toggle.addEventListener('click', (e) => {
		e.stopPropagation();
		const isHidden = menu.classList.contains('hidden');
		if (isHidden) {
			menu.classList.remove('hidden');
			toggle.setAttribute('aria-expanded', 'true');
		} else {
			closeMenu();
		}
	});
	
	document.addEventListener('click', (e) => {
		if (menu.classList.contains('hidden')) return;
		if (!menu.contains(e.target) && !toggle.contains(e.target)) {
			closeMenu();
		}
	});
	
	if (gotoEnrollments) {
		gotoEnrollments.addEventListener('click', (e) => {
			e.preventDefault();
			const main = document.querySelector('.page-main');
			if (typeof switchTab === 'function') switchTab('my-courses');
			if (main) main.scrollIntoView({ behavior: 'smooth' });
			closeMenu();
			if (!document.getElementById('courses-grid')) {
				window.location.href = 'index.html#minhas-inscricoes';
			}
		});
	}
	
	if (gotoProfile) {
		gotoProfile.addEventListener('click', (e) => {
			e.preventDefault();
			closeMenu();
			window.location.href = 'profile.html';
		});
	}
	
	if (gotoLogout) {
		gotoLogout.addEventListener('click', (e) => {
			e.preventDefault();
			clearSession();
			closeMenu();
			window.location.href = 'login.html';
		});
	}
}

function initPasswordToggles() {
	const buttons = document.querySelectorAll('.input-eye, .eye-toggle');
	if (!buttons.length) return;
	buttons.forEach((btn) => {
		const targetId = btn.getAttribute('data-toggle-target');
		const input = document.getElementById(targetId);
		if (!input) return;
		btn.addEventListener('click', () => {
			const isPassword = input.type === 'password';
			input.type = isPassword ? 'text' : 'password';
			btn.innerHTML = isPassword
			? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
			: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
		});
	});
}

function initLoginForm() {
	const form = document.getElementById('loginForm');
	if (!form) return;
	ensureDefaultUsers();
	
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = (document.getElementById('email')?.value || '')
		.trim()
		.toLowerCase();
		const password = document.getElementById('password')?.value || '';
		const users = getUsers();
		const found = users.find(
			(u) => u.email.toLowerCase() === email && u.password === password,
		);
		if (!found) {
			alert(
				'Credenciais inválidas. Use seu e-mail UFU ou admin@ufu.br / tms-melhor-disciplina.',
			);
			return;
		}
		const profile = loadProfileData(found.email);
		const displayName = profile?.name || found.name || 'Aluno';
		const displayPhone = profile?.phone || found.phone || '';
		const displayDept = profile?.department || found.department || '';
		saveSession({
			email: found.email,
			name: displayName,
			role: found.role || 'student',
			phone: displayPhone,
			department: displayDept,
		});
		window.location.href = 'index.html';
	});
}

function initSignupForm() {
	const form = document.getElementById('signupForm');
	if (!form) return;
	ensureDefaultUsers();
	
	const phoneInput = document.getElementById('signup-phone');
	if (phoneInput) {
		phoneInput.addEventListener('input', () => {
			phoneInput.value = formatPhone(phoneInput.value);
		});
	}
	
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = (document.getElementById('signup-name')?.value || '').trim();
		const phone = formatPhone(
			(document.getElementById('signup-phone')?.value || '').trim(),
		);
		const email = (document.getElementById('signup-email')?.value || '')
		.trim()
		.toLowerCase();
		const pass = document.getElementById('signup-pass')?.value || '';
		const pass2 = document.getElementById('signup-pass-confirm')?.value || '';
		
		if (!email.endsWith('@ufu.br')) {
			alert('Use seu e-mail institucional @ufu.br');
			return;
		}
		if (pass.length < 3) {
			alert('A senha deve ter pelo menos 3 caracteres.');
			return;
		}
		if (pass !== pass2) {
			alert('As senhas não coincidem.');
			return;
		}
		const users = getUsers();
		if (users.some((u) => (u.email || '').toLowerCase() === email)) {
			alert('E-mail já cadastrado.');
			return;
		}
		const normalizedEmail = email.toLowerCase();
		const newId = nextUserId(users);
		users.push({
			id: newId,
			email: normalizedEmail,
			password: pass,
			name: name || 'Aluno UFU',
			phone,
			role: 'student',
		});
		saveUsers(users);
		saveSession({
			email: normalizedEmail,
			name: name || 'Aluno UFU',
			role: 'student',
			phone,
			department: 'Diretoria de Extensão e Cultura (DIRC)',
		});
		saveProfileData(normalizedEmail, {
			name: name || 'Aluno UFU',
			phone,
			department: 'Diretoria de Extensão e Cultura (DIRC)',
			email: normalizedEmail,
			enrollments: [],
			passwordChangedAt: Date.now(),
		});
		alert('Conta criada! Você já está autenticado.');
		window.location.href = 'index.html';
	});
}

function renderAdminActions() {
	const container = document.getElementById('admin-actions');
	const session = getCurrentUser();
	if (!container) return;
	container.innerHTML = '';
	if (session?.role !== 'admin') {
		container.classList.add('hidden');
		return;
	}
	container.classList.remove('hidden');
	const btn = document.createElement('button');
	btn.className = 'btn admin-btn';
	btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg><span>Novo Evento</span>`;
	btn.addEventListener('click', openAdminModal);
	container.appendChild(btn);
}

function openAdminModal() {
	const session = getCurrentUser();
	if (!session || session.role !== 'admin') {
		alert('Apenas administradores podem criar eventos.');
		return;
	}
	const modal = document.getElementById('admin-modal');
	const form = document.getElementById('admin-form');
	const titleEl = document.querySelector('.admin-modal-title');
	const subtitleEl = document.querySelector('.admin-modal-subtitle');
	const submitBtn = document.querySelector('.admin-submit');
	if (!modal || !form) return;
	adminPrereqSelected = new Set();
	renderPrereqChips();
	form.reset();
	const typeSelect = form.querySelector('#admin-type');
	if (typeSelect) typeSelect.value = 'Presencial';
	if (titleEl) titleEl.textContent = 'Cadastrar Novo Evento';
	if (subtitleEl) subtitleEl.textContent = 'Preencha os dados abaixo para publicar um evento no portal.';
	if (submitBtn) submitBtn.textContent = 'Cadastrar Evento';
	modal.classList.remove('hidden');
}

function closeAdminModal() {
	const modal = document.getElementById('admin-modal');
	if (modal) modal.classList.add('hidden');
}

function initProfilePage() {
	const page = document.getElementById('profile-page');
	if (!page) return;
	const session = getCurrentUser();
	if (!session) {
		window.location.href = 'login.html';
		return;
	}
	
	const defaults = loadProfileData(session.email) || {
		name: session.name || 'Aluno UFU',
		phone: '',
		department: '',
		email: session.email,
		passwordChangedAt: Date.now(),
	};
	
	if (typeof defaults.passwordChangedAt !== 'number') {
		defaults.passwordChangedAt = Date.now();
	}
	
	const nameInput = document.getElementById('pf-name');
	const phoneInput = document.getElementById('pf-phone');
	const emailInput = document.getElementById('pf-email');
	const deptInput = document.getElementById('pf-dept');
	const avatarInitials = document.getElementById('pf-avatar-initials');
	const headerAvatar = document.querySelector('.user-avatar');
	const pass1 = document.getElementById('pf-pass');
	const pass2 = document.getElementById('pf-pass2');
	const note = document.getElementById('pf-password-note');
	const personalForm = document.getElementById('pf-personal-form');
	const securityForm = document.getElementById('pf-security-form');
	const roleBadge = document.getElementById('pf-role-badge');
	const statusBadge = document.getElementById('pf-status-badge');
	const nameDisplay = document.getElementById('pf-name-display');
	const roleDisplay = document.getElementById('pf-role-display');
	const deptSelect = document.getElementById('pf-dept');
	
	if (deptSelect && deptSelect.options.length === 0) {
		DEPT_OPTIONS.forEach((opt) => {
			const option = document.createElement('option');
			option.value = opt;
			option.textContent = opt;
			deptSelect.appendChild(option);
		});
	}
	
	const roleLabel = session.role === 'admin' ? 'Staff' : 'Estudante';
	if (roleBadge) {
		roleBadge.textContent = roleLabel;
		roleBadge.classList.remove('info', 'student');
		roleBadge.classList.add(session.role === 'admin' ? 'info' : 'student');
	}
	if (statusBadge) statusBadge.textContent = 'Ativo';
	if (nameDisplay) nameDisplay.textContent = defaults.name || session.name || 'Aluno UFU';
	if (roleDisplay) roleDisplay.textContent = defaults.department || 'Departamento';
	if (nameInput) nameInput.value = defaults.name || '';
	if (phoneInput) {
		phoneInput.value = formatPhone(defaults.phone || '');
		phoneInput.addEventListener('input', () => {
			const formatted = formatPhone(phoneInput.value);
			phoneInput.value = formatted;
			defaults.phone = formatted;
		});
	}
	if (emailInput) {
		emailInput.value = defaults.email || session.email || '';
		emailInput.disabled = true;
	}
	if (deptSelect) {
		deptSelect.value = defaults.department || DEPT_OPTIONS[0];
		defaults.department = deptSelect.value;
	}
	const formatChanged = (ts) => {
		const now = Date.now();
		const diff = Math.max(0, now - ts);
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		if (days === 0) return 'Sua senha foi alterada hoje.';
		if (days === 1) return 'Sua senha foi alterada pela última vez há 1 dia.';
		return `Sua senha foi alterada pela última vez há ${days} dias.`;
	};
	
	if (note) note.textContent = formatChanged(defaults.passwordChangedAt);
	
	function setAvatar() {
		if (avatarInitials) {
			const initials =
			(defaults.name || session.name || 'UFU')
			.split(' ')
			.map((p) => p.trim())
			.filter(Boolean)
			.map((p, idx) => (idx < 2 ? p[0] : ''))
			.join('')
			.slice(0, 2)
			.toUpperCase() || 'UF';
			avatarInitials.textContent = initials;
		}
		if (headerAvatar) {
			headerAvatar.src = buildInitialsImage(defaults.name || session.name || 'UFU');
		}
	}
	
	setAvatar();
	
	if (personalForm) {
		personalForm.addEventListener('submit', (e) => {
			e.preventDefault();
			defaults.name = nameInput?.value || '';
			defaults.phone = formatPhone(phoneInput?.value || '');
			if (phoneInput) phoneInput.value = defaults.phone;
			defaults.department = deptSelect?.value || '';
			if (nameDisplay) nameDisplay.textContent = defaults.name || 'Aluno UFU';
			if (roleDisplay) roleDisplay.textContent = defaults.department || 'Departamento';
			const currentSession = loadSession();
			if (currentSession) {
				currentSession.name = defaults.name || currentSession.name;
				saveSession(currentSession);
				updateNavUser();
			}
			saveProfileData(session.email, defaults);
			showProfileToast('Informações salvas');
		});
	}
	
	if (securityForm) {
		securityForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const p1 = pass1?.value || '';
			const p2 = pass2?.value || '';
			if (p1 || p2) {
				if (p1 !== p2) {
					alert('As senhas não coincidem.');
					return;
				}
				const users = getUsers();
				const idx = users.findIndex((u) => (u.email || '').toLowerCase() === session.email.toLowerCase());
				if (idx !== -1) {
					users[idx].password = p1;
					saveUsers(users);
				}
				defaults.passwordChangedAt = Date.now();
				if (note) note.textContent = formatChanged(defaults.passwordChangedAt);
				saveProfileData(session.email, defaults);
				showProfileToast('Informações salvas');
				pass1.value = '';
				pass2.value = '';
			}
		});
	}
	
	const btnSave = document.getElementById('profile-save');
	const btnCancel = document.getElementById('profile-cancel');
	if (btnSave) {
		btnSave.addEventListener('click', () => {
			if (personalForm) personalForm.requestSubmit();
			if (securityForm) securityForm.requestSubmit();
		});
	}
	if (btnCancel) {
		btnCancel.addEventListener('click', () => {
			window.location.href = 'index.html';
		});
	}
}

let toastTimeout = null;
function showProfileToast(message) {
	const toast = document.getElementById('profile-toast');
	if (!toast) return;
	toast.textContent = '';
	toast.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"></path></svg>`);
	toast.insertAdjacentText('beforeend', ` ${message}`);
	toast.classList.add('show');
	if (toastTimeout) clearTimeout(toastTimeout);
	toastTimeout = setTimeout(() => toast.classList.remove('show'), 4000);
}

function handleAdminForm() {
	const form = document.getElementById('admin-form');
	if (!form) return;
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const audienceSelect = document.querySelector('input[name="admin-audience"]:checked');
		const title = (document.getElementById('admin-title')?.value || '').trim();
		const category =
		(document.getElementById('admin-category')?.value || '').trim();
		const description =
		(document.getElementById('admin-description')?.value || '').trim();
		const date = document.getElementById('admin-date')?.value || '';
		const time = document.getElementById('admin-time')?.value || '';
		const location =
		(document.getElementById('admin-location')?.value || '').trim();
		const type = document.getElementById('admin-type')?.value || 'Presencial';
		const hours = (document.getElementById('admin-hours')?.value || '').trim();
		const prereqChecks = Array.from(adminPrereqSelected);
		const audience = audienceSelect ? (audienceSelect.value || '').trim() : 'todos';
		
		if (!title || !category || !description || !date || !time || !location || !hours) {
			alert('Preencha todos os campos obrigatórios.');
			return;
		}
		
		const newCourse = {
			id: Date.now(),
			title,
			category,
			description,
			date,
			time,
			location,
			type,
			typeClass: mapTypeClass(type),
			hours,
			prerequisites: prereqChecks,
			audience,
			enrolled: false,
		};
		if (editCourseId) {
			const idx = coursesData.findIndex((c) => c.id === editCourseId);
			if (idx !== -1) {
				coursesData[idx] = { ...coursesData[idx], ...newCourse, id: editCourseId };
			}
			saveCourses();
			renderCourses();
			renderMyCourses();
			closeAdminModal();
			alert('Evento atualizado.');
		} else {
			coursesData.unshift(newCourse);
			saveCourses();
			renderCourses();
			closeAdminModal();
			alert('Evento criado e publicado.');
		}
	});
}

function handleEnrollmentForm() {
	const enrollmentForm = document.getElementById('enrollment-form');
	if (!enrollmentForm) return;
	enrollmentForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const session = getCurrentUser();
		if (!session) {
			alert('Faça login para se inscrever.');
			window.location.href = 'login.html';
			return;
		}
		const course = coursesData.find((c) => c.id === currentCourseId);
		if (course) {
			course.enrolled = true;
			const enrollments = getCurrentEnrollments();
			if (!enrollments.includes(course.id)) {
				enrollments.push(course.id);
				const profile = loadProfileData(session.email) || {};
				profile.enrollments = enrollments;
				saveProfileData(session.email, profile);
			}
			const btn = e.target.querySelector('button[type="submit"]');
			const originalText = btn.innerText;
			btn.innerText = 'Processando...';
			btn.disabled = true;
			
			setTimeout(() => {
				closeModal();
				btn.innerText = originalText;
				btn.disabled = false;
				switchTab('my-courses');
			}, 800);
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	loadCourses();
	ensureDefaultUsers();
	updateNavUser();
	renderCourses();
	renderAdminActions();
	initUserMenu();
	initPasswordToggles();
	initLoginForm();
	initSignupForm();
	handleEnrollmentForm();
	handleAdminForm();
	initPrereqSelect();
	initProfilePage();
	if (window.location.hash === '#minhas-inscricoes' && document.getElementById('tab-my-courses')) {
		switchTab('my-courses');
		const main = document.querySelector('.page-main');
		if (main) main.scrollIntoView({ behavior: 'smooth' });
	}
});
