const state = {
  students: [],
  courses: [],
  registrations: [],
  dashboard: {},
  activeSection: 'dashboard'
};

const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
const courseModal = new bootstrap.Modal(document.getElementById('courseModal'));
const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));

const studentForm = document.getElementById('studentForm');
const courseForm = document.getElementById('courseForm');
const registrationForm = document.getElementById('registrationForm');
const toastContainer = document.getElementById('toastContainer');

const dashboardEls = {
  totalStudents: document.getElementById('totalStudents'),
  totalCourses: document.getElementById('totalCourses'),
  totalRegistrations: document.getElementById('totalRegistrations'),
  recentRegistrationsTable: document.getElementById('recentRegistrationsTable'),
  activeStudentsSummary: document.getElementById('activeStudentsSummary')
};

const studentTableBody = document.getElementById('studentsTableBody');
const courseTableBody = document.getElementById('coursesTableBody');
const registrationsTableBody = document.getElementById('registrationsTableBody');
const studentSearch = document.getElementById('studentSearch');
const courseSearch = document.getElementById('courseSearch');
const studentSelect = document.getElementById('studentSelect');
const courseSelectionList = document.getElementById('courseSelectionList');
const semesterSelect = document.getElementById('semesterSelect');

const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="d-flex align-items-center justify-content-between gap-3"><div>${message}</div><button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
  toastContainer.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
  bsToast.show();

  toast.addEventListener('hidden.bs.toast', () => toast.remove());
};

const setActiveSection = (section) => {
  state.activeSection = section;
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.section === section);
  });

  document.querySelectorAll('.page-section').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `${section}Section`);
  });

  const labelMap = {
    dashboard: 'Dashboard',
    students: 'Students',
    courses: 'Courses',
    registration: 'Course Registration',
    registrations: 'Registrations',
    settings: 'Settings'
  };

  pageTitle.textContent = labelMap[section] || 'Dashboard';
};

navItems.forEach((item) => {
  item.addEventListener('click', () => setActiveSection(item.dataset.section));
});

const fetchJSON = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : data.message || 'Request failed.');
  }

  return data;
};

const refreshDashboard = async () => {
  const dashboard = await fetchJSON('/api/dashboard');
  state.dashboard = dashboard;

  dashboardEls.totalStudents.textContent = dashboard.totalStudents;
  dashboardEls.totalCourses.textContent = dashboard.totalCourses;
  dashboardEls.totalRegistrations.textContent = dashboard.totalRegistrations;
  dashboardEls.activeStudentsSummary.textContent = state.students.filter((student) => student.status === 'Active').length;

  if (!dashboard.recentRegistrations?.length) {
    dashboardEls.recentRegistrationsTable.innerHTML = `
      <tr>
        <td colspan="4">
          <div class="empty-state">No recent registrations yet.</div>
        </td>
      </tr>
    `;
    return;
  }

  dashboardEls.recentRegistrationsTable.innerHTML = dashboard.recentRegistrations
    .map(
      (entry) => `
        <tr>
          <td>${entry.studentName}</td>
          <td>${entry.courseCode}</td>
          <td>${entry.semester}</td>
          <td><span class="status-badge status-active">${entry.status}</span></td>
        </tr>
      `
    )
    .join('');
};

const renderStudents = () => {
  const searchTerm = studentSearch.value.trim().toLowerCase();
  const filtered = state.students.filter((student) => {
    const values = `${student.name} ${student.matricNumber} ${student.department} ${student.level}`.toLowerCase();
    return values.includes(searchTerm);
  });

  if (!filtered.length) {
    studentTableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">No students found.</div>
        </td>
      </tr>
    `;
    return;
  }

  studentTableBody.innerHTML = filtered
    .map(
      (student) => `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-3">
              <div class="avatar">${student.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</div>
              <div>
                <strong>${student.name}</strong><br>
                <small class="text-muted">${student.email}</small>
              </div>
            </div>
          </td>
          <td>${student.matricNumber}</td>
          <td>${student.department}</td>
          <td>${student.level}</td>
          <td><span class="status-badge ${student.status === 'Active' ? 'status-active' : student.status === 'On Leave' ? 'status-leave' : 'status-graduated'}">${student.status}</span></td>
          <td>
            <div class="action-group">
              <button class="icon-btn primary" type="button" data-action="view-student" data-id="${student.id}" aria-label="View student"><i class="bi bi-eye"></i></button>
              <button class="icon-btn" type="button" data-action="edit-student" data-id="${student.id}" aria-label="Edit student"><i class="bi bi-pencil"></i></button>
              <button class="icon-btn danger" type="button" data-action="delete-student" data-id="${student.id}" aria-label="Delete student"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
};

const renderCourses = () => {
  const searchTerm = courseSearch.value.trim().toLowerCase();
  const filtered = state.courses.filter((course) => {
    const values = `${course.code} ${course.title} ${course.department} ${course.semester}`.toLowerCase();
    return values.includes(searchTerm);
  });

  if (!filtered.length) {
    courseTableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">No courses found.</div>
        </td>
      </tr>
    `;
    return;
  }

  courseTableBody.innerHTML = filtered
    .map(
      (course) => `
        <tr>
          <td>${course.code}</td>
          <td>${course.title}</td>
          <td>${course.department}</td>
          <td>${course.units}</td>
          <td>${course.semester}</td>
          <td>
            <div class="action-group">
              <button class="icon-btn" type="button" data-action="edit-course" data-id="${course.id}" aria-label="Edit course"><i class="bi bi-pencil"></i></button>
              <button class="icon-btn danger" type="button" data-action="delete-course" data-id="${course.id}" aria-label="Delete course"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
};

const renderRegistrations = () => {
  if (!state.registrations.length) {
    registrationsTableBody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-state">No course registrations yet.</div>
        </td>
      </tr>
    `;
    return;
  }

  registrationsTableBody.innerHTML = state.registrations
    .map(
      (registration) => `
        <tr>
          <td>${registration.studentName}</td>
          <td>${registration.courseCode}</td>
          <td>${registration.semester}</td>
          <td><span class="status-badge status-active">${registration.status}</span></td>
          <td>
            <div class="action-group">
              <button class="icon-btn danger" type="button" data-action="delete-registration" data-id="${registration.id}" aria-label="Delete registration"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
};

const renderStudentSelect = () => {
  studentSelect.innerHTML = '<option value="">Choose a student</option>' +
    state.students
      .map((student) => `<option value="${student.id}">${student.name} (${student.matricNumber})</option>`)
      .join('');
};

const renderCourseSelection = () => {
  if (!state.courses.length) {
    courseSelectionList.innerHTML = '<div class="empty-state">No courses available. Add a course first.</div>';
    return;
  }

  courseSelectionList.innerHTML = state.courses
    .map(
      (course) => `
        <label class="course-option">
          <input type="checkbox" name="courseIds" value="${course.id}" />
          <div>
            <strong>${course.code}</strong>
            <span>${course.title}</span>
          </div>
        </label>
      `
    )
    .join('');
};

const loadInitialData = async () => {
  try {
    const [students, courses, registrations] = await Promise.all([
      fetchJSON('/api/students'),
      fetchJSON('/api/courses'),
      fetchJSON('/api/registrations')
    ]);

    state.students = students;
    state.courses = courses;
    state.registrations = registrations;

    renderStudentSelect();
    renderCourseSelection();
    renderStudents();
    renderCourses();
    renderRegistrations();
    refreshDashboard();
  } catch (error) {
    showToast(error.message, 'error');
  }
};

studentSearch.addEventListener('input', renderStudents);
courseSearch.addEventListener('input', renderCourses);

document.getElementById('addStudentBtn').addEventListener('click', () => {
  studentForm.reset();
  studentForm.dataset.mode = 'create';
  document.getElementById('studentModalTitle').textContent = 'Add Student';
  studentModal.show();
});

document.getElementById('addCourseBtn').addEventListener('click', () => {
  courseForm.reset();
  courseForm.dataset.mode = 'create';
  document.getElementById('courseModalTitle').textContent = 'Add Course';
  courseModal.show();
});

studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(studentForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    if (studentForm.dataset.mode === 'edit') {
      const studentId = studentForm.dataset.studentId;
      const updated = await fetchJSON(`/api/students/${studentId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      const index = state.students.findIndex((student) => student.id === studentId);
      if (index !== -1) state.students[index] = updated;
      showToast('Student updated successfully.', 'success');
    } else {
      const created = await fetchJSON('/api/students', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      state.students.push(created);
      showToast('Student added successfully.', 'success');
    }

    studentModal.hide();
    studentForm.reset();
    studentForm.dataset.mode = 'create';
    renderStudentSelect();
    renderStudents();
    refreshDashboard();
  } catch (error) {
    showToast(error.message, 'error');
  }
});

courseForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(courseForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    if (courseForm.dataset.mode === 'edit') {
      const courseId = courseForm.dataset.courseId;
      const updated = await fetchJSON(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      const index = state.courses.findIndex((course) => course.id === courseId);
      if (index !== -1) state.courses[index] = updated;
      showToast('Course updated successfully.', 'success');
    } else {
      const created = await fetchJSON('/api/courses', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      state.courses.push(created);
      showToast('Course added successfully.', 'success');
    }

    courseModal.hide();
    courseForm.reset();
    courseForm.dataset.mode = 'create';
    renderCourseSelection();
    renderCourses();
    refreshDashboard();
  } catch (error) {
    showToast(error.message, 'error');
  }
});

registrationForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const studentId = studentSelect.value;
  const semester = semesterSelect.value;
  const selectedItems = [...document.querySelectorAll('input[name="courseIds"]:checked')];
  const courseIds = selectedItems.map((input) => input.value);

  if (!studentId || !semester || courseIds.length === 0) {
    showToast('Please select a student, semester, and at least one course.', 'error');
    return;
  }

  try {
    const response = await fetchJSON('/api/registrations', {
      method: 'POST',
      body: JSON.stringify({ studentId, semester, courseIds })
    });

    const freshRegistrations = await fetchJSON('/api/registrations');
    state.registrations = freshRegistrations;
    renderRegistrations();
    refreshDashboard();
    registrationForm.reset();
    renderCourseSelection();
    showToast(response.message || 'Registration successful!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
  }
});

document.addEventListener('click', async (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const { action, id } = target.dataset;

  if (action === 'view-student') {
    const student = state.students.find((item) => item.id === id);
    if (!student) return;

    document.getElementById('detailsModalBody').innerHTML = `
      <div class="row g-3">
        <div class="col-6"><strong>Name:</strong><br>${student.name}</div>
        <div class="col-6"><strong>Matric Number:</strong><br>${student.matricNumber}</div>
        <div class="col-6"><strong>Email:</strong><br>${student.email}</div>
        <div class="col-6"><strong>Phone:</strong><br>${student.phone || '—'}</div>
        <div class="col-6"><strong>Department:</strong><br>${student.department}</div>
        <div class="col-6"><strong>Level:</strong><br>${student.level}</div>
        <div class="col-6"><strong>Status:</strong><br><span class="status-badge ${student.status === 'Active' ? 'status-active' : student.status === 'On Leave' ? 'status-leave' : 'status-graduated'}">${student.status}</span></div>
        <div class="col-6"><strong>Address:</strong><br>${student.address || '—'}</div>
      </div>
    `;
    detailsModal.show();
    return;
  }

  if (action === 'edit-student') {
    const student = state.students.find((item) => item.id === id);
    if (!student) return;

    studentForm.dataset.mode = 'edit';
    studentForm.dataset.studentId = student.id;
    document.getElementById('studentModalTitle').textContent = 'Edit Student';

    Object.entries(student).forEach(([key, value]) => {
      const field = studentForm.elements.namedItem(key);
      if (field) field.value = value || '';
    });

    studentModal.show();
    return;
  }

  if (action === 'delete-student') {
    const student = state.students.find((item) => item.id === id);
    if (!student) return;

    const confirmed = window.confirm(`Are you sure you want to delete ${student.name}?`);
    if (!confirmed) return;

    try {
      const response = await fetchJSON(`/api/students/${id}`, { method: 'DELETE' });
      state.students = state.students.filter((item) => item.id !== id);
      renderStudentSelect();
      renderStudents();
      refreshDashboard();
      showToast(response.message, 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
    return;
  }

  if (action === 'edit-course') {
    const course = state.courses.find((item) => item.id === id);
    if (!course) return;

    courseForm.dataset.mode = 'edit';
    courseForm.dataset.courseId = course.id;
    document.getElementById('courseModalTitle').textContent = 'Edit Course';

    Object.entries(course).forEach(([key, value]) => {
      const field = courseForm.elements.namedItem(key);
      if (field) field.value = value || '';
    });

    courseModal.show();
    return;
  }

  if (action === 'delete-course') {
    const course = state.courses.find((item) => item.id === id);
    if (!course) return;

    const confirmed = window.confirm(`Are you sure you want to delete ${course.code}?`);
    if (!confirmed) return;

    try {
      const response = await fetchJSON(`/api/courses/${id}`, { method: 'DELETE' });
      state.courses = state.courses.filter((item) => item.id !== id);
      renderCourseSelection();
      renderCourses();
      refreshDashboard();
      showToast(response.message, 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
    return;
  }

  if (action === 'delete-registration') {
    const targetRegistration = state.registrations.find((item) => item.id === id);
    if (!targetRegistration) return;

    const confirmed = window.confirm(`Remove the registration for ${targetRegistration.courseCode}?`);
    if (!confirmed) return;

    try {
      const response = await fetchJSON(`/api/registrations/${id}`, { method: 'DELETE' });
      state.registrations = state.registrations.filter((item) => item.id !== id);
      renderRegistrations();
      refreshDashboard();
      showToast(response.message, 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }
});

setActiveSection('dashboard');
loadInitialData();
