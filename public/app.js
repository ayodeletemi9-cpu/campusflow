* {
  box-sizing: border-box;
}

:root {
  --bg: #eef3ff;
  --panel: #ffffff;
  --panel-alt: #f7f9ff;
  --soft: #eef2ff;
  --border: #e3eaf7;
  --primary: #3b82f6;
  --primary-deep: #1d4ed8;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --ink: #101828;
  --muted: #667085;
  --shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--ink);
}

button,
input,
select {
  font: inherit;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  width: 260px;
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
  color: #f8fafc;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: rgba(59, 130, 246, 0.18);
  border: 1px solid rgba(96, 165, 250, 0.5);
  color: #93c5fd;
  font-size: 1.4rem;
}

.brand-name {
  font-size: 1.4rem;
  font-weight: 700;
}

.brand-subtitle {
  font-size: 0.72rem;
  color: rgba(226, 232, 240, 0.7);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  border: 0;
  background: transparent;
  color: #dfe7f5;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-align: left;
}

.nav-item i {
  font-size: 1.05rem;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(59, 130, 246, 0.18);
  color: #eff6ff;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.08);
}

.sidebar-footer {
  margin-top: auto;
}

.mini-card {
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  padding: 16px 14px;
}

.mini-label {
  display: block;
  color: rgba(191, 219, 254, 0.8);
  font-size: 0.72rem;
  margin-bottom: 4px;
}

.main-content {
  flex: 1;
  padding: 28px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 28px;
}

.eyebrow,
.section-label,
.panel-kicker {
  margin: 0 0 8px;
  font-size: 0.74rem;
  line-height: 1.4;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.topbar h1,
.page-toolbar h2,
.panel-card h3 {
  margin: 0;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--ink);
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 8px 12px;
  box-shadow: var(--shadow);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: var(--primary-deep);
  font-size: 0.8rem;
  font-weight: 700;
}

.user-pill strong,
.user-pill span {
  display: block;
}

.user-pill span {
  color: var(--muted);
  font-size: 0.74rem;
}

.page-section {
  display: none;
}

.page-section.active {
  display: block;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.metric-card {
  background: var(--panel);
  border-radius: 22px;
  padding: 22px 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.metric-card h2 {
  margin: 20px 0 6px;
  font-size: clamp(2rem, 2vw, 2.4rem);
  font-weight: 800;
}

.metric-card small {
  color: var(--muted);
  font-weight: 600;
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-weight: 600;
}

.metric-header i {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-size: 1.15rem;
}

.accent-blue .metric-header i {
  background: rgba(59, 130, 246, 0.12);
  color: var(--primary);
}

.accent-green .metric-header i {
  background: rgba(16, 185, 129, 0.12);
  color: var(--success);
}

.accent-violet .metric-header i {
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.panel-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 22px 20px;
  box-shadow: var(--shadow);
}

.panel-header,
.page-toolbar,
.toolbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.page-toolbar {
  margin-bottom: 20px;
}

.toolbar-row {
  margin-bottom: 18px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  width: min(100%, 360px);
}

.search-box i {
  color: var(--muted);
}

.search-box input {
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  color: var(--ink);
}

.modern-table {
  margin-bottom: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.modern-table thead th {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  background: rgba(148, 163, 184, 0.06);
  border-bottom: 1px solid var(--border);
  padding: 14px 16px;
}

.modern-table tbody td {
  padding: 16px;
  vertical-align: middle;
  border-bottom: 1px solid var(--border);
  color: var(--ink);
}

.modern-table tbody tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.status-active {
  background: rgba(16, 185, 129, 0.1);
  color: #047857;
}

.status-leave {
  background: rgba(245, 158, 11, 0.12);
  color: #b45309;
}

.status-graduated {
  background: rgba(148, 163, 184, 0.12);
  color: #475569;
}

.action-group {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(59, 130, 246, 0.25);
}

.icon-btn.primary {
  background: rgba(59, 130, 246, 0.08);
  color: var(--primary-deep);
}

.icon-btn.danger {
  background: rgba(239, 68, 68, 0.08);
  color: var(--danger);
}

.registration-layout {
  max-width: 760px;
}

.course-checklist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.course-option {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 12px;
  background: var(--panel-alt);
}

.course-option input {
  accent-color: var(--primary);
  width: 18px;
  height: 18px;
}

.course-option strong,
.course-option span {
  display: block;
}

.course-option span {
  color: var(--muted);
  font-size: 0.8rem;
}

.summary-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 12px;
  color: var(--muted);
}

.summary-row strong {
  color: var(--ink);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 20px;
}

.settings-header {
  margin-bottom: 14px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 12px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--muted);
}

.settings-item strong {
  color: var(--ink);
}

.toast-container {
  position: fixed;
  right: 22px;
  bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1090;
}

.toast {
  min-width: 260px;
  max-width: 340px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.94);
  color: white;
  box-shadow: var(--shadow);
  border: 0;
  padding: 14px 16px;
}

.toast.success {
  background: rgba(16, 185, 129, 0.95);
}

.toast.error {
  background: rgba(239, 68, 68, 0.95);
}

.form-label {
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.form-control,
.form-select {
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  padding: 10px 12px;
  box-shadow: none;
}

.form-control:focus,
.form-select:focus {
  border-color: rgba(59, 130, 246, 0.55);
  box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.12);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  border: 0;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 700;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-deep), var(--primary));
}

.btn-outline-primary {
  border-radius: 12px;
  border-color: rgba(59, 130, 246, 0.35);
  color: var(--primary-deep);
}

.btn-secondary {
  border-radius: 12px;
}

.empty-state {
  text-align: center;
  color: var(--muted);
  padding: 28px 16px;
}

@media (max-width: 980px) {
  .app-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
    position: static;
    padding-bottom: 18px;
  }

  .nav-menu {
    display: grid;
    grid-template-columns: repeat(2, minmax(130px, 1fr));
  }

  .dashboard-grid,
  .metrics-grid,
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 18px 14px 30px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .page-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-menu {
    grid-template-columns: 1fr;
  }

  .search-box {
    width: 100%;
  }
}
