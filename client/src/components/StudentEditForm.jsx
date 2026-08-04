import Button from "./Button";

export default function StudentEditForm({ formData, setFormData, onSubmit }) {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 max-w-md space-y-4 rounded-lg border bg-white p-6 shadow"
    >
      <h3 className="text-xl font-bold">Edit Student</h3>

      <input
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
        placeholder="Name"
      />

      <input
        name="student_email"
        type="email"
        value={formData.student_email}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
        placeholder="Student email"
      />

      <input
        name="personal_email"
        type="email"
        value={formData.personal_email}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
        placeholder="Personal email"
      />

      <input
        name="locker_number"
        type="number"
        value={formData.locker_number}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
        placeholder="Locker number"
      />

      <input
        name="locker_combination"
        type="text"
        value={formData.locker_combination}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2"
        placeholder="Locker combination"
      />

      <label className="flex items-center gap-2">
        <input
          name="good_student"
          type="checkbox"
          checked={formData.good_student}
          onChange={handleChange}
        />
        Good Student
      </label>

      <Button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Save Changes
      </Button>
    </form>
  );
}
