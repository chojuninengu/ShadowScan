// API service for backend communication

const API_BASE_URL = 'http://localhost:3000/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface ScanRequest {
  email_to_scan: string;
}

export interface ScanResponse {
  scan_id: string;
  message: string;
}

export interface FeedbackRequest {
  message: string;
  is_false_positive: boolean;
  related_result_id?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Network error occurred');
    }
  }

  private getAuthHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/health');
  }

  async startScan(scanData: ScanRequest, token: string): Promise<ScanResponse> {
    return this.makeRequest<ScanResponse>('/scan', {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(scanData),
    });
  }

  async getScanResults(userId: string, token: string): Promise<any[]> {
    return this.makeRequest<any[]>(`/results/${userId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });
  }

  async submitFeedback(feedback: FeedbackRequest): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }
}

export const apiService = new ApiService(); 