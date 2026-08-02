echo "STARTING THE BUILD"

docker build -t react-img .

echo "BUILD COMPLETE"

docker run \
--rm \
-p 5173:5173 \
-v "$(pwd)":/app \
--name react-container \
react-img