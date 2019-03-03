import {ConfigService} from './services/config.service';

export function appInitializerFactory(configService: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return configService.load();
  };
}
