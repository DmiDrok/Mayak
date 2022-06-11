from flask import Flask, render_template, url_for, session, redirect, g, make_response, current_app, request, flash, get_flashed_messages
from flask_mail import  Mail, Message
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


from werkzeug.security import generate_password_hash, check_password_hash


from forms import ContactSocio, ContactYurist


from dotenv import load_dotenv


import re
import threading
import os

##WSGI - приложение
app = Flask(__name__, template_folder="templates", static_folder="static")
db = SQLAlchemy(app)
migrate_manager = Migrate(app, db)

##Загружаем переменные
dotenv_path = os.path.join(app.root_path, ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

##Конфиг
app.config["SECRET_KEY"] = "0ewaf0asdfjao90j32f03kfoasd,coamda-0e1=-efo=asdkcaskcoasdjf0329qgj=q20=0=rcvb,cvolmbolasamfoasdf-sadf-#$#$$)@_R)KIFJSDFJ9ojasdgj"
app.config["CSRF_ENABLED"] = True
app.config["MAIL_SERVER"] = "smtp.mail.ru"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Data.db"
app.config["COMMIT_ON_TEARDOWN"] = True

##Отзывы юристов
class YuristReviews(db.Model):
    __tablename__ = "yurist_reviews"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    review = db.Column(db.Text, nullable=False)
    avatar = db.Column(db.BLOB)


mail = Mail(app) ##Объект для отправки сообщений

##Функция отправки сообщения
def send_mail(subj, telefon_user, email, content, *args, **kwargs):
    try:
        msg = Message(subject=subj, sender=app.config["MAIL_USERNAME"], recipients=["drobkov155099@gmail.com"])
        #msg.html = html_text.replace("{{subject}}", subj).replace("{{telefon}}", telefon_user).replace("{{content}}", content).replace("{{email}}", email)
        
        with app.app_context():
            msg.html = render_template("needful/tmpl_to_email.html", subject=subj, telefon=telefon_user, content=content, email=email)
            mail.send(msg)
    except Exception as error:
        print(error)

##Для класса .active_link в навигации
links = {
    "index": "",
    "gym": "",
    "school_dance": "",
    "dom": "",
}

##Для того, чтобы сделать ссылку активной и пользователь по навигации мог понять где он находится
def reset_all_save_one(save_one: str) -> None:
    print(g.links)
    if hasattr(g, "links"):
        if save_one != None:
            for key in g.links:
                g.links[key] = ""

            g.links[save_one] = "active_link"
        else:
            for key in g.links:
                g.links[key] = ""

##До первого запроса
@app.before_first_request
def before_first_request():
    """До первого запроса будем устанавливать время жизни сессии. По умолчанию - 1 минута"""
    session.permanent = True
    app.permanent_session_lifetime = 60


@app.before_request
def before_request():
    if not hasattr(g, "links"):
        g.links = {
            "index": "",
            "gym": "",
            "school_dance": "",
            "dom": "",
        }

##Обработчик главной страницы
@app.route("/main")
@app.route("/index")
@app.route("/")
def index():
    reset_all_save_one(None)
    return render_template("index.html", title="Главная", links=g.links,)

##Обработчик страницы тренажёрного зала
@app.route("/gym")
def gym():
    reset_all_save_one("gym")
    return render_template("gym.html", title="Тренажёрный зал", links=g.links)

##Обработчик страницы Школы Танца
@app.route("/school_dance")
def school_dance():
    reset_all_save_one("school_dance")
    return render_template("school_dance.html", title="Школа Танца", links=g.links)

##Обработчик страницы МООМ ДОМА
@app.route("/moom_dom")
def dom():
    reset_all_save_one("dom")
    return render_template("dom.html", title="МООМ ДОМ", links=g.links)

##Обработчик страницы психологов
@app.route("/socio_psych", methods=["POST", "GET"])
def socio_psych():
    reset_all_save_one(None)
    form = ContactSocio() ##Форма для контакта

    telefon_user = ""
    email_user = ""
    message_user = ""
    
    not_correct_form = None

    ##Обрабатываем форму
    if request.method == "POST":
        if form.validate_on_submit():
            telefon_user = form.telefon.data.replace("(", "").replace(")", "").replace("-", "").replace("+", "")
            email_user = form.email.data.strip()
            message_user = form.textarea_msg.data.strip()

            ##Проверяем корректность введённых данных пользователем
            if len(re.findall(r"^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$", telefon_user)) > 0:
                print(f"Пользователь указал корректный телефон: {telefon_user}")

                ##Отправляем и выкидываем флеш-сообщение
                #Sender.send_socio_psych("Социально-психологическая помощь.", telefon_user, email_user, message_user)
                #send_mail("Социально-психологическая помощь.", telefon_user, email_user, message_user)
                
                thread_send_mail = threading.Thread(target=send_mail, args=("Социально-психологическая помощь.", telefon_user, email_user, message_user))
                thread_send_mail.start()
                thread_send_mail.join()

                session["socio_psych_sended"] = True ##Пользователь отправил заявку и мы это сохраним (дальше будем использовать для блокировки формы)
                flash("Заявка будет рассмотрена в течении 2-х дней.", category="success")
                #return redirect(url_for("socio_psych", send=True))
                return redirect(url_for("socio_psych"))
            else:
                print(f"Пользователь указал НЕкорректный телефон: {telefon_user}")
                flash("Указан неккоректный формат телефона!", category="error")
                not_correct_form = True
        else:
            not_correct_form = True

    ##Если пользователь отправил форму - отображать её не будем
    block_form = session.get("socio_psych_sended", None)

    return render_template(
        "socio_psych.html",
        title="Социально-психологическая помощь",
        links=g.links,
        form=form,
        telefon_user=telefon_user,
        email_user=email_user,
        message_user=message_user,
        block_form=block_form,
        not_correct_form=not_correct_form,
        )

##Обработчик страницы юристов
@app.route("/yurist", methods=["POST", "GET"])
def yurist():
    reset_all_save_one(None)
    form = ContactYurist()

    telefon_user = ""
    email_user = ""
    message_user = ""

    not_correct_form = None
    reviews = YuristReviews.query.all()

    if request.method == "POST":
        if form.validate_on_submit():
            telefon_user = form.telefon.data.replace("(", "").replace(")", "").replace("-", "").replace("+", "")
            email_user = form.email.data.strip()
            message_user = form.textarea_msg.data.strip()

            ##Проверяем корректность введённых данных пользователем
            if len(re.findall(r"^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$", telefon_user)) > 0:
                print(f"Пользователь указал корректный телефон: {telefon_user}")

                ##Отправляем и выкидываем флеш-сообщение
                #Sender.send_socio_psych("Юридические услуги.", telefon_user, email_user, message_user)
                #send_mail("Юридические услуги.", telefon_user, email_user, message_user)
                
                thread_send_mail = threading.Thread(target=send_mail, args=("Юридические услуги.", telefon_user, email_user, message_user))
                thread_send_mail.start()
                thread_send_mail.join()


                session["yurist_sended"] = True ##Пользователь отправил заявку и мы это сохраним (дальше будем использовать для блокировки формы)
                flash("Заявка будет рассмотрена в течении 2-х дней.", category="success")
                #return redirect(url_for("yurist", send=True))
                return redirect(url_for("yurist"))
            else:
                print(f"Пользователь указал НЕкорректный телефон: {telefon_user}")
                flash("Указан неккоректный формат телефона!", category="error")
                not_correct_form = True
        else:
            not_correct_form = True


    ##Если пользователь отправил форму - будет True и форму отображать не будем
    block_form = session.get("yurist_sended", None)
    
    print(not_correct_form)
    return render_template(
        "yurist.html",
        title="Юридическая помощь", 
        links=g.links, 
        reviews=reviews,
        form=form,
        telefon_user=telefon_user,
        email_user=email_user,
        message_user=message_user,
        block_form=block_form,
        not_correct_form=not_correct_form
        )

##Обработчик контактов
@app.route("/contacts")
def contacts():
    reset_all_save_one(None)

    return render_template(
        "contacts.html", 
        title="Контакты", 
        links=g.links
        )

##Получить аватар из БД по айди
@app.route("/get_avatar/<id>")
def get_avatar(id):
    res = make_response(YuristReviews.query.filter_by(id=id).first().avatar, 200)
    res.headers["Content-Type"] = "image/jpg"

    return res 

##Переход на несуществующую страницу
@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for("index")) ##Перенаправляем на главную страницу

##Точка входа
if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)