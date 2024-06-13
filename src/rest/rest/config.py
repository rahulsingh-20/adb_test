import os

class Config:
    MONGO_URI = f"mongodb://{os.environ['MONGO_HOST']}:{os.environ['MONGO_PORT']}"
    DATABASE_NAME = 'test_db'
    COLLECTION_NAME = 'todos'
