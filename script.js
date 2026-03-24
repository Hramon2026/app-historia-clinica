lucide.createIcons();

let doctorData = JSON.parse(localStorage.getItem('trauma_doctor')) || {
    name: "Dr. Xavier Jose Amaya Galanton", mpps: "000000", cm: "000000",
    rif: "V-00000000-0", phone: "0400-0000000", photo: "", bio: "Bienvenido.",
    calendarId: "amayitax63@gmail.com",
    bookingLink: "https://calendar.app.google/czWRUZT5H1CwASkW8"
};
let patients = JSON.parse(localStorage.getItem('trauma_patients')) || [];
let consultations = JSON.parse(localStorage.getItem('trauma_consults_v2')) || [];

const API_KEY = 'AIzaSyBa22pvNsx-YtUXquohULQfqSH2kN6UEpU'; 
const STORAGE_KEY_AGENDA = 'agenda_citas_v1';

function updateDoctorDisplay() {
    document.getElementById('disp-name').innerText = doctorData.name;
    document.getElementById('disp-mpps').innerText = doctorData.mpps;
    document.getElementById('disp-cm').innerText = doctorData.cm;
    document.getElementById('disp-rif').innerText = doctorData.rif;
    document.getElementById('disp-phone').innerText = doctorData.phone;
    document.getElementById('disp-bio').innerText = doctorData.bio;
    
    document.getElementById('edit-name').value = doctorData.name;
    document.getElementById('edit-mpps').value = doctorData.mpps;
    document.getElementById('edit-mpps-cm').value = doctorData.cm;
    document.getElementById('edit-rif').value = doctorData.rif;
    document.getElementById('edit-phone').value = doctorData.phone;
    document.getElementById('edit-bio').value = doctorData.bio;
    document.getElementById('edit-calendar-id').value = doctorData.calendarId || "";
    document.getElementById('edit-booking-link').value = doctorData.bookingLink || "";

    if (doctorData.photo) {
        const img = document.getElementById('profile-img-display');
        img.src = doctorData.photo; img.style.display = "block";
        document.getElementById('img-icon-placeholder').style.display = "none";
    }
}

function saveDoctorData() {
    doctorData = {
        name: document.getElementById('edit-name').value,
        mpps: document.getElementById('edit-mpps').value,
        cm: document.getElementById('edit-mpps-cm').value,
        rif: document.getElementById('edit-rif').value,
        phone: document.getElementById('edit-phone').value,
        bio: document.getElementById('edit-bio').value,
        calendarId: document.getElementById('edit-calendar-id').value,
        bookingLink: document.getElementById('edit-booking-link').value,
        photo: doctorData.photo
    };
    localStorage.setItem('trauma_doctor', JSON.stringify(doctorData));
    updateDoctorDisplay(); toggleEditPanel();
}

function toggleEditPanel() {
    const p = document.getElementById('edit-profile-panel');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

function handleImageUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            doctorData.photo = e.target.result;
            document.getElementById('profile-img-display').src = e.target.result;
            document.getElementById('profile-img-display').style.display = "block";
            document.getElementById('img-icon-placeholder').style.display = "none";
        };
        reader.readAsDataURL(file);
    }
}

function openBookingLink() {
    const link = doctorData.bookingLink || "https://calendar.app.google/czWRUZT5H1CwASkW8";
    window.open(link, '_blank');
}

async function syncAgenda() {
    const currentEmail = doctorData.calendarId || 'amayitax63@gmail.com';
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(currentEmail)}/events?key=${API_KEY}`;
    try {
        const res = await fetch(url);
        const d = await res.json();
        if (d.items) {
            const ahora = new Date();
            const eventosPendientes = d.items.filter(ev => {
                const inicioCita = new Date(ev.start.dateTime || ev.start.date);
                return inicioCita >= ahora;
            });
            localStorage.setItem(STORAGE_KEY_AGENDA, JSON.stringify(eventosPendientes));
            renderAgenda(eventosPendientes); 
            alert("Sincronizado con: " + currentEmail);
        } else {
            alert("Sin citas encontradas.");
        }
    } catch (e) { alert("Error de red"); }
}

function renderAgenda(eventos) {
    const body = document.getElementById('citas-body');
    body.innerHTML = '';
    eventos.sort((a,b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date))
    .forEach(ev => {
        const ini = new Date(ev.start.dateTime || ev.start.date);
        const fecha = `${String(ini.getDate()).padStart(2,'0')}/${String(ini.getMonth()+1).padStart(2,'0')}/${ini.getFullYear()}`;
        const hora = ini.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        body.innerHTML += `<tr><td>${ev.description || 'Consulta Reservada'}</td><td>${ev.location || 'Consultorio'}</td><td>${fecha}</td><td>${hora}</td></tr>`;
    });
}

function showView(id) {
    document.querySelectorAll('.subpage-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.btn-nav').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const btnId = id === 'home-view' ? 'nav-home' : id === 'agenda-view' ? 'nav-agenda' : id === 'consultas-view' ? 'nav-consultas' : 'nav-pacientes';
    document.getElementById(btnId).classList.add('active');
    if(id === 'pacientes-view') renderPatients();
}

function lookupPatient(cedula) {
    if(!cedula) { document.getElementById('history-container').innerHTML = ''; return; }
    const p = patients.find(pat => pat.id === cedula);
    if(p) {
        document.getElementById('c-name').value = p.name;
        document.getElementById('c-weight').value = p.weight || '';
        document.getElementById('c-birth').value = p.birthDate || '';
        document.getElementById('c-blood').value = p.blood || '';
        document.getElementById('c-height').value = p.height || '';
        document.getElementById('c-allergies').value = p.allergies || '';
        validarYCalcularEdad(p.birthDate);
        renderHistory(cedula);
    } else { document.getElementById('history-container').innerHTML = ''; }
}

function renderHistory(cedula) {
    const container = document.getElementById('history-container');
    const history = consultations.filter(c => c.patientId === cedula);
    container.innerHTML = history.length ? history.map((c, index) => 
        `<div class="pill" onclick="loadConsultation('${cedula}', ${index})">${c.date}</div>`
    ).join('') : '';
}

function loadConsultation(cedula, originalIndex) {
    const history = consultations.filter(c => c.patientId === cedula);
    const data = history[originalIndex];
    if(data) {
        document.getElementById('c-weight').value = data.weight;
        document.getElementById('c-height').value = data.height;
        document.getElementById('c-blood').value = data.blood;
        document.getElementById('c-allergies').value = data.allergies;
        document.getElementById('c-desc').value = data.desc;
        document.getElementById('c-exams').value = data.exams;
        document.getElementById('c-meds').value = data.meds;
        document.getElementById('c-plan').value = data.plan;
        document.getElementById('cons-today').innerText = data.date;
    }
}

function resetForm() {
    document.getElementById('consultation-form').reset();
    document.getElementById('c-age').value = "";
    document.getElementById('history-container').innerHTML = '';
    document.getElementById('cons-today').innerText = new Date().toLocaleDateString('es-ES');
}

function formatearFechaInput(input) {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 8) v = v.substring(0, 8);
    if (v.length > 4) {
        input.value = v.substring(0, 2) + '/' + v.substring(2, 4) + '/' + v.substring(4);
    } else if (v.length > 2) {
        input.value = v.substring(0, 2) + '/' + v.substring(2);
    } else { input.value = v; }
}

function validarYCalcularEdad(f) {
    if (!f || f.length < 10) return;
    const partes = f.split('/');
    const nac = new Date(partes[2], partes[1] - 1, partes[0]);
    const hoy = new Date();
    if (isNaN(nac.getTime())) return;
    let edad = hoy.getFullYear() - nac.getFullYear();
    if (hoy.getMonth() < nac.getMonth() || (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate())) { edad--; }
    document.getElementById('c-age').value = edad + " anos";
}

function imprimirExamenes58mm() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: [58, 200] });
    const margin = 5;
    const width = 48;
    let y = 10;

    const name = document.getElementById('c-name').value || "Paciente";
    const id = document.getElementById('c-id').value || "N/A";
    const age = document.getElementById('c-age').value || "N/A";
    const exams = document.getElementById('c-exams').value || "";
    const date = document.getElementById('cons-today').innerText;

    doc.setFontSize(9); doc.setFont("helvetica", "bold");
    doc.text(doctorData.name, margin, y); y += 6;
    doc.setFontSize(8); doc.setFont("helvetica", "normal");
    doc.text(`MPPS: ${doctorData.mpps} CM: ${doctorData.cm}`, margin, y); y += 4;
    doc.text(`RIF: ${doctorData.rif}`, margin, y); y += 4;
    doc.text(`Telf: ${doctorData.phone}`, margin, y); y += 6;
    doc.setFont("helvetica", "bold"); doc.text(`FECHA: ${date}`, margin, y); y += 6;
    doc.text("DATOS DEL PACIENTE", margin, y); y += 4;
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${name}`, margin, y); y += 4;
    doc.text(`Cedula: ${id} | Edad: ${age}`, margin, y); y += 7;
    doc.setFont("helvetica", "bold"); doc.text("ORDEN DE EXAMENES:", margin, y); y += 5;
    doc.setFont("helvetica", "normal");
    
    const lines = doc.splitTextToSize(exams, width);
    doc.text(lines, margin, y); y += (lines.length * 4);
    
    y += 15; doc.setDrawColor(200); doc.line(margin, y, 53, y); y += 4;
    doc.setFontSize(7); doc.text("FIRMA Y SELLO DOCTOR", 29, y, { align: "center" });

    doc.save(`Examenes_${name}.pdf`);
}

function imprimirRecipe58mm() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: [58, 400] });
    const margin = 5;
    const width = 48;
    let y = 10;

    const name = document.getElementById('c-name').value || "Paciente";
    const id = document.getElementById('c-id').value || "N/A";
    const age = document.getElementById('c-age').value || "N/A";
    const weight = document.getElementById('c-weight').value || "N/A";
    const meds = document.getElementById('c-meds').value || "";
    const plan = document.getElementById('c-plan').value || "";
    const date = document.getElementById('cons-today').innerText;

    doc.setFontSize(9); doc.setFont("helvetica", "bold");
    doc.text(doctorData.name, margin, y); y += 6;
    doc.setFontSize(8); doc.setFont("helvetica", "normal");
    doc.text(`MPPS: ${doctorData.mpps} CM: ${doctorData.cm}`, margin, y); y += 4;
    doc.text(`RIF: ${doctorData.rif}`, margin, y); y += 4;
    doc.text(`Telf: ${doctorData.phone}`, margin, y); y += 6;
    doc.setFont("helvetica", "bold"); doc.text(`FECHA: ${date}`, margin, y); y += 6;
    doc.text("DATOS DEL PACIENTE", margin, y); y += 4;
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${name}`, margin, y); y += 4;
    doc.text(`Cedula: ${id}`, margin, y); y += 4;
    doc.text(`Edad: ${age} Peso: ${weight}kg`, margin, y); y += 7;
    doc.setFont("helvetica", "bold"); doc.text("MEDICAMENTOS:", margin, y); y += 5;
    doc.setFont("helvetica", "normal");
    meds.split(',').map(item => item.trim()).forEach(item => {
        if(item){
            const lines = doc.splitTextToSize("- " + item, width);
            doc.text(lines, margin, y); y += (lines.length * 4);
        }
    });
    y += 10; doc.setDrawColor(200); doc.line(margin, y, 53, y); y += 4;
    doc.setFontSize(7); doc.text("FIRMA Y SELLO DOCTOR", 29, y, { align: "center" });
    
    y += 15;
    doc.setFontSize(9); doc.setFont("helvetica", "bold");
    doc.text(doctorData.name, margin, y); y += 5;
    doc.setFontSize(8); doc.setFont("helvetica", "normal");
    doc.text(`Telf: ${doctorData.phone}`, margin, y); y += 7;
    doc.setFont("helvetica", "bold"); doc.text("PACIENTE:", margin, y); y += 4;
    doc.setFont("helvetica", "normal");
    doc.text(`${name}`, margin, y); y += 4;
    doc.text(`CI: ${id} | ${age} | ${weight}kg`, margin, y); y += 7;
    doc.setFont("helvetica", "bold"); doc.text("PLAN:", margin, y); y += 5;
    doc.setFont("helvetica", "normal");
    plan.split(',').map(item => item.trim()).forEach(item => {
        if(item){
            const lines = doc.splitTextToSize("- " + item, width);
            doc.text(lines, margin, y); y += (lines.length * 4);
        }
    });
    y += 15; doc.line(margin, y, 53, y); y += 4;
    doc.setFontSize(7); doc.text("FIRMA Y SELLO DOCTOR", 29, y, { align: "center" });

    doc.save(`Recipe_${name}.pdf`);
}

function renderPatients() {
    const list = document.getElementById('patients-list');
    list.innerHTML = patients.length ? patients.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.lastVisit}</td></tr>`).join('') : '<tr><td colspan="3">Vacio</td></tr>';
}

document.getElementById('consultation-form').onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('c-id').value;
    const name = document.getElementById('c-name').value;
    if(!id || !name) return alert("Faltan datos");
    const date = new Date().toLocaleDateString('es-ES');
    const consultData = {
        patientId: id, date,
        weight: document.getElementById('c-weight').value,
        height: document.getElementById('c-height').value,
        blood: document.getElementById('c-blood').value,
        allergies: document.getElementById('c-allergies').value,
        desc: document.getElementById('c-desc').value,
        exams: document.getElementById('c-exams').value,
        meds: document.getElementById('c-meds').value,
        plan: document.getElementById('c-plan').value
    };
    consultations.push(consultData);
    localStorage.setItem('trauma_consults_v2', JSON.stringify(consultations));
    const pData = { 
        id, name, 
        birthDate: document.getElementById('c-birth').value, 
        blood: document.getElementById('c-blood').value,
        height: document.getElementById('c-height').value,
        weight: document.getElementById('c-weight').value,
        allergies: document.getElementById('c-allergies').value,
        lastVisit: date 
    };
    const idx = patients.findIndex(p => p.id === id);
    if(idx > -1) patients[idx] = pData; else patients.push(pData);
    localStorage.setItem('trauma_patients', JSON.stringify(patients));
    alert("Consulta Guardada"); renderHistory(id);
};

window.onload = function() {
    updateDoctorDisplay();
    document.getElementById('cons-today').innerText = new Date().toLocaleDateString('es-ES');
    const cache = localStorage.getItem(STORAGE_KEY_AGENDA);
    if(cache) {
        const ahora = new Date();
        const filtrados = JSON.parse(cache).filter(ev => new Date(ev.start.dateTime || ev.start.date) >= ahora);
        renderAgenda(filtrados);
    }
};