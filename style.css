:root {
    --primary: #2563eb;
    --primary-dark: #1e40af;
    --secondary: #64748b;
    --accent: #0ea5e9;
    --success: #10b981;
    --danger: #ef4444;
    --background: #f8fafc;
    --card: #ffffff;
    --text-main: #1e293b;
    --text-muted: #64748b;
    --border: #e2e8f0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: transparent;
}

body {
    background-color: var(--background);
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden;
    width: 100%;
}

.app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px;
    min-height: 100vh;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
    gap: 15px;
}

.logo-area {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logo-area h1 {
    font-size: 1.25rem;
    color: var(--primary-dark);
    font-weight: 800;
}

.header-nav {
    display: flex;
    gap: 8px;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 5px;
    scrollbar-width: none;
    align-items: center;
}

.header-nav::-webkit-scrollbar { display: none; }

.btn-nav {
    background: white;
    border: 1px solid var(--border);
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-main);
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    flex-shrink: 0;
}

.btn-nav:hover, .btn-nav.active {
    border-color: var(--primary);
    color: var(--primary);
    background: #f0f7ff;
}

.btn-home { background: var(--primary); color: white; border: none; }
.btn-home:hover { background: var(--primary-dark); color: white; }

.card {
    background: var(--card);
    border-radius: 16px; 
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border);
    margin-bottom: 15px;
    width: 100%;
}

.profile-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 30px;
}

@media (min-width: 768px) { .profile-grid { grid-template-columns: 350px 1fr; } }

.doctor-info-card { text-align: center; }

.profile-image-wrapper {
    width: 130px; height: 130px; 
    background: #f1f5f9; border: 3px solid var(--primary); 
    border-radius: 50%; margin: 0 auto 15px; 
    display: flex; align-items: center; justify-content: center; 
    overflow: hidden; position: relative;
}

#profile-img-display { width: 100%; height: 100%; object-fit: cover; display: none; }

.doctor-name { font-size: 1.25rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 15px; }

.id-badge {
    display: flex; flex-direction: column; gap: 10px;
    text-align: left; background: #f8fafc; padding: 15px;
    border-radius: 12px; font-size: 0.85rem;
}

.id-item { display: flex; justify-content: space-between; border-bottom: 1px solid #edf2f7; padding-bottom: 4px; }
.id-label { font-weight: 600; color: var(--secondary); }

.edit-trigger-bar {
    width: 100%; height: 3px; background: var(--border); border: none;
    cursor: pointer; border-radius: 3px; margin-top: 10px;
}

.edit-panel {
    background: #fefce8; border: 1px solid #fef08a;
    border-radius: 12px; padding: 15px; margin-top: 15px; display: none;
}

.subpage-view { display: none; animation: fadeIn 0.3s ease-out; }
.subpage-view.active { display: block; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.form-section-title {
    font-size: 0.75rem; text-transform: uppercase; font-weight: 700;
    color: var(--secondary); border-bottom: 1px solid var(--border);
    padding-bottom: 5px; margin: 20px 0 15px; letter-spacing: 0.05em;
}

.form-row { display: flex; gap: 15px; margin-bottom: 10px; }
.form-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }

@media (max-width: 600px) {
    .form-row { flex-direction: column; gap: 5px; }
    .form-row-3 { grid-template-columns: 1fr; }
}

.form-group { margin-bottom: 12px; }
label { display: block; margin-bottom: 4px; font-weight: 600; font-size: 0.75rem; color: var(--primary); }

input, select, textarea { 
    width: 100%; padding: 10px; border: 1px solid var(--border); 
    border-radius: 8px; font-size: 0.9rem; background: #fff;
}

.btn { 
    padding: 10px 20px; border-radius: 8px; border: none; 
    font-weight: 700; cursor: pointer; display: inline-flex; 
    align-items: center; gap: 8px; font-size: 0.85rem;
}

.btn-red { background: #dc2626; color: white; }
.btn-blue { background: #1e3a8a; color: white; }
.btn-green { background: #10b981; color: white; }
.btn-recipe { background: #8b5cf6; color: white; }
.btn-exams { background: #f59e0b; color: white; }

.data-table-container { width: 100%; overflow-x: auto; margin-top: 15px; }
.agenda-table { width: 100%; border-collapse: collapse; min-width: 700px; }
.agenda-table th { text-align: left; padding: 12px; background: #f1f5f9; color: var(--secondary); font-size: 0.75rem; font-weight: 700; }
.agenda-table td { padding: 12px; border-bottom: 1px solid var(--border); font-size: 0.85rem; }

.history-pills {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 10px 0;
    scrollbar-width: none;
    margin-top: 5px;
    min-height: 35px;
}
.history-pills::-webkit-scrollbar { display: none; }
.pill {
    background: #f1f5f9;
    border: 1px solid var(--border);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
}
.pill:hover { background: var(--primary); color: white; }