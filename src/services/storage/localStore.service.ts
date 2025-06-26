import { MMKV } from 'react-native-mmkv';

class LocalStoreService {
  private store: MMKV;
  private static instance: LocalStoreService;

  private readonly KEY_LOGGED_IN = 'loggedIn';
  private readonly KEY_API_TOKEN = 'apiToken';
  private readonly KEY_USER_CREDENTIAL = 'userCredential';
  private readonly KEY_THEME = 'theme';

  private constructor() {
    this.store = new MMKV();
  }

  public static getInstance(): LocalStoreService {
    if (!LocalStoreService.instance) {
      LocalStoreService.instance = new LocalStoreService();
    }
    return LocalStoreService.instance;
  }

  // Login methods
  public setLoggedInFlag(value: boolean): void {
    this.store.set(this.KEY_LOGGED_IN, value);
  }

  public isLoggedIn(): boolean {
    return this.store.getBoolean(this.KEY_LOGGED_IN) ?? false;
  }

  public clearLoggedInFlag(): void {
    this.store.delete(this.KEY_LOGGED_IN);
  }
  // API Token methods
  public setApiToken(token: string): void {
    this.store.set(this.KEY_API_TOKEN, token);
  }

  public getApiToken(): string | null {
    return this.store.getString(this.KEY_API_TOKEN) ?? null;
  }

  public clearApiToken(): void {
    this.store.delete(this.KEY_API_TOKEN);
  }

  // User Credential methods
  public setUserCredential(credentials: Record<string, string>): void {
    this.store.set(this.KEY_USER_CREDENTIAL, JSON.stringify(credentials));
  }

  public getUserCredential(): Record<string, string> | null {
    const userData = this.store.getString(this.KEY_USER_CREDENTIAL);
    if (!userData) return null;
    return JSON.parse(userData);
  }

  public clearUserCredential(): void {
    this.store.delete(this.KEY_USER_CREDENTIAL);
  }
  public getTheme(): string {
    return this.store.getString(this.KEY_THEME) ?? 'system';
  }

  public setTheme(theme: string): void {
    this.store.set(this.KEY_THEME, theme);
  }

  // Clear all data
  public clearAll(): void {
    this.store.clearAll();
  }
}

const localStore = LocalStoreService.getInstance();
export default localStore;
