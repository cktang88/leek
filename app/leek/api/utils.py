import random
import string

from leek.api.conf import settings


def generate_app_key(length=48):
    if settings.LEEK_ENV == "DEV":
        return "secret"
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join((random.choice(letters_and_digits) for i in range(length)))