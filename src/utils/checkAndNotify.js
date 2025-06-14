const { Student } = require('../models/Student');
const { Guardian } = require('../models/Guardian');
const { Attendance } = require('../models/Attendance');
const { Grade } = require('../models/Grade');
const sendMail = require('./mailer');

const checkAndNotify = async () => {
  const students = await Student.findAll({
    include: [{ model: Guardian }, { model: Attendance }, { model: Grade }],
  });

  for (const student of students) {
    const totalClasses = student.Attendances.length;
    const presentCount = student.Attendances.filter((a) => a.present).length;
    const attendancePercent = totalClasses > 0 ? (presentCount / totalClasses) * 100 : 100;

    const hasLowAttendance = attendancePercent < 70;
    const hasLowGrades = student.Grades.some((g) => g.value < 5);

    if (hasLowAttendance || hasLowGrades) {
      const guardianEmails = student.Guardians.map((g) => g.email).filter(Boolean);

      if (guardianEmails.length > 0) {
        await sendMail({
          to: guardianEmails.join(','),
          subject: 'Student performance alert',
          html: `
            <p>Student <strong>${student.name}</strong> is underperforming:</p>
            <ul>
              ${hasLowAttendance ? `<li>Attendance: ${attendancePercent.toFixed(1)}%</li>` : ''}
              ${hasLowGrades ? `<li>One or more grades are below 5.0</li>` : ''}
            </ul>
          `,
        });

        console.log(`Alert sent for student ${student.name}`);
      }
    }
  }
};
