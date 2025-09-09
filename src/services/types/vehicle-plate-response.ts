export interface VehiclePlateResponse {
    info: Info;
    data: Vehicle[];
}

export interface Vehicle {
    vehicle_id:            number;
    vehicle_type_id:       number;
    model_id:              number;
    company_id:            number;
    transport_category_id: number;
    company_serial_id:     number;
    company_service_id:    number;
    plate:                 string;
    year_manufactured:     string;
    notes:                 string;
    created_at:            Date;
    vehiclePhotos:         VehiclePhoto[];
    model:                 Model;
    companySerial:         CompanySerial;
}

export interface CompanySerial {
    company_serial_id:   number;
    company_id:          number;
    company_serial_code: string;
}

export interface Model {
    model_id:    number;
    brand_id:    number;
    chassis_id:  number;
    bodywork_id: number;
    model_name:  string;
    description: string;
    year_from:   string;
}

export interface VehiclePhoto {
    vehicle_photo_id: number;
    vehicle_id:       number;
    image_url:        string;
    photographer_id:  number;
    country_id:       number;
    location:         string;
    department:       string;
    description:      string;
    notes:            string;
    tags:             string;
    status:           string;
    likes:            string;
    views:            string;
    favorites:        string;
    shares:           string;
    comments:         string;
    downloads:        string;
    created_at:       Date;
}

export interface Info {
    count:       number;
    currentPage: number;
    pages:       number;
    limit:       number;
    next:        string;
    prev:        string;
    hasNext:     boolean;
    hasPrev:     boolean;
    startItem:   number;
    endItem:     number;
}
