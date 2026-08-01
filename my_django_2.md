fix : the below command runs inside container not python shell

pm dumpdata student_app.Student --indent 2 > student_app/fixtures/student_data.json

pip install djangorestframework

to check raw SQL migration
 pm sqlmigrate student_app 0013
 it shows you the raw SQL that Django would execute for that migration. It uses your database backend to generate the SQL,