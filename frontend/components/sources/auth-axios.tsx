import axios from 'axios';
import environment from 'Environment';
import { State } from 'ReduxConfig';
import { dataStorage } from 'Utilities';

class HttpSetup {
  readonly baseHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  private createHttpClient() {
    const state = dataStorage.get() as State;
    const authToken = state.authSettings?.authToken;

    // Adds authorization token, if currently available
    const headers = { ...this.baseHeaders }

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return axios.create({
      baseURL: environment.apiPath,
      headers,
    });
  }

  get client() {
    return this.createHttpClient();
  }
}

export const http = new HttpSetup();


axios 0.21.4

page layout has interval to check for auth expiration




