import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const students = [
  {
    id: 'stu-1001',
    name: 'Chiamaka Okafor',
    matricNumber: 'CSC/2021/001',
    email: 'chiamaka.okafor@campusflow.edu',
    department: 'Computer Science',
    level: '300',
    status: 'Active',
    phone: '+234 812 345 6789',
    address: 'Lagos, Nigeria',
    createdAt: '2025-09-18T09:45:00.000Z'
  },
  {
    id: 'stu-1002',
    name: 'Daniel Adeyemi',
    matricNumber: 'BUS/2022/015',
    email: 'daniel.adeyemi@campusflow.edu',
    department: 'Business Administration',
    level: '200',
    status: 'Active',
    phone: '+234 806 222 1191',
    address: 'Abuja, Nigeria',
    createdAt: '2025-10-02T10:15:00.000Z'
  },
  {
    id: 'stu-1003',
    name: 'Musa Ibrahim',
    matricNumber: 'ENG/2020/030',
    email: 'musa.ibrahim@campusflow.edu',
    department: 'Electrical Engineering',
    level: '400',
    status: 'On Leave',
    phone: '+234 813 774 2200',
    address: 'Kano, Nigeria',
    createdAt: '2025-08-11T14:20:00.000Z'
  }
];

const courses = [
  {
    id: 'crs-2001',
    code: 'CSC 301',
    title: 'Data Structures and Algorithms',
    department: 'Computer Science',
    units: 3,
    semester: 'First Semester',
    level: '300',
    createdAt: '2025-08-12T08:00:00.000Z'
  },
  {
    id: 'crs-2002',
    code: 'BUS 205',
    title: 'Principles of Management',
    department: 'Business Administration',
    units: 2,
    semester: 'First Semester',
    level: '200',
    createdAt: '2025-10-03T10:20:00.000Z'
  },
  {
    id: 'crs-2003',
    code: 'ENG 211',
    title: 'Circuit Theory I',
    department: 'Electrical Engineering',
    units: 3,
    semester: 'First Semester',
    level: '200',
    createdAt: '2025-09-21T11:00:00.000Z'
  },
  {
    id: 'crs-2004',
    code: 'CSC 401',
    title: 'Software Engineering',
    department: 'Computer Science',
    units: 3,
    semester: 'Second Semester',
    level: '400',
    createdAt: '2025-09-18T13:10:00.000Z'
  }
];

const registrations = [
  {
    id: 'reg-3001',
    studentId: 'stu-1001',
    studentName: 'Chiamaka Okafor',
    courseId: 'crs-2001',
    courseCode: 'CSC 301',
    courseTitle: 'Data Structures and Algorithms',
    semester: 'First Semester',
    status: 'Active',
    registeredAt: '2025-10-06T07:48:00.000Z'
  },
  {
    id: 'reg-3002',
    studentId: 'stu-1002',
    studentName: 'Daniel Adeyemi',
    courseId: 'crs-2002',
    courseCode: 'BUS 205',
    courseTitle: 'Principles of Management',
    semester: 'First Semester',
    status: 'Active',
    registeredAt: '2025-10-06T08:30:00.000Z'
  },
  {
    id: 'reg-3003',
    studentId: 'stu-1003',
    studentName: 'Musa Ibrahim',
    courseId: 'crs-2003',
    courseCode: 'ENG 211',
    courseTitle: 'Circuit Theory I',
    semester: 'First Semester',
    status: 'Active',
    registeredAt: '2025-10-07T09:10:00.000Z'
  }
];

const isValidUUID = (value) => typeof value === 'string' && value.trim().length > 0;

const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

app.get('/api/dashboard', (req, res) => {
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const totalRegistrations = registrations.length;
  const recentRegistrations = [...registrations].sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)).slice(0, 5);

  res.json({
    totalStudents,
    totalCourses,
    totalRegistrations,
    recentRegistrations
  });
});

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const { name, matricNumber, email, department, level, status, phone, address } = req.body;

  if (!name || !matricNumber || !email || !department || !level) {
    return errorResponse(res, 400, 'Name, matric number, email, department, and level are required.');
  }

  const student = {
    id: `stu-${uuidv4()}`,
    name: name.trim(),
    matricNumber: matricNumber.trim(),
    email: email.trim(),
    department: department.trim(),
    level: level.trim(),
    status: status || 'Active',
    phone: phone || '',
    address: address || '',
    createdAt: new Date().toISOString()
  };

  students.push(student);
  res.status(201).json(student);
});

app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return errorResponse(res, 404, 'Student not found.');
  }

  const { name, matricNumber, email, department, level, status, phone, address } = req.body;

  if (!name || !matricNumber || !email || !department || !level) {
    return errorResponse(res, 400, 'Name, matric number, email, department, and level are required.');
  }

  students[index] = {
    ...students[index],
    name: name.trim(),
    matricNumber: matricNumber.trim(),
    email: email.trim(),
    department: department.trim(),
    level: level.trim(),
    status: status || students[index].status,
    phone: phone || '',
    address: address || ''
  };

  res.json(students[index]);
});

app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return errorResponse(res, 404, 'Student not found.');
  }

  const [deletedStudent] = students.splice(studentIndex, 1);

  const registrationCount = registrations.filter((registration) => registration.studentId === id).length;
  if (registrationCount > 0) {
    for (let i = registrations.length - 1; i >= 0; i -= 1) {
      if (registrations[i].studentId === id) {
        registrations.splice(i, 1);
      }
    }
  }

  res.json({ message: `${deletedStudent.name} was deleted successfully.` });
});

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.post('/api/courses', (req, res) => {
  const { code, title, department, units, semester, level } = req.body;

  if (!code || !title || !department || !units || !semester || !level) {
    return errorResponse(res, 400, 'Code, title, department, units, semester, and level are required.');
  }

  const course = {
    id: `crs-${uuidv4()}`,
    code: code.trim(),
    title: title.trim(),
    department: department.trim(),
    units: Number(units),
    semester: semester.trim(),
    level: level.trim(),
    createdAt: new Date().toISOString()
  };

  courses.push(course);
  res.status(201).json(course);
});

app.put('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return errorResponse(res, 404, 'Course not found.');
  }

  const { code, title, department, units, semester, level } = req.body;

  if (!code || !title || !department || !units || !semester || !level) {
    return errorResponse(res, 400, 'Code, title, department, units, semester, and level are required.');
  }

  courses[index] = {
    ...courses[index],
    code: code.trim(),
    title: title.trim(),
    department: department.trim(),
    units: Number(units),
    semester: semester.trim(),
    level: level.trim()
  };

  res.json(courses[index]);
});

app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const courseIndex = courses.findIndex((course) => course.id === id);

  if (courseIndex === -1) {
    return errorResponse(res, 404, 'Course not found.');
  }

  const [deletedCourse] = courses.splice(courseIndex, 1);

  for (let i = registrations.length - 1; i >= 0; i -= 1) {
    if (registrations[i].courseId === id) {
      registrations.splice(i, 1);
    }
  }

  res.json({ message: `${deletedCourse.code} was deleted successfully.` });
});

app.get('/api/registrations', (req, res) => {
  res.json(registrations);
});

app.post('/api/registrations', (req, res) => {
  const { studentId, courseIds, semester } = req.body;

  if (!studentId || !Array.isArray(courseIds) || courseIds.length === 0 || !semester) {
    return errorResponse(res, 400, 'Student, course selections, and semester are required.');
  }

  const student = students.find((item) => item.id === studentId);
  if (!student) {
    return errorResponse(res, 404, 'Selected student was not found.');
  }

  const validCourseIds = [];
  const newRegistrations = [];

  for (const courseId of courseIds) {
    const course = courses.find((item) => item.id === courseId);
    if (!course) {
      return errorResponse(res, 404, `Course with id ${courseId} was not found.`);
    }

    const alreadyRegistered = registrations.some(
      (registration) => registration.studentId === studentId && registration.courseId === courseId && registration.semester === semester
    );

    if (alreadyRegistered) {
      continue;
    }

    validCourseIds.push(courseId);
    newRegistrations.push({
      id: `reg-${uuidv4()}`,
      studentId: student.id,
      studentName: student.name,
      courseId: course.id,
      courseCode: course.code,
      courseTitle: course.title,
      semester,
      status: 'Active',
      registeredAt: new Date().toISOString()
    });
  }

  if (newRegistrations.length === 0) {
    return errorResponse(res, 409, 'The selected courses are already registered for this student in the chosen semester.');
  }

  registrations.push(...newRegistrations);

  res.status(201).json({
    message: `Registration successful for ${student.name}.`,
    registrations: newRegistrations
  });
});

app.delete('/api/registrations/:id', (req, res) => {
  const { id } = req.params;
  const index = registrations.findIndex((registration) => registration.id === id);

  if (index === -1) {
    return errorResponse(res, 404, 'Registration not found.');
  }

  const [removedRegistration] = registrations.splice(index, 1);
  res.json({ message: `${removedRegistration.courseCode} registration removed successfully.` });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CampusFlow server is running on http://localhost:${PORT}`);
});
