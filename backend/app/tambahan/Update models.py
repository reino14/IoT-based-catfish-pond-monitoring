# backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, Date, Time, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# --- Users ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, unique=True, index=True)
    password = Column(String(255), nullable=False)
    role = Column(String(50), default="user")

# --- Ponds ---
class Pond(Base):
    __tablename__ = "ponds"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    length_m = Column(Float)
    width_m = Column(Float)
    type = Column(String(100))
    status = Column(String(50), default="Kosong")
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)

# --- Pond Details ---
class PondDetail(Base):
    __tablename__ = "pond_details"
    id = Column(Integer, primary_key=True, index=True)
    pond_id = Column(Integer, ForeignKey("ponds.id", ondelete="CASCADE"))
    population = Column(Integer, default=0)
    avg_weight_g = Column(Float, default=0)
    fish_type = Column(String(100))
    date = Column(Date)
    time = Column(Time)
    ph = Column(Float)
    temperature_c = Column(Float)
    note = Column(Text)

# --- Feed Stock ---
class Feed(Base):
    __tablename__ = "feeds"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    brand = Column(String(120))
    protein_pct = Column(Float)
    unit = Column(String(20), default="kg")
    qty = Column(Float, default=0)            # current stock (kg)
    min_stock = Column(Float, default=0)
    price_per_unit = Column(Float, default=0) # price per kg

# --- Feed Usage ---
class FeedUsage(Base):
    __tablename__ = "feed_usage"
    id = Column(Integer, primary_key=True, index=True)
    feed_id = Column(Integer, ForeignKey("feeds.id", ondelete="SET NULL"))
    pond_id = Column(Integer, ForeignKey("ponds.id", ondelete="SET NULL"))
    date = Column(Date)
    qty = Column(Float, default=0)
    note = Column(Text)

# --- Finance Transactions ---
class FinanceTransaction(Base):
    __tablename__ = "finance_transactions"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    type = Column(String(20), nullable=False)  # income | expense
    category = Column(String(120))
    amount = Column(Float, default=0)
    note = Column(Text)

# --- Simple unified log ---
class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    activity = Column(Text)
    entity = Column(String(50))
    entity_id = Column(Integer, nullable=True)
