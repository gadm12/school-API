export default function StudentInfo({ student }) {
  return (
    <div className="mx-auto mt-8 w-80 rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">
        {student.name}
      </h2>

      <p className="mb-2">
        <strong>Student Email:</strong> {student.student_email}
      </p>

      <p>
        <strong>Locker Number:</strong> {student.locker_number}
      </p>
    </div>
  );
}
