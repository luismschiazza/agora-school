const Student = require('./Student');
const Attendance = require('./Attendance');
const Teacher = require('./Teacher');
const Guardian = require('./Guardian');
const Subject = require('./Subject');
const Grade = require('./Grade');
const DevelopmentPlan = require('./DevelopmentPlan');
const Meeting = require('./Meeting');

// Student <-> Guardian
Student.belongsToMany(Guardian, { through: 'StudentGuardians' });
Guardian.belongsToMany(Student, { through: 'StudentGuardians' });

// Teacher <-> Subject
Teacher.belongsToMany(Subject, { through: 'TeacherSubjects' });
Subject.belongsToMany(Teacher, { through: 'TeacherSubjects' });

// Student -> Grade
Grade.belongsTo(Student);
Student.hasMany(Grade);

// Subject -> Grade
Grade.belongsTo(Subject);
Subject.hasMany(Grade);

// Student -> DevelopmentPlan
DevelopmentPlan.belongsTo(Student);
Student.hasMany(DevelopmentPlan);

// Meeting <-> Teacher
Meeting.belongsToMany(Teacher, { through: 'MeetingTeachers' });
Teacher.belongsToMany(Meeting, { through: 'MeetingTeachers' });

// Meeting <-> Student
Meeting.belongsToMany(Student, { through: 'MeetingStudents' });
Student.belongsToMany(Meeting, { through: 'MeetingStudents' });

// Attendance -> Student
Attendance.belongsTo(Student);
Student.hasMany(Attendance);
