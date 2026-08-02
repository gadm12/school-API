fix : the below command runs inside container not python shell

pm dumpdata student_app.Student --indent 2 > student_app/fixtures/student_data.json

pip install djangorestframework

to check raw SQL migration
 pm sqlmigrate student_app 0013
 it shows you the raw SQL that Django would execute for that migration. It uses your database backend to generate the SQL,




 # Django Model Relationships

## One-to-One (`OneToOneField`)
One object ↔ One object.

```python
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
```

**Example:**
- One User → One Profile

---

## One-to-Many (`ForeignKey`)
One parent ↔ Many children.
 foreign key always goes to the many side

```python
class Student(models.Model):
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name="students",
    )
```

**Example:**
- One Teacher → Many Students
- Each Student → One Teacher

---

## Many-to-Many (`ManyToManyField`)
Many objects ↔ Many objects.

```python
class Student(models.Model):
    subjects = models.ManyToManyField(
        Subject,
        related_name="students",
    )
```

**Example:**
- One Student → Many Subjects
- One Subject → Many Students

> **Note:** Django automatically creates a hidden join table using two `ForeignKey`s behind the scenes.