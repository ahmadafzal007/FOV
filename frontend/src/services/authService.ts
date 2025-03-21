import axiosInstance from './axiosInstance';

interface User {
  _id: string;
  email: string;
  name?: string;
  role: string;
  profileCompleted: boolean;
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

// Add this at the top of your file if needed
// declare namespace NodeJS {
//   interface Timeout {}
// }

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(
    name: string, 
    email: string, 
    password: string, 
    verificationCode?: string,
    role?: string
  ): Promise<AuthResponse> {
    console.log(`Registering user with role: ${role || 'user'}`);
    const response = await axiosInstance.post('/auth/register', {
      name,
      email,
      password,
      verificationCode,
      role
    });
    return response.data;
  },

  async verifyEmail(email: string, verificationCode: string, role?: string): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/verify-email', {
      email,
      verificationCode,
      role
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(email: string, verificationCode: string, newPassword: string): Promise<{ message: string }> {
    const response = await axiosInstance.post('/auth/reset-password', {
      email,
      verificationCode,
      newPassword
    });
    return response.data;
  },

  async getProfile(): Promise<{ user: User; profileCompletion: number }> {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<{ user: User; message: string }> {
    const response = await axiosInstance.put('/auth/profile', userData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  initiateGoogleLogin: (): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      console.log("Opening Google login popup");
      const popup = window.open(
        `${API_URL}/auth/google`,
        'google-login',
        'width=500,height=600,left=0,top=0'
      );

      if (!popup) {
        console.error("Failed to open popup");
        reject(new Error("Failed to open Google login popup. Please check if popup blockers are enabled."));
        return;
      }

      let timer: number | null = null;
      
      // Setup event listener for message from popup
      const messageListener = (event: MessageEvent) => {
        console.log("Received message from popup:", event.data);
        
        // Check if the message is from our popup and contains token
        if (event.data && event.data.token) {
          console.log("Valid token received from popup");
          
          // Clean up
          window.removeEventListener('message', messageListener);
          if (timer) clearInterval(timer);
          if (!popup.closed) popup.close();
          
          // Store token and user data
          localStorage.setItem('token', event.data.token);
          localStorage.setItem('user', JSON.stringify(event.data.user));
          
          // Resolve with the response
          resolve({
            token: event.data.token,
            user: event.data.user
          });
        }
      };

      window.addEventListener('message', messageListener);
      
      // Check if popup was closed manually
      timer = setInterval(() => {
        if (popup.closed) {
          console.log("Popup was closed manually");
          window.removeEventListener('message', messageListener);
          if (timer) clearInterval(timer);
          reject(new Error("Login cancelled"));
        }
      }, 1000);
      
      // Timeout after 2 minutes
      setTimeout(() => {
        window.removeEventListener('message', messageListener);
        if (timer) clearInterval(timer);
        if (!popup.closed) popup.close();
        reject(new Error("Login timeout. Please try again."));
      }, 120000);
    });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

export default authService; 