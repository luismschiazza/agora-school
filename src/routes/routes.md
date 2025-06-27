// Attendance
router.post('/attendances', createAttendance);
router.get('/attendances', getAllAttendances);
router.get('/attendances/:id', getAttendanceById);
router.put('/attendances/:id', updateAttendance);
router.delete('/attendances/:id', deleteAttendance);

// Class
router.post('/classes', createClass);
router.get('/classes', getAllClasses);
router.get('/classes/:id', getClassById);
router.put('/classes/:id', updateClass);
router.delete('/classes/:id', deleteClass);

// Development Plan
router.post('/development-plans', createDevelopmentPlan);
router.get('/development-plans', getAllDevelopmentPlans);
router.get('/development-plans/:id', getDevelopmentPlanById);
router.put('/development-plans/:id', updateDevelopmentPlan);
router.delete('/development-plans/:id', deleteDevelopmentPlan);

// Grade
router.post('/grades', createGrade);
router.get('/grades', getAllGrades);
router.get('/grades/:id', getGradeById);
router.put('/grades/:id', updateGrade);
router.delete('/grades/:id', deleteGrade);

// Guardian
router.post('/guardians', createGuardian);
router.get('/guardians', getAllGuardians);
router.get('/guardians/:id', getGuardianById);
router.put('/guardians/:id', updateGuardian);
router.delete('/guardians/:id', deleteGuardian);

// Meeting
router.post('/meetings', createMeeting);
router.get('/meetings', getAllMeetings);
router.get('/meetings/:id', getMeetingById);
router.put('/meetings/:id', updateMeeting);
router.delete('/meetings/:id', deleteMeeting);

// Student
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Subject
router.post('/subjects', createSubject);
router.get('/subjects', getAllSubjects);
router.get('/subjects/:id', getSubjectById);
router.put('/subjects/:id', updateSubject);
router.delete('/subjects/:id', deleteSubject);

// Teacher
router.post('/teachers', createTeacher);
router.get('/teachers', getAllTeachers);
router.get('/teachers/:id', getTeacherById);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);
------------------------------------------------------------------------------------------------
✅ Sugestões Específicas por Controller
📘 Attendance Controller
Melhoria: Validar se studentId e subjectId existem.

Melhoria: Use include para trazer Student e Subject juntos.

Melhoria: Trocar .destroy() por update({ isActive: false }) se o model tiver esse campo.

📗 Class Controller
Melhoria: Validar se teacherId e subjectId são válidos.

Melhoria: Adicionar ordenação por nome ou data de criação.

📙 DevelopmentPlan Controller
Melhoria: Validar teacherId.

Melhoria: Adicionar include: Teacher no findAll.

📒 Grade Controller
Melhoria: Validar se studentId e subjectId existem.

Melhoria: include: [Student, Subject].

📕 Guardian Controller
Melhoria: Adicionar verificação de e-mail duplicado.

Melhoria: Retornar o ID do responsável criado.

📓 Meeting Controller
Melhoria: Validar teacherId e date.

Melhoria: Verificar se não há conflitos de horário.

📔 Student Controller
Melhoria: Validação de email, password fortes.

Melhoria: Criptografar senha com bcrypt.

📖 Subject Controller
Melhoria: Verificar se já existe uma disciplina com mesmo nome.

📚 Teacher Controller
Melhoria: Mesmas do Student (validação, senha segura).

Melhoria: Adicionar campo bio ou especialidade.

