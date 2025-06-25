const Student = require('./Student');
const Attendance = require('./Attendance');
const Teacher = require('./Teacher');
const Guardian = require('./Guardian');
const Subject = require('./Subject');
const Grade = require('./Grade');
const DevelopmentPlan = require('./DevelopmentPlan');
const Meeting = require('./Meeting');

Student.belongsToMany(Guardian, { through: 'StudentGuardians' });
Guardian.belongsToMany(Student, { through: 'StudentGuardians' });

Teacher.belongsToMany(Subject, { through: 'TeacherSubjects' });
Subject.belongsToMany(Teacher, { through: 'TeacherSubjects' });

Grade.belongsTo(Student);
Student.hasMany(Grade);

Grade.belongsTo(Subject);
Subject.hasMany(Grade);

DevelopmentPlan.belongsTo(Student);
Student.hasMany(DevelopmentPlan);

Meeting.belongsToMany(Teacher, { through: 'MeetingTeachers' });
Teacher.belongsToMany(Meeting, { through: 'MeetingTeachers' });

Meeting.belongsToMany(Student, { through: 'MeetingStudents' });
Student.belongsToMany(Meeting, { through: 'MeetingStudents' });

Attendance.belongsTo(Student, { foreignKey: 'studentId' });
Student.hasMany(Attendance, { foreignKey: 'studentId' });

Attendance.belongsTo(Subject, { foreignKey: 'subjectId' });
Subject.hasMany(Attendance, { foreignKey: 'subjectId' });
