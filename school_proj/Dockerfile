FROM python:latest

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

RUN echo 'alias pm="python manage.py"' >> /root/.bashrc

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]