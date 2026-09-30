export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Patch = "PATCH",
}

export class RequestBuilder {
  private url: string = "";
  private method: HttpMethod = HttpMethod.Get;
  private headers: Record<string, string> = {};
  private body: unknown = null;

  public setUrl(url: string): this {
    this.url = url;
    return this;
  }

  public setMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }

  public addHeaders(headers: Record<string, string>): this {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  public setBody<T>(body: T): this {
    this.body = body;
    return this;
  }

  public async exec<TResponse>(): Promise<TResponse> {
    if (!this.url) {
      throw new Error("URL must be specified before executing the request.");
    }

    const options: RequestInit = {
      method: this.method,
      headers: this.headers,
    };

    if (this.body && this.method !== HttpMethod.Get) {
      if (typeof this.body === "object" && !(this.body instanceof FormData)) {
        options.body = JSON.stringify(this.body);
        if (!this.headers["Content-Type"]) {
          this.headers["Content-Type"] = "application/json";
        }
      } else {
        options.body = String(this.body);
      }
    }

    options.headers = this.headers;

    const response = await fetch(this.url, options);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`,
      );
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<TResponse>;
    }

    const textData = await response.text();
    return textData as unknown as TResponse;
  }
}
