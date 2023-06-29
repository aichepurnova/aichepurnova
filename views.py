from flask import render_template
from index import app


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/rb')
def get_resume():
    return render_template('rb_index.html')

@app.route('/rb_post')
def post_resume():
    return render_template('rb_output.html')


@app.route('/slider')
def slider():
    return render_template('slider.html')


@app.route('/chars')
def chars():
    return render_template('chars.html')


@app.route('/game')
def game():
    Questions = QuestionsBase.objects.all().order_by('QuestionNum')
    Questions_html = []
    for instance in QuestionsBase.objects.all():  # it's not serialization, but extracting of the useful fields
        Questions_html.append({'QuestionText': instance.QuestionText})
    Questions_dic = {'Questions': Questions, 'ac_tab_n': 'ac_tab', 'Questions_html': Questions_html}
    return render_template('reverseapp/game.html', Questions_dic)
