docker build -t django-img .

docker run --rm \
-v "$(pwd)/:/app/" \
-p 8001:8000 \
--name django-container \
--network school-network \
django-img