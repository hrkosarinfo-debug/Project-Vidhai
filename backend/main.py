from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from typing import List
import database

# Start FastAPI application
app = FastAPI(title="KIPL Cabs Booking Engine API")

# Enable CORS for frontend integration (GitHub Pages and localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits requests from any host (e.g. GitHub Pages)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database on startup
@app.on_event("startup")
def startup_event():
    database.init_db()

# DB Session Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Schemas for validation
class BookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    pickup_location: str = Field(..., min_length=3)
    dropoff_location: str = Field(..., min_length=3)
    distance: float = Field(..., gt=0)
    cab_type: str = Field(...)

class BookingResponse(BaseModel):
    id: int
    name: str
    phone: str
    pickup_location: str
    dropoff_location: str
    distance: float
    fare: float
    cab_type: str
    status: str
    
    class Config:
        from_attributes = True

# Server-Side Fare Calculation Formula (Prevents pricing manipulation)
def calculate_fare(distance: float, cab_type: str) -> float:
    rates = {
        "redtaxi": {"base": 50.0, "per_km": 12.0},
        "itcabs": {"base": 100.0, "per_km": 15.0},
        "tripcabs": {"base": 200.0, "per_km": 18.0}
    }
    
    selected_rate = rates.get(cab_type.lower())
    if not selected_rate:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid cab category: '{cab_type}'. Choose redtaxi, itcabs, or tripcabs."
        )
        
    return selected_rate["base"] + (distance * selected_rate["per_km"])

# API Endpoints
@app.post("/api/bookings", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(booking_in: BookingCreate, db: Session = Depends(get_db)):
    # 1. Securely compute fare on the server side
    calculated_fare = calculate_fare(booking_in.distance, booking_in.cab_type)
    
    # 2. Map schema to database model
    db_booking = database.Booking(
        name=booking_in.name,
        phone=booking_in.phone,
        pickup_location=booking_in.pickup_location,
        dropoff_location=booking_in.dropoff_location,
        distance=booking_in.distance,
        fare=calculated_fare,
        cab_type=booking_in.cab_type
    )
    
    # 3. Save to SQLite database
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    return db_booking

@app.get("/api/bookings", response_model=List[BookingResponse])
def get_all_bookings(db: Session = Depends(get_db)):
    bookings = db.query(database.Booking).order_by(database.Booking.id.desc()).all()
    return bookings
