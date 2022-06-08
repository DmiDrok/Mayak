from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms import ValidationError
from wtforms.validators import DataRequired, Email, Length

import re

class LoginForm(FlaskForm):
    login = StringField("Login:", validators=[DataRequired("Необходимо заполнить поле Login.")])
    password = PasswordField("Password:", validators=[DataRequired("Необходимо заполнить поле Password.")])
    submit = SubmitField("Войти в систему.")

class ContactSocio(FlaskForm):
    telefon = StringField("Ваш номер телефона:", validators=[DataRequired(message="Необходимо заполнить поле \"Ваш номер\"")], render_kw={"placeholder": "+7977..."})
    email = StringField("Ваша контактная почта:", validators=[DataRequired(message="Необходимо заполнить поле \"Ваша контактная почта\""), Email(message="Был указан неккоректный формат почты.")], render_kw={"placeholder": "Почта@.ru"})
    textarea_msg = TextAreaField("Если желаете, опишите вашу ситуацию:", render_kw={"placeholder": "Ваше сообщение..."})
    submit_btn = SubmitField("Отправить заявку.")

    def validate_telefon(self, field):
        if len(re.findall(r"^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$", self.telefon.data.strip())) <= 0:
            print(self.telefon.data.strip())
            raise ValidationError("Был указан неккоректный номер телефона!")


class ContactYurist(FlaskForm):
    telefon = StringField("Ваш номер телефона:", validators=[DataRequired(message="Необходимо заполнить поле \"Ваш номер\"")], render_kw={"placeholder": "+7977..."})
    email = StringField("Ваша контактная почта:", validators=[DataRequired(message="Необходимо заполнить поле \"Ваша контактная почта\""), Email(message="Был указан неккоректный формат почты.")], render_kw={"placeholder": "Почта@.ru"})
    textarea_msg = TextAreaField("Если желаете, опишите вашу ситуацию:", render_kw={"placeholder": "Ваше сообщение..."})
    submit_btn = SubmitField("Отправить заявку.")

    def validate_telefon(self, field):
        if len(re.findall(r"^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$", self.telefon.data.strip())) <= 0:
            print(self.telefon.data.strip())
            raise ValidationError("Был указан неккоректный номер телефона!")