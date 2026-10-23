
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    renderDashboard();
    renderLibrosTable();
    renderLectoresTable();
    renderPrestamosTable();
    populateSelects();
}


function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-700', 'text-white', 'shadow-inner');
        btn.classList.add('text-indigo-100', 'hover:bg-indigo-600');
    });

    const selectedTab = document.getElementById(`tab-${tabId}`);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-indigo-100', 'hover:bg-indigo-600');
        activeBtn.classList.add('bg-indigo-700', 'text-white', 'shadow-inner');
    }

    if (tabId === 'dashboard') renderDashboard();
    if (tabId === 'libros') renderLibrosTable();
    if (tabId === 'lectores') renderLectoresTable();
    if (tabId === 'prestamos') renderPrestamosTable();
}

// Renderizado del Dashboard y Métricas
function renderDashboard() {
    const totalLibros = librosData.reduce((acc, lib) => acc + lib.stockTotal, 0);
    const disponibles = librosData.reduce((acc, lib) => acc + lib.stock, 0);
    const prestados = totalLibros - disponibles;
    const lectoresActivos = lectoresData.filter(l => l.estado === 'Activo').length;
    const prestamosVencidos = prestamosData.filter(p => p.estado === 'Vencido').length;

    document.getElementById('dash-total-libros').textContent = totalLibros;
    document.getElementById('dash-prestados').textContent = prestados;
    document.getElementById('dash-lectores').textContent = lectoresActivos;
    document.getElementById('dash-vencidos').textContent = prestamosVencidos;
}


function renderLibrosTable() {
    const tbody = document.getElementById('tbody-libros');
    const searchVal = (document.getElementById('search-libro')?.value || '').toLowerCase();
    const catVal = document.getElementById('filter-categoria')?.value || 'Todas';

    if (!tbody) return;

    let filtrados = librosData.filter(item => {
        const coincideTexto = item.codigo.toLowerCase().includes(searchVal) ||
                              item.titulo.toLowerCase().includes(searchVal) ||
                              item.autor.toLowerCase().includes(searchVal);
        const coincideCat = catVal === 'Todas' || item.categoria === catVal;
        return coincideTexto && coincideCat;
    });

    tbody.innerHTML = '';

    if (filtrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No se encontraron libros.</td></tr>`;
        return;
    }

    filtrados.forEach(item => {
        const stockBadge = item.stock > 0 
            ? `<span class="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full">${item.stock} / ${item.stockTotal} disponibles</span>`
            : `<span class="px-2.5 py-1 text-xs font-semibold text-rose-800 bg-rose-100 rounded-full">Agotado (0/${item.stockTotal})</span>`;

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 transition';
        row.innerHTML = `
            <td class="px-6 py-4 font-mono text-sm font-semibold text-indigo-600">${item.codigo}</td>
            <td class="px-6 py-4 font-medium text-slate-800">${item.titulo}</td>
            <td class="px-6 py-4 text-slate-600">${item.autor}</td>
            <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md">${item.categoria}</span></td>
            <td class="px-6 py-4">${stockBadge}</td>
            <td class="px-6 py-4 text-right">
                <button onclick="prepararPrestamoLibro(${item.id})" class="text-indigo-600 hover:text-indigo-900 text-sm font-semibold inline-flex items-center gap-1 ${item.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}" ${item.stock === 0 ? 'disabled' : ''}>
                    <i class="fa-solid fa-hand-holding-hand"></i> Prestar
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


function renderLectoresTable() {
    const tbody = document.getElementById('tbody-lectores');
    if (!tbody) return;

    tbody.innerHTML = '';
    lectoresData.forEach(item => {
        const estadoBadge = item.estado === 'Activo'
            ? `<span class="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full"><i class="fa-solid fa-check-circle mr-1"></i>Activo</span>`
            : `<span class="px-2.5 py-1 text-xs font-semibold text-rose-800 bg-rose-100 rounded-full"><i class="fa-solid fa-ban mr-1"></i>Suspendido</span>`;

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 transition';
        row.innerHTML = `
            <td class="px-6 py-4 font-mono text-sm font-semibold text-slate-600">${item.codigo}</td>
            <td class="px-6 py-4 font-medium text-slate-800">${item.nombre}</td>
            <td class="px-6 py-4 text-slate-600">${item.email}</td>
            <td class="px-6 py-4 text-slate-600">${item.telefono}</td>
            <td class="px-6 py-4 text-center font-semibold text-slate-700">${item.prestamosActivos}</td>
            <td class="px-6 py-4">${estadoBadge}</td>
        `;
        tbody.appendChild(row);
    });
}

// Renderizado de Tabla de Préstamos
function renderPrestamosTable() {
    const tbody = document.getElementById('tbody-prestamos');
    if (!tbody) return;

    tbody.innerHTML = '';
    prestamosData.forEach(item => {
        let estadoBadge = '';
        if (item.estado === 'Activo') {
            estadoBadge = `<span class="px-2.5 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full"><i class="fa-solid fa-clock mr-1"></i>En Regla</span>`;
        } else if (item.estado === 'Vencido') {
            estadoBadge = `<span class="px-2.5 py-1 text-xs font-semibold text-rose-800 bg-rose-100 rounded-full"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Vencido</span>`;
        } else {
            estadoBadge = `<span class="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full"><i class="fa-solid fa-check-double mr-1"></i>Devuelto</span>`;
        }

        const btnDevolver = item.estado !== 'Devuelto' 
            ? `<button onclick="marcarDevolucion(${item.id})" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm inline-flex items-center gap-1">
                <i class="fa-solid fa-rotate-left"></i> Marcar Devuelto
               </button>`
            : `<span class="text-xs text-slate-400 italic">Finalizado</span>`;

        const row = document.createElement('tr');
        row.className = 'hover:bg-slate-50 transition';
        row.innerHTML = `
            <td class="px-6 py-4 font-mono text-sm font-semibold text-indigo-600">${item.codigo}</td>
            <td class="px-6 py-4 font-medium text-slate-800">${item.libroTitulo}</td>
            <td class="px-6 py-4 text-slate-700">${item.lectorNombre}</td>
            <td class="px-6 py-4 text-slate-600">${item.fechaPrestamo}</td>
            <td class="px-6 py-4 text-slate-600">${item.fechaDevolucion}</td>
            <td class="px-6 py-4">${estadoBadge}</td>
            <td class="px-6 py-4 text-right">${btnDevolver}</td>
        `;
        tbody.appendChild(row);
    });
}


function guardarNuevoLibro(e) {
    e.preventDefault();
    const titulo = document.getElementById('nuevo-titulo').value.trim();
    const autor = document.getElementById('nuevo-autor').value.trim();
    const categoria = document.getElementById('nueva-categoria').value;
    const stock = parseInt(document.getElementById('nuevo-stock').value, 10);

    if (!titulo || !autor || isNaN(stock)) {
        showToast('Por favor completa todos los campos correctamente.', 'error');
        return;
    }

    const newId = librosData.length + 1;
    const newCode = `LIB-${String(newId).padStart(3, '0')}`;

    librosData.push({
        id: newId,
        codigo: newCode,
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        stock: stock,
        stockTotal: stock
    });

    closeModal('modal-libro');
    document.getElementById('form-nuevo-libro').reset();
    renderLibrosTable();
    renderDashboard();
    populateSelects();
    showToast(`¡Libro "${titulo}" guardado exitosamente!`, 'success');
}


function guardarNuevoPrestamo(e) {
    e.preventDefault();
    const libroId = parseInt(document.getElementById('select-prestamo-libro').value, 10);
    const lectorId = parseInt(document.getElementById('select-prestamo-lector').value, 10);
    const fechaDev = document.getElementById('prestamo-fecha-dev').value;

    const libro = librosData.find(l => l.id === libroId);
    const lector = lectoresData.find(l => l.id === lectorId);

    if (!libro || !lector) {
        showToast('Selección inválida de libro o lector.', 'error');
        return;
    }

    if (libro.stock <= 0) {
        showToast('Este libro no posee unidades disponibles en stock.', 'error');
        return;
    }

    if (lector.estado !== 'Activo') {
        showToast('El lector seleccionado se encuentra suspendido.', 'error');
        return;
    }

    libro.stock -= 1;
    lector.prestamosActivos += 1;

    const today = new Date().toISOString().split('T')[0];
    const newId = prestamosData.length + 1;
    const newCode = `PRE-${String(newId).padStart(3, '0')}`;

    prestamosData.unshift({
        id: newId,
        codigo: newCode,
        libroId: libro.id,
        libroTitulo: libro.titulo,
        lectorId: lector.id,
        lectorNombre: lector.nombre,
        fechaPrestamo: today,
        fechaDevolucion: fechaDev || today,
        estado: 'Activo'
    });

    closeModal('modal-prestamo');
    renderLibrosTable();
    renderLectoresTable();
    renderPrestamosTable();
    renderDashboard();
    showToast('Préstamo registrado con éxito.', 'success');
}


function marcarDevolucion(prestamoId) {
    const prestamo = prestamosData.find(p => p.id === prestamoId);
    if (!prestamo || prestamo.estado === 'Devuelto') return;

    prestamo.estado = 'Devuelto';

    const libro = librosData.find(l => l.id === prestamo.libroId);
    if (libro && libro.stock < libro.stockTotal) {
        libro.stock += 1;
    }

    const lector = lectoresData.find(l => l.id === prestamo.lectorId);
    if (lector && lector.prestamosActivos > 0) {
        lector.prestamosActivos -= 1;
    }

    renderPrestamosTable();
    renderLibrosTable();
    renderLectoresTable();
    renderDashboard();
    showToast(`Devolución de "${prestamo.libroTitulo}" completada.`, 'success');
}

function prepararPrestamoLibro(libroId) {
    switchTab('prestamos');
    openModal('modal-prestamo');
    const select = document.getElementById('select-prestamo-libro');
    if (select) {
        select.value = libroId;
    }
}

function populateSelects() {
    const selectLibro = document.getElementById('select-prestamo-libro');
    const selectLector = document.getElementById('select-prestamo-lector');

    if (selectLibro) {
        selectLibro.innerHTML = '';
        librosData.filter(l => l.stock > 0).forEach(lib => {
            selectLibro.innerHTML += `<option value="${lib.id}">${lib.codigo} - ${lib.titulo} (Stock: ${lib.stock})</option>`;
        });
    }

    if (selectLector) {
        selectLector.innerHTML = '';
        lectoresData.filter(l => l.estado === 'Activo').forEach(lec => {
            selectLector.innerHTML += `<option value="${lec.id}">${lec.codigo} - ${lec.nombre}</option>`;
        });
    }
}

function openModal(modalId) {
    populateSelects();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-indigo-600';

    toast.className = `${bg} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 transform transition duration-300 ease-out translate-y-2 opacity-0`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i>
        <span class="text-sm font-medium">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}