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
echo ".venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
echo "*.py[cod]" >> .gitignore
echo "*.sqlite3" >> .gitignore
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
echo ".vscode/" >> .gitignore
echo ".idea/" >> .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo "build/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
echo ".pytest_cache/" >> .gitignore
echo ".coverage" >> .gitignore
echo "htmlcov/" >> .gitignore
echo ".mypy_cache/" >> .gitignore
echo ".ruff_cache/" >> .gitignore
echo ".cache/" >> .gitignore
echo "*Zone.Identifier*" >> .gitignore
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