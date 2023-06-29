class Character(models.Model):
    name = models.CharField(max_length=140)
    race = models.CharField(max_length=140)
    klass = models.CharField(max_length=140)
    level = models.IntegerField(default=0)
    backstory = models.CharField(max_length=140)

    image = models.ImageField(upload_to='chars/chars/uploads/')

    # Stats
    stren = models.IntegerField(default=0)
    dext = models.IntegerField(default=0)
    consti = models.IntegerField(default=0)
    inte = models.IntegerField(default=0)
    wisd = models.IntegerField(default=0)
    charis = models.IntegerField(default=0)
    maxhp = models.IntegerField(default=0)
    Proficiency = models.IntegerField(default=0)

    # Other
    tools = models.TextField(max_length=1000)
    Proficiencies = models.TextField(max_length=1000)
    languages = models.TextField(max_length=140)
    skills = models.TextField()
    Equipment = models.TextField()
    gold = models.IntegerField(default=0)
    silver = models.IntegerField(default=0)
    cuprum = models.IntegerField(default=0)
    platinum = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class QuestionsBase(models.Model):
    """
    A typical class defining a model, derived from the Model class.
    """
    # Fields
    QuestionText = models.TextField(help_text="text of Question for the game", max_length=1000)
    QuestionNum = models.IntegerField(help_text="num of Question for the game")
    BaseText = models.CharField(help_text="Name of Base", max_length=140)
    BaseNum = models.IntegerField(help_text="Number of Base")
    ...
    # Metadata
    class Meta:
        ordering = ["BaseNum","QuestionNum"]
    # Methods
    def get_absolute_url(self):
         """
         Returns the url to access a particular instance of MyModelName.
         """
         return reverse('QuestionsBase-detail', args=[str(self.id)])

    def __str__(self):
        """
        String for representing the MyModelName object (in Admin site etc.)
        """
        return self.QuestionText
