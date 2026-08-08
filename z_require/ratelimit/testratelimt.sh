for i in $(seq 1 12); do
    curl -s -o /dev/null -w "%{http_code}\n" \
    http://localhost:8000/api/v1/book/
done