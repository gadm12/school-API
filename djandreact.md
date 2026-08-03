# Django + React CORS Cheat Sheet

## What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a browser security feature.

It blocks your React app from accessing a Django API running on a different origin unless Django explicitly allows it.

Example:

- React → `http://localhost:5173`
- Django → `http://127.0.0.1:8001`

These are **different origins**, so CORS must be configured.

---

# 1. Install django-cors-headers

```bash
pip install django-cors-headers
```

Verify:

```bash
pip show django-cors-headers
```

---

# 2. Add to INSTALLED_APPS

```python
INSTALLED_APPS = [
    ...

    "corsheaders",
    "rest_framework",

    "student_app",
    "subject_app",
    "grade_app",
]
```

---

# 3. Add the Middleware

Place **CorsMiddleware BEFORE CommonMiddleware**.

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.common.CommonMiddleware",

    ...
]
```

❌ Wrong

```python
CommonMiddleware
CorsMiddleware
```

✅ Correct

```python
CorsMiddleware
CommonMiddleware
```

---

# 4. Allow your React application

Near the bottom of **settings.py**

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

---

# 5. Restart Django

Changes to **settings.py** require a restart.

```bash
pm runserver
```

or

```bash
python manage.py runserver
```

If using Docker:

```bash
docker restart django-container
```

---

# React Example

```jsx
const response = await axios.get("http://127.0.0.1:8001/api/v1/students/");
```

---

# Debugging Checklist

## 1. Is Django running?

Open in browser:

```
http://127.0.0.1:8001/api/v1/students/
```

If it loads JSON:

✅ Django works.

---

## 2. Is React running?

```
http://localhost:5173
```

---

## 3. Open Chrome DevTools

```
F12
```

Check:

- Console
- Network

---

## 4. Common CORS Error

```
Access to XMLHttpRequest has been blocked by CORS policy
```

Meaning:

- ✅ React reached Django.
- ✅ Django returned a response.
- ❌ The browser blocked React from reading it.

---

## 5. Verify

- `django-cors-headers` installed?
- `"corsheaders"` in `INSTALLED_APPS`?
- Middleware before `CommonMiddleware`?
- `CORS_ALLOWED_ORIGINS` contains your React URL?
- Restarted Django?

---

# Quick Checklist

- [ ] Install `django-cors-headers`
- [ ] Add `"corsheaders"` to `INSTALLED_APPS`
- [ ] Add `CorsMiddleware` before `CommonMiddleware`
- [ ] Add `CORS_ALLOWED_ORIGINS`
- [ ] Restart Django
- [ ] Test endpoint in browser
- [ ] Check Chrome Console
- [ ] Check Chrome Network tab

---

# Helpful Commands

Install package

```bash
pip install django-cors-headers
```

Run Django

```bash
pm runserver
```

Restart Docker container

```bash
docker restart django-container
```

Verify package

```bash
pip show django-cors-headers
```

Test API

```
http://127.0.0.1:8001/api/v1/students/
```
