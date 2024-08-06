const API_URL = "http://localhost:8070/api"
//const API_URL = "https://vetcastle.com/api"

export const API_ROUTES = {
    SIGN_UP : `${API_URL}/auth/signup`,
    LOGIN : `${API_URL}/auth/login`,
    HOSPITAL : `${API_URL}/hospital/`,
    HOSPITAL_CATEGORY : `${API_URL}/hospitalCategory/`,
    DOCTORS : `${API_URL}/doctorManagement/`,
    PET : `${API_URL}/petManagement/`,
    PET_SEARCH : `${API_URL}/petManagement?search=`,
    PET_OWNERS : `${API_URL}/petOwnerManagement/`,
    PET_TYPE:`${API_URL}/petType/`,
    UPLOAD : `${API_URL}/upload`,
    APPOINTMENTS: `${API_URL}/appointments/`,
    DIAGNOSIS: `${API_URL}/diagnosis/`,
    INVENTORY: `${API_URL}/products/`,
    PRODUCTCATEGORY: `${API_URL}/product_categories/`,
    PROFILES:`${API_URL}/profiles`,
}

export default API_ROUTES;

export const handleLogout = () => {
    // Remove the access token from local storage
    localStorage.removeItem('accessToken');
  };

