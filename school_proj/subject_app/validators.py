import re
from django.core.exceptions import ValidationError


def validate_subject_format(val: str):
    pattern = r"^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$"

    if not re.fullmatch(pattern, val):
        raise ValidationError("Subject must be in title case format.")


def validate_professor_name(val: str):
    pattern = r"^Professor [A-Z][a-zA-Z]*$"

    if not re.fullmatch(pattern, val):
        raise ValidationError('Professor name must be in the format "Professor Adam".')
