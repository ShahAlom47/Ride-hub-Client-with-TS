export interface BikeData {
    _id: string;
    brand: string;
    model: string;
    engine_capacity: string;
    color: string;
    year: number;
    fuel_type: string;
    rental_price_per_day: number;
    availability: boolean;
    mileage: string;
    transmission: string;
    location: string;
    insurance_included: boolean;
    number_of_seats: number;
    license_requirement: string;
    additional_features: string[]; // Array of additional features as strings
    bike_image: string;
    description: string;
    total_view: number;
    front_brake_type: string;
    front_brake_diameter_in_mm: string;
    rear_brake_type: string;
    review: Review[]; 
    rentals?: RentalsType[];
  }
  

  interface RentalsType {
    user_email: string;
    rent_start_date: string;
    rent_end_date: string;
    status: string;
}
   export interface Review {
    name: string; 
    email: string; 
    userPhotoUrl: string; 
    rating: number;
    comment: string;
  }

 
  