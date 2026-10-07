import axios from 'axios';

/**
 * Resolve the API base URL.
 * Prefers VITE_API_URL if set; otherwise in local development targets the Express backend directly on port 5000.
 */
const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:5000`;
    }
  }
  return '';
};

const API_BASE_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const VISITOR_ID_KEY = 'sk_campaign_visitor_id';
const SUPPORTED_FLAG_KEY = 'sk_campaign_has_supported';

/**
 * Returns or generates a privacy-preserving anonymous visitor ID.
 * Uses crypto.randomUUID() where available, with zero PII collected.
 */
export const getAnonymousVisitorId = (): string => {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = `v-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      }
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return `v-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};

/**
 * Checks if current browser recorded a successful support in localStorage.
 */
export const getLocalSupportState = (): boolean => {
  try {
    return localStorage.getItem(SUPPORTED_FLAG_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * Persists support completion locally in localStorage.
 */
export const setLocalSupportState = (supported: boolean): void => {
  try {
    if (supported) {
      localStorage.setItem(SUPPORTED_FLAG_KEY, 'true');
    }
  } catch {
    // Ignore storage quota errors
  }
};

export interface SupportCountResponse {
  count: number;
}

export interface SupportActionResponse {
  success: boolean;
  supported: boolean;
  alreadySupported?: boolean;
  count: number;
  message?: string;
}

/**
 * Fetches the verified support count from the MongoDB backend.
 */
export const fetchSupportCount = async (): Promise<number> => {
  const response = await apiClient.get<SupportCountResponse>('/api/support');
  return response.data.count;
};

/**
 * Submits an anonymous support action for Sashwat Kumar's campaign.
 */
export const submitSupport = async (visitorId: string): Promise<SupportActionResponse> => {
  const response = await apiClient.post<SupportActionResponse>('/api/support', { visitorId });
  return response.data;
};
