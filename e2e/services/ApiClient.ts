import { request, APIRequestContext } from '@playwright/test';

// Update the interface to include cookies
export interface RequestOptions {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  data?: any;
  cookies?: Record<string, string>; // New: cookies support
}

export class ApiClient {
  private context: APIRequestContext;
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async init() {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return this;
  }
  
  /**
   * Helper method to convert cookies to header format
   */
  private addCookiesToHeaders(options?: RequestOptions): Record<string, string> | undefined {
    if (!options?.cookies) {
      return options?.headers;
    }
    
    const cookieString = Object.entries(options.cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
    
    return {
      ...options?.headers,
      'Cookie': cookieString
    };
  }
  
  /**
   * Generate and log a cURL equivalent command for debugging
   */
  private logCurlCommand(method: string, url: string, options?: RequestOptions) {
    const fullUrl = new URL(url.startsWith('http') ? url : `${this.baseUrl}/${url}`);
    
    // Add query parameters
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, value);
      });
    }
    
    let curlCmd = `curl -X ${method} '${fullUrl.toString()}'`;
    
    // Add headers
    const headers = { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers 
    };
    
    Object.entries(headers).forEach(([key, value]) => {
      curlCmd += ` \\\n  -H '${key}: ${value}'`;
    });
    
    // Add cookies using -b flag
    if (options?.cookies) {
      const cookieString = Object.entries(options.cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
      if (cookieString) {
        curlCmd += ` \\\n  -b '${cookieString}'`;
      }
    }
    
    // Add body data if present
    if (options?.data) {
      const bodyData = JSON.stringify(options.data);
      curlCmd += ` \\\n  -d '${bodyData}'`;
    }
    
    console.log('Equivalent cURL command:');
    console.log(curlCmd);
  }
  
  async getJson<T>(url: string, options?: RequestOptions): Promise<T> {
    this.logCurlCommand('GET', url, options);
    const response = await this.context.get(url, { 
      params: options?.params,
      headers: this.addCookiesToHeaders(options)
    });
    return await response.json() as T;
  }
  
  async getMessage<T>(url: string, options?: RequestOptions): Promise<T> {
    this.logCurlCommand('GET', url, options);
    const response = await this.context.get(url, { 
      params: options?.params,
      headers: this.addCookiesToHeaders(options)
    });
    return await response.text() as T;
  }
  
  async postJson<T>(url: string, options?: RequestOptions): Promise<T> {
    this.logCurlCommand('POST', url, options);
    const response = await this.context.post(url, {
      data: options?.data,
      params: options?.params,
      headers: this.addCookiesToHeaders(options)
    });
    return await response.json() as T;
  }
  
  async putJson<T>(url: string, options?: RequestOptions): Promise<T> {
    this.logCurlCommand('PUT', url, options);
    const response = await this.context.put(url, {
      data: options?.data,
      params: options?.params,
      headers: this.addCookiesToHeaders(options)
    });
    return await response.json() as T;
  }
  
  async deleteJson<T>(url: string, options?: RequestOptions): Promise<T> {
    this.logCurlCommand('DELETE', url, options);
    const response = await this.context.delete(url, {
      data: options?.data,
      params: options?.params,
      headers: this.addCookiesToHeaders(options)
    });
    return await response.json() as T;
  }
  
  async close() {
    await this.context.dispose();
  }
}