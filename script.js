const coursesData = [
    {
        id: 1,
        title: "Introdução à Ciência de Dados",
        category: "Tecnologia",
        description: "Aprenda os fundamentos de Python, Pandas e visualização de dados para análise exploratória.",
        date: "12/08/2024",
        time: "19:00 - 22:00",
        location: "Lab 03 - Bloco C",
        type: "Presencial",
        typeClass: "bg-purple-100 text-purple-700 border-purple-200",
        hours: "40h",
        prerequisites: ["Lógica de Programação", "Estatística Básica"],
        enrolled: false
    },
    {
        id: 2,
        title: "Redação Acadêmica e ABNT",
        category: "Pesquisa",
        description: "Domine a estruturação de artigos científicos, citações e referências conforme normas vigentes.",
        date: "14/08/2024",
        time: "14:00 - 18:00",
        location: "Google Meet",
        type: "Remoto",
        typeClass: "bg-green-100 text-green-700 border-green-200",
        hours: "20h",
        prerequisites: [],
        enrolled: false
    },
    {
        id: 3,
        title: "Gestão Ágil com Scrum",
        category: "Gestão",
        description: "Workshop prático sobre frameworks ágeis para gestão de projetos e equipes multidisciplinares.",
        date: "20/08/2024",
        time: "08:00 - 12:00",
        location: "Auditório Central",
        type: "Presencial",
        typeClass: "bg-purple-100 text-purple-700 border-purple-200",
        hours: "12h",
        prerequisites: ["Fundamentos de Engenharia de Software"],
        enrolled: false
    },
    {
        id: 4,
        title: "Inovação e Startups",
        category: "Empreendedorismo",
        description: "Do zero ao MVP: metodologias para tirar sua ideia do papel e validar modelos de negócio.",
        date: "25/08/2024",
        time: "19:00 - 21:00",
        location: "Sala Multimídia",
        type: "Híbrido",
        typeClass: "bg-blue-100 text-blue-700 border-blue-200",
        hours: "30h",
        prerequisites: [],
        enrolled: false
    },
    {
        id: 5,
        title: "Oratória e Comunicação",
        category: "Soft Skills",
        description: "Técnicas para falar em público, montar apresentações impactantes e defender teses.",
        date: "01/09/2024",
        time: "09:00 - 17:00",
        location: "Anfiteatro B",
        type: "Presencial",
        typeClass: "bg-purple-100 text-purple-700 border-purple-200",
        hours: "8h",
        prerequisites: [],
        enrolled: false
    }
];

function renderCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    coursesData.forEach(course => {
        const card = document.createElement('div');
        card.className = `bg-white border border-gray-200 rounded-lg p-6 hover:border-uni-500 transition-all duration-200 flex flex-col h-full`;
        
        let prereqHtml = '';
        if(course.prerequisites && course.prerequisites.length > 0) {
            prereqHtml = `
                <div class="mt-3 mb-1">
                        <span class="inline-block bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded border border-amber-100 font-medium">
                        <span class="font-bold">Pré-requisito:</span> ${course.prerequisites[0]}${course.prerequisites.length > 1 ? ' + ' + (course.prerequisites.length - 1) + ' outro(s)' : ''}
                        </span>
                </div>
                `;
        } else {
            prereqHtml = `<div class="mt-3 mb-1"><span class="text-xs text-gray-400 italic">Livre / Sem pré-requisitos</span></div>`;
        }
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    ${course.category}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${course.typeClass}">
                    ${course.type}
                </span>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 mb-1 leading-tight">${course.title}</h3>
            <p class="text-sm text-gray-500 mb-2 flex-grow line-clamp-2">${course.description}</p>
            
            ${prereqHtml}
        
            <div class="space-y-2 mb-6 pt-4 border-t border-gray-100 mt-auto">
                <div class="flex items-center text-sm text-gray-600">
                    <svg class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ${course.date} &bull; ${course.time}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                    <svg class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    ${course.location}
                </div>
            </div>
        
            <div class="flex space-x-3">
                <button onclick="openDetails(${course.id})" class="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uni-500">
                    Saiba Mais
                </button>
                ${course.enrolled 
        ? `<button disabled class="flex-1 py-2 px-3 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 cursor-default opacity-90">Inscrito</button>`
        : `<button onclick="openEnrollment(${course.id})" class="flex-1 py-2 px-3 border border-transparent rounded-md text-sm font-medium text-white bg-uni-600 hover:bg-uni-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uni-500">Inscrever-se</button>`
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
    
    const oldList = container.querySelectorAll('.enrolled-item');
    oldList.forEach(el => el.remove());
    
    const myCourses = coursesData.filter(c => c.enrolled);
    const countBadge = document.getElementById('enrollment-count');
    
    if (myCourses.length > 0) {
        emptyState.classList.add('hidden');
        if(countBadge) {
            countBadge.innerText = myCourses.length;
            countBadge.classList.remove('hidden');
        }
        
        myCourses.forEach(course => {
            const item = document.createElement('div');
            item.className = 'enrolled-item bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between hover:border-gray-300 transition-colors';
            item.innerHTML = `
                <div class="flex-1 min-w-0 mb-4 md:mb-0">
                    <div class="flex items-center mb-1">
                        <h4 class="text-lg font-bold text-gray-900 truncate">${course.title}</h4>
                        <span class="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Confirmado
                        </span>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                        <span class="flex items-center mt-1 sm:mt-0">
                            <svg class="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            ${course.date}
                        </span>
                        <span class="flex items-center mt-1 sm:mt-0">
                            <svg class="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            ${course.hours} certificadas
                        </span>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <button class="text-uni-600 hover:text-uni-800 text-sm font-medium">Emitir Comprovante</button>
                    <button onclick="cancelEnrollment(${course.id})" class="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 border border-transparent hover:bg-red-50 rounded transition-colors">Cancelar</button>
                </div>
            `;
            container.appendChild(item);
        });
    } else {
        emptyState.classList.remove('hidden');
        if(countBadge) countBadge.classList.add('hidden');
    }
}

function switchTab(tabName) {
    const btnAvailable = document.getElementById('tab-available');
    const btnMy = document.getElementById('tab-my-courses');
    const viewAvailable = document.getElementById('view-available');
    const viewMy = document.getElementById('view-my-courses');
    
    if (!btnAvailable || !btnMy || !viewAvailable || !viewMy) return;
    
    if (tabName === 'available') {
        btnAvailable.classList.add('border-uni-500', 'text-uni-600');
        btnAvailable.classList.remove('border-transparent', 'text-gray-500');
        
        btnMy.classList.remove('border-uni-500', 'text-uni-600');
        btnMy.classList.add('border-transparent', 'text-gray-500');
        
        viewAvailable.classList.remove('hidden');
        viewMy.classList.add('hidden');
        renderCourses();
    } else {
        btnMy.classList.add('border-uni-500', 'text-uni-600');
        btnMy.classList.remove('border-transparent', 'text-gray-500');
        
        btnAvailable.classList.remove('border-uni-500', 'text-uni-600');
        btnAvailable.classList.add('border-transparent', 'text-gray-500');
        
        viewMy.classList.remove('hidden');
        viewAvailable.classList.add('hidden');
        renderMyCourses();
    }
}

let currentCourseId = null;

function openEnrollment(id) {
    currentCourseId = id;
    const course = coursesData.find(c => c.id === id);
    if (!course) return;
    
    const modalTitle = document.getElementById('modal-course-name');
    if(modalTitle) modalTitle.innerText = course.title;
    
    const warningEl = document.getElementById('modal-prereq-warning');
    if (warningEl) {
        if (course.prerequisites && course.prerequisites.length > 0) {
            warningEl.innerHTML = `<svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span><strong>Requer Pré-requisitos:</strong> ${course.prerequisites.join(', ')}.</span>`;
            warningEl.classList.remove('hidden');
        } else {
            warningEl.classList.add('hidden');
        }
    }
    
    const modal = document.getElementById('enrollment-modal');
    if(modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('enrollment-modal');
    const form = document.getElementById('enrollment-form');
    if(modal) modal.classList.add('hidden');
    if(form) form.reset();
    currentCourseId = null;
}

const enrollmentForm = document.getElementById('enrollment-form');
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const course = coursesData.find(c => c.id === currentCourseId);
        if (course) {
            course.enrolled = true;
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = "Processando...";
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

function cancelEnrollment(id) {
    if(confirm('Tem certeza que deseja cancelar sua inscrição?')) {
        const course = coursesData.find(c => c.id === id);
        if (course) {
            course.enrolled = false;
            renderMyCourses();
        }
    }
}

function openDetails(id) {
    const course = coursesData.find(c => c.id === id);
    const content = document.getElementById('details-content');
    if (!content || !course) return;
    
    let prereqList = '';
    if (course.prerequisites && course.prerequisites.length > 0) {
        prereqList = `
            <div class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h5 class="text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Pré-requisitos Obrigatórios</h5>
                <ul class="list-disc pl-5 text-sm text-amber-900 space-y-1">
                    ${course.prerequisites.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        prereqList = `
            <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p class="text-sm text-green-800 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Não há pré-requisitos para este curso. Aberto a todos os períodos.
                </p>
            </div>
        `;
    }
    
    content.innerHTML = `
        <span class="inline-block py-1 px-2 rounded bg-gray-100 text-gray-600 text-xs font-bold mb-3 tracking-wide uppercase">${course.category}</span>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">${course.title}</h2>
        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div class="bg-gray-50 p-3 rounded border border-gray-100">
                <span class="block text-gray-500">Data</span>
                <span class="font-medium text-gray-900">${course.date}</span>
            </div>
            <div class="bg-gray-50 p-3 rounded border border-gray-100">
                <span class="block text-gray-500">Carga Horária</span>
                <span class="font-medium text-gray-900">${course.hours}</span>
            </div>
            <div class="bg-gray-50 p-3 rounded border border-gray-100">
                <span class="block text-gray-500">Local</span>
                <span class="font-medium text-gray-900">${course.location}</span>
            </div>
                <div class="bg-gray-50 p-3 rounded border border-gray-100">
                <span class="block text-gray-500">Formato</span>
                <span class="font-medium text-gray-900">${course.type}</span>
            </div>
        </div>
        
        <h4 class="font-bold text-gray-900 mb-2">Sobre a atividade</h4>
        <p class="text-gray-600 mb-2 leading-relaxed">
            ${course.description}
        </p>
        <p class="text-gray-600 mb-6 leading-relaxed">
            Este curso foi desenhado para alunos que desejam aprofundar conhecimentos práticos. Contará com instrutores convidados e material de apoio digital.
        </p>
    
        ${prereqList}
    
        <div class="mt-6 pt-4 border-t border-gray-100">
            <p class="text-xs text-gray-400">
                <strong>Certificação:</strong> A emissão do certificado está condicionada a 75% de presença e entrega da atividade final.
            </p>
        </div>
    `;
    
    const modal = document.getElementById('details-modal');
    if(modal) modal.classList.remove('hidden');
}

function closeDetails() {
    const modal = document.getElementById('details-modal');
    if(modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});
