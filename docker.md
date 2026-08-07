- runs the whole docker compose
  docker compose up
- -d mean damon mood mean running quitly
  docker compose up -d db

docker compose up --build -d

useful shortcut to get db names and pw
docker exec django-container env | grep POSTGRES

From the directory containing docker-compose.yml
docker compose down
docker compose up --build

docker compose up -d # start detached
docker compose up --build -d # rebuild images, then start
docker compose ps # what's running
docker compose logs -f backend # follow one service
docker compose restart backend # restart without rebuilding
docker compose down # stop + remove containers
docker compose down -v # ...and delete volumes (wipes the DB)
docker exec -it django-container bash
docker compose exec backend python manage.py migrate

docker compose exec backend bash
python manage.py loaddata subject_data.json student_data.json grade_data.json

or outside the exec with

docker compose exec backend python manage.py loaddata subject_data.json student_data.json grade_data.json
