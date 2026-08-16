# Environment Setup

1. deactivate your default and create .venv

```bash
deactivate
```

```bash
python -m venv .venv
```

```bash
source .venv/bin/activate

```

2. echo to .gitignore

```bash
cat >> .gitignore << 'EOF'

# Python
.venv/
__pycache__/
*.py[cod]
*.sqlite3

# Environment Variables
.env
.env.*

# Testing / Coverage
.pytest_cache/
.coverage
htmlcov/

# Linters / Type Checking / Cache
.mypy_cache/
.ruff_cache/
.cache/

# VS Code / IDE
.vscode/
.idea/

# Node / React
node_modules/
dist/
build/

# Logs
*.log

# Operating System Files
.DS_Store
*Zone.Identifier*
EOF

```

3. pip install your requirements

```bash
pip install django "psycopg[binary]" djangorestframework django-cors-headers requests requests_oauthlib python-dotenv pylint-django gunicorn django-redis rich pillow
```

4. freeze your requirements

```bash
pip freeze > requirements.txt
```

5. for the debugging tool rich add to manage.py above import os

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

try:
    from rich import print
    from rich.traceback import install
    from dotenv import load_dotenv

    install(show_locals=True)
    load_dotenv()

    print("[bold green]🚀 Starting Django...[/bold green]")

except ImportError:
    pass
```

- in setting.py in installed app add

```python
INSTALLED_APPS = [
    #also add every app you install
    "accounts",
    "rest_framework",
    "rest_framework.authtoken"
    "corsheaders",
]

# gives the function authentication some what diff from actual authentication
# ex to add oermission_classes above delete
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication"
    ]
}

AUTH_USER_MODEL = "accounts.Accounts"

```

usufel command
tree -a -L 2
tree -L 2

premission issue

```bash
ls -l proj_root/
sudo chown -R $USER:$USER proj_root/api_app
```

to check on .env

```bash
git ls-files | grep -E '(^|/)\.env($|\.)'
```

```
pm shell
>>> Cart_item._meta.get_fields()
```

```python
cart = {}  # dict: item_id -> quantity

def add_item(item_id, quantity):
    cart[item_id] = cart.get(item_id, 0) + quantity
```

same thing the above is for dict below is for

```python
def add_item(self, cart_item_id, quantity=1):
    item = Item.objects.get(id=cart_item_id)
    cart_item, created = Cart_item.objects.get_or_create(
        cart=self, item=item, defaults={"quantity": quantity}
    )
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    return cart_item
```

DATABASES = {
"default": {
"ENGINE": "django.db.backends.postgresql",
"NAME": os.environ.get("POSTGRES_DB", "ecom_db"),
"USER": os.environ.get("POSTGRES_USER", "runner"),
"PASSWORD": os.environ.get("POSTGRES_PASSWORD", ""),
"HOST": os.environ.get("POSTGRES_HOST", "localhost"),
"PORT": os.environ.get("POSTGRES_PORT", "5432"),
}
}

git show HEAD:ecom_proj/ecom_proj/settings.py | grep -A8 DATABASES
