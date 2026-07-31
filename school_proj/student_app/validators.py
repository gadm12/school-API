from django.core.exceptions import ValidationError


def validate_school_email(value: str):

    if not value.endswith("@school.com"):
        raise ValidationError(
            message='Invalid school email format. Please use an email ending with "@school.com".',
            params={"value": value},
        )


def validate_name_format(value: str):

    parts = value.split()

    if len(parts) != 3:
        raise ValidationError('Name must be in the format "First Middle Initial. Last"')

    first, middle, last = parts

    if len(middle) != 2 or middle[1] != "." or not middle[0].isalpha():
        raise ValidationError('Name must be in the format "First Middle Initial. Last"')

    if not first.isalpha() or not last.isalpha():
        raise ValidationError('Name must be in the format "First Middle Initial. Last"')


def validate_combination_format(value: str):

    if len(value) != 8:
        raise ValidationError('Combination must be in the format "12-12-12"')

    if value[2] != "-" or value[5] != "-":
        raise ValidationError('Combination must be in the format "12-12-12"')

    digit = value.split("-")
    for n in digit:
        if not n.isdigit():
            raise ValidationError('Combination must be in the format "12-12-12"')

def validate_locker_number(value):
    if value < 1:
        raise ValidationError(
            "Ensure this value is greater than or equal to 1."
        )

    if value > 200:
        raise ValidationError(
            "Ensure this value is less than or equal to 200."
        )