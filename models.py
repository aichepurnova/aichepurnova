import pandas as pd
import sqlalchemy
from sqlalchemy import Column, BigInteger, String, Integer, Float, null, \
    DateTime, and_, or_, func, cast, Date, Sequence, ForeignKey, Boolean, \
    literal
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, relationship


dwh_db = sqlalchemy.create_engine('sqlite:///db.sqlite3')

DWHSession = sessionmaker(dwh_db)
dwh_session = DWHSession()
query_session = scoped_session(DWHSession)
base = declarative_base()
base.query = query_session.query_property()


class Character(base):
    __tablename__ = 'chars_character'

    id = Column(Integer, primary_key=True)

    name = Column(String(140))
    race = Column(String(140))
    klass = Column(String(140))
    level = Column(Integer)
    backstory = Column(String(140))

    image = Column(String(140))

    # Stats
    stren = Column(Integer)
    dext = Column(Integer)
    consti = Column(Integer)
    inte = Column(Integer)
    wisd = Column(Integer)
    charis = Column(Integer)
    maxhp = Column(Integer)
    Proficiency = Column(Integer)

    # Other
    tools = Column(String(1000))
    Proficiencies = Column(String(1000))
    languages = Column(String(140))
    skills = Column(String(1000))
    Equipment = Column(String(1000))
    gold = Column(Integer)
    silver = Column(Integer)
    cuprum = Column(Integer)
    platinum = Column(Integer)

    @classmethod
    def get_details(cls, char_id):
        query = dwh_session.query(cls).filter(cls.id == char_id)
        conn = dwh_db.connect()
        df = pd.read_sql(query.statement, conn)
        conn.close()
        return df


class QuestionBase(base):
    __tablename__ = 'reverseapp_questionsbase'

    id = Column(Integer, primary_key=True)
    QuestionNum = Column(Integer)
    BaseNum = Column(Integer)
    QuestionText = Column(String(140))
    QuestionNum = Column(String(140))

    @classmethod
    def get_data(cls, filters_dict: dict, out_cols: list = []) -> pd.DataFrame:
        """
        Download data from APT database
        :param filters_dict: key represents column in table, value accepts value / list / dictionary
        :param out_cols: optional, columns to be downloaded
        :return:
        """

        # define filters based on defaults and filters_dict
        # default: none
        filters = []
        for col, value in filters_dict.items():
            # filter value defined in dict
            if isinstance(value, dict):
                if value['operator'] == 'in':
                    if value['negate']:
                        filters.append(~getattr(cls, col).in_(value['value']))
                    else:
                        filters.append(getattr(cls, col).in_(value['value']))
                elif value['operator'] == 'like':
                    if value['negate']:
                        filters.append(~getattr(cls, col).ilike(f"%{value['value']}%"))
                    else:
                        filters.append(getattr(cls, col).ilike(f"%{value['value']}%"))
                elif value['operator'] == 'between':
                    filters.append(getattr(cls, col).between(min(value['value']), max(value['value'])))
                elif value['operator'] == 'greater equal':
                    filters.append(getattr(cls, col) >= max(value['value']))
                elif value['operator'] == 'greater':
                    filters.append(getattr(cls, col) > max(value['value']))
                elif value['operator'] == 'smaller equal':
                    filters.append(getattr(cls, col) >= max(value['value']))
                elif value['operator'] == 'smaller':
                    filters.append(getattr(cls, col) >= max(value['value']))
                else:
                    if value['negate']:
                        filters.append(getattr(cls, col) != value['value'])
                    else:
                        filters.append(getattr(cls, col) == value['value'])
            # filter value passed in list
            elif isinstance(value, list):
                if len(value) > 0:
                    filters.append(getattr(cls, col).in_(value))
            else:
                filters.append(getattr(cls, col) == value)

        if out_cols:
            cols = [cls.__dict__[k] for k in out_cols]
            query = dwh_session.query(*cols).filter(and_(*filters))
        else:
            query = dwh_session.query(cls).filter(and_(*filters))

        # download
        df = pd.read_sql(query.statement, dwh_db.connect())

        return df

