export default function SubjectList({ subjects }) {
  return (
    <div className="mx-auto mt-4 w-80">
      <h3 className="mb-3 text-lg font-semibold">Subjects</h3>

      <div className="space-y-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-md border border-black p-3 shadow-sm"
          >
            <p>
              <strong>{subject.subject_name}</strong>
            </p>

            <p>Professor: {subject.professor}</p>
            <p>Students: {subject.students}</p>
            <p>Grade Average: {subject.grade_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
