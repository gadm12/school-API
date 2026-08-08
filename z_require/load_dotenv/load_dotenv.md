- in settings.py
```python
from dotenv import load_dotenv

load_dotenv(BASE_DIR / ".env")
```

or in manage.py

```python
from dotenv import load_dotenv

load_dotenv()
```
improvent to code platoon
```python
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")
```